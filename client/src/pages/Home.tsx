import { useMemo, useState } from "react";
import {
  Baby,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Hotel,
  Luggage,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Waves,
} from "lucide-react";

/**
 * Design philosophy: Red Sea Expedition Modernism.
 * This page must feel like a private premium travel folio: asymmetric cards, boarding-pass details,
 * reef-green/sand/coral palette, clear family logistics, tactile paper texture, and private reservation details omitted.
 * Every choice should reinforce a calm, practical family command center rather than a generic travel page.
 */

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028547766/WW7AUTPiEtxKoCQnX8DPsM/redsea-family-hero-Sht8YPKt3GCELHLCR3aeJ7.webp";
const routeImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028547766/WW7AUTPiEtxKoCQnX8DPsM/redsea-route-card-mJYKkigsmagtyjBpeWsiPd.webp";
const suiteImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028547766/WW7AUTPiEtxKoCQnX8DPsM/sls-basecamp-suite-FZNJyUzPYEX68CjuRNUhk2.webp";
const checklistImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028547766/WW7AUTPiEtxKoCQnX8DPsM/kids-redsea-checklist-gnfXXae2b84F7WFCMSHLR5.webp";

type ChecklistItem = {
  id: string;
  label: string;
  group: "Kids" | "Travel" | "Beach" | "Room";
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
      "Leave home with extra airport buffer.",
      "Land at RSI around 12:30 and transfer to SLS Red Sea.",
      "Keep the afternoon light: check-in, unpack, early dinner, kids wind-down.",
    ],
  },
  {
    date: "Thu 14 May",
    title: "Lagoon day",
    tone: "Easy family rhythm",
    items: [
      "Breakfast, sunscreen, hats, and swim gear ready before leaving the suite.",
      "Beach or pool block before peak heat.",
      "Quiet room break after lunch, then sunset walk or relaxed dinner.",
    ],
  },
  {
    date: "Fri 15 May",
    title: "Memory day",
    tone: "Flexible adventure",
    items: [
      "Choose one main family activity only; keep the rest flexible.",
      "Capture family photos before everyone is tired.",
      "Pack part of the luggage at night so Saturday is calm.",
    ],
  },
  {
    date: "Sat 16 May",
    title: "Checkout + return",
    tone: "Smooth exit",
    items: [
      "Final room sweep: chargers, passports/IDs, swimwear, medicine kit.",
      "Head to RSI with time for kids and airport movement.",
      "Return flight departs 13:15 and lands in Riyadh around 15:10.",
    ],
  },
];

const checklist: ChecklistItem[] = [
  { id: "ids", label: "IDs / passports / booking reference", group: "Travel" },
  { id: "boarding", label: "Boarding passes ready on phones", group: "Travel" },
  { id: "charger", label: "Chargers + power banks", group: "Travel" },
  { id: "hats", label: "Kids hats and light clothes", group: "Kids" },
  { id: "snacks", label: "Flight snacks and water bottles", group: "Kids" },
  { id: "medicine", label: "Basic medicine kit", group: "Kids" },
  { id: "sunscreen", label: "Sunscreen and after-sun care", group: "Beach" },
  { id: "goggles", label: "Swim goggles and sandals", group: "Beach" },
  { id: "wetbag", label: "Wet bag for swimwear", group: "Beach" },
  { id: "sleep", label: "Bedtime items / comfort toys", group: "Room" },
  { id: "laundry", label: "Laundry pouch", group: "Room" },
  { id: "room-sweep", label: "Checkout room sweep list", group: "Room" },
];

