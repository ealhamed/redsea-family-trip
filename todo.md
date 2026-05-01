# Red Sea family trip app enhancement checklist

- [ ] Access the provided Booking.com SLS Red Sea page and identify usable real imagery and relevant details for the booked Indulge 2-Bedroom Suite.
- [ ] Research SLS Red Sea official information, Booking.com details, Shura Island restaurants, resort experiences, kids club options, and activities suitable for scheduling.
- [ ] Record sourced findings with citations and notes for implementation.
- [ ] Update the app to support user-added checklist items directly in the browser.
- [ ] Add a schedule-builder page or section that supports stacked parallel activities for parents, kids, kids club, beach/pool, dining, and flexible time blocks.
- [ ] Add a booking-priority recommendations page for Shura Island/SLS restaurants and experiences.
- [ ] Replace generated hotel/suite visuals with real hotel imagery where reliable and usable.
- [ ] Run TypeScript/build checks and verify privacy wording still excludes financial details.
- [ ] Save a checkpoint and deliver the updated app.

## Visual and product critique refinement

- [ ] Explain what can be improved in the current app experience, with direct rationale.
- [ ] Address why the current colors feel more luxury-resort than distinctly Red Sea.
- [ ] Propose a stronger Red Sea themed palette using sea blue, coral red, sand, mangrove green, and sunset amber.
- [ ] Ask for approval before applying the new visual direction unless the user asks to proceed directly.
- [ ] If approved, update global CSS and key section styling to make the app feel more Red Sea specific.

## Approved Red Sea Coral Atlas redesign

- [ ] Apply the approved Red Sea Coral Atlas palette: reef turquoise, coral red, warm sand, deep sea blue, and sunset amber.
- [ ] Reduce the current dark luxury-folio dominance so the interface reads immediately as Red Sea coastal travel.
- [ ] Update navigation, hero overlays, cards, schedule lanes, checklist elements, and booking-priority sections with the new palette.
- [ ] Preserve all real SLS/Shura imagery and avoid showing any financial details.
- [ ] Re-run TypeScript, production build, and privacy wording checks before delivery.

## Chronological simplification request

- [ ] Remove redundant repeated sections, duplicated CTAs, and repeated explanatory copy.
- [ ] Reorganize the page flow into: Flight, Hotel, Hotel Facilities, Hotel Activities and Schedule, then Checklist.
- [ ] Update top navigation labels and anchor order to match the chronological sequence.
- [ ] Keep financial and payment information hidden throughout the revised structure.
- [ ] Preserve useful functions: editable checklist, stacked schedule planning, booking-priority notes, and real SLS/Shura imagery.
- [ ] Run TypeScript, production build, and privacy wording checks before saving a checkpoint.

## iPhone 16 Pro Max mobile-first optimization

- [ ] Rework the hero section for a 430px-wide mobile viewport so the title, ticket, and actions are readable without horizontal overflow.
- [ ] Convert the top navigation into a touch-friendly horizontal rail with clear active spacing and 44px+ tap targets.
- [ ] Stack all major chronological sections vertically on mobile: Flight, Hotel, Facilities, Activities/Schedule, Checklist.
- [ ] Make the schedule builder usable on mobile by simplifying form controls, lane cards, and delete buttons.
- [ ] Ensure checklist rows, inputs, select controls, and add buttons are thumb-friendly.
- [ ] Reduce oversized typography and card padding on small screens while preserving Red Sea Coral Atlas visual identity.
- [ ] Run TypeScript, production build, and privacy wording checks before saving a checkpoint.

## Better SLS visual and nearby hotel exploration

- [x] Replace the weak cropped lounge/wall image with a stronger real SLS lobby, wide resort, arrival, pool, or hotel exterior image.
- [x] Research official or reliable information for SLS Red Sea, The Red Sea EDITION, and InterContinental Red Sea Resort.
- [x] Add a nearby-hotel exploration section that clearly tags recommendations by property: SLS, EDITION, and InterContinental.
- [x] Suggest what to explore at each hotel, with a practical booking or concierge action where relevant.
- [x] Preserve the chronological app flow and keep financial/payment details hidden.
- [x] Run TypeScript, production build, and privacy wording checks before saving a checkpoint.

## Activity quick-add and two-column family schedule

- [x] Add a Quick add action to each listed activity below the activities section.
- [x] Let users choose beginning time and end time before adding an activity to the schedule.
- [x] Let users choose calendar assignment: Both by default, Kids only, or Parents only.
- [x] Replace or reshape the schedule display into one long-day schedule with separate Kids and Parents columns.
- [x] Ensure activities assigned to Both appear in both Kids and Parents columns.
- [x] Preserve the Red Sea Coral Atlas visual identity, mobile readability, and hidden financial details.
- [x] Run TypeScript, production build, and privacy wording checks before saving a checkpoint.

## Room photos, full-day timeline, and restaurant-only nearby hotels

