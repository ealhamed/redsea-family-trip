import { useMemo, useState } from "react";
import {
  Baby,
  CalendarDays,
  Check,
  Clock3,
  Film,
  Hotel,
  Luggage,
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
 * Design philosophy: Red Sea Coral Atlas.
 * The page follows one chronological family-trip sequence: Flight, Hotel, Hotel Facilities,
 * Hotel Activities and Schedule, then Checklist. Redundancy is intentionally removed so the app
 * feels like a practical Red Sea command center rather than a long promotional page.
 */

const heroImage = "/manus-storage/shura-island-aerial_a7dc46b4.jpg";
const routeImage = "/manus-storage/tes4LOQdHCzj_c74d3079.jpg";
const suiteImage = "/manus-storage/sls-redsea-bedroom_7cceef22.jpg";
const suiteDetailImage = "/manus-storage/sls-redsea-suite-bedroom_dd3f74e9.jpg";
const terraceImage = "/manus-storage/sls-redsea-bath-terrace_e67a4ad5.jpg";

type ChecklistGroup = "Kids" | "Travel" | "Beach" | "Room" | "Dining";

type ChecklistItem = {
  id: string;
  label: string;
  group: ChecklistGroup;
};

type ScheduleCalendar = "Both" | "Kids" | "Parents";

type ScheduleBlock = {
  id: string;
  day: "Wed" | "Thu" | "Fri" | "Sat";
  startTime: string;
  endTime: string;
  calendar: ScheduleCalendar;
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

const hotelFacilities = [
  {
    title: "Indulge 2-Bedroom Suite",
    detail: "Use the suite as the family basecamp: sleeping zones, luggage zone, sun kit near the door, and a calm reset space between activities.",
    icon: Hotel,
  },
  {
    title: "Kids’ Club + Teens’ Club",
    detail: "Confirm the daily programme on arrival, then use supervised blocks to stack kids’ activities with parents’ plans.",
    icon: Baby,
  },
  {
    title: "Ciel Spa + wellness",
    detail: "Good candidate for a parents-only block while the kids are in club activities or resting after lunch.",
    icon: ShieldCheck,
  },
  {
    title: "Beach, pool + water gear",
    detail: "Keep morning water time light and weather-aware. Pack sunscreen, goggles, sandals and wet bags before leaving the suite.",
    icon: Waves,
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
  { id: "wed-arrive", day: "Wed", startTime: "12:30", endTime: "13:30", calendar: "Both", title: "Arrive RSI", note: "Transfer to SLS via Shura causeway." },
  { id: "wed-room", day: "Wed", startTime: "15:00", endTime: "16:30", calendar: "Both", title: "Suite reset", note: "Unpack, assign sleeping zones, keep evening easy." },
  { id: "wed-dinner", day: "Wed", startTime: "18:30", endTime: "20:00", calendar: "Both", title: "Fi’lia or Deluxe", note: "Simple first-night dinner; family-friendly Italian or light bites." },
  { id: "thu-kids", day: "Thu", startTime: "10:30", endTime: "12:30", calendar: "Kids", title: "Kids’ Club", note: "Workshops, crafts, outdoor games, or pool games depending on the daily programme." },
  { id: "thu-parents", day: "Thu", startTime: "10:30", endTime: "12:30", calendar: "Parents", title: "Ciel Spa / padel", note: "Parents can stack a wellness or active block while kids are supervised." },
  { id: "thu-family", day: "Thu", startTime: "16:30", endTime: "17:30", calendar: "Both", title: "Kayak or paddleboard", note: "Keep it low-pressure and weather-dependent." },
  { id: "fri-kids", day: "Fri", startTime: "17:30", endTime: "19:00", calendar: "Kids", title: "Mini disco / cinema", note: "Check actual programme with concierge." },
  { id: "fri-parents", day: "Fri", startTime: "17:30", endTime: "19:00", calendar: "Parents", title: "Seabird golden hour", note: "Seafood-led dinner slot if available." },
  { id: "sat-exit", day: "Sat", startTime: "10:30", endTime: "11:30", calendar: "Both", title: "Room sweep + checkout", note: "Quiet exit rhythm before RSI flight." },
];

const experiences = [
  {
    title: "Kids’ Club",
    tag: "Kids 5–11",
    priority: "Book daily slots early",
    detail: "Use this as the anchor for parents-only windows, especially late morning or late afternoon.",
    icon: Baby,
  },
  {
    title: "Teens’ Club",
    tag: "Ages 12–15",
    priority: "Useful for parallel plans",
    detail: "Gaming, sports and tailored activity blocks can run beside adults’ spa, padel or dining plans.",
    icon: Sparkles,
  },
  {
    title: "Ciel Spa",
    tag: "Parents",
    priority: "Reserve ahead",
    detail: "Best used while kids are supervised or after a low-energy family lunch.",
    icon: ShieldCheck,
  },
  {
    title: "Water sports",
    tag: "Family",
    priority: "Weather-dependent",
    detail: "Kayak, snorkel or paddleboard as one focused family block rather than several fragmented activities.",
    icon: Waves,
  },
  {
    title: "Shura Links",
    tag: "Golf",
    priority: "Book if desired",
    detail: "A grown-up window if you want one major non-beach activity during the stay.",
    icon: Sailboat,
  },
  {
    title: "Open-air cinema",
    tag: "Evening",
    priority: "Low-energy option",
    detail: "Good after an active day when the family needs an easy evening plan.",
    icon: Film,
  },
];

const restaurants = [
  { name: "Fi’lia", cuisine: "Italian", bestFor: "First night / family table", book: "High", note: "Comfortable family option: handmade pasta, wood-fired pizza and easy sharing." },
  { name: "Seabird", cuisine: "Seafood, Spanish-Portuguese", bestFor: "Golden-hour dinner", book: "Very high", note: "Strong choice for a special seafood-led evening." },
  { name: "Floating World", cuisine: "Japanese-influenced", bestFor: "Parents’ dinner", book: "High", note: "Best kept for a quieter adults’ slot if kids are covered." },
  { name: "The Perch", cuisine: "Poolside refreshments", bestFor: "Afternoon reset", book: "Medium", note: "Useful between pool, beach and kids club transitions." },
  { name: "Deluxe", cuisine: "Café, pastries, light bites", bestFor: "Casual gaps", book: "Low", note: "Good for coffee, snacks and practical family downtime." },
];

const nearbyHotels = [
  {
    property: "SLS The Red Sea",
    tag: "Your hotel",
    tone: "sls",
    headline: "Keep this as the family basecamp.",
    bestFor: "Pools, Ciel Spa, beach time, gym, and the five SLS dining venues without leaving your home base.",
    action: "Ask concierge on arrival to map Kids’ Club, spa, pool and dinner windows into one simple family rhythm.",
    highlights: ["Three pools including rooftop options", "24/7 gym and spa", "Fi’lia, Seabird, Floating World, The Perch, Deluxe"],
  },
  {
    property: "The Red Sea EDITION",
    tag: "Nearby",
    tone: "edition",
    headline: "Use it for one stylish off-base dining moment.",
    bestFor: "Jiwa Beach Club for an evening couple plan, Jiwa Terrace for poolside lunch, Central for an easy three-meal fallback, and Lobby for tea or an evening lounge feel.",
    action: "Reserve ahead through concierge, especially for Jiwa Beach Club or any evening slot.",
    highlights: ["Jiwa Beach Club: Southeast Asian evening energy", "Jiwa Terrace: Indonesian poolside lunch", "Lobby: Aperi-Tea and weekend reception"],
  },
  {
    property: "InterContinental Red Sea Resort",
    tag: "Nearby",
    tone: "intercontinental",
    headline: "Best for variety if you want another resort stop.",
    bestFor: "Chimes for Mediterranean poolside dining, Darein for Levantine-Moroccan comfort, Murrma for coffee and sweets, with Ardo and The 305 to verify if open during the stay.",
    action: "Ask SLS concierge to confirm cross-resort access and current opening status before adding it to the day plan.",
    highlights: ["Chimes: Mediterranean poolside", "Darein: Levantine-Moroccan", "Murrma: specialty coffee and sweets"],
  },
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

function calendarForTag(tag: string): ScheduleCalendar {
  if (tag.toLowerCase().includes("parent") || tag.toLowerCase().includes("golf")) return "Parents";
  if (tag.toLowerCase().includes("kids") || tag.toLowerCase().includes("teens")) return "Kids";
  return "Both";
}

function QuickAddActivity({ experience, selectedDay, onAdd }: { experience: (typeof experiences)[number]; selectedDay: ScheduleBlock["day"]; onAdd: (block: Omit<ScheduleBlock, "id">) => void }) {
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:30");
  const [calendar, setCalendar] = useState<ScheduleCalendar>(() => calendarForTag(experience.tag));

  const quickAdd = () => {
    onAdd({
      day: selectedDay,
      startTime,
      endTime,
      calendar,
      title: experience.title,
      note: experience.detail,
    });
  };

  return (
    <div className="quick-add-panel" aria-label={`Quick add ${experience.title}`}>
      <div className="quick-add-panel__label">Quick add</div>
      <label>
        <span>Begins</span>
        <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
      </label>
      <label>
        <span>Ends</span>
        <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
      </label>
      <label>
        <span>Calendar</span>
        <select value={calendar} onChange={(event) => setCalendar(event.target.value as ScheduleCalendar)}>
          {(["Both", "Kids", "Parents"] as ScheduleCalendar[]).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <button onClick={quickAdd}><Plus size={15} /> Add</button>
    </div>
  );
}

function ScheduleColumn({ label, blocks, onRemove }: { label: "Kids" | "Parents"; blocks: ScheduleBlock[]; onRemove: (id: string) => void }) {
  const visibleBlocks = blocks.filter((block) => block.calendar === "Both" || block.calendar === label);

  return (
    <div className={`schedule-column schedule-column--${label.toLowerCase()}`}>
      <h3>{label}</h3>
      {visibleBlocks.length === 0 ? <p className="schedule-empty">No blocks yet. Use quick add below.</p> : null}
      {visibleBlocks.map((block) => (
        <article key={`${label}-${block.id}`} className={`schedule-block calendar-${block.calendar.toLowerCase()}`}>
          <button onClick={() => onRemove(block.id)} aria-label={`Remove ${block.title}`}><Trash2 size={14} /></button>
          <span>{block.startTime}–{block.endTime}</span>
          <strong>{block.title}</strong>
          <em>{block.calendar === "Both" ? "Both calendars" : `${block.calendar} only`}</em>
          <p>{block.note}</p>
        </article>
      ))}
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
  const [activityForm, setActivityForm] = useState({ startTime: "11:00", endTime: "12:00", calendar: "Both" as ScheduleCalendar, title: "", note: "" });

  const progress = useMemo(() => {
    if (checklistItems.length === 0) return 0;
    return Math.round((checked.length / checklistItems.length) * 100);
  }, [checked.length, checklistItems.length]);

  const dayBlocks = useMemo(
    () => scheduleBlocks.filter((block) => block.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime) || a.endTime.localeCompare(b.endTime)),
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
    addBlockToSchedule({
      day: selectedDay,
      startTime: activityForm.startTime,
      endTime: activityForm.endTime,
      calendar: activityForm.calendar,
      title,
      note: activityForm.note.trim() || "Flexible block — confirm details later.",
    });
    setActivityForm((current) => ({ ...current, title: "", note: "" }));
  };

  const addBlockToSchedule = (block: Omit<ScheduleBlock, "id">) => {
    const safeEndTime = block.endTime > block.startTime ? block.endTime : block.startTime;
    setScheduleBlocks((current) => [
      ...current,
      {
        ...block,
        endTime: safeEndTime,
        id: `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      },
    ]);
  };

  const removeScheduleBlock = (id: string) => {
    setScheduleBlocks((current) => current.filter((block) => block.id !== id));
  };

  return (
    <main className="trip-app">
      <section className="hero-shell real-photo-hero">
        <img src={heroImage} alt="Aerial real photograph of Shura Island and the Red Sea resort coastline" />
        <div className="hero-overlay" />
        <nav className="topbar" aria-label="Trip chronology navigation">
          <a href="#flights">Flight</a>
          <a href="#hotel">Hotel</a>
          <a href="#nearby">Explore</a>
          <a href="#facilities">Facilities</a>
          <a href="#schedule">Activities</a>
          <a href="#packing">Checklist</a>
        </nav>
        <div className="hero-content">
          <div className="hero-copy">
            <Pill tone="coral">Private family folio</Pill>
            <h1>Red Sea family trip command center</h1>
            <p>
              One clean sequence for the trip: fly to RSI, settle into the SLS Red Sea Indulge 2-Bedroom Suite, use the hotel facilities well, stack activities by family lane, then finish with the checklist.
            </p>
            <div className="hero-actions">
              <a href="#flights" className="primary-link">Start with flight</a>
              <a href="#schedule" className="secondary-link">Build schedule</a>
            </div>
          </div>
          <aside className="hero-ticket" aria-label="Trip snapshot">
            <div className="stamp">13–16 May 2026</div>
            <h2>RUH → RSI</h2>
            <p>SLS Red Sea · Indulge 2-Bedroom Suite · Shura Island</p>
            <div className="ticket-grid">
              <span><CalendarDays size={16} /> Wed–Sat</span>
              <span><Hotel size={16} /> 2-bedroom suite</span>
              <span><Waves size={16} /> Red Sea coast</span>
              <span><Luggage size={16} /> {progress}% checklist</span>
            </div>
          </aside>
        </div>
      </section>

      <section id="flights" className="route-section container chron-section">
        <div className="route-visual">
          <img src={routeImage} alt="Real SLS The Red Sea wide resort interior photograph" />
        </div>
        <div className="route-content">
          <SectionHeader eyebrow="01 · Flight" title="Riyadh to Red Sea, then back home">
            The app starts with the confirmed flight movement. Private reservation details remain outside the family view.
          </SectionHeader>
          <div className="flight-stack">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      <section id="hotel" className="hotel-section container chron-section">
        <div className="hotel-card">
          <div className="hotel-card__image hotel-card__image-stack">
            <img src={suiteImage} alt="Real SLS The Red Sea bedroom photograph" />
            <img src={suiteDetailImage} alt="Real SLS The Red Sea suite bedroom photograph" />
            <img src={terraceImage} alt="Real SLS The Red Sea bath and terrace photograph" />
          </div>
          <div className="hotel-card__content">
            <Pill tone="green">02 · Hotel</Pill>
            <h2>SLS Red Sea · Indulge 2-Bedroom Suite</h2>
            <p>
              Booked from <strong>Wednesday, 13 May 2026</strong> to <strong>Saturday, 16 May 2026</strong>. Treat the suite as the operating base: arrival reset, kids’ sleeping zones, beach kit by the door, and a calm checkout rhythm.
            </p>
            <div className="hotel-details">
              <span><Baby size={17} /> Sleeping zones</span>
              <span><Sparkles size={17} /> Sun kit station</span>
              <span><ShieldCheck size={17} /> Private family view</span>
            </div>
          </div>
        </div>
      </section>

      <section id="nearby" className="nearby-section container chron-section">
        <SectionHeader eyebrow="Hotel side quest" title="Explore nearby hotels without mixing the plan">
          Keep SLS as home base, then add one clearly tagged nearby stop only if it improves the day. Each card separates the property, why to go, and the practical concierge action.
        </SectionHeader>
        <div className="nearby-grid">
          {nearbyHotels.map((hotel) => (
            <article key={hotel.property} className={`nearby-card nearby-card--${hotel.tone}`}>
              <div className="nearby-card__top">
                <span className="nearby-card__tag">{hotel.tag}</span>
                <Hotel size={24} />
              </div>
              <h3>{hotel.property}</h3>
              <strong>{hotel.headline}</strong>
              <p>{hotel.bestFor}</p>
              <div className="nearby-card__highlights">
                {hotel.highlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>
              <div className="nearby-card__action">
                <Utensils size={17} />
                <span>{hotel.action}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="facilities" className="experiences-section facilities-section container chron-section">
        <SectionHeader eyebrow="03 · Hotel facilities" title="Use the resort like a family basecamp">
          These are the facilities that matter most for the trip rhythm: suite reset, kids’ coverage, parents’ wellness time, and water/pool movement.
        </SectionHeader>
        <div className="experience-grid">
          {hotelFacilities.map((facility) => {
            const Icon = facility.icon;
            return (
              <article key={facility.title} className="experience-card facility-card">
                <Icon />
                <h3>{facility.title}</h3>
                <p>{facility.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="schedule" className="schedule-section container chron-section">
        <SectionHeader eyebrow="04 · Hotel activities + schedule" title="One long day, split by Kids and Parents">
          Use Quick add from the activity ideas below, choose beginning and end time, then decide whether the block applies to Both, Kids only, or Parents only. Both is the default family calendar.
        </SectionHeader>
        <div className="schedule-shell">
          <div className="schedule-controls">
            {(["Wed", "Thu", "Fri", "Sat"] as ScheduleBlock["day"][]).map((day) => (
              <button key={day} className={selectedDay === day ? "active" : ""} onClick={() => setSelectedDay(day)}>{day}</button>
            ))}
          </div>
          <div className="activity-form">
            <input type="time" aria-label="Beginning time" value={activityForm.startTime} onChange={(event) => setActivityForm((current) => ({ ...current, startTime: event.target.value }))} />
            <input type="time" aria-label="End time" value={activityForm.endTime} onChange={(event) => setActivityForm((current) => ({ ...current, endTime: event.target.value }))} />
            <select aria-label="Calendar assignment" value={activityForm.calendar} onChange={(event) => setActivityForm((current) => ({ ...current, calendar: event.target.value as ScheduleCalendar }))}>
              {(["Both", "Kids", "Parents"] as ScheduleCalendar[]).map((calendar) => <option key={calendar} value={calendar}>{calendar}</option>)}
            </select>
            <input placeholder="Activity title" value={activityForm.title} onChange={(event) => setActivityForm((current) => ({ ...current, title: event.target.value }))} />
            <input placeholder="Optional note" value={activityForm.note} onChange={(event) => setActivityForm((current) => ({ ...current, note: event.target.value }))} />
            <button onClick={addScheduleBlock}><Plus size={16} /> Add</button>
          </div>
          <div className="schedule-day-board" aria-label={`${selectedDay} family schedule`}>
            <div className="schedule-time-rail">
              <strong>{selectedDay}</strong>
              <span>Morning</span>
              <span>Midday</span>
              <span>Afternoon</span>
              <span>Evening</span>
            </div>
            <ScheduleColumn label="Kids" blocks={dayBlocks} onRemove={removeScheduleBlock} />
            <ScheduleColumn label="Parents" blocks={dayBlocks} onRemove={removeScheduleBlock} />
          </div>
        </div>

        <div className="activity-shortlist">
          <div className="activity-shortlist__header">
            <Clock3 />
            <div>
              <h3>Activity ideas to add into the schedule</h3>
              <p>Keep the day light: one core family activity, one kids/parents stacked block, and one dining anchor.</p>
            </div>
          </div>
          <div className="experience-grid compact-grid">
            {experiences.map((experience) => {
              const Icon = experience.icon;
              return (
                <article key={experience.title} className="experience-card compact-card">
                  <Icon />
                  <Pill tone="sand">{experience.tag}</Pill>
                  <h3>{experience.title}</h3>
                  <strong>{experience.priority}</strong>
                  <p>{experience.detail}</p>
                  <QuickAddActivity experience={experience} selectedDay={selectedDay} onAdd={addBlockToSchedule} />
                </article>
              );
            })}
          </div>
        </div>

        <div className="restaurant-board">
          <div className="restaurant-board__intro">
            <Utensils />
            <h3>Dining anchors for the schedule</h3>
            <p>Prioritize Seabird, Floating World and Fi’lia. Use Deluxe and The Perch as flexible gaps between pool, beach and kids club.</p>
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

      <section id="packing" className="packing-section container chron-section">
        <div className="packing-image">
          <img src={suiteDetailImage} alt="Real SLS The Red Sea suite detail photograph" />
        </div>
        <div className="packing-panel">
          <SectionHeader eyebrow="05 · Checklist" title="Add whatever you want, last">
            The checklist comes after the trip plan so packing follows the actual sequence: flight, suite, facilities, and activities.
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

      <footer className="trip-footer">
        <p>With warm regards from ESH</p>
      </footer>
    </main>
  );
}