const quickNotes = [
  "Private reservation details are kept out of the family view.",
  "Two-bedroom suite: plan adult/kid sleeping zones before arrival.",
  "Keep each day to one main activity; the win is a calm family rhythm.",
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

function ChecklistRow({ item, checked, onToggle }: { item: ChecklistItem; checked: boolean; onToggle: () => void }) {
  return (
    <button className={`check-row ${checked ? "check-row--done" : ""}`} onClick={onToggle}>
      <span className="check-row__box">{checked ? <Check size={14} /> : null}</span>
      <span>{item.label}</span>
      <em>{item.group}</em>
    </button>
  );
}

export default function Home() {
  const [checked, setChecked] = useState<string[]>(["ids", "boarding"]);

  const progress = useMemo(() => Math.round((checked.length / checklist.length) * 100), [checked.length]);

  const toggleItem = (id: string) => {
    setChecked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <main className="trip-app">
      <section className="hero-shell">
        <img src={heroImage} alt="Red Sea coastline with a private family travel folio" />
        <div className="hero-overlay" />
        <nav className="topbar" aria-label="Trip overview navigation">
          <a href="#flights">Flights</a>
          <a href="#hotel">Hotel</a>
          <a href="#plan">Plan</a>
          <a href="#packing">Packing</a>
        </nav>
        <div className="hero-content">
          <div className="hero-copy">
            <Pill tone="coral">Private family folio</Pill>
            <h1>Red Sea family trip command center</h1>
            <p>
              A calm, mobile-friendly place for the family’s flights, SLS Red Sea stay, daily rhythm,
              packing list, and quick notes. Private booking details are intentionally kept out of view.
            </p>
            <div className="hero-actions">
              <a href="#today" className="primary-link">Start with what matters</a>
              <a href="#packing" className="secondary-link">Check packing</a>
            </div>
          </div>
          <aside className="hero-ticket" aria-label="Trip snapshot">
            <div className="stamp">13–16 May 2026</div>
            <h2>RUH → RSI</h2>
            <p>3-night family stay · SLS Red Sea · Indulge 2-Bedroom Suite</p>
            <div className="ticket-grid">
              <span><CalendarDays size={16} /> Wed–Sat</span>
              <span><Hotel size={16} /> 2-bedroom suite</span>
              <span><Waves size={16} /> Red Sea basecamp</span>
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
          <p>Indulge 2-Bedroom Suite. Keep room zones simple: sleep, beach, reset.</p>
        </article>
        <article>
          <Luggage />
          <span>Readiness</span>
          <strong>{progress}% packed</strong>
          <p>Use the checklist below to keep the final night easy.</p>
        </article>
      </section>

      <section id="flights" className="route-section container">
        <div className="route-visual">
          <img src={routeImage} alt="Illustrated Riyadh to Red Sea route card" />
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
          <div className="hotel-card__image">
            <img src={suiteImage} alt="Luxury two-bedroom suite facing the Red Sea" />
          </div>
          <div className="hotel-card__content">
            <Pill tone="green">Family basecamp</Pill>
            <h2>SLS Red Sea</h2>
            <p>
              Booked from <strong>Wednesday, 13 May 2026</strong> to <strong>Saturday, 16 May 2026</strong> in an
              <strong> Indulge 2-Bedroom Suite</strong>. This section is designed for stay logistics only.
            </p>
            <div className="hotel-details">
              <span><Baby size={17} /> Assign sleeping zones early</span>
              <span><SunMedium size={17} /> Prepare sun kit by the door</span>
              <span><Sparkles size={17} /> Keep one calm reset block daily</span>
            </div>
          </div>
        </div>
      </section>

      <section id="plan" className="plan-section container">
        <SectionHeader eyebrow="Family rhythm" title="A practical 4-day outline">
          This is intentionally light. The goal is to reduce decisions during the trip, not over-schedule the family.
        </SectionHeader>
        <div className="day-grid">
          {days.map((day, index) => (
            <DayCard key={day.date} day={day} index={index} />
          ))}
        </div>
      </section>

      <section id="packing" className="packing-section container">
        <div className="packing-image">
          <img src={checklistImage} alt="Family Red Sea packing flat lay" />
        </div>
        <div className="packing-panel">
          <SectionHeader eyebrow="Packing" title="Family readiness board">
            Mark items as done before leaving home and again on the last night before checkout.
          </SectionHeader>
          <div className="progress-shell" aria-label={`Packing progress ${progress}%`}>
            <div className="progress-shell__bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="checklist-grid">
            {checklist.map((item) => (
              <ChecklistRow key={item.id} item={item} checked={checked.includes(item.id)} onToggle={() => toggleItem(item.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="notes-section container">
        <SectionHeader eyebrow="Family notes" title="What should be on the app">
          The app should stay focused on decisions the family will actually need during the trip.
        </SectionHeader>
        <div className="notes-grid">
          {quickNotes.map((note) => (
            <article key={note}>
              <ShieldCheck />
              <p>{note}</p>
            </article>
          ))}
        </div>
        <div className="recommendation-card">
          <h3>Recommended app modules</h3>
          <p>
            Keep the first version to six modules: trip snapshot, flights, hotel basecamp, daily plan, packing checklist,
            and family notes/emergency reminders. If you later want a richer version, add maps, photo memories, kids’ missions,
            and a private share link for your wife.
          </p>
        </div>
      </section>

      <footer className="trip-footer">
        <p>With warm regards from ESH</p>
      </footer>
    </main>
  );
}
