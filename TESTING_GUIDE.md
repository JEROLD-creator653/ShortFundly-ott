# OTT Platform Demo - End-to-End Testing Guide

## ✅ System Overview

This is a complete, production-grade OTT platform demo featuring:
- **Dual-role authentication** (User & Admin with complete isolation)
- **Hidden admin access** (non-obvious URL parameter required)
- **AI-driven subscription management** (chatbot-based, behavioral analysis)
- **Real-time activity tracking** (watch time, searches, engagement)
- **Realistic user simulation** (7 demo users with varied behaviors)
- **Clean, performant UX** (optimized loading states, smooth flows)

---

## 🔑 Demo Credentials

### User Role (Click to Auto-Fill on Login)
```
1. user@shortfundly.com / user123
   - Plan: FREE
   - Status: Light viewer (85 min/30d)
   - Good for: Testing free tier experience

2. cinefan@shortfundly.com / user123
   - Plan: MONTHLY
   - Status: Heavy viewer (410 min/30d)
   - Good for: Testing upgrade suggestions

3. sarah@shortfundly.com / user123
   - Plan: YEARLY
   - Status: Power user (620 min/30d)
   - Good for: Testing power user experience

4. emma@shortfundly.com / user123
   - Plan: MONTHLY
   - Status: Highly engaged, potential upgrader
   - Good for: Testing upgrade suggestions

5. lisa@shortfundly.com / user123
   - Plan: FREE
   - Status: Engaged free user, upgrade candidate
   - Good for: Testing free-to-monthly upgrade

6. mike@shortfundly.com / user123
   - Plan: FREE
   - Status: Inactive (15 min/30d)
   - Good for: Testing downgrade scenarios

7. james@shortfundly.com / user123
   - Plan: YEARLY
   - Status: Inactive, potential downgrader
   - Good for: Testing downgrade suggestions
```

### Admin Role (Hidden Access)
```
URL: /login?access=sf_admin_2026
Email: admin@shortfundly.com
Password: admin123
```

---

## 🧪 Test Scenarios

### Scenario 1: User Login & Profile View
1. Navigate to `/login`
2. Click on any user credential to auto-fill
3. Click "Sign In"
4. Verify redirect to `/profile`
5. Verify profile data loads (watch time, plan, activity)
6. ✅ **Check**: Navbar now shows "Plan" button + Logout

### Scenario 2: AI Chatbot Subscription Suggestion
1. In profile, scroll to bottom right (chatbot is sticky)
2. Chat: "What plan should I have?" or "Should I upgrade?"
3. Observe AI suggestion based on user's watch behavior
4. Chat: "I want monthly" (for free users)
5. Click the "Switch to monthly" button
6. Observe:
   - ✅ Plan updates immediately
   - ✅ Renewal date recalculates
   - ✅ Confirmation message appears in chat
   - ✅ Profile metrics refresh

