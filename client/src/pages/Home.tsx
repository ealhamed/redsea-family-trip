import { useMemo, useState } from "react";
import {
  Baby,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Film,
  Hotel,
  Luggage,
  MapPin,
  Plane,
  Plus,
  Sailboat,
  ShieldCheck,
  Sparkles,
  Trash2,
  Utensils,
  Waves,
} from "lucide-react";

/**
 * Design philosophy: Red Sea Expedition Modernism.
 * This page must feel like a private premium travel folio: asymmetric cards, boarding-pass details,
 * reef-green/sand/coral palette, clear family logistics, tactile paper texture, and private reservation details omitted.
 * Every choice should reinforce a calm, practical family command center rather than a generic travel page.
 */

const heroImage = "/manus-storage/shura-island-aerial_a7dc46b4.jpg";
const routeImage = "/manus-storage/sls-redsea-lounge_59c504e7.jpg";
const suiteImage = "/manus-storage/sls-redsea-bedroom_7cceef22.jpg";
const suiteDetailImage = "/manus-storage/sls-redsea-suite-bedroom_dd3f74e9.jpg";
const terraceImage = "/manus-storage/sls-redsea-bath-terrace_e67a4ad5.jpg";

type ChecklistGroup = "Kids" | "Travel" | "Beach" | "Room" | "Dining";

type ChecklistItem = {
  id: string;
  label: string;
  group: ChecklistGroup;
};

type ScheduleLane = "Family" | "Kids" | "Parents" | "Dining" | "Reset";

type ScheduleBlock = {
  id: string;
  day: "Wed" | "Thu" | "Fri" | "Sat";
  time: string;
  lane: ScheduleLane;
  title: string;
  note: string;
};

const flights = [
  {
    id: "outbound",
    label: "Departing",
    date: "Wed, 13 May",
    from: "RUH",
    to: "RSI",
    depart: "10:35",
    arrive: "12:30",
    duration: "1h 55m",
    note: "Non-stop · Confirmed · Guest Basic",
  },
  {
    id: "return",
    label: "Returning",
    date: "Sat, 16 May",
    from: "RSI",
    to: "RUH",
    depart: "13:15",
    arrive: "15:10",
    duration: "1h 55m",
    note: "Non-stop · Confirmed · Guest Basic",
  },
];

const days = [
  {
    date: "Wed 13 May",
    title: "Arrival + settle in",
    tone: "Travel day",
    items: [
      "Land at RSI around 12:30, then take the causeway transfer toward Shura Island.",
      "Keep the afternoon light: check-in, unpack, pool glance, early dinner, kids wind-down.",
      "Confirm Kids’ Club / Teens’ Club timing with the concierge for Thursday and Friday.",
    ],
  },
  {
    date: "Thu 14 May",
    title: "Water + kids club day",
    tone: "Stacked family rhythm",
    items: [
      "Morning family pool or beach block before peak heat.",
      "Stack kids club or Teens’ Club while parents book Ciel Spa, padel, or quiet lunch.",
      "Pick one destination dinner; do not overfill the day.",
    ],
  },
  {
    date: "Fri 15 May",
    title: "Best experience day",
    tone: "Book ahead",
    items: [
      "Choose one signature activity: seaplane, snorkelling, kayaking, paddleboarding, or Shura Links.",
      "Hold late afternoon for open-air cinema or golden-hour Seabird / The Perch.",
      "Pack part of the luggage at night so Saturday is calm.",
    ],
  },
  {
    date: "Sat 16 May",
    title: "Checkout + return",
    tone: "Smooth exit",
    items: [
      "Final room sweep: chargers, IDs, swimwear, medicine kit, comfort toys.",
      "Checkout target is noon; head to RSI with time for kids and airport movement.",
      "Return flight departs 13:15 and lands in Riyadh around 15:10.",
    ],
  },
];

