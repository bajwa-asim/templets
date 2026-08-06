---
name: GB Systems Core
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#a04100'
  on-secondary: '#ffffff'
  secondary-container: '#fe6b00'
  on-secondary-container: '#572000'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
  gutter: 24px
  container-max-width: 1280px
---

## Brand & Style

The design system for this agency reflects the "Modern Tradesman" aesthetic: a fusion of industrial ruggedness and high-tech precision. It is built to bridge the gap between traditional blue-collar reliability and the digital-first marketing world. 

The visual style is **Corporate / Modern** with a slight **Brutalist** influence in its heavy borders and bold weight, though it maintains a refined, professional execution. The UI prioritizes clarity, speed, and trust. High-quality photography of active job sites should be framed in sharp, structured containers, emphasizing a "done right the first time" philosophy. White space is treated as a premium tool to eliminate clutter, allowing the high-contrast CTAs to command immediate action.

## Colors

The palette is rooted in industry standards to evoke immediate familiarity for contractors and trade clients.

- **Primary (Deep Charcoal):** Used for primary text, navigation backgrounds, and structural elements. It conveys authority and permanence.
- **Secondary (Safety Orange):** Reserved exclusively for high-conversion actions (CTAs, primary buttons, status alerts). This color mimics safety gear to draw the eye instantly.
- **Neutral (Off-White):** Used for page backgrounds to provide a clean, gallery-like canvas for project photography.
- **Support (Slate Gray):** Utilized for secondary text, borders, and icon outlines to provide depth without competing with the primary charcoal.

## Typography

The typography system uses a dual-sans-serif approach to balance impact with legibility. 

**Montserrat** is the voice of the brand, used for all headlines. Its geometric, bold nature mimics heavy machinery branding and architectural blueprints. Use heavy weights (700+) for main headings to establish a "hard hat" feel.

**Inter** provides the functional engine for body copy and UI labels. It offers exceptional legibility at smaller sizes, ensuring that technical details and service descriptions are easily digestible on both mobile devices (on-site) and desktop (office).

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to ensure content remains framed and impactful, transitioning to a fluid model for mobile.

- **Desktop:** 12-column grid with a 1280px max-width. Gutters are kept wide (24px) to maintain the "clean" visual style requested.
- **Mobile:** 4-column grid with 16px margins. 
- **Rhythm:** All spacing (padding, margins, gap) must be multiples of 8px. Use generous vertical spacing (120px+) between major sections to emphasize the "quality over quantity" mindset.
- **Alignment:** Use rigid, left-aligned typography for long-form content to maintain a disciplined, no-nonsense look.

## Elevation & Depth

This design system eschews soft, ambient shadows in favor of **Tonal Layers** and **Bold Borders**. 

- **Surfaces:** Use high-contrast color blocks to define hierarchy. For example, a Deep Charcoal section placed immediately after an Off-White section creates a natural "step" in the user journey.
- **Outlines:** Use 1px or 2px solid borders in `#1A1A1A` or a subtle `#E0E0E0` to define cards and input fields. This mimics the structured lines of a technical drawing.
- **Interactivity:** Elevation is expressed through color shifts (e.g., Orange to a darker Burnt Orange on hover) rather than shadow-based lifting, maintaining the "flat and rugged" aesthetic.

## Shapes

The shape language is primarily **Soft (0.25rem)**. 

While the brand is rugged, purely sharp corners (0px) can feel overly aggressive or dated. A subtle corner radius suggests modern technology and precision engineering. 

- **Standard Elements:** Buttons, input fields, and tags use the base 4px (0.25rem) radius.
- **Containers:** Large image cards or testimonial blocks may use 8px (0.5rem) to provide a slightly more "finished" look.
- **Strictness:** Do not use pill-shaped buttons; maintaining a rectangular silhouette is essential to the "GB Systems" industrial identity.

## Components

### Buttons
- **Primary:** Background `#FF6B00`, Text `#FFFFFF`, Montserrat Bold, All Caps. Transition to `#E66000` on hover.
- **Secondary:** Background `Transparent`, Border 2px `#1A1A1A`, Text `#1A1A1A`. 
- **Sizes:** Large (16px top/bottom padding) for lead generation; Medium (12px) for standard UI.

### Cards
- White background with a 1px `#E0E0E0` border. No shadow.
- Header images should have a 0.25rem top-corner radius to match the container.
- Use Montserrat for card titles to ensure a strong hierarchy.

### Input Fields
- Heavy 2px bottom border in Charcoal or 1px all-around border.
- Focus state: Border color changes to Safety Orange.
- Labels: Use `label-bold` (Inter, All Caps, 14px) positioned above the field.

### Service Chips
- Small, rectangular tags with `#F1F1F1` background and `#1A1A1A` text.
- Used to categorize trades (e.g., "HVAC", "Plumbing", "Electrical").

### Additional Components
- **Case Study Preview:** A split-screen component with 50% professional job-site photography and 50% results-oriented copy (e.g., "300% Increase in Calls").
- **Trust Bar:** A horizontal strip of grayscale partner logos (industry certifications, local chambers) to build immediate authority.