export type PlanType = "free" | "monthly" | "yearly";

export type UserActivitySignals = {
  totalWatchMinutes: number;
  last30DaysWatchMinutes: number;
  weeklyActiveDays: number;
  avgSessionMinutes: number;
  completionRate: number;
  bingeScore: number;
  likes: number;
  searches: number;
  supportChats: number;
};

export type SubscriptionSuggestion = {
  suggestedPlan: PlanType;
  confidence: number;
  reason: string;
  watchIntensity: "light" | "moderate" | "heavy";
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function deriveWatchIntensity(activity: UserActivitySignals) {
  if (activity.last30DaysWatchMinutes >= 360 || activity.weeklyActiveDays >= 5) {
    return "heavy" as const;
  }
  if (activity.last30DaysWatchMinutes >= 120 || activity.weeklyActiveDays >= 3) {
    return "moderate" as const;
  }
  return "light" as const;
}

export function getSubscriptionSuggestion(currentPlan: PlanType, activity: UserActivitySignals): SubscriptionSuggestion {
  const intensity = deriveWatchIntensity(activity);
  const engagement = clamp(
    activity.last30DaysWatchMinutes / 8 +
      activity.weeklyActiveDays * 6 +
      activity.completionRate * 0.3 +
      activity.bingeScore * 8 +
      activity.likes * 0.8 +
      activity.searches * 0.4,
    0,
    100
  );

  let suggestedPlan: PlanType = currentPlan;
  let reason = "Your current plan matches your watch habits.";

  if (currentPlan === "free") {
    if (intensity === "heavy") {
      suggestedPlan = "yearly";
      reason = "You watch frequently with high session depth. Yearly plan gives better value and uninterrupted premium access.";
    } else if (intensity === "moderate") {
      suggestedPlan = "monthly";
      reason = "You are an active monthly viewer. Monthly premium unlocks the full catalog at a balanced cost.";
    }
  }

  if (currentPlan === "monthly") {
    if (intensity === "heavy" && activity.last30DaysWatchMinutes >= 420) {
      suggestedPlan = "yearly";
      reason = "Your watch time is high enough that yearly premium is more cost efficient than recurring monthly billing.";
    } else if (intensity === "light" && activity.last30DaysWatchMinutes < 70) {
      suggestedPlan = "free";
      reason = "Your recent usage is low. Free plan may be enough until your watch frequency increases again.";
    }
  }

  if (currentPlan === "yearly") {
    if (intensity === "light" && activity.last30DaysWatchMinutes < 60 && activity.weeklyActiveDays <= 1) {
      suggestedPlan = "monthly";
      reason = "Your current activity is occasional. Monthly plan may reduce spend while keeping premium flexibility.";
    }
  }

  const confidence = clamp(Math.round(55 + engagement * 0.4), 55, 95);

  return {
    suggestedPlan,
    confidence,
    reason,
    watchIntensity: intensity
  };
}

export function formatSuggestionLine(currentPlan: PlanType, suggestion: SubscriptionSuggestion) {
  if (suggestion.suggestedPlan === currentPlan) {
    return `AI insight: ${suggestion.reason}`;
  }

  return `AI recommends switching from ${currentPlan} to ${suggestion.suggestedPlan} (${suggestion.confidence}% confidence). ${suggestion.reason}`;
}
