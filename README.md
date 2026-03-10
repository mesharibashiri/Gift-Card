# Gift Card Personalizer

A lightweight, browser-based web app for personalizing greeting cards — no server, no external libraries. Users pick a card design, type their name, and download it as a PNG image.

## Quick Start

1. Open `index.html` in any modern browser.
2. Pick a card design from the gallery.
3. Type a name — it appears live on the card preview.
4. Click **Download** to save the card as a PNG image.

## Project Structure

```
Gift-Card/
├── index.html          — Main page
├── css/style.css       — Styles (responsive + print)
├── js/config.js        — Card library config (edit only this file)
├── js/app.js           — App logic (selection, canvas rendering, export)
├── images/             — Place card images here
├── README.md           — Documentation (English)
└── README_AR.md        — Documentation (Arabic)
```

---

## Managing Cards

All cards are defined in a single file: **`js/config.js`**. No other files need to change.

### Add a new card

1. Place your card image in the `images/` folder.
2. Open `js/config.js` and add a new entry to the `CARD_LIBRARY` array:

```js
{
  id: "eid-fitr",                    // Unique ID (English, no spaces)
  label: "Eid Al-Fitr",             // Display name shown under the thumbnail
  image: "images/eid-fitr.png",      // Path to the image file
  text: {
    fontFamily: "'Georgia', serif",  // Font type
    fontSize: 60,                    // Font size in pixels
    color: "#2c4a5a",                // Font color
    x: 0.62,                        // Horizontal position
    y: 0.88,                        // Vertical position
  },
},
```

### Remove a card

Delete the entire `{ ... }` object from the array and save the file.

### Reorder cards

Change the order of entries in the array — the first card is selected by default on page load.

---

## Customizing Name Text & Position

Each card has a `text` object that controls the name overlay appearance and placement:

### Font Type (`fontFamily`)

Any valid CSS font-family value. Examples:

| Value | Style |
|---|---|
| `"'Georgia', serif"` | Classic serif font |
| `"'Arial', sans-serif"` | Clean sans-serif |
| `"'Courier New', monospace"` | Monospace font |
| `"'Tajawal', sans-serif"` | Arabic font (requires Google Fonts import) |

### Font Size (`fontSize`)

Size in pixels relative to the original image dimensions. Examples:

| Value | Use case |
|---|---|
| `30` | Small text — for busy card designs |
| `42` | Medium — default |
| `60` | Large and prominent |
| `80` | Extra large heading |

### Font Color (`color`)

Any valid CSS color (hex or named). Choose a color that contrasts with the card background:

| Background | Suggested color | Value |
|---|---|---|
| Light / white | Dark text | `"#333333"` or `"#1a4a6e"` |
| Dark | White text | `"#ffffff"` |
| Colorful | Complementary | `"#5b2a6e"` (purple) |

### Text Position (`x` and `y`)

Values from `0` to `1` that determine where the name appears on the card:

```
x: 0 = left          x: 0.5 = center        x: 1 = right
y: 0 = top           y: 0.5 = middle         y: 1 = bottom
```

**Position map:**

```
(0, 0) ─────────── (0.5, 0) ─────────── (1, 0)
  │                    │                    │
  │    Top Left        │    Top Center      │    Top Right
  │                    │                    │
(0, 0.5) ──────── (0.5, 0.5) ──────── (1, 0.5)
  │                    │                    │
  │    Mid Left        │    Center          │    Mid Right
  │                    │                    │
(0, 1) ─────────── (0.5, 1) ─────────── (1, 1)
      Bot Left         Bot Center           Bot Right
```

**Examples from current cards:**

| Card | x | y | Placement |
|---|---|---|---|
| Happy Eid Al-Fitr | `0.62` | `0.88` | Bottom center-right |
| Eid Adha — Floral | `0.65` | `0.93` | Bottom right (pattern top-left) |
| Eid Adha — Blue | `0.30` | `0.93` | Bottom left (pattern on right) |
| Eid Adha — Colorful | `0.68` | `0.93` | Bottom right (pattern on left) |

> **Tip:** Try different values, save the file, and refresh the browser to see the result instantly.

---

## Features

- **No dependencies** — pure HTML, CSS, and JavaScript
- **Live preview** — name appears instantly as you type
- **Download PNG** — saves the card as a high-quality image
- **Dynamic sizing** — preview adapts to the original image dimensions
- **RTL** — Arabic interface, right-to-left layout
- **Responsive** — works on desktop and tablet

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions).

## Made by

[Meshari Albashiri](https://www.linkedin.com/in/meshari-albashiri/)
