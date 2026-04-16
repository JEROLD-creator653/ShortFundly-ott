const profile = {
  subscription: { plan: "monthly", displayPlan: "Pro Monthly", renewalAt: "2026-05-15T00:00:00Z" },
  activity: { last30DaysWatchMinutes: 300, weeklyActiveDays: 4, completionRate: 60, bingeScore: 0.6 }
};

async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/subscription-advisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Should I switch to the annual plan?",
        profile
      })
    });
    
    if (!res.ok) {
      console.error("HTTP error!", res.status, res.statusText);
      const text = await res.text();
      console.error(text);
      return;
    }
    
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    console.log("RESPONSE:", text);
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

test();
