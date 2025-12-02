# Hotel Booking Platform - Investor Demo Mockup Specification

**Purpose:** Interactive prototype to secure funding and hotel partnerships  
**Timeline:** 2-3 weeks to build  
**Audience:** Hotel owners, investors, stakeholders

---

## 1. Demo Strategy

### 1.1 Goals
- Demonstrate core value proposition in < 5 minutes
- Show both guest experience AND hotel admin perspective
- Prove technical feasibility
- Generate excitement and secure commitments

### 1.2 What to Show
✅ **Fully functional booking flow** (guest-facing)  
✅ **Interactive admin dashboard** (hotel management)  
✅ **Real-time availability** (impressive technical feature)  
✅ **Mobile-responsive design** (modern expectations)  
✅ **Professional branding** (build trust)

### 1.3 What NOT to Build Yet
❌ Real payment processing (use demo mode)  
❌ Email notifications (show UI only)  
❌ Complex reporting (show mockups)  
❌ Multiple hotels (single hotel demo is enough)

---

## 2. Demo Scenarios

### Scenario A: Guest Booking Flow (3 minutes)
```
1. Land on hotel homepage → Professional, modern design
2. Select dates (Dec 20-22) → See availability instantly
3. Browse 3 room types → Beautiful images, clear pricing
4. Select "Deluxe Suite" → Add to cart
5. Fill guest info → Simple, clean form
6. Payment page → Stripe-branded (demo mode)
7. Confirmation page → Booking reference, details
```

### Scenario B: Hotel Admin Dashboard (2 minutes)
```
1. Login as hotel manager → Secure dashboard
2. Dashboard overview → Today's arrivals, revenue chart
3. View bookings → See the booking just created
4. Click on booking → Full details, guest info
5. Check availability calendar → Visual availability grid
6. Manage rooms → Add/edit room types
```

---

## 3. Visual Design Mockups

## 3.1 Guest-Facing Pages

### Page 1: Hotel Homepage
```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                    Q BOUTIQUE RESORT MALINDI          [Login]│
├─────────────────────────────────────────────────────────────┤
│                                                               │
│              [HERO IMAGE - Hotel Exterior]                    │
│                                                               │
│         Experience Luxury in the Heart of the City            │
│                                                               │
│   ┌──────────────────────────────────────────────────┐       │
│   │  Check-in    Check-out    Guests    [Search]     │       │
│   │  Dec 20  │   Dec 22   │     2    │              │       │
│   └──────────────────────────────────────────────────┘       │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Our Rooms & Suites                         │
│                                                               │
│  [Image]          [Image]           [Image]                   │
│  Standard Room    Deluxe Suite      Presidential Suite        │
│  From $120/night  From $200/night   From $450/night          │
│  [View Details]   [View Details]    [View Details]           │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  Amenities: WiFi | Pool | Spa | Restaurant | Parking         │
└─────────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Hero image: High-quality hotel photo
- Color scheme: Elegant (navy blue + gold accent)
- Typography: Modern sans-serif (Inter or Poppins)
- Call-to-action: Prominent "Search" button

### Page 2: Room Selection
```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]  Q BOUTIQUE RESORT MALINDI                                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Your Stay: Dec 20 - Dec 22 (2 nights) • 2 Guests  [Change] │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [Image Gallery - 4 photos]        Deluxe Suite          │ │
│  │                                                          │ │
│  │ • 35 sqm • King Bed • City View                         │ │
│  │ • WiFi • TV • Minibar • Safe • Bathtub                  │ │
│  │                                                          │ │
│  │ $200/night × 2 nights = $400                            │ │
│  │ Taxes & Fees: $48                                        │ │
│  │ Total: $448                                              │ │
│  │                                        [Select Room →]   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [Images]                          Standard Room          │ │
│  │ $120/night × 2 nights = $240         [Select Room →]    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Large, beautiful room images
- Clear pricing breakdown
- Amenity icons
- "3 rooms available" indicator (scarcity)

