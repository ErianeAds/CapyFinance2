# Design System Specification: The Riparian Flow

## 1. Overview & Creative North Star: "Organic Precision"
The "Organic Precision" North Star defines a financial experience that marries the unwavering reliability of banking with the rhythmic, fluid ecosystem of the Pantanal. We reject the "sterile white box" of traditional fintech in favor of a **High-End Editorial** layout. 

This system breaks the rigid digital grid through **intentional asymmetry** and **tonal depth**. Elements should feel like they are floating on a calm river surface—overlapping slightly, utilizing wide margins (the "Floodplain Effect"), and prioritizing a sophisticated typographic scale that guides the eye like a natural trail. We move away from "templates" by using large-scale display type and layered surfaces to create a sense of bespoke craftsmanship.

---

## 2. Colors: The Pantanal Palette
Our palette is rooted in the earthy, high-contrast transitions of the wetlands. We use color to define space, not lines.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` component should sit on a `surface` background to create a soft edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
- **Base Level:** `surface` (#fff8f2) – The expansive, warm-toned foundation.
- **Content Blocks:** `surface-container-low` (#fef2e0) – Subtle elevation for secondary information.
- **Primary Focus:** `surface-container-highest` (#ede1cf) – For the most critical data or high-contrast sections.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" feel, use **Glassmorphism** for floating navigation or overlay cards. Apply `surface` colors at 70% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** For primary CTAs and Hero sections, use a linear gradient: `primary` (#154212) to `primary-container` (#2d5a27) at a 135-degree angle. This mimics the dappled light of the marsh canopy.

---

## 3. Typography: Editorial Authority
We pair the geometric precision of **Inter** with the organic, expressive character of **Epilogue** to create a "Natural/Financial" hybrid.

*   **The Display & Headline Scale (Epilogue):** Used for brand storytelling and large-scale data highlights. Its slight weight variations feel rhythmic and human.
    *   `display-lg`: 3.5rem (The Hero statement)
    *   `headline-md`: 1.75rem (Section entry points)
*   **The Utility Scale (Inter):** Reserved for high-density financial data, labels, and body copy to ensure maximum legibility.
    *   `title-md`: 1.125rem (Card titles)
    *   `body-md`: 0.875rem (Transaction details)

**Hierarchy Note:** Use wide letter-spacing (`0.05em`) for `label-sm` in all-caps to evoke a high-end luxury feel in metadata.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are a last resort. We convey hierarchy through the **Layering Principle**.

*   **Ambient Shadows:** When a float is required (e.g., a capybara motif tooltip), use an extra-diffused shadow: `offset-y: 8px, blur: 24px, color: rgba(32, 27, 16, 0.06)`. The tint is derived from `on-surface` to feel like a natural shadow on sand, not gray ink.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., input fields), use `outline-variant` (#c2c9bb) at **20% opacity**.
*   **Glassmorphism:** Use semi-transparent surfaces to allow the "River Blue" (`secondary`) or "Sunset Orange" (`tertiary`) background accents to bleed through, softening the layout's edges.

---

## 5. Components: Fluid Primitives

### Buttons & CTAs
*   **Primary:** Gradient fill (`primary` to `primary-container`), `xl` (1.5rem) roundedness. No border.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. Feels integrated, not "pasted."
*   **Tertiary:** Transparent background, `tertiary` (#5c2c00) text with a subtle underline (2px) using the `spacing-0.5` token.

### Input Fields
*   **Style:** Background-filled using `surface-container-high`. No border except on focus.
*   **Focus State:** A 2px "Ghost Border" using `secondary` (#2a657e) and a soft glow of the same color at 10% opacity.

### Cards & Lists
*   **Rule:** Forbid divider lines. Use `spacing-4` (1.4rem) or `spacing-6` (2rem) of vertical white space to separate list items. 
*   **Nesting:** Place `surface-container-lowest` cards on a `surface-dim` background to create a "floating leaf" effect.

### Special Element: The Capybara Motif
*   **Usage:** Not a cartoon, but a sleek, minimalist line-art mascot. 
*   **Placement:** Use as a watermark in `surface-variant` at the bottom-right of empty states, or as a "loading" path animation where the capybara's silhouette moves like a wave.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. A dashboard sidebar might have `spacing-8` on the left and `spacing-12` on the right to feel more editorial.
*   **Do** lean into the "Sunset Orange" (`tertiary`) for high-alert financial notifications or growth metrics—it commands attention without the "danger" of red.
*   **Do** use `full` roundedness for chips and status indicators to mimic river-washed stones.

### Don’t
*   **Don’t** use pure black (#000000). Use `on-background` (#201b10) for all text to maintain the earthy warmth.
*   **Don’t** use a standard 12-column grid for everything. Allow hero elements to "break out" of the container to create a sense of organic growth.
*   **Don’t** use harsh transitions. Every interaction should feel like a slow-moving river—use `300ms ease-in-out` for all hover states.