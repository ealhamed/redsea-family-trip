# Pixel-accurate timeline alignment validation

Date: 2026-05-01

The dedicated `/schedule` page was updated so the hour rail and activity cards share the same minute-based coordinate system. The visible rail runs from **7 AM to 11 PM** with equal spacing of **4.5 rem per hour**. Each card top is calculated from its start time relative to 7 AM.

Browser automation validation results:

| Viewport width | Horizontal overflow | 9 AM card-to-rail difference | Rail height | Track height |
|---:|---:|---:|---:|---:|
| 320 px | 0 px | 0.01 px | 1152 px | 1152 px |
| 360 px | 0 px | -0.01 px | 1152 px | 1152 px |
| 390 px | 0 px | 0 px | 1152 px | 1152 px |
| 430 px | 0 px | 0 px | 1152 px | 1152 px |

Full visible Thu card alignment check showed **0 px difference** between expected and actual top positions for 07:30, 09:00, 10:30, 13:00, 14:00, 16:30, and 18:30 cards in both Kids and Parents lanes.
