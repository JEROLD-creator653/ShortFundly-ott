export type FaqTopic =
  | "subscription"
  | "payment_failed"
  | "premium_content"
  | "login_issues"
  | "refund_policy"
  | "device_compatibility";

export type FaqAnswer = {
  topic: FaqTopic;
  answer: string;
};

const escalationEmail = process.env.SUPPORT_ESCALATION_EMAIL || "support@shortfundly.com";

const FAQ_PATTERNS: Array<{ topic: FaqTopic; regex: RegExp; answer: string }> = [
  {
    topic: "subscription",
    regex: /(best plan|which plan suits me|which plan is best|recommend.*plan|what plan should i choose|best subscription|which subscription is best)/i,
    answer:
      "If you watch only sometimes, Free is enough. If you watch regularly and want fewer ads, Monthly Premium is the best starting point. If you use Shortfundly often, Yearly Premium gives the best value overall. Tell me how often you watch and I’ll recommend one for you."
  },
  {
    topic: "subscription",
    regex: /(subscription|plan|pricing|upgrade|monthly|yearly)/i,
    answer:
      "Shortfundly offers Free, Monthly Premium, and Yearly Premium plans. You can change your plan from Account > Subscription. Premium unlocks full catalog access with fewer ads."
  },
  {
    topic: "payment_failed",
    regex: /(payment failed|transaction failed|upi failed|card declined|unable to pay)/i,
    answer:
      "If your payment failed, first retry with a stable network and verify UPI/card details. If amount was debited and access is still locked after 30 minutes, share transaction ID with support for manual verification."
  },
  {
    topic: "premium_content",
    regex: /(premium|watch premium|unlock|paid content)/i,
    answer:
      "To watch premium content, sign in and activate a premium plan from the Subscription section. Once payment is confirmed, premium titles are unlocked instantly on supported devices."
  },
  {
    topic: "login_issues",
    regex: /(login|signin|otp|password|account locked|cannot access account)/i,
    answer:
      "For login issues, try password reset or OTP resend. Ensure your app time is correct and clear browser/app cache once. If your account remains locked, we can help you recover it quickly."
  },
  {
    topic: "refund_policy",
    regex: /(refund|cancel subscription|money back|refund policy)/i,
    answer:
      "Refund requests are reviewed per billing policy and payment gateway rules. Please raise a request within 48 hours with your transaction ID and registered email for priority support."
  },
  {
    topic: "device_compatibility",
    regex: /(device|compatibility|supported|smart tv|android tv|iphone|browser)/i,
    answer:
      "Shortfundly supports modern Chrome/Edge/Safari browsers, Android phones/tablets, and selected smart TV platforms. For best playback, keep your app/browser updated and use stable broadband or 4G/5G."
  }
];

export function getFaqAnswer(question: string): FaqAnswer | null {
  const normalized = question.trim();
  if (!normalized) return null;

  const matched = FAQ_PATTERNS.find((item) => item.regex.test(normalized));
  if (!matched) {
    return null;
  }

  return {
    topic: matched.topic,
    answer: matched.answer
  };
}

export function getEscalationAnswer() {
  return `I could not confidently answer that. I have escalated this to our support team. Please email ${escalationEmail} with your account email and issue details, and we will respond quickly.`;
}
