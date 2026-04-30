# Research notes for Red Sea family trip app enhancement

## Booking.com page check

The provided Booking.com URL was opened in the browser on 30 April 2026. The page rendered as a blank white page in the automated browser session and returned no readable article text or visible interactive elements. A raw HTML snapshot was saved by the browser, but the live page did not expose usable visual hotel photos or facility details through the viewport. Because the user specifically requested real pictures and activity research, the next research step will use official hotel, Red Sea Global, and credible travel/hospitality sources, then avoid relying on unsupported Booking.com snippets.

## Privacy constraint

The app must continue to omit all financial, payment, room-rate, discount, or booking-cost information from the family-facing interface.

## Official SLS and Shura Island findings

The official SLS Red Sea dining page lists five main SLS venues: Fi’lia for family-style Italian dining, The Perch for daytime-to-late poolside refreshments, Deluxe for coffee, light bites and pastries, Floating World for Japanese-influenced sharing dishes, Seabird for seafood with Spanish and Portuguese influences, plus 24-hour in-villa dining.[1]

Red Sea Global’s opening announcement confirms SLS The Red Sea is located at the centre of Shura Island and describes the resort as having 150 guestrooms, including rooms, suites and private villas. It also describes the Kids’ Club for ages 5–11, Teens’ Club for ages 12–15, a large signature pool, Ciel Spa, padel, beachfront yoga, complimentary kayaks, snorkelling equipment and paddleboards, premium water sports such as Seabob, e-foil and e-surf, and Shura Island’s open-air cinema.[2]

Visit Red Sea’s SLS page confirms that transfers from Red Sea International Airport to SLS Red Sea flow across the causeway and take less than an hour. It also lists accommodation categories including Euphoria 2 bedroom Suite with 4 adults, 2 bedrooms, one king bed plus two single beds, beachfront or garden view, and 122 square metres. It lists dining labels for Floating World, Perch, Seabird, Deluxe and Fi’lia, and experiences including scuba diving, sailing, snorkeling, windsurfing, WingSup, kayaking, stand-up paddleboarding, electrifying adventure, Shura Links, and Fly Red Sea seaplane special offers.[3]

Four Seasons Red Sea at Shura Island lists six alcohol-free restaurants and lounges on Shura Island: Sea Green, Vivi, Al Forn, Spiaggia Restaurant & Pool, Spiaggia Beach Bar, Lobby Lounge, and 24-hour in-room dining. Vivi is noted as opening late 2026, so it should not be treated as available for the May 2026 trip unless verified closer to the date.[4]

## References

[1]: https://slshotels.com/the-red-sea/restaurants-and-bars/ "Restaurants & Bars | SLS The Red Sea"
[2]: https://redseaglobal.com/en/media-center/news/farewell-to-the-ordinary-sls-the-red-sea-opens-on-shura-island/ "Farewell to the Ordinary: SLS The Red Sea Opens on Shura Island"
[3]: https://www.visitredsea.com/en/resorts/shura-sls-the-red-sea "Luxury Stays at SLS The Red Sea, Shura Island"
[4]: https://www.fourseasons.com/redseashuraisland/dining/ "Restaurants & Dining - Red Sea at Shura Island"


## Official nearby hotel exploration details for current update

The SLS official page describes SLS The Red Sea on Shura Island as a bold Saudi Red Sea resort with theatrical flair, 150 rooms and villas, five dining and mixology venues, three seasonal pools including two rooftop pools, a 24/7 light-filled gym, and meeting or celebration spaces. The app should present SLS as the family's base hotel and avoid any rate or offer language.

The Red Sea EDITION official dining pages list four venues: Central, Jiwa Terrace, Lobby, and Jiwa Beach Club. Central is an American three-meal restaurant inspired by Grand Central Station and runs daily from 7:00 AM to 11:00 PM. Jiwa Terrace is a poolside Indonesian venue open 11:00 AM to 7:00 PM. Lobby is an open-air gathering space with pastries, tea drinks, Aperi-Tea, and evening lounge energy, open 11:00 AM to 9:00 PM. Jiwa Beach Club is a Bali-inspired seaside dining and entertainment venue serving Southeast Asian cuisine, open 6:00 PM to 11:00 PM.

IHG's InterContinental The Red Sea Resort dining page lists Chimes, Ardo South American Cuisine, Darein, Murrma, and The 305. Chimes is a pool-area Mediterranean/international venue open 11:00 AM to 7:00 PM. Ardo is a seafront Peruvian/South American dinner venue listed as opening soon. Darein offers Levantine-Moroccan dining from breakfast through dinner. Murrma is an upper-lobby specialty coffee and sweets venue open 11:00 AM to 11:00 PM. The 305 is a seafront Miami Beach Club and cigar-lounge concept listed as opening soon.

Image search candidates reviewed visually. The strongest replacement candidates are `/home/ubuntu/upload/search_images/tes4LOQdHCzj.jpg` for a warm, real SLS interior/resort venue image with strong horizontal composition, and `/home/ubuntu/upload/search_images/wIUgEocxVkFW.jpg` as a wider Shura Island resort-view fallback.


## Room image inspection notes

The uploaded `/home/ubuntu/upload/pasted_file_tLRmbS_image.png` is a usable lounge/room-style image at 1555×1088. It appears to show a seating area with SLS-style textured wall treatment and is adequate for an in-app suite/living-area visual without paid upscaling.

The uploaded `/home/ubuntu/upload/pasted_file_CYXRkj_image.png` is not suitable for the app because it is a booking confirmation screenshot and visibly contains booking reference and room-total information. It should not be uploaded or displayed in the family-facing interface.


## Nearby hotel restaurant-only findings for activity cards

The Red Sea EDITION official dining page lists Central, Jiwa Terrace, Lobby, and Jiwa Beach Club. Central is positioned as a three-meal American comfort-food venue inspired by Grand Central Station, with breakfast 7:00 AM–11:00 AM, lunch 12:00 PM–1:00 PM, and dinner 6:00 PM–11:00 PM. Jiwa Terrace is a poolside Indonesian-leaning venue open 11:00 AM–7:00 PM. Lobby is an open-air gathering place for pastries, tea infusions, fruit juices, zero cocktails, Aperi-Tea, and evening lounge energy, open 11:00 AM–9:00 PM. Jiwa Beach Club is a Bali-inspired seaside dining and entertainment venue serving Southeast Asian cuisine, open 6:00 PM–11:00 PM.

The InterContinental The Red Sea Resort official dining page lists Chimes, Ardo South American Cuisine, Darein, Murrma, and The 305. Chimes is pool-area Mediterranean/international dining open 11:00 AM–7:00 PM, suited to relaxed lunch or early evening. Darein is a Levantine-Moroccan all-day dining venue with breakfast 7:00 AM–11:30 AM, lunch 1:00 PM–4:00 PM, and dinner 6:00 PM–11:00 PM. Murrma is an upper-lobby specialty coffee and sweets venue open 11:00 AM–11:00 PM. Ardo and The 305 are described as set to open soon, so they should be tagged as “verify opening” rather than primary recommendations for the May 2026 itinerary.

Implementation decision: remove nearby-hotel side-quest cards. Treat these hotels only as evaluated restaurant activity options in the activity/dining board, each with Quick add controls so the family can decide which restaurant enters Kids, Parents, or Both schedules.