### Page 3: Guest Information Form
```
┌─────────────────────────────────────────────────────────────┐
│  [Progress Bar: ●────●────○ (Step 2 of 3)]                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Guest Information                                            │
│                                                               │
│  Full Name: [________________]                                │
│  Email:     [________________]                                │
│  Phone:     [________________]                                │
│  Country:   [▼ Select Country]                                │
│                                                               │
│  Special Requests (Optional)                                  │
│  [_____________________________________________]              │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Booking Summary                                      │     │
│  │ Deluxe Suite • 2 Nights • 2 Guests                   │     │
│  │ Dec 20 - Dec 22, 2024                                │     │
│  │ Total: $448                                           │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│                 [← Back]         [Continue to Payment →]      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Page 4: Payment (Demo Mode)
```
┌─────────────────────────────────────────────────────────────┐
│  [Progress Bar: ●────●────● (Step 3 of 3)]                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Payment Details                                              │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [Stripe Payment Form]                               │    │
│  │                                                       │    │
│  │  Card Number: [____-____-____-____]                  │    │
│  │  Expiry: [MM/YY]    CVC: [___]                       │    │
│  │                                                       │    │
│  │  🔒 Secured by Stripe                                │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ⚠️ DEMO MODE: Use test card 4242 4242 4242 4242            │
│                                                               │
│               [Complete Booking - Pay $448]                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Page 5: Confirmation
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              ✓ Booking Confirmed!                             │
│                                                               │
│         Your booking reference: GRP-20241220-A1B2C3           │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Booking Details                                          │ │
│  │                                                          │ │
│  │ Guest: John Doe                                          │ │
│  │ Hotel: Q BOUTIQUE RESORT MALINDI                                 │ │
│  │ Room: Deluxe Suite                                       │ │
│  │ Check-in: Dec 20, 2024 at 2:00 PM                       │ │
│  │ Check-out: Dec 22, 2024 at 11:00 AM                     │ │
│  │ Guests: 2                                                │ │
│  │                                                          │ │
│  │ Total Paid: $448                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  📧 Confirmation email sent to john@example.com               │
│                                                               │
│              [Download Confirmation PDF]                      │
│              [Add to Calendar]                                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3.2 Hotel Admin Dashboard

### Dashboard Home
```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO] Dashboard        [John Smith - Manager ▼] [Logout]   │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                   │
│ Dashboard│  Today's Overview                                 │
│ Bookings │                                                   │
│ Rooms    │  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│ Calendar │  │   12    │  │   8     │  │  $2,400 │           │
│ Reports  │  │Arrivals │  │Departures│ │ Revenue │           │
│ Settings │  └─────────┘  └─────────┘  └─────────┘           │
│          │                                                   │
│          │  Occupancy Rate: 78% ▲                            │
│          │  [=============================-----] 78/100      │
│          │                                                   │
│          │  Revenue This Month                               │
│          │  ┌─────────────────────────────────────────┐      │
│          │  │     [Bar Chart - Daily Revenue]         │      │
│          │  │ $3K │     ▃▅▃▇▅▄▆▅▄▃▅▇                  │      │
│          │  │ $2K │   ▃▆█████████████▅▄▃              │      │
│          │  │ $1K │ ▅███████████████████▆▄            │      │
│          │  │     └──────────────────────────         │      │
│          │  │       Dec 1        Dec 15      Dec 30   │      │
│          │  └─────────────────────────────────────────┘      │
│          │                                                   │
│          │  Recent Bookings                                  │
│          │  ┌───────────────────────────────────────────┐    │
│          │  │ GRP-A1B2C3 │ John Doe │ Dec 20-22 │ $448 │    │
│          │  │ GRP-D4E5F6 │ Jane Smith│Dec 21-23 │ $240 │    │
│          │  │ GRP-G7H8I9 │ Bob Johnson│Dec 22-24│ $450 │    │
│          │  └───────────────────────────────────────────┘    │
│          │                               [View All →]        │
│          │                                                   │
└──────────┴──────────────────────────────────────────────────┘
```

**Design Notes:**
- Clean, modern dashboard (inspired by Stripe, Linear)
- Real-time stats with animations
- Quick actions accessible
- Color-coded status indicators