- [x] Inspect available room photos on the desktop or upload areas and assess whether their quality is usable for the app.
- [x] If room photo quality is low, choose the lower-cost path between similar available imagery and upscaling.
- [x] Replace the current suite/room imagery with the best room visuals available.
- [x] Remove the nearby hotel side-quest section from the page and navigation.
- [x] Add nearby hotel restaurants as evaluated activity options instead of standalone hotel cards.
- [x] Include restaurant evaluation signals so the family can decide which restaurant to add to which schedule.
- [x] Rebuild the schedule as a full timeline from 7:00 AM to 11:00 PM.
- [x] Add breakfast, lunch, dinner, pool time, and clear empty gaps into the day view.
- [x] Make Both-calendar activities appear as one large shared block spanning Kids and Parents columns.
- [x] Preserve mobile readability, Red Sea Coral Atlas visual identity, and hidden financial details.
- [x] Run TypeScript, production build, and privacy wording checks before saving a checkpoint.

## Webpage critique

- [x] Review the current homepage structure, visual hierarchy, and navigation.
- [x] Review the family scheduling workflow, quick-add behavior, and restaurant decision flow.
- [x] Identify what works, what is confusing, and what should be improved first.
- [x] Deliver a concise prioritized critique without making code changes unless requested.

## Vercel deployment preparation

- [ ] Confirm external Vercel hosting is still desired despite Manus built-in hosting and custom domain support.
- [ ] Inspect the project build scripts and static-output configuration for Vercel compatibility.
- [ ] Inspect the configured Vercel connector status and available deployment/project tools.
- [ ] Add or adjust Vercel configuration only if needed for the static React app.
- [ ] Run production build validation before any deployment handoff.
- [ ] Provide a safe deployment handoff, link, or exact Vercel next steps.

## Restore Manus-hosted pictures

- [x] Confirm whether any image paths were changed during cancelled Vercel preparation.
- [x] Restore the original `/manus-storage/` image paths for Manus publishing if needed. Confirmed no source restoration was required; paths were already using `/manus-storage/`.
- [x] Verify TypeScript and production build after picture restoration.
- [x] Save a clean checkpoint for Manus publishing.

## Schedule timeline formatting fix — Apr 30

- [x] Inspect `Home.tsx` schedule component structure for time gutter, Kids/Parents columns, and shared family blocks.
- [x] Inspect `index.css` schedule styles for time rail contrast, grid widths, card positioning, and mobile behavior.
- [x] Fix time label legibility and prevent overlap with Kids column using a dedicated time gutter.
- [x] Fix breakfast/shared family card rendering so Both activities span Kids and Parents cleanly.
- [x] Clean up visible schedule formatting errors in the full 7 AM–11 PM board.
- [x] Run TypeScript, production build, and privacy wording checks.
- [x] Save a new checkpoint for the corrected schedule section.

## Phone no-horizontal-scroll fix — May 1

- [x] Identify which mobile schedule rules force horizontal overflow in the 320–430px viewport range.
- [x] Replace side-by-side Kids/Parents mobile tracks with a single-column phone layout that preserves readability.
- [x] Ensure shared Both cards, Kids cards, and Parents cards fit within the phone viewport without clipping.
- [x] Add global overflow guards for media, sections, and interactive rows without hiding legitimate content.
- [x] Validate production build and inspect phone-width behavior.
- [x] Save a new checkpoint for the corrected phone layout.

## Separate Calendar/Activities page options — May 1

- [x] Present three credit-efficient implementation options before editing code. Approved option: B — dedicated command-center page.
- [x] Confirm which option Ebrahim prefers. Ebrahim selected Option B.
- [x] Separate the current Calendar/Activities experience into a reachable dedicated page.
- [x] Keep access from the current main page.
- [x] Make the dedicated page use smaller text so Kids and Parents can fit in two columns on phone view.
- [x] Validate no horizontal page scrolling after implementation.
- [x] Save checkpoint for the approved separated-page implementation.

## Fixed daily hour timeline — May 1

- [x] Inspect the dedicated `ScheduleCommand.tsx` structure and command-center CSS before adding the hour timeline.
- [x] Add fixed visible hour anchors for every schedule day on the dedicated command-center page.
- [x] Keep Kids/Parents two-column phone layout readable with smaller text and no horizontal scrolling.
- [x] Ensure the hour timeline works across day selector states and daily activity cards.
- [x] Validate TypeScript, production build, privacy wording, and phone-width overflow. TypeScript and production build passed; browser measurements confirmed timeline present and zero horizontal overflow at 320, 360, 390, and 430 px. Privacy wording scan only returned pre-existing intended family-travel wording already present before this timeline update.
- [x] Save checkpoint for the fixed daily timeline update. Version: b0e8b05a.

## Pixel-accurate schedule timeline alignment fix — May 1

