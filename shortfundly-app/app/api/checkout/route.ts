import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import { getDemoUserById, updateDemoUserSubscription } from "@/lib/persistence/local-store";
import { formatSuggestionLine, getSubscriptionSuggestion, type PlanType } from "@/lib/subscription-ai";

type PlanId = "pro_monthly" | "premium_quarterly" | "premium_annual";

type CheckoutBody = {
  planId?: PlanId;
};

type VerifyBody = {
  planId?: PlanId;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

const PLAN_CATALOG: Record<
  PlanId,
  {
    label: string;
    amountPaise: number;
    currency: "INR";
    mappedPlan: PlanType;
    renewalDays: number;
  }
> = {
  pro_monthly: {
    label: "Pro Monthly",
    amountPaise: 19900,
    currency: "INR",
    mappedPlan: "monthly",
    renewalDays: 30
  },
  premium_quarterly: {
    label: "Premium Quarterly",
    amountPaise: 49900,
    currency: "INR",
    mappedPlan: "monthly",
    renewalDays: 90
  },
  premium_annual: {
    label: "Premium Annual",
    amountPaise: 149900,
    currency: "INR",
    mappedPlan: "yearly",
    renewalDays: 365
  }
};

function getRazorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!keyId || !keySecret) {
    const missing: string[] = [];
    if (!keyId) missing.push("RAZORPAY_KEY_ID");
    if (!keySecret) missing.push("RAZORPAY_KEY_SECRET");
    throw new Error(
      `Razorpay is not configured. Missing ${missing.join(", ")}. Add them to shortfundly-app/.env.local and restart npm run dev.`
    );
  }

  return { keyId, keySecret };
}

function buildBasicAuth(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

function verifyRazorpaySignature(input: { orderId: string; paymentId: string; signature: string; keySecret: string }) {
  const expected = crypto.createHmac("sha256", input.keySecret).update(`${input.orderId}|${input.paymentId}`).digest("hex");
  const left = Buffer.from(input.signature);
  const right = Buffer.from(expected);

  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as CheckoutBody;
  const planId = body.planId || "pro_monthly";
  const plan = PLAN_CATALOG[planId];

  if (!plan) {
    return NextResponse.json({ ok: false, message: "Invalid plan selected" }, { status: 400 });
  }

  try {
    const { keyId, keySecret } = getRazorpayKeys();

    const receipt = `sf_${session.userId}_${Date.now()}`.slice(0, 40);
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: buildBasicAuth(keyId, keySecret)
      },
      body: JSON.stringify({
        amount: plan.amountPaise,
        currency: plan.currency,
        receipt,
        notes: {
          userId: session.userId,
          planId,
          mappedPlan: plan.mappedPlan
        }
      })
    });

    const orderData = (await orderResponse.json().catch(() => ({}))) as {
      id?: string;
      amount?: number;
      currency?: string;
      error?: { description?: string };
    };

    if (!orderResponse.ok || !orderData.id) {
      return NextResponse.json(
        {
          ok: false,
          message: orderData.error?.description || "Failed to create Razorpay order"
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      keyId,
      order: {
        id: orderData.id,
        amount: orderData.amount || plan.amountPaise,
        currency: (orderData.currency || plan.currency) as "INR"
      },
      plan: {
        id: planId,
        label: plan.label,
        mappedPlan: plan.mappedPlan
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start checkout";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as VerifyBody;
  const planId = body.planId;
  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;

  if (!planId || !orderId || !paymentId || !signature) {
    return NextResponse.json({ ok: false, message: "Missing Razorpay verification fields" }, { status: 400 });
  }

  const plan = PLAN_CATALOG[planId];
  if (!plan) {
    return NextResponse.json({ ok: false, message: "Invalid plan selected" }, { status: 400 });
  }

  try {
    const { keySecret } = getRazorpayKeys();
    const signatureValid = verifyRazorpaySignature({
      orderId,
      paymentId,
      signature,
      keySecret
    });

    if (!signatureValid) {
      return NextResponse.json({ ok: false, message: "Payment signature verification failed" }, { status: 400 });
    }

    const updated = await updateDemoUserSubscription(session.userId, plan.mappedPlan, {
      displayPlan: plan.label,
      purchasedPlanId: planId,
      renewalDays: plan.renewalDays
    });
    if (!updated) {
      return NextResponse.json({ ok: false, message: "Subscription update failed" }, { status: 400 });
    }

    const user = await getDemoUserById(session.userId);
    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    const suggestion = getSubscriptionSuggestion(user.subscription.plan, user.activity);

    return NextResponse.json({
      ok: true,
      message: "Payment verified and subscription activated",
      purchasedPlan: {
        id: planId,
        label: plan.label
      },
      subscription: {
        ...user.subscription,
        aiSuggestion: suggestion,
        aiSummary: formatSuggestionLine(user.subscription.plan, suggestion)
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
