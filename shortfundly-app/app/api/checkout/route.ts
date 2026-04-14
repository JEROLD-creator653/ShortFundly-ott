import { NextResponse } from "next/server";

type CheckoutBody = {
  plan?: "monthly" | "yearly";
  gateway?: "razorpay" | "stripe" | "phonepe" | "upi";
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CheckoutBody;

  const plan = body.plan || "monthly";
  const gateway = body.gateway || "razorpay";

  return NextResponse.json({
    ok: true,
    message: "Checkout session created",
    plan,
    gateway,
    redirectUrl: `/checkout/mock?plan=${plan}&gateway=${gateway}`
  });
}
