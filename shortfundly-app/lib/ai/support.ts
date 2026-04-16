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

/* ─── Shortfundly-relevant keyword allowlist ─── */
const PLATFORM_KEYWORDS =
  /\b(shortfundly|plan|subscription|premium|payment|pay|upi|card|login|signin|sign in|otp|password|refund|cancel|device|browser|tv|android|ios|iphone|watch|stream|movie|movies|film|films|short\s?film|video|content|catalog|explore|account|profile|settings|download|offline|buffering|quality|resolution|hd|subtitle|language|genre|top rated|latest|new release|recommend|continue watching|watch list|my list|pricing|app|website|upload|creator|filmmaker|rating|review|notification|support|help|contact|email|ticket)\b/i;

/* ─── Off-topic detection patterns ─── */
const OFF_TOPIC_PATTERNS = [
  // General knowledge / trivia
  /\b(who is|who was|what is the capital|tell me about|explain|define|history of|biography)\b/i,
  // Coding / technical
  /\b(write code|python|javascript|java |c\+\+|html|css|react|algorithm|function|api|programming|debug|compile)\b/i,
  // Math / science
  /\b(solve|calculate|equation|formula|integral|derivative|physics|chemistry|biology|math)\b/i,
  // Politics / news / opinion
  /\b(president|prime minister|election|politics|war|government|democrat|republican|vote)\b/i,
  // Entertainment outside platform
  /\b(play a game|tell me a joke|joke|story|poem|sing|song|lyrics|recipe|cook|weather|forecast)\b/i,
  // Personal / social
  /\b(are you human|who are you|what are you|your name|how old|where do you live|friend|date|love)\b/i,
  // Explicit off-topic greetings with nothing else
  /^(hi|hello|hey|yo|sup|hii+|hola|namaste|good morning|good evening|good afternoon|howdy|greetings)\s*[!?.]*$/i
];

const OFF_TOPIC_RESPONSE =
  "I'm the Shortfundly support assistant and I can only help with questions about the Shortfundly OTT platform — subscriptions, payments, content, login issues, devices, and more. Please ask me something related to Shortfundly and I'll be happy to help!";

const GREETING_RESPONSE =
  "Hello! 👋 I'm your Shortfundly support assistant. I can help you with subscriptions, payments, premium content, login issues, refunds, and device compatibility. What would you like to know?";

/**
 * Checks if a question is off-topic (not related to Shortfundly OTT).
 * Returns an appropriate response string, or null if the question is on-topic.
 */
export function getOffTopicResponse(question: string): string | null {
  const trimmed = question.trim();
  if (!trimmed) return null;

  // Pure greeting — respond warmly but steer towards platform topics
  if (/^(hi|hello|hey|yo|sup|hii+|hola|namaste|good morning|good evening|good afternoon|howdy|greetings)\s*[!?.]*$/i.test(trimmed)) {
    return GREETING_RESPONSE;
  }

  // If the message contains Shortfundly-relevant keywords, it's on-topic
  if (PLATFORM_KEYWORDS.test(trimmed)) {
    return null;
  }

  // Check against off-topic patterns
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(trimmed)) {
      return OFF_TOPIC_RESPONSE;
    }
  }

  // Short vague messages (< 4 words) with no platform keywords → treat as off-topic
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount <= 3 && !PLATFORM_KEYWORDS.test(trimmed)) {
    return OFF_TOPIC_RESPONSE;
  }

  return null;
}

const FAQ_PATTERNS: Array<{ topic: FaqTopic; regex: RegExp; answer: string }> = [
  {
    topic: "subscription",
    regex: /(best plan|which plan suits me|which plan is best|recommend.*plan|what plan should i choose|best subscription|which subscription is best)/i,
    answer:
      "If you watch only sometimes, Free is enough. If you watch regularly and want fewer ads, Monthly Premium is the best starting point. If you use Shortfundly often, Yearly Premium gives the best value overall. Tell me how often you watch and I'll recommend one for you."
  },
  {
    topic: "subscription",
    regex: /(subscription|plan|pricing|upgrade|monthly|yearly)/i,
    answer:
      "Shortfundly offers Pro Monthly, Premium Quarterly, and Premium Annual plans (plus Free). You can purchase from Pricing and manage your plan from Profile > Subscription."
  },
  {
    topic: "premium_content",
    regex: /(top rated|latest movies|new release|recommend movies|genre|watch list|my list|continue watching|what can i watch|list movies)/i,
    answer:
      "I can help with catalog discovery too: top rated titles, latest releases, recommendations by genre, your watch list, and continue-watching guidance. Ask for a specific genre or list type."
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