### Bookings Management
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard > Bookings                                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [Search] [Filter: All ▼] [Export]                           │
│                                                               │
│  ┌─────┬──────────┬────────────┬─────────┬────────┬────────┐ │
│  │Ref  │Guest     │Dates       │Room     │Status  │Amount  │ │
│  ├─────┼──────────┼────────────┼─────────┼────────┼────────┤ │
│  │A1B2 │John Doe  │Dec 20-22   │Deluxe   │●Confirmed│$448│ │
│  │     │          │            │Suite    │        │[View]  │ │
│  ├─────┼──────────┼────────────┼─────────┼────────┼────────┤ │
│  │D4E5 │Jane Smith│Dec 21-23   │Standard │●Confirmed│$240│ │
│  │     │          │            │         │        │[View]  │ │
│  ├─────┼──────────┼────────────┼─────────┼────────┼────────┤ │
│  │G7H8 │Bob J.    │Dec 22-24   │Presid.  │○Pending│$450 │ │
│  │     │          │            │Suite    │        │[View]  │ │
│  └─────┴──────────┴────────────┴─────────┴────────┴────────┘ │
│                                                               │
│  [< Previous]  Page 1 of 5  [Next >]                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Booking Detail View
```
┌─────────────────────────────────────────────────────────────┐
│  Bookings > Booking #GRP-20241220-A1B2C3                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Status: ● Confirmed                                          │
│                                                               │
│  ┌─────────────────────────┬──────────────────────────────┐  │
│  │ Guest Information       │ Booking Information          │  │
│  │                         │                              │  │
│  │ Name: John Doe          │ Check-in: Dec 20, 2024      │  │
│  │ Email: john@example.com │ Check-out: Dec 22, 2024     │  │
│  │ Phone: +1 234 567 8900  │ Nights: 2                   │  │
│  │ Country: United States  │ Guests: 2                   │  │
│  │                         │ Room: Deluxe Suite          │  │
│  │                         │                              │  │
│  └─────────────────────────┴──────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Payment Details                                       │    │
│  │                                                       │    │
│  │ Room Rate: $200/night × 2 = $400                     │    │
│  │ Taxes & Fees: $48                                     │    │
│  │ Total: $448                                           │    │
│  │                                                       │    │
│  │ Payment Status: ✓ Paid                               │    │
│  │ Payment Method: •••• 4242                            │    │
│  │ Paid on: Dec 15, 2024 3:42 PM                        │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  Special Requests: Late check-in after 8 PM                   │
│                                                               │
│  Actions:                                                     │
│  [Check In] [Modify Booking] [Cancel Booking] [Print]        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Availability Calendar
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard > Availability Calendar                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [< December 2024 >]                                          │
│                                                               │
│  Room Type: [All Rooms ▼]                                     │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │     Mon  Tue  Wed  Thu  Fri  Sat  Sun                   │ │
│  │ W1                  1    2    3    4                     │ │
│  │                    [8]  [7]  [5]  [3]                    │ │
│  │ W2   5    6    7    8    9   10   11                     │ │
│  │     [2]  [1]  [0]  [2]  [4]  [3]  [5]                    │ │
│  │ W3  12   13   14   15   16   17   18                     │ │
│  │     [6]  [7]  [8]  [8]  [7]  [4]  [2]                    │ │
│  │ W4  19   20   21   22   23   24   25                     │ │
│  │     [3]  [2]  [1]  [3]  [5]  [6]  [7]                    │ │
│  │                                                          │ │
│  │ Legend: [8] = Available  [3] = Low  [0] = Sold Out      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Color Coding:                                                │
│  🟢 High Availability (6-8 rooms)                             │
│  🟡 Medium Availability (3-5 rooms)                           │
│  🟠 Low Availability (1-2 rooms)                              │
│  🔴 Sold Out (0 rooms)                                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Interactive Prototype Tool

### Recommended: Use Figma + Protopie/Framer
**Why:** Fastest way to create high-fidelity, clickable prototypes

**Alternative 1: Build Real Web Prototype (Recommended)**
- Use Next.js with hardcoded data
- Deploy to Vercel (free, instant)
- Looks and feels like real product
- Timeline: 2-3 weeks

**Alternative 2: No-Code Tools**
- Bubble.io or Webflow for quick prototypes
- Timeline: 1 week

---

## 5. Demo Data Specifications

### Sample Hotel Data
```javascript
{
  name: "Q BOUTIQUE RESORT MALINDI",
  location: "Downtown, Nairobi",
  rating: 4.8,
  reviews: 342,
  amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Parking"],
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM"
}
```

### Sample Room Types
```javascript
[
  {
    name: "Standard Room",
    price: 120,
    size: "25 sqm",
    beds: "Queen Bed",
    maxGuests: 2,
    available: 5,
    amenities: ["WiFi", "TV", "Minibar", "Safe"]
  },
  {
    name: "Deluxe Suite",
    price: 200,
    size: "35 sqm",
    beds: "King Bed",
    maxGuests: 3,
    available: 3,
    amenities: ["WiFi", "TV", "Minibar", "Safe", "Bathtub", "City View"]
  },
  {
    name: "Presidential Suite",
    price: 450,
    size: "70 sqm",
    beds: "King Bed + Sofa Bed",
    maxGuests: 4,
    available: 1,
    amenities: ["WiFi", "TV", "Kitchen", "Safe", "Jacuzzi", "Balcony"]
  }
]
```

### Sample Bookings
```javascript
[
  {
    reference: "GRP-20241220-A1B2C3",
    guestName: "John Doe",
    checkIn: "2024-12-20",
    checkOut: "2024-12-22",
    room: "Deluxe Suite",
    status: "Confirmed",
    amount: 448
  },
  // ... 15 more sample bookings
]
```

---

## 6. Technical Implementation (Quick Build)

### 6.1 Tech Stack for Prototype
```
Frontend: Next.js 14 + TypeScript + Tailwind CSS
Backend: Hardcoded JSON data (no real backend needed)
Deployment: Vercel (free tier)
Timeline: 2-3 weeks
```

### 6.2 Project Structure
```
hotel-demo/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Hotel homepage
│   │   ├── booking/
│   │   │   └── page.tsx          # Booking flow
│   │   ├── confirmation/
│   │   │   └── page.tsx          # Confirmation
│   │   └── admin/
│   │       ├── page.tsx          # Dashboard
│   │       ├── bookings/
│   │       │   └── page.tsx      # Bookings list
│   │       └── calendar/
│   │           └── page.tsx      # Availability
│   ├── components/
│   │   ├── BookingWidget.tsx
│   │   ├── RoomCard.tsx
│   │   ├── DashboardStats.tsx
│   │   └── AvailabilityCalendar.tsx
│   ├── data/
│   │   ├── hotel.json
│   │   ├── rooms.json
│   │   └── bookings.json
│   └── lib/
│       └── utils.ts
├── public/
│   └── images/                    # Hotel photos
└── package.json
```

### 6.3 Key Features to Implement
```typescript
// Booking flow with state management
const [bookingData, setBookingData] = useState({
  checkIn: null,
  checkOut: null,
  guests: 2,
  selectedRoom: null,
  guestInfo: null
});

// Simulated availability check
function checkAvailability(checkIn, checkOut) {
  // Returns hardcoded available rooms
  // Add slight delay to show loading state
}

// Generate booking reference
function generateReference() {
  return `GRP-${format(new Date(), 'yyyyMMdd')}-${randomId()}`;
}
```

---

## 7. Presentation Flow for Investors

### 7-Minute Demo Script

**Minute 1-2: The Problem**
- Show statistics: "Hotels lose 20% of direct bookings to OTAs"
- Commission fees eating into profit margins
- Existing systems are expensive and complex

**Minute 3-5: The Solution (Live Demo)**
- "Let me show you how easy this is..."
- Walk through guest booking (2 mins)
- Show admin dashboard (1 min)

**Minute 6: The Business Model**
- Pricing: $99-299/month per property
- No commission on bookings (vs 15-25% OTA fees)
- ROI calculation: "Save $10,000+ annually"

**Minute 7: The Ask**
- Investment needed: $150,000
- Timeline to launch: 6 months
- Target: 50 hotels in Year 1

### Key Talking Points
✅ "All bookings go directly to the hotel - zero commission"  
✅ "Set up in less than 24 hours"  
✅ "Mobile-optimized for today's travelers"  
✅ "Real-time inventory management"  
✅ "Secure payment processing via Stripe"

---

## 8. Design Assets Needed

### Photography/Images (20-30 images)
- Hotel exterior (2-3 angles)
- Lobby/reception area
- 3 room types (5 images each)
- Restaurant/amenities
- Pool/gym

**Source:** Unsplash, Pexels, or hire photographer

### Branding
- Logo design (professional, modern)
- Color palette:
  - Primary: Deep blue (#1E40AF)
  - Accent: Gold (#F59E0B)
  - Success: Green (#10B981)
  - Neutral: Gray scale
- Typography:
  - Headings: Poppins Bold
  - Body: Inter Regular

### Icons
- Use Lucide React or Heroicons
- Consistent style throughout

---

## 9. Deployment Plan

### Demo URL Structure
```
Production URLs:
- Guest site: demo.yourbookingplatform.com
- Admin panel: demo.yourbookingplatform.com/admin