const defaultChecklist: ChecklistItem[] = [
  { id: "ids", label: "IDs / passports / booking reference", group: "Travel" },
  { id: "boarding", label: "Boarding passes ready on phones", group: "Travel" },
  { id: "charger", label: "Chargers + power banks", group: "Travel" },
  { id: "kids-club", label: "Ask concierge for Kids’ Club and Teens’ Club programme", group: "Kids" },
  { id: "hats", label: "Kids hats and light clothes", group: "Kids" },
  { id: "snacks", label: "Flight snacks and water bottles", group: "Kids" },
  { id: "medicine", label: "Basic medicine kit", group: "Kids" },
  { id: "sunscreen", label: "Sunscreen and after-sun care", group: "Beach" },
  { id: "goggles", label: "Swim goggles and sandals", group: "Beach" },
  { id: "wetbag", label: "Wet bag for swimwear", group: "Beach" },
  { id: "dinner-bookings", label: "Book priority dinners before arrival", group: "Dining" },
  { id: "sleep", label: "Bedtime items / comfort toys", group: "Room" },
  { id: "laundry", label: "Laundry pouch", group: "Room" },
  { id: "room-sweep", label: "Checkout room sweep list", group: "Room" },
];

const defaultSchedule: ScheduleBlock[] = [
  { id: "wed-arrive", day: "Wed", time: "12:30", lane: "Family", title: "Arrive RSI", note: "Transfer to SLS via Shura causeway." },
  { id: "wed-room", day: "Wed", time: "15:00", lane: "Reset", title: "Suite reset", note: "Unpack, assign sleeping zones, keep evening easy." },
  { id: "wed-dinner", day: "Wed", time: "18:30", lane: "Dining", title: "Fi’lia or Deluxe", note: "Simple first-night dinner; family-friendly Italian or light bites." },
  { id: "thu-kids", day: "Thu", time: "10:30", lane: "Kids", title: "Kids’ Club", note: "Workshops, crafts, outdoor games, or pool games depending on the daily programme." },
  { id: "thu-parents", day: "Thu", time: "10:30", lane: "Parents", title: "Ciel Spa / padel", note: "Parents can stack a wellness or active block while kids are supervised." },
  { id: "thu-family", day: "Thu", time: "16:30", lane: "Family", title: "Kayak or paddleboard", note: "Keep it low-pressure and weather-dependent." },
  { id: "fri-kids", day: "Fri", time: "17:30", lane: "Kids", title: "Mini disco / cinema", note: "Check actual programme with concierge." },
  { id: "fri-parents", day: "Fri", time: "17:30", lane: "Parents", title: "Seabird golden hour", note: "Seafood-led dinner slot if available." },
  { id: "sat-exit", day: "Sat", time: "10:30", lane: "Family", title: "Room sweep + checkout", note: "Quiet exit rhythm before RSI flight." },
];

const experiences = [
  {
    title: "Kids’ Club",
    tag: "Kids 5–11",
    priority: "Book daily slots early",
    detail: "Daily programme can include workshops, arts and crafts, origami, slime-making, science experiments, sandcastle building, beach volleyball, table tennis, pool games, team challenges, mini discos and kids’ rave parties.",
    icon: Baby,
  },
  {
    title: "Teens’ Club",
    tag: "Ages 12–15",
    priority: "Useful for parallel plans",
    detail: "Indoor gaming lounge, basketball, table tennis, padel and tailored workouts at the multipurpose sports station.",
    icon: Sparkles,
  },
  {
    title: "Ciel Spa",
    tag: "Parents",
    priority: "Reserve ahead",
    detail: "Couples’ suites, hydrotherapy, hammam, steam, sauna, beauty stations, grooming lounge, LED therapy, HydraFacial and Biologique Recherche protocols.",
    icon: ShieldCheck,
  },
  {
    title: "Water block",
    tag: "Family",
    priority: "Weather-dependent",
    detail: "Complimentary kayaks, snorkelling equipment and paddleboards; premium options include Seabob, e-foil and e-surf.",
    icon: Waves,
  },
  {
    title: "Shura Links",
    tag: "Golf",
    priority: "Book if you want a grown-up window",
    detail: "Saudi Arabia’s first 18-hole championship golf course is part of Shura Island’s broader destination experience.",
    icon: Sailboat,
  },
  {
    title: "Open-air cinema",
    tag: "Evening",
    priority: "Good low-energy option",
    detail: "Shura Island’s open-air cinema is a strong evening candidate after an active day.",
    icon: Film,
  },
];

