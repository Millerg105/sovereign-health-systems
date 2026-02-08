# 🎨 Design System & Rules

## 🏗️ Dimension 1: Pattern & Layout
**Type:** SaaS / Agency Hybrid
**Focus:** Value prop first, clear conversion path.
**Structure:**
1.  **Hero:** Title + Subtitle + High-contrast CTA + Social Proof/Trust
2.  **Problem Agitation:** Clear text, bullet points, emotional connection to "lost revenue".
3.  **Solution:** How it works (Automation), benefits over features.
4.  **Process:** Linear steps (Audit -> Plan -> Install -> Results).
5.  **Proof:** Outcome-focused metrics.
6.  **Footer:** Simple trust signal.

## 🎨 Dimension 2: Style & Aesthetic
**Selected Style:** **Clean Professional / Medical Trust** with **Modern Tech** accents.
*Avoid "Clinical Boring" - aim for "Modern Health Tech".*
*   **Glassmorphism:** Use sparingly for cards/overlays to add depth.
*   **Bento Grid:** Use for the "Solution" or "Proof" section to organize data density cleanly.

## 🎨 Dimension 3: Color & Theme
**Palette: Trust & Growth**
*   **Primary:** `#0F172A` (Navy/Slate) - Establishing authorization/trust.
*   **CTA (Action):** `#059669` (Health Green) or `#3B82F6` (Bright Blue) - High contrast against white/light backgrounds.
*   **Background:** `#FFFFFF` (Pure White) or `#F8FAFC` (Very light slate).
*   **Text:** `#1E293B` (Slate) for high readability.
*   **Accent:** `#06B6D4` (Cyan) for tech/AI elements.

**Best Practices:**
*   60% White/Light Background
*   30% Brand Navy/Slate
*   10% Vibrant CTA Green/Blue

## ✍️ Dimension 4: Typography
**Pairing:** Modern & Trustworthy
*   **Headings:** `Inter` (Variable) - Tight tracking for headlines. Bold weights (700/800).
*   **Body:** `Inter` or `Roboto` - Clean, high readability.
*   **Hierarchy:** High contrast between Headings and Body.

## ✨ Dimension 5: Animations & Interactions
**Philosophy:** "Pro Max" - smooth, premium feel. Nothing jarrings.
1.  **Buttons:** lift + scale (`transform: scale(1.02)`) + subtle shadow/glow on hover.
2.  **Scroll Reveal:** Staggered fade-up (`opacity 0->1`) for list items and cards.
3.  **Hero Text:** Slight delay fade-in.
4.  **Cards:** Tilt or subtle lift on hover to invite interaction.

## 🚦 Conversion Rules (Anti-Patterns to Avoid)
*   ❌ No generic "Welcome" text.
*   ❌ No navigation links that distract (Home, About, Services, Blog) -> **One Goal: Book Audit**.
*   ❌ No "Learn More" buttons -> **"Book Audit"** or **"See How"**.
*   ❌ No walls of text.

## 🧩 Component Prompts (Vercel Style)
*   **Hero Headline:** Visually dominant, tight line-height.
*   **Primary CTA:** Subtle border beam or glow.
*   **Social Proof:** Staggered reveal.
*   **Forms:** Clear focus states, inline validation.