Login credentials for demo:
Email: demo@hotel.com
Password: Demo2024!
```

### Hosting Setup
1. Deploy to Vercel (10 minutes)
2. Custom domain setup (1 hour)
3. SSL certificate (automatic)
4. Password protect admin section

---

## 10. Backup Plan: Figma Prototype

If coding timeline is too tight:

### Figma Prototype Features
- Clickable hotspots (links between screens)
- Animated transitions
- Interactive form fields
- Realistic data in all fields
- Export as video demo (backup)

**Timeline:** 1 week
**Advantage:** No code, faster iteration
**Disadvantage:** Less impressive than real prototype

---

## 11. Success Metrics for Demo

### What Investors Should See
✅ Professional, polished design  
✅ Fast, responsive interface  
✅ Intuitive user experience  
✅ Real-world functionality  
✅ Mobile-responsive layout  

### Red Flags to Avoid
❌ Lorem ipsum placeholder text  
❌ Broken links or errors  
❌ Slow loading times  
❌ Poor mobile experience  
❌ Unprofessional design  

---

## 12. Demo Day Checklist

**1 Week Before:**
- [ ] Complete all screens
- [ ] Add realistic sample data
- [ ] Test on multiple devices
- [ ] Get feedback from 2-3 people
- [ ] Prepare backup (video recording)

**1 Day Before:**
- [ ] Final testing
- [ ] Check internet connection
- [ ] Prepare handout (1-pager)
- [ ] Rehearse demo 3x times
- [ ] Load demo on multiple devices

**Demo Day:**
- [ ] Arrive early, test setup
- [ ] Have backup device ready
- [ ] Printed screenshots as fallback
- [ ] Business cards ready
- [ ] Follow-up email drafted

---

## 13. Follow-up Materials

### Leave-Behind Package
1. **One-pager PDF:**
   - Problem statement
   - Solution overview
   - Key features
   - Pricing model
   - Contact info

2. **Demo access:**
   - Live demo URL
   - Login credentials
   - Video walkthrough link

3. **Financial projections:**
   - Revenue model
   - Cost breakdown
   - 3-year projections

---

## 14. Development Timeline

### Week 1: Design & Setup
- [ ] Finalize screens/mockups
- [ ] Gather images/assets
- [ ] Set up Next.js project
- [ ] Implement design system

### Week 2: Build Core Pages
- [ ] Hotel homepage
- [ ] Room selection
- [ ] Booking form
- [ ] Confirmation page

### Week 3: Admin Dashboard
- [ ] Dashboard overview
- [ ] Bookings management
- [ ] Availability calendar
- [ ] Polish & responsive design

### Week 4: Testing & Deploy
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance optimization
- [ ] Deploy to production
- [ ] Rehearse presentation

---

## 15. Budget Estimate

**If Building Web Prototype:**
- Developer (freelance): $3,000-5,000
- Designer (UI/UX): $1,500-2,500
- Stock photos: $200-500
- Domain + hosting: $50
- **Total: $5,000-8,000**

**If Using Figma:**
- Designer: $2,000-3,000
- Figma license: $15/month
- Stock photos: $200
- **Total: $2,200-3,200**

---

## 16. Questions Investors Will Ask

**Be prepared to answer:**

1. "How is this different from [competitor]?"
2. "What's your customer acquisition cost?"
3. "Why would hotels switch from their current system?"
4. "What happens if Booking.com builds this?"
5. "How long until you're profitable?"
6. "What's your moat?"
7. "Do you have any pilot customers?"

**Prepare answers to each!**

---

## 17. Next Steps After Demo

### If Interest is High:
1. Schedule follow-up meetings
2. Send detailed business plan
3. Provide pilot program details
4. Set timeline for decisions

### If Lukewarm Response:
1. Ask for specific feedback
2. What would they need to see?
3. Any concerns to address?
4. Keep them updated on progress

---

## 18. Recommended Approach

**My suggestion: Build Real Web Prototype**

**Why:**
- More impressive than static mockups
- Can evolve into actual MVP
- Shows technical competence
- Interactive = memorable
- Shareable link after meeting

**Timeline:** 3 weeks with dedicated developer

**Result:** A working prototype that:
- Books a room (simulated)
- Shows admin dashboard
- Looks professional
- Works on mobile
- Can be shared via link

This becomes your best sales tool!

---

**Questions to answer before building:**
1. Which approach: web prototype or Figma?
2. Budget available?
3. Timeline until first investor meeting?
4. Do you have access to hotel photos?
5. Need help with design or just development?