- [x] Inspect current /schedule timeline rail and activity card positioning implementation. Current issue: rail uses independent stacked rows while cards are normal-flow blocks, so they do not share a time scale.
- [x] Convert the rail and cards to share one time-coordinate system with consistent pixels per hour. Implemented a shared minute-to-rem scale for the rail and activity cards.
- [x] Align every activity card top edge to its actual start time on the left rail. Activity card top positions are calculated from start time relative to 7 AM.
- [x] Ensure the timeline height stretches to cover the full day activity span without changing hourly spacing. Timeline now runs from 7 AM to 11 PM with equal 4.5rem hourly spacing.
- [x] Preserve compact Kids/Parents two-column phone layout and zero horizontal overflow at 320–430 px. Browser automation confirmed 0 px overflow at 320, 360, 390, and 430 px.
- [x] Run TypeScript and production build validation. `pnpm check` and `pnpm build` passed.
- [x] Verify alignment and phone responsiveness in browser automation. 9 AM alignment measured within 0.01 px across phone widths, and all Thu visible activity starts measured 0 px off the shared time scale.
- [x] Save a new checkpoint for the corrected pixel-accurate timeline. Version: ebc62f8a.

## BOTH activity spanning and no-overlap schedule fix — May 1

- [x] Inspect current schedule data/rendering and CSS time-scale values. Current BOTH items are duplicated into each lane, and the 4.5rem/hour scale makes one-hour cards too short for readable content.
- [x] Render activities tagged BOTH as one shared card spanning Kids and Parents columns instead of duplicated cards. The two tracks now share one timebox; BOTH cards span across both lanes.
- [x] Expand the vertical time scale enough for readable card content while keeping start times aligned to the left rail. Scale increased from 4.5rem/hour to 6.3rem/hour.
- [x] Prevent consecutive activities from visually overlapping or clipping important text. Browser measurement showed Lunch reset and Suite quiet time now have a 5.6 px gap instead of overlap.
- [x] Verify mobile widths keep zero horizontal overflow and usable two-column schedule layout. Tested 320, 360, 390, and 430 px with 0 px horizontal overflow and BOTH cards spanning 100% of the combined timebox.
- [x] Run TypeScript and production build validation. `pnpm check` and `pnpm build` passed after the shared-card update.
- [x] Save checkpoint for the shared BOTH-card no-overlap update. Version: 251d4853.

## GitHub publishing request — May 1

- [x] Inspect current git status, remotes, and package scripts for the website project. Existing origin is the internal project remote; GitHub remote still needs to be added.
- [x] Create a private GitHub repository for the current website code unless an existing remote is already configured. Created private repo `ealhamed/redsea-family-trip`.
- [x] Push the current project state to GitHub. Pushed branch `main` to the GitHub remote.
- [x] Attempt GitHub Pages setup if compatible with the static build and account permissions. Built and pushed a `gh-pages` branch, but enabling Pages via GitHub API returned a 403 permission error.
- [x] Verify and share the GitHub repository or Pages link. Repository exists at https://github.com/ealhamed/redsea-family-trip; live Pages activation needs GitHub Settings permission/manual enablement.

## GitHub Pages 404 remediation — May 1

- [x] Confirm current repository visibility and GitHub Pages configuration. Repository is now public; Pages is not enabled from the API-visible configuration.
- [x] Change `ealhamed/redsea-family-trip` repository visibility to public if required for Pages access. Repository visibility is now PUBLIC.
- [x] Enable or update GitHub Pages to serve from the `gh-pages` branch root. User manually enabled Pages in GitHub Settings after API activation was blocked.
- [x] Verify the expected live URL returns a successful page instead of 404. Confirmed HTTP 200 with page title `Red Sea Family Trip`.
- [x] Share the final working link and note any remaining GitHub-side propagation delay.

## GitHub Pages schedule route access issue — May 1

- [x] Reproduce the inaccessible deployed schedule page and capture which URLs fail or succeed. Confirmed `/redsea-family-trip/schedule` was not served as a normal Pages route before the fix; `/schedule/` now has a physical `schedule/index.html` entry.
- [x] Identify whether the issue is caused by GitHub Pages path fallback, Vite base path, or in-app routing links. Root cause was a combination of absolute `/schedule` home links, Wouter not being explicitly scoped to the repository base path, and GitHub Pages lacking a physical schedule entry.
- [x] Implement the safest route fix for GitHub Pages while preserving Manus/local development behavior. Added Wouter repository base handling, changed home links to `${import.meta.env.BASE_URL}schedule/`, added a `/schedule/` route, and deployed `schedule/index.html` plus `404.html` fallbacks.
- [x] Rebuild and redeploy the static site to the `gh-pages` branch. `pnpm check` and `GITHUB_PAGES=true pnpm build` passed; latest static artifact was force-pushed to `gh-pages`.
- [x] Verify the final live schedule link works and share it with the user. Verified `https://ealhamed.github.io/redsea-family-trip/schedule/` returns HTTP 200 and serves the GitHub Pages build.