const restaurants = [
  { name: "Fi’lia", cuisine: "Italian", bestFor: "First night / family table", book: "High", note: "Handmade pasta, wood-fired pizza, warm family-style hospitality." },
  { name: "Seabird", cuisine: "Seafood, Spanish-Portuguese", bestFor: "Golden-hour date or family seafood", book: "Very high", note: "Seafood towers, oysters, lobster rice, octopus roll and coastal energy." },
  { name: "Floating World", cuisine: "Japanese-influenced", bestFor: "Parents’ dinner", book: "High", note: "Easy-to-share dishes, sushi, tempura, robata and dramatic design." },
  { name: "The Perch", cuisine: "Poolside refreshments", bestFor: "Afternoon / pre-dinner", book: "Medium", note: "Cabanas, fresh juices, slushies, mocktails and golden-hour energy." },
  { name: "Deluxe", cuisine: "Café, pastries, light bites", bestFor: "Coffee / casual reset", book: "Low", note: "All-day café-lounge for practical family gaps." },
  { name: "Four Seasons Al Forn", cuisine: "Levantine", bestFor: "Alternative Shura dinner", book: "Check access", note: "Arabic dishes from Lebanon and Syria; confirm cross-resort dining access." },
  { name: "Four Seasons Spiaggia", cuisine: "Italian beachside", bestFor: "Beach lunch", book: "Check access", note: "Al fresco Italian near beach and pool; confirm availability for non-guests." },
];

function Pill({ children, tone = "sand" }: { children: React.ReactNode; tone?: "sand" | "green" | "coral" }) {
  return <span className={`folio-pill folio-pill-${tone}`}>{children}</span>;
}

function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function FlightCard({ flight }: { flight: (typeof flights)[number] }) {
  return (
    <article className="flight-card">
      <div className="flight-card__top">
        <div>
          <p>{flight.label}</p>
          <h3>{flight.date}</h3>
        </div>
        <Pill tone="green">Confirmed</Pill>
      </div>
      <div className="flight-card__route">
        <div>
          <strong>{flight.from}</strong>
          <span>{flight.depart}</span>
        </div>
        <div className="flight-card__line">
          <span />
          <Plane size={18} />
          <span />
        </div>
        <div>
          <strong>{flight.to}</strong>
          <span>{flight.arrive}</span>
        </div>
      </div>
      <div className="flight-card__meta">
        <span>{flight.duration}</span>
        <span>{flight.note}</span>
      </div>
    </article>
  );
}

