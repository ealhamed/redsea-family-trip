import { useMemo, useState } from "react";
import { ArrowLeft, Baby, CalendarDays, Clock3, Plus, ShieldCheck, Sparkles, Trash2, Utensils, Waves, Sailboat, Film } from "lucide-react";
import { Link } from "wouter";

/**
 * Design philosophy: Red Sea Coral Atlas.
 * This dedicated command-center page is intentionally denser than the home page: compact type,
 * two always-visible Kids/Parents tracks, warm sand cards, coral urgency markers, and no horizontal scrolling.
 */

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

const days = ["Wed", "Thu", "Fri", "Sat"] as ScheduleBlock["day"][];
const dayStartHour = 7;
const dayEndHour = 23;
const hourMarks = Array.from({ length: dayEndHour - dayStartHour + 1 }, (_, index) => dayStartHour + index);
const timelineMinuteRem = 0.075;
const minimumCardRem = 4.75;

function formatHour(hour: number) {
  if (hour === 12) return "12 PM";
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesFromDayStart(time: string) {
  return Math.max(0, timeToMinutes(time) - dayStartHour * 60);
}

function blockDurationMinutes(block: ScheduleBlock) {
  return Math.max(15, timeToMinutes(block.endTime) - timeToMinutes(block.startTime));
}

const defaultSchedule: ScheduleBlock[] = [
  { id: "wed-breakfast", day: "Wed", startTime: "07:30", endTime: "08:15", calendar: "Both", title: "Home breakfast", note: "Keep the morning simple before airport movement." },
  { id: "wed-flight", day: "Wed", startTime: "10:35", endTime: "12:30", calendar: "Both", title: "RUH → RSI flight", note: "Non-stop flight into Red Sea International Airport." },
  { id: "wed-transfer", day: "Wed", startTime: "12:30", endTime: "14:00", calendar: "Both", title: "Arrival + transfer", note: "Transfer to SLS via Shura causeway; keep lunch flexible." },
  { id: "wed-lunch", day: "Wed", startTime: "14:00", endTime: "15:00", calendar: "Both", title: "Late lunch / room snacks", note: "Use Deluxe, in-room dining, or a light first meal depending on arrival energy." },
  { id: "wed-room", day: "Wed", startTime: "15:00", endTime: "16:30", calendar: "Both", title: "Suite reset", note: "Unpack, assign sleeping zones, and set beach kit by the door." },
  { id: "wed-pool", day: "Wed", startTime: "16:45", endTime: "17:45", calendar: "Both", title: "Easy pool orientation", note: "Short first swim so the kids understand the resort without overloading the day." },
  { id: "wed-dinner", day: "Wed", startTime: "18:30", endTime: "20:00", calendar: "Both", title: "Fi’lia family dinner", note: "Comfortable first-night Italian table; confirm reservation timing." },
  { id: "thu-breakfast", day: "Thu", startTime: "07:30", endTime: "08:30", calendar: "Both", title: "Breakfast", note: "Anchor the day before heat and activities build up." },
  { id: "thu-pool", day: "Thu", startTime: "09:00", endTime: "10:15", calendar: "Both", title: "Pool + beach block", note: "Main water window before the day gets hot." },
  { id: "thu-kids", day: "Thu", startTime: "10:30", endTime: "12:30", calendar: "Kids", title: "Kids’ Club", note: "Workshops, crafts, outdoor games, or pool games depending on the daily programme." },
  { id: "thu-parents", day: "Thu", startTime: "10:30", endTime: "12:30", calendar: "Parents", title: "Ciel Spa / padel", note: "Parents can stack a wellness or active block while kids are supervised." },
  { id: "thu-lunch", day: "Thu", startTime: "13:00", endTime: "14:00", calendar: "Both", title: "Lunch reset", note: "Use The Perch, Deluxe, or a nearby restaurant only if access is confirmed." },
  { id: "thu-rest", day: "Thu", startTime: "14:00", endTime: "16:00", calendar: "Both", title: "Suite quiet time", note: "Intentional gap for showers, naps, screens, and heat avoidance." },
  { id: "thu-family", day: "Thu", startTime: "16:30", endTime: "17:30", calendar: "Both", title: "Kayak or paddleboard", note: "Keep it low-pressure and weather-dependent." },
  { id: "thu-dinner", day: "Thu", startTime: "18:30", endTime: "20:00", calendar: "Both", title: "Dinner anchor", note: "Choose Fi’lia, Seabird, or one evaluated nearby hotel restaurant." },
  { id: "fri-breakfast", day: "Fri", startTime: "07:30", endTime: "08:30", calendar: "Both", title: "Breakfast", note: "Leave space to decide between beach, pool, or club programme." },
  { id: "fri-water", day: "Fri", startTime: "09:00", endTime: "10:30", calendar: "Both", title: "Snorkel / pool time", note: "Primary family water block; keep sunscreen and wet bags ready." },
  { id: "fri-lunch", day: "Fri", startTime: "12:30", endTime: "13:30", calendar: "Both", title: "Lunch", note: "Use a calm venue; avoid stacking too much before evening." },
  { id: "fri-gap", day: "Fri", startTime: "14:00", endTime: "16:30", calendar: "Both", title: "Open gap", note: "Deliberate white space for rest, photos, or concierge adjustments." },
  { id: "fri-kids", day: "Fri", startTime: "17:30", endTime: "19:00", calendar: "Kids", title: "Mini disco / cinema", note: "Check actual programme with concierge." },
  { id: "fri-parents", day: "Fri", startTime: "17:30", endTime: "19:00", calendar: "Parents", title: "Seabird golden hour", note: "Seafood-led dinner slot if available." },
  { id: "fri-family-dinner", day: "Fri", startTime: "19:15", endTime: "20:30", calendar: "Both", title: "Family dinner fallback", note: "Use if kids join dinner instead of separate evening programming." },
  { id: "sat-breakfast", day: "Sat", startTime: "07:30", endTime: "08:30", calendar: "Both", title: "Breakfast", note: "Final calm family meal before checkout." },
  { id: "sat-pack", day: "Sat", startTime: "08:30", endTime: "10:15", calendar: "Both", title: "Packing + room sweep", note: "Use checklist, chargers, swimwear, passports, and comfort items." },
  { id: "sat-exit", day: "Sat", startTime: "10:30", endTime: "11:30", calendar: "Both", title: "Checkout + transfer", note: "Quiet exit rhythm before RSI flight." },
  { id: "sat-flight", day: "Sat", startTime: "13:15", endTime: "15:10", calendar: "Both", title: "RSI → RUH flight", note: "Return flight home." },
];

const experiences = [
  { title: "Kids’ Club", tag: "Kids 5–11", priority: "Book daily slots early", detail: "Anchor parents-only windows.", icon: Baby },
  { title: "Teens’ Club", tag: "Ages 12–15", priority: "Parallel plans", detail: "Gaming, sport, and supervised activities.", icon: Sparkles },
  { title: "Ciel Spa", tag: "Parents", priority: "Reserve ahead", detail: "Use while kids are supervised.", icon: ShieldCheck },
  { title: "Water sports", tag: "Family", priority: "Weather-dependent", detail: "Kayak, snorkel, or paddleboard.", icon: Waves },
  { title: "Shura Links", tag: "Golf", priority: "Optional", detail: "One grown-up non-beach block.", icon: Sailboat },
  { title: "Open-air cinema", tag: "Evening", priority: "Low-energy", detail: "Easy night after an active day.", icon: Film },
];

const restaurants = [
  { title: "Fi’lia · SLS", tag: "Both", priority: "Family dinner", detail: "Comfortable Italian table.", icon: Utensils },
  { title: "Seabird · SLS", tag: "Parents", priority: "Golden hour", detail: "Seafood-led special-night choice.", icon: Utensils },
  { title: "Floating World · SLS", tag: "Parents", priority: "Adults", detail: "Japanese-influenced quieter slot.", icon: Utensils },
  { title: "The Perch · SLS", tag: "Both", priority: "Pool lunch", detail: "Convenient daytime option.", icon: Utensils },
];

function calendarForTag(tag: string): ScheduleCalendar {
  const normalized = tag.toLowerCase();
  if (normalized.includes("parent") || normalized.includes("golf") || normalized === "parents") return "Parents";
  if (normalized.includes("kids") || normalized.includes("teens")) return "Kids";
  return "Both";
}

function TrackCard({ block, lane, onRemove }: { block: ScheduleBlock; lane: "Kids" | "Parents"; onRemove: (id: string) => void }) {
  const shared = block.calendar === "Both";
  const startRem = minutesFromDayStart(block.startTime) * timelineMinuteRem;
  const heightRem = Math.max(blockDurationMinutes(block) * timelineMinuteRem - 0.35, minimumCardRem);
  return (
    <article
      className={`command-card command-card--${shared ? "both" : lane.toLowerCase()}`}
      style={{ top: `${startRem}rem`, height: `${heightRem}rem` }}
    >
      <button onClick={() => onRemove(block.id)} aria-label={`Remove ${block.title}`}><Trash2 size={12} /></button>
      <span>{block.startTime}–{block.endTime}</span>
      <strong>{block.title}</strong>
      <em>{shared ? "Both" : lane}</em>
      <p>{block.note}</p>
    </article>
  );
}

function QuickAddMini({ item, selectedDay, onAdd }: { item: { title: string; tag: string; detail: string }; selectedDay: ScheduleBlock["day"]; onAdd: (block: Omit<ScheduleBlock, "id">) => void }) {
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:30");
  const [calendar, setCalendar] = useState<ScheduleCalendar>(() => calendarForTag(item.tag));

  return (
    <div className="command-quick-add">
      <input aria-label={`Start ${item.title}`} type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
      <input aria-label={`End ${item.title}`} type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
      <select aria-label={`Calendar ${item.title}`} value={calendar} onChange={(event) => setCalendar(event.target.value as ScheduleCalendar)}>
        {(["Both", "Kids", "Parents"] as ScheduleCalendar[]).map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <button onClick={() => onAdd({ day: selectedDay, startTime, endTime, calendar, title: item.title, note: item.detail })}><Plus size={12} /> Add</button>
    </div>
  );
}

export default function ScheduleCommand() {
  const [selectedDay, setSelectedDay] = useState<ScheduleBlock["day"]>("Thu");
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>(defaultSchedule);
  const [activityForm, setActivityForm] = useState({ startTime: "11:00", endTime: "12:00", calendar: "Both" as ScheduleCalendar, title: "", note: "" });

  const dayBlocks = useMemo(
    () => scheduleBlocks.filter((block) => block.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime) || a.endTime.localeCompare(b.endTime)),
    [scheduleBlocks, selectedDay],
  );

  const kidsBlocks = dayBlocks.filter((block) => block.calendar === "Both" || block.calendar === "Kids");
  const parentsBlocks = dayBlocks.filter((block) => block.calendar === "Both" || block.calendar === "Parents");
  const timelineHeightRem = (dayEndHour - dayStartHour) * 60 * timelineMinuteRem;

  const addBlockToSchedule = (block: Omit<ScheduleBlock, "id">) => {
    const safeEndTime = block.endTime > block.startTime ? block.endTime : block.startTime;
    setScheduleBlocks((current) => [...current, { ...block, endTime: safeEndTime, id: `activity-${Date.now()}-${Math.random().toString(16).slice(2)}` }]);
  };

  const addManualBlock = () => {
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

  const removeBlock = (id: string) => setScheduleBlocks((current) => current.filter((block) => block.id !== id));

  return (
    <main className="trip-app command-page">
      <header className="command-hero container">
        <Link href="/" className="command-back"><ArrowLeft size={15} /> Back to trip page</Link>
        <div>
          <p className="command-eyebrow"><CalendarDays size={15} /> Family schedule</p>
          <h1>Activities command center</h1>
          <p>Compact two-column view for Kids and Parents. Shared family items appear in both lanes so the phone view stays readable without left/right scrolling.</p>
        </div>
      </header>

      <section className="command-shell container" aria-label="Schedule command center">
        <div className="command-toolbar">
          <div className="command-days" aria-label="Choose day">
            {days.map((day) => <button key={day} className={selectedDay === day ? "active" : ""} onClick={() => setSelectedDay(day)}>{day}</button>)}
          </div>
          <div className="command-manual-add">
            <input type="time" aria-label="Beginning time" value={activityForm.startTime} onChange={(event) => setActivityForm((current) => ({ ...current, startTime: event.target.value }))} />
            <input type="time" aria-label="End time" value={activityForm.endTime} onChange={(event) => setActivityForm((current) => ({ ...current, endTime: event.target.value }))} />
            <select aria-label="Calendar assignment" value={activityForm.calendar} onChange={(event) => setActivityForm((current) => ({ ...current, calendar: event.target.value as ScheduleCalendar }))}>
              {(["Both", "Kids", "Parents"] as ScheduleCalendar[]).map((calendar) => <option key={calendar} value={calendar}>{calendar}</option>)}
            </select>
            <input placeholder="Activity" value={activityForm.title} onChange={(event) => setActivityForm((current) => ({ ...current, title: event.target.value }))} />
            <input placeholder="Note" value={activityForm.note} onChange={(event) => setActivityForm((current) => ({ ...current, note: event.target.value }))} />
            <button onClick={addManualBlock}><Plus size={13} /> Add</button>
          </div>
        </div>

        <div className="command-day-board">
          <aside className="command-hour-rail" aria-label={`Fixed hour timeline for ${selectedDay}`}>
            <strong>{selectedDay}</strong>
            <div className="command-hour-map" style={{ height: `${timelineHeightRem}rem` }}>
              {hourMarks.map((hour) => (
                <span key={hour} style={{ top: `${(hour - dayStartHour) * 60 * timelineMinuteRem}rem` }}>{formatHour(hour)}</span>
              ))}
            </div>
          </aside>
          <div className="command-two-track">
            <section className="command-track command-track--kids" aria-label="Kids schedule">
              <h2><Baby size={15} /> Kids</h2>
              <div className="command-track-timebox" style={{ height: `${timelineHeightRem}rem` }}>
                {kidsBlocks.map((block) => <TrackCard key={`kids-${block.id}`} block={block} lane="Kids" onRemove={removeBlock} />)}
              </div>
            </section>
            <section className="command-track command-track--parents" aria-label="Parents schedule">
              <h2><ShieldCheck size={15} /> Parents</h2>
              <div className="command-track-timebox" style={{ height: `${timelineHeightRem}rem` }}>
                {parentsBlocks.map((block) => <TrackCard key={`parents-${block.id}`} block={block} lane="Parents" onRemove={removeBlock} />)}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="command-ideas container" aria-label="Activity ideas">
        <div className="command-section-title">
          <Clock3 />
          <div>
            <h2>Fast activity add-ons</h2>
            <p>Small cards to keep the page light: choose a slot, assign a calendar, then add.</p>
          </div>
        </div>
        <div className="command-idea-grid">
          {[...experiences, ...restaurants].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="command-idea-card">
                <Icon size={16} />
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <strong>{item.priority}</strong>
                <p>{item.detail}</p>
                <QuickAddMini item={item} selectedDay={selectedDay} onAdd={addBlockToSchedule} />
              </article>
            );
          })}
        </div>
      </section>

      <footer className="trip-footer">
        <p>With warm regards from ESH</p>
      </footer>
    </main>
  );
}