### Scenario 3: Subscription Change Through Chatbot
1. As any user, chat with: "upgrade my plan" or "switch to yearly"
2. AI recognizes the request and offers context-aware button
3. Click plan button to apply
4. Verify:
   - ✅ Subscription updates in profile
   - ✅ Renewal date changes based on plan
   - ✅ Chat confirms the change
   - ✅ No direct "plan buttons" visible (they're removed)

### Scenario 4: Activity Tracking
1. In profile, note current watch time and activity metrics
2. Open the video player (from home/explore)
3. Play a video for 2+ minutes
4. Let it play for ~30 seconds (activity records every 30s)
5. Pause the video
6. Return to profile (refresh if needed)
7. Verify:
   - ✅ Watch minutes increased
   - ✅ Last active time updated
   - ✅ Engagement metrics changed

### Scenario 5: Profile Editing
1. In profile, scroll to "Profile Details"
2. Edit Name, Phone, Location, Genres
3. Click "Save Profile"
4. Verify success message
5. Refresh page
6. Verify edits persisted
7. ✅ **Check**: No profile form error state

### Scenario 6: Admin Hidden Access
1. Navigate to `/login?access=sf_admin_2026`
2. Login as admin@shortfundly.com / admin123
3. Verify redirect to `/admin`
4. Observe admin user table with:
   - All demo users listed
   - Current plan, watch metrics, AI suggestions
   - Confidence scores
5. ✅ **Check**: No "Admin" buttons visible in navbar for regular users
6. ✅ **Check**: Only accessible via secret URL parameter

### Scenario 7: Session Isolation
1. Open user session: Login as user@shortfundly.com
2. Open admin session in **different browser window/tab**
3. Login as admin (via `/login?access=sf_admin_2026`)
4. Verify:
   - ✅ Both sessions persist independently
   - ✅ Logging out one doesn't affect the other
   - ✅ User can't access `/admin` routes
   - ✅ Admin can't access `/profile` (user role required)

### Scenario 8: Logout & Re-Login
1. In profile, click Logout (navbar button)
2. Verify redirect to home
3. Verify navbar shows "Login" button only
4. Navigate back to `/login`
5. Login with different credentials
6. Verify new user's data loads
7. ✅ **Check**: Old session is cleared

### Scenario 9: Error Handling
1. Try invalid login (wrong email/password)
2. Observe error message in login form
3. Try again with correct credentials
4. Verify successful login
5. In profile, simulate network error (close network, refresh)
6. Verify error state with "Try Again" button
7. ✅ **Check**: No crashes, graceful degradation

### Scenario 10: Responsive UX
1. Desktop (1920px): Verify 2-column layout (profile + chatbot)
2. Tablet (768px): Verify responsive grid
3. Mobile (375px): Verify single column, chatbot below
4. Test smooth transitions and animations
5. ✅ **Check**: No layout breaks, text readable

---

## 📊 AI Subscription Engine Rules

The chatbot uses these rules to suggest plans:

### Free → Monthly
- User has watched 150+ minutes in last 30 days
- User is active 5+ days per week
- Confidence: 75-85%

### Free → Yearly
- User has watched 400+ minutes total
- Completion rate 75%+
- Binge score 0.75+
- Confidence: 80-90%

### Monthly → Yearly
- User has watched 400+ minutes in last 30 days
- Completion rate 75%+
- Confidence: 80-85%

### Yearly → Monthly
- User has watched <60 minutes in last 30 days
- Weekly active days <2
- Confidence: 70-80%

### Monthly → Free
- User watched <60 minutes in last 30 days
- Confidence: 65-75%

---

## 🎯 Key Features Demonstrated

### ✅ Authentication
- Session-based auth with HMAC-SHA256 signing
- Role-based access control (user vs admin)
- Secure cookie storage
- 7-day session TTL

### ✅ Subscription AI
- Rule-based (not ML) recommendation engine
- Behavioral signal analysis (watch time, engagement, completion)
- Confidence scoring (55-95%)
- Smart chatbot integration

### ✅ Activity Tracking
- Real-time watch minute accumulation
- Session-based metrics (avg session length, binge score)
- Completion tracking per video
- Support chat activity recording
- Search query tracking

### ✅ Admin Insights
- User intelligence dashboard
- Per-user subscription suggestions
- Activity pattern visualization
- Easily hidden from normal navigation

### ✅ UX Polish
- Smooth animations and transitions
- Loading skeleton states
- Error boundaries with recovery options
- Auto-focus on form inputs
- One-click credential selection
- Sticky chatbot for accessibility

---

## 🚀 Performance Optimizations

- ✅ Navbar session polling (debounced on pathname)
- ✅ Profile loading skeletons (no blank states)
- ✅ Sticky chatbot (doesn't block main content)
- ✅ Incremental activity recording (batched every 30s)
- ✅ Memoized subscription suggestions
- ✅ Responsive grid layouts (no layout shift)

---

## 📝 Architecture Notes

### Session Architecture
- **User Session**: Can access `/profile`, `/api/user/*`
- **Admin Session**: Can access `/admin`, `/api/admin/*`
- **No Cross-Contamination**: Role checks on every route
- **Logout**: Clears cookie, invalidates session

### Chatbot Integration
- **Embedded in Profile**: Right sidebar, sticky position
- **Smart Parsing**: Understands upgrade/downgrade requests
- **One-Click Actions**: Instant plan switching
- **Session Persistence**: Changes reflect immediately

### Data Persistence
- **Local JSON Storage**: `storage/local-db/users.json`
- **Realistic Seeding**: 7 demo users with varied behaviors
- **Activity Smoothing**: Exponential moving average for metrics
- **Renewal Date Logic**: 30 days (monthly), 365 days (yearly)

---

## ✨ Hidden Details & Easter Eggs

1. **Admin Access**: `/login?access=sf_admin_2026` (only way to reach admin)
2. **No Visible Admin Buttons**: Navbar only shows "Login" or user plan
3. **Subscription Only via Chatbot**: No direct plan buttons in profile
4. **Activity Signals Everywhere**: Video play, search, chatbot, completion
5. **Diverse Demo Users**: 7 different personas with realistic patterns
6. **Smart Suggestions**: AI analyzes behavior and suggests plans
7. **One-Click Credentials**: Click any demo credential to auto-fill

---

## 🐛 Known Limitations & Future Enhancements

### Current Limitations
- Recommendations are rule-based (not ML-powered)
- Activity metrics use local JSON storage (not database)
- No email notifications
- No payment integration
- No subscription pause/resume

### Future Enhancements
- ML-based subscription predictions
- MongoDB integration for scale
- Email confirmation for plan changes
- Activity timeline visualization
- Payment provider integration
- Custom pricing tiers

---

## 📞 Support

For issues or questions about this demo:
- Check the code comments in `/lib/subscription-ai.ts`
- Review session logic in `/lib/auth/demo-session.ts`
- Check persistence layer in `/lib/persistence/local-store.ts`
- Chatbot rules in `/components/profile-chatbot.tsx`

---

**Last Updated**: April 15, 2026
**Status**: Production-Ready Demo ✅