function DayCard({ day, index }: { day: (typeof days)[number]; index: number }) {
  const [open, setOpen] = useState(index < 2);

  return (
    <article className={`day-card day-card-${index + 1}`}>
      <button className="day-card__button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <div>
          <span>{day.date}</span>
          <h3>{day.title}</h3>
          <p>{day.tone}</p>
        </div>
        <ChevronDown className={open ? "rotate" : ""} size={22} />
      </button>
      {open ? (
        <ul className="day-card__list">
          {day.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function ChecklistRow({ item, checked, onToggle, onRemove }: { item: ChecklistItem; checked: boolean; onToggle: () => void; onRemove: () => void }) {
  return (
    <div className={`check-row-shell ${checked ? "check-row-shell--done" : ""}`}>
      <button className="check-row" onClick={onToggle}>
        <span className="check-row__box">{checked ? <Check size={14} /> : null}</span>
        <span>{item.label}</span>
        <em>{item.group}</em>
      </button>
      <button className="remove-check" onClick={onRemove} aria-label={`Remove ${item.label}`}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export default function Home() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [checked, setChecked] = useState<string[]>(["ids", "boarding"]);
  const [newItem, setNewItem] = useState("");
  const [newGroup, setNewGroup] = useState<ChecklistGroup>("Kids");
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>(defaultSchedule);
  const [selectedDay, setSelectedDay] = useState<ScheduleBlock["day"]>("Thu");
  const [activityForm, setActivityForm] = useState({ time: "11:00", lane: "Family" as ScheduleLane, title: "", note: "" });

  const progress = useMemo(() => {
    if (checklistItems.length === 0) return 0;
    return Math.round((checked.length / checklistItems.length) * 100);
  }, [checked.length, checklistItems.length]);

  const dayBlocks = useMemo(
    () => scheduleBlocks.filter((block) => block.day === selectedDay).sort((a, b) => a.time.localeCompare(b.time)),
    [scheduleBlocks, selectedDay],
  );

  const toggleItem = (id: string) => {
    setChecked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const addChecklistItem = () => {
    const label = newItem.trim();
    if (!label) return;
    const id = `custom-${Date.now()}`;
    setChecklistItems((current) => [...current, { id, label, group: newGroup }]);
    setNewItem("");
  };

  const removeChecklistItem = (id: string) => {
    setChecklistItems((current) => current.filter((item) => item.id !== id));
    setChecked((current) => current.filter((item) => item !== id));
  };

  const addScheduleBlock = () => {
    const title = activityForm.title.trim();
    if (!title) return;
    setScheduleBlocks((current) => [
      ...current,
      {
        id: `activity-${Date.now()}`,
        day: selectedDay,
        time: activityForm.time,
        lane: activityForm.lane,
        title,
        note: activityForm.note.trim() || "Flexible block — confirm details later.",
      },
    ]);
    setActivityForm((current) => ({ ...current, title: "", note: "" }));
  };

  const removeScheduleBlock = (id: string) => {
    setScheduleBlocks((current) => current.filter((block) => block.id !== id));
  };

  return (
    <main className="trip-app">
      <section className="hero-shell real-photo-hero">
        <img src={heroImage} alt="Aerial real photograph of Shura Island and the Red Sea resort coastline" />
        <div className="hero-overlay" />
        <nav className="topbar" aria-label="Trip overview navigation">
          <a href="#flights">Flights</a>
          <a href="#hotel">Suite</a>
          <a href="#schedule">Schedule</a>
          <a href="#experiences">Book</a>
          <a href="#packing">Checklist</a>
        </nav>
        <div className="hero-content">
          <div className="hero-copy">
            <Pill tone="coral">Private family folio</Pill>
            <h1>Red Sea family trip command center</h1>
            <p>
              A calm, mobile-friendly place for flights, the SLS Red Sea Indulge 2-Bedroom Suite, stacked family scheduling,
              book-now recommendations, and a checklist you can add to yourself.
            </p>
            <div className="hero-actions">
              <a href="#schedule" className="primary-link">Build the schedule</a>
              <a href="#experiences" className="secondary-link">Prioritize bookings</a>
            </div>
          </div>
          <aside className="hero-ticket" aria-label="Trip snapshot">
            <div className="stamp">13–16 May 2026</div>
            <h2>RUH → RSI</h2>
            <p>3-night family stay · SLS Red Sea · Indulge 2-Bedroom Suite</p>
            <div className="ticket-grid">
              <span><CalendarDays size={16} /> Wed–Sat</span>
              <span><Hotel size={16} /> 2-bedroom suite</span>
              <span><Waves size={16} /> Shura Island</span>
              <span><ShieldCheck size={16} /> Private view</span>
            </div>
          </aside>
        </div>
      </section>

      <section id="today" className="overview-strip container">
        <article>
          <Clock3 />
          <span>Departure</span>
          <strong>Wed 13 May · 10:35</strong>
          <p>Leave Riyadh with a relaxed buffer for kids, bags, and airport movement.</p>
        </article>
        <article>
          <MapPin />
          <span>Basecamp</span>
          <strong>SLS Red Sea</strong>
          <p>Indulge 2-Bedroom Suite. The suite listing supports a larger family setup and a private terrace.</p>
        </article>
        <article>
          <Luggage />
          <span>Readiness</span>
          <strong>{progress}% packed</strong>
          <p>Add your own checklist items below; they stay in this browser session.</p>
        </article>
      </section>

      <section id="flights" className="route-section container">
        <div className="route-visual">
          <img src={routeImage} alt="Real SLS The Red Sea interior lounge photograph" />
        </div>
        <div className="route-content">
          <SectionHeader eyebrow="Flights" title="Two clean hops, no extra noise">
            Confirmed flight details are visible; private reservation details stay out of the family view.
          </SectionHeader>
          <div className="flight-stack">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      <section id="hotel" className="hotel-section container">
        <div className="hotel-card">
          <div className="hotel-card__image hotel-card__image-stack">
            <img src={suiteImage} alt="Real SLS The Red Sea bedroom photograph" />
            <img src={suiteDetailImage} alt="Real SLS The Red Sea suite bedroom photograph" />
            <img src={terraceImage} alt="Real SLS The Red Sea bath and terrace photograph" />
          </div>
          <div className="hotel-card__content">
            <Pill tone="green">Family basecamp</Pill>
            <h2>SLS Red Sea · Indulge 2-Bedroom Suite</h2>
            <p>
              Booked from <strong>Wednesday, 13 May 2026</strong> to <strong>Saturday, 16 May 2026</strong>. Accor lists the
              Indulge 2-Bedroom Suite as a spacious two-bedroom option with a furnished terrace and room for a larger family.
            </p>
            <div className="hotel-details">
              <span><Baby size={17} /> Assign sleeping zones early</span>
              <span><SunMediumIcon /> Prepare sun kit by the door</span>
              <span><Sparkles size={17} /> Book kids / parents blocks in pairs</span>
            </div>
            <p className="source-note">Source-backed planning note: SLS and Red Sea Global list Kids’ Club, Teens’ Club, water sports, Ciel Spa, dining venues, open-air cinema and Shura Island activities. Confirm exact operating times with the concierge.</p>
          </div>
        </div>
      </section>

      <section id="plan" className="plan-section container">
        <SectionHeader eyebrow="Family rhythm" title="A practical 4-day outline">
          This is intentionally light. The schedule builder below is where we stack kids’ activities, parents’ windows, dining and reset time.
        </SectionHeader>
        <div className="day-grid">
          {days.map((day, index) => (
            <DayCard key={day.date} day={day} index={index} />
          ))}
        </div>
      </section>

      <section id="schedule" className="schedule-section container">
        <SectionHeader eyebrow="Stacked scheduler" title="Plan parallel tracks without losing the family rhythm">
          Add kids club, parent time, restaurants, pool blocks and reset periods on the same day. This is designed for “kids there, parents elsewhere” planning.
        </SectionHeader>
        <div className="schedule-shell">
          <div className="schedule-controls">
            {(["Wed", "Thu", "Fri", "Sat"] as ScheduleBlock["day"][]).map((day) => (
              <button key={day} className={selectedDay === day ? "active" : ""} onClick={() => setSelectedDay(day)}>{day}</button>
            ))}
          </div>
          <div className="activity-form">
            <input type="time" value={activityForm.time} onChange={(event) => setActivityForm((current) => ({ ...current, time: event.target.value }))} />
            <select value={activityForm.lane} onChange={(event) => setActivityForm((current) => ({ ...current, lane: event.target.value as ScheduleLane }))}>
              {(["Family", "Kids", "Parents", "Dining", "Reset"] as ScheduleLane[]).map((lane) => <option key={lane} value={lane}>{lane}</option>)}
            </select>
            <input placeholder="Activity title" value={activityForm.title} onChange={(event) => setActivityForm((current) => ({ ...current, title: event.target.value }))} />
            <input placeholder="Optional note" value={activityForm.note} onChange={(event) => setActivityForm((current) => ({ ...current, note: event.target.value }))} />
            <button onClick={addScheduleBlock}><Plus size={16} /> Add</button>
          </div>
          <div className="schedule-lanes">
            {(["Family", "Kids", "Parents", "Dining", "Reset"] as ScheduleLane[]).map((lane) => (
              <div className="schedule-lane" key={lane}>
                <h3>{lane}</h3>
                {dayBlocks.filter((block) => block.lane === lane).map((block) => (
                  <article key={block.id} className={`schedule-block lane-${lane.toLowerCase()}`}>
                    <button onClick={() => removeScheduleBlock(block.id)} aria-label={`Remove ${block.title}`}><Trash2 size={14} /></button>
                    <span>{block.time}</span>
                    <strong>{block.title}</strong>
                    <p>{block.note}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="experiences-section container">
        <SectionHeader eyebrow="Book-now shortlist" title="Best SLS / Shura Island moves to lock early">
          Based on official SLS, Red Sea Global, Visit Red Sea and Four Seasons Shura Island information. Cross-resort dining access should be confirmed before booking.
        </SectionHeader>
        <div className="experience-grid">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <article key={experience.title} className="experience-card">
                <Icon />
                <Pill tone="sand">{experience.tag}</Pill>
                <h3>{experience.title}</h3>
                <strong>{experience.priority}</strong>
                <p>{experience.detail}</p>
              </article>
            );
          })}
        </div>
        <div className="restaurant-board">
          <div className="restaurant-board__intro">
            <Utensils />
            <h3>Restaurant booking priority</h3>
            <p>Book Seabird, Floating World and Fi’lia first. Keep Deluxe and The Perch as practical “gaps” between pool, beach and kids club.</p>
          </div>
          <div className="restaurant-table" role="table" aria-label="Restaurant booking recommendations">
            {restaurants.map((restaurant) => (
              <article key={restaurant.name} role="row">
                <div>
                  <strong>{restaurant.name}</strong>
                  <span>{restaurant.cuisine}</span>
                </div>
                <div>{restaurant.bestFor}</div>
                <div><Pill tone={restaurant.book === "Very high" ? "coral" : restaurant.book === "High" ? "green" : "sand"}>{restaurant.book}</Pill></div>
                <p>{restaurant.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="packing" className="packing-section container">
        <div className="packing-image">
          <img src={suiteDetailImage} alt="Real SLS The Red Sea suite detail photograph" />
        </div>
        <div className="packing-panel">
          <SectionHeader eyebrow="Checklist" title="Add whatever you want">
            Yes — you can add checklist items here. For now they persist during the browser session; if you want permanent multi-device sync later, we can upgrade the app.
          </SectionHeader>
          <div className="progress-shell" aria-label={`Packing progress ${progress}%`}>
            <div className="progress-shell__bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="add-checklist">
            <input value={newItem} placeholder="Add item: e.g., kids goggles, stroller, rash guards" onChange={(event) => setNewItem(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addChecklistItem(); }} />
            <select value={newGroup} onChange={(event) => setNewGroup(event.target.value as ChecklistGroup)}>
              {(["Kids", "Travel", "Beach", "Room", "Dining"] as ChecklistGroup[]).map((group) => <option key={group} value={group}>{group}</option>)}
            </select>
            <button onClick={addChecklistItem}><Plus size={16} /> Add item</button>
          </div>
          <div className="checklist-grid">
            {checklistItems.map((item) => (
              <ChecklistRow key={item.id} item={item} checked={checked.includes(item.id)} onToggle={() => toggleItem(item.id)} onRemove={() => removeChecklistItem(item.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="notes-section container">
        <SectionHeader eyebrow="Assumptions" title="What I treated as true">
          The Booking.com page did not render usable content in the automated browser, so the app relies on official SLS, Accor, Visit Red Sea, Red Sea Global and Four Seasons pages for live planning details.
        </SectionHeader>
        <div className="notes-grid">
          <article><ShieldCheck /><p>Private reservation details remain outside the family-facing app.</p></article>
          <article><ShieldCheck /><p>“Indulge 2-Bedroom Suite” is the user-confirmed room name; the official SLS page may label a similar category as Euphoria, while Accor lists Indulge.</p></article>
          <article><ShieldCheck /><p>Restaurant and activity operating times should be confirmed with SLS concierge before arrival.</p></article>
        </div>
      </section>

      <footer className="trip-footer">
        <p>With warm regards from ESH</p>
      </footer>
    </main>
  );
}

function SunMediumIcon() {
  return <Sparkles size={17} />;
}
