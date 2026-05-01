# Shared BOTH-card schedule validation

The schedule update was validated after rendering activities tagged `Both` as a single cross-column card and expanding the time scale from 4.5rem/hour to 6.3rem/hour.

| Check | Result |
|---|---:|
| TypeScript validation | Passed via `pnpm check` |
| Production build | Passed via `pnpm build` |
| Browser widths tested | 320, 360, 390, 430 px |
| Horizontal overflow | 0 px at every tested width |
| Cards rendered on selected day | 8 total |
| Shared BOTH cards | 6 cards rendered once each |
| Shared-card span | 100% of combined Kids + Parents timebox |
| Lunch reset to Suite quiet time visual gap | 5.6 px, no overlap |
| Maximum start-time alignment variance | 1 px, attributable to border-box rendering |

The verified behavior matches the requested direction: shared family activities now spread across both columns, while the timeline remains aligned to the left rail and the expanded vertical scale provides more content room per card.
