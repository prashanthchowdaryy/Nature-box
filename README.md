# Nature Box — Frontend Website

A responsive React + Vite website for Nature Box, a fresh food stall (fruit boxes, oats, sprouts, sattu instants, energy ladu and drinks).

## Included
- Home, Menu, Our Story, and Find Us pages
- Responsive mobile navigation
- Product category filters and product detail modal
- Add-to-bag controls, quantity changes, subtotal, and cart persistence with localStorage
- WhatsApp order-message handoff (requires your number in config)
- Editable product names, prices, location, hours, Instagram URL, and WhatsApp number
- Responsive layouts and reduced-motion support
- Homepage section introducing the expanding oats flavour range and future products
- Own vector illustrations (no stock photos or video); add your own photos via the `photo` field on each product
- Hash routing (#/menu), so the browser back button and refresh work

## Run locally
1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in the project folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite.

To check a production build:

```bash
npm run build
npm run preview
```

## Before publishing
Edit the `business` object near the top of `src/main.jsx`:
- `whatsappNumber`: already set to 918374335934
- `locationText`: your actual stall address / landmark
- `hoursText`: actual operating hours
- `instagramUrl`: your Instagram profile URL

Edit the `products` array in the same file to set the real menu, prices, ingredients, and descriptions. Current product names and prices are sample placeholders; replace them with your confirmed menu. The homepage now introduces the growing oats range and future products without claiming unconfirmed flavours.

## Important
- This is a frontend starter; there is no backend, database, account system, online payment, or live inventory.
- Orders are not sent until you configure a WhatsApp number. Availability must be confirmed manually.
- Products use built-in illustrations. To use real photos, put them in `public/photos/` and set `photo: '/photos/name.jpg'` on the product in `src/main.jsx`.
- Check applicable food business registration, hygiene, labelling, and local requirements before selling.

## Build your bowl (new)
The `#/build` page lets customers pick an oats flavour, fresh fruits, dry fruits and seeds, protein boosters and sweet extras. Items drop into an animated bowl, and calories, protein, carbs, fat and price update live. Custom bowls go into the bag and are sent in the WhatsApp order with their full add-on list and nutrition.

All flavours, toppings, prices and nutrition numbers are in `src/builder.jsx` (top of the file). Nutrition values are approximate estimates, so replace them with your own figures. Add a topping by copying a line: use `emoji` for real fruit or `shape` + `color` for dry fruits, seeds and spreads.

### Realistic fruit
Fruits and toppings are drawn as shaded, realistic SVG artwork in `src/fruits.jsx` (strawberry with seeds, kiwi slice, apple, grapes and so on). To use your own photos instead, save a transparent PNG cut-out of each fruit in `public/fruits/` and add `photo: '/fruits/apple.png'` to that item in `src/builder.jsx`. Items without a `photo` keep the drawn version.

### Real fruit photos (update)
The fruits and nuts shown in the bowl builder now use real photographs (cut out with transparent backgrounds) saved in `public/fruits/`. They come from the Fruits-360 dataset by Mihai Oltean, licensed CC BY-SA 4.0, and the credit line on the builder page must stay. To use your own photos, replace any PNG in `public/fruits/` with your own transparent cut-out of the same name. Mango, almond, cashew, pistachio, raisin and the seeds still use drawings; add `photo: '/fruits/<name>.png'` to those items in `src/builder.jsx` once you have photos.
The bowl is drawn as glazed ceramic with a textured oats surface in `src/fruits.jsx` (`BowlSvg`).
