/**
 * ============================================================
 *  GIFT CARD LIBRARY — Edit this file to manage card designs
 * ============================================================
 *
 *  Each card entry:
 *    id        — Unique string identifier
 *    label     — Display name shown beneath the thumbnail
 *    image     — (Option A) Path or URL to a card image, e.g. "images/birthday.png"
 *    gradient  — (Option B) CSS linear-gradient, used if no image is set
 *    text      — Name overlay settings
 *      .fontFamily  — CSS font-family value
 *      .fontSize    — Font size in px (at 800×500 canvas)
 *      .color       — Text color (hex or CSS color)
 *      .x           — Horizontal position (0–1, where 0.5 = center)
 *      .y           — Vertical position   (0–1, where 0.5 = center)
 *
 *  Use EITHER "image" or "gradient" per card (image takes priority).
 *
 *  Image example:
 *    { id: "birthday", label: "Birthday", image: "images/birthday.png", text: { ... } }
 *
 *  Gradient example:
 *    { id: "sunset", label: "Sunset", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", text: { ... } }
 *
 *  To add a card: copy an entry, change the values, done.
 *  To remove a card: delete the object from the array.
 *  Supported cards: 2–12.
 *  Place image files in the "images/" folder next to index.html.
 */

const CARD_LIBRARY = [
    {
    id: "happy-eid",
    label: "Happy Eid Al-Fitr",
    image: "images/happy-eid-al-fitr-written-arabic-script-can-be-used-as-greeting-card-poster-poster.png",
    text: {
      fontFamily: "'Georgia', serif",
      fontSize: 60,
      color: "#2c4a5a",
      x: 0.62,
      y: 0.88,
    },
  },
  {
    id: "card-1",
    label: "Eid Adha — Floral",
    image: "images/234263268_34fca2974-b7aa-4662-903c-94f9ff1216e8.png",
    text: {
      fontFamily: "'Georgia', serif",
      fontSize: 36,
      color: "#5b2a6e",
      x: 0.65,
      y: 0.93,
    },
  },
  {
    id: "card-2",
    label: "Eid Adha — Blue",
    image: "images/234263268_4fca2974-b7aea-4662-903c-94f9ff1216e8.png",
    text: {
      fontFamily: "'Georgia', serif",
      fontSize: 36,
      color: "#1a4a6e",
      x: 0.3,
      y: 0.93,
    },
  },
  {
    id: "card-3",
    label: "Eid Adha — Colorful",
    image: "images/234263268_4fca29w74-b7aa-4662-903c-94f9ff1216e8.png",
    text: {
      fontFamily: "'Georgia', serif",
      fontSize: 36,
      color: "#6b2fa0",
      x: 0.68,
      y: 0.93,
    },
  },
];
