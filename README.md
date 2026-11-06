# MSU Web Template Suite (DaisyUI + Tailwind CSS)

An accessible, mobile-responsive, and modern HTML/CSS template suite specifically crafted for **Michigan State University** research labs, faculty members, project grants, and academic teams.

Built with **Tailwind CSS v3** and **DaisyUI v4**, this template provides a standalone, CMS-independent design system that passes **WCAG 2.1 AA accessibility standards** and can be ported directly into static site generators (Astro, Gatsby, 11ty) or modern JavaScript frameworks (SvelteKit, Next.js).

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Exemplar Pages Suite](#exemplar-pages-suite)
4. [MSU Brand Guidelines & Color Tokens](#msu-brand-guidelines--color-tokens)
5. [Header Layouts: 2-Tier vs. 1-Tier](#header-layouts-2-tier-vs-1-tier)
6. [Porting to Static Site Generators (Astro, Next.js, SvelteKit, 11ty)](#porting-to-static-site-generators)
7. [Extending with DaisyUI Components (Guide for Humans & AI)](#extending-with-daisyui-components)
8. [WCAG 2.1 AA Accessibility Features](#wcag-21-aa-accessibility-features)
9. [Build Scripts Reference](#build-scripts-reference)

---

## Quick Start

### 1. View Pages Immediately (No Build Step Required)
The project comes with a pre-compiled, minified CSS bundle in `dist/css/msu-theme.css`. You can start a local static server right away:

```bash
# Using Node / npx:
npx serve .

# Or using Python 3:
python3 -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) to view the **Template Showcase Hub (`index.html`)**.

### 2. Customizing & Compiling CSS
If you add new Tailwind utilities or customize DaisyUI theme variables:

```bash
# 1. Install dependencies
npm install

# 2. Start Tailwind watcher for live compilation
npm run dev

# 3. Build optimized, minified production CSS
npm run build
```

---

## Project Structure

```text
msu_css_template/
├── index.html               # Central Showcase Hub & Developer Guide (2-Tier Header)
├── lab-home.html            # Research Lab / Project Homepage (2-Tier Header)
├── faculty-profile.html     # Faculty / PI Personal Profile (1-Tier Compact Header)
├── team.html                # Team & Personnel Directory (2-Tier Header)
├── publications.html        # Filterable Publications with BibTeX Modal (2-Tier Header)
├── project-detail.html      # Research Project / Grant Details (2-Tier Header)
├── content-page.html        # Markdown & Article Layout for SSGs (2-Tier Header)
├── components.html          # DaisyUI + MSU Component Kitchen Sink (2-Tier Header)
├── package.json             # NPM build scripts & dependencies
├── tailwind.config.js       # Tailwind & DaisyUI MSU theme configuration
├── src/
│   └── css/
│       └── input.css        # Custom CSS, Google Fonts, MSU CSS variables, prose styling
└── dist/
    ├── css/
    │   └── msu-theme.css    # Production compiled CSS bundle (~97 KB minified)
    └── js/
        └── msu-template.js  # Accessible vanilla JS helpers (drawer, tabs, modals, BibTeX)
```

---

## Exemplar Pages Suite

Every exemplar page is a complete, self-contained HTML file styled with MSU design tokens and annotated with structural comments (`<!-- START: MSU Header -->`, `<!-- MAIN CONTENT REGION -->`, `<!-- START: MSU Footer -->`):

| Page | File | Description | Header Type |
| :--- | :--- | :--- | :--- |
| **Portal Showcase** | [`index.html`](file:///Users/billspat/Downloads/msu_css_template/index.html) | Hub featuring quick links to all templates, architecture highlights, and setup guide. | 2-Tier Header |
| **Research Lab Home** | [`lab-home.html`](file:///Users/billspat/Downloads/msu_css_template/lab-home.html) | Hero banner, lab impact stats, 3 research pillars, recent lab news, PI spotlight, and funding badges. | 2-Tier Header |
| **Faculty Profile** | [`faculty-profile.html`](file:///Users/billspat/Downloads/msu_css_template/faculty-profile.html) | Personal academic portfolio: headshot, bio narrative, research keywords, appointments, courses, and CV download. | **1-Tier Compact** |
| **Team Directory** | [`team.html`](file:///Users/billspat/Downloads/msu_css_template/team.html) | Hierarchical roster: PI, Postdocs, PhD Students, Undergrads, Alumni table, and prospective student join callout. | 2-Tier Header |
| **Publications Archive** | [`publications.html`](file:///Users/billspat/Downloads/msu_css_template/publications.html) | Interactive tag filter (All, Genomics, ML, Structural), DOI badges, abstract accordions, and accessible BibTeX copy modal. | 2-Tier Header |
| **Project & Grant Detail** | [`project-detail.html`](file:///Users/billspat/Downloads/msu_css_template/project-detail.html) | Specific research grant page with NIH/NSF award tags, specific aims, architectural figure diagram, team assignments, and open data links. | 2-Tier Header |
| **Typography & Article** | [`content-page.html`](file:///Users/billspat/Downloads/msu_css_template/content-page.html) | Exemplar for SSG Markdown rendering: accessible headings, lists, tables with captions, code blocks with copy button, WAI-ARIA tabs, and alerts. | 2-Tier Header |
| **Component Kitchen Sink**| [`components.html`](file:///Users/billspat/Downloads/msu_css_template/components.html) | Interactive catalog of MSU-themed DaisyUI components: buttons, badges, cards, modals, form inputs, and stats. | 2-Tier Header |

---

## MSU Brand Guidelines & Color Tokens

Colors conform to the official guidelines established by [MSU Communications and Marketing](https://comms.msu.edu/resources) and the [MSU Digital Experience Studio](https://dxstudio.msu.edu/website-technology/web-standards).

### Official MSU Wordmark Lockup (Adaptive Color)
All page headers and footers incorporate the official MSU vector lockup (Spartan helmet + "MICHIGAN STATE UNIVERSITY" wordmark, as used on `ai.msu.edu`):
* **Adaptive `currentColor` Rendering**: Inlined SVG elements use `fill="currentColor"`. This means setting `class="text-white fill-current"` on dark green backgrounds renders the lockup in crisp white, while setting `class="text-msu-green fill-current"` renders the lockup in official Spartan Green (`#18453B`) on light backgrounds.
* **Standalone Assets**:
  * [`dist/img/msu-wordmark.svg`](file:///Users/billspat/Downloads/msu_css_template/dist/img/msu-wordmark.svg): Adaptive `currentColor` version.
  * [`dist/img/msu-wordmark-white.svg`](file:///Users/billspat/Downloads/msu_css_template/dist/img/msu-wordmark-white.svg): Pre-filled white version for dark headers and cards.
  * [`dist/img/msu-wordmark-green.svg`](file:///Users/billspat/Downloads/msu_css_template/dist/img/msu-wordmark-green.svg): Pre-filled Spartan green version for white/light layouts.
* **Header Height & Scaling**: Top masthead containers are calibrated with `min-h-[52px]` and vertical padding `py-2.5 sm:py-3` so the `296x34` vector scales seamlessly from `h-6` on mobile devices up to `h-8.5` on desktop screens without clipping.

### Primary Color Tokens
* **Spartan Green (`#18453B`)**: Official primary brand color (Pantone 567 C). Used for mastheads, primary buttons (`btn-primary`), and prominent links.
* **MSU Forest Green (`#0F2D26`)**: Deep contrast green. Used for headers, footers, and high-contrast text accents.
* **MSU Kelly Green (`#008244`)**: Vibrant accent green for active states, badges, and focus indicators.
* **Slate Charcoal (`#1E293B`)**: Body text color on white/off-white backgrounds, providing a contrast ratio $\ge 12:1$ (exceeding WCAG AAA).
* **Light Slate Background (`#F8F9FA`)**: Clean neutral background for page sections and card surfaces.

### Typography
* **Primary Sans-Serif**: `Montserrat` (Google Fonts fallback matching licensed *Gotham* standards), paired with system fallbacks (`system-ui`, `-apple-system`, `Roboto`, `Segoe UI`, `sans-serif`).
* **Serif Display**: `Merriweather` (Google Fonts fallback matching *Georgia* and *Sentinel*), used for editorial and formal titles.

---

## Header Layouts: 2-Tier vs. 1-Tier

### 1. Two-Tier Header (Institutional Standard)
Used on [`index.html`](file:///Users/billspat/Downloads/msu_css_template/index.html), [`lab-home.html`](file:///Users/billspat/Downloads/msu_css_template/lab-home.html), [`team.html`](file:///Users/billspat/Downloads/msu_css_template/team.html), [`publications.html`](file:///Users/billspat/Downloads/msu_css_template/publications.html), etc.
* **Tier 1 (MSU Masthead)**: Spartan Green (`#18453B`) banner spanning full width.
  * **Left-Aligned Logo**: The official MSU Spartan Helmet + Wordmark SVG is strictly anchored to the left grid margin, matching [`ai.msu.edu`](https://ai.msu.edu) and [`brand.msu.edu`](https://brand.msu.edu).
  * **Right Tools**: Quick institutional links and "Search MSU" utility.
* **Tier 2 (Unit Identity Bar & Responsive Navigation)**:
  * **Desktop (≥ md)**: Displays department hierarchy, site title, and a clean horizontal navigation bar.
  * **Mobile / Narrow (< md)**: The horizontal menu collapses into an accessible **Hamburger Menu Button** (with 3-bar icon and "MENU" label). Toggling the button smoothly expands a stacked DaisyUI menu panel (`<ul class="menu bg-slate-50 ...">`).

### 2. One-Tier Header (Compact Faculty & Project Variant)
Demonstrated on [`faculty-profile.html`](file:///Users/billspat/Downloads/msu_css_template/faculty-profile.html).
* Combines the left-aligned Spartan helmet, MSU wordmark, faculty name, and navigation into a **single space-efficient sticky green bar** (`#18453B`).
* On mobile, displays the left-aligned logo and faculty title with a compact hamburger button on the right that opens the DaisyUI mobile navigation dropdown.
* Perfect for personal faculty sites, postdoc portfolios, small grants, or documentation sub-sites where vertical screen real estate is critical.

---

## Porting to Static Site Generators

Because these templates use clean semantic HTML and standard DaisyUI classes, porting to any SSG is straightforward.

### Example: Porting to Astro (`BaseLayout.astro`)

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/msu-theme.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = "MSU Research Lab" } = Astro.props;
---
<!DOCTYPE html>
<html lang="en" data-theme="msu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Michigan State University</title>
  <meta name="description" content={description} />
</head>
<body class="bg-slate-50 text-slate-800 antialiased flex flex-col min-h-screen">
  <!-- Skip link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Header Component (from lab-home.html or faculty-profile.html) -->
  <header role="banner">
    <!-- Paste Header HTML here -->
  </header>

  <!-- Main Content Slot (Markdown or page content renders here) -->
  <main id="main-content" role="main" class="flex-grow">
    <div class="msu-prose max-w-7xl mx-auto py-10 px-4 sm:px-8">
      <slot />
    </div>
  </main>

  <!-- Footer Component (from index.html) -->
  <footer role="contentinfo" class="msu-footer">
    <!-- Paste Footer HTML here -->
  </footer>

  <script src="/js/msu-template.js"></script>
</body>
</html>
```

---

## Extending with DaisyUI Components

### How DaisyUI Works in this Template
All DaisyUI components inherit the `msu` theme defined in `tailwind.config.js`. When you use a DaisyUI utility class:
* `class="btn btn-primary"` automatically renders with MSU Spartan Green (`#18453B`) and white text.
* `class="btn btn-secondary"` renders with MSU Forest Green (`#0F2D26`).
* `class="badge badge-primary"` renders with Spartan Green.
* `class="alert alert-info"` renders an accessible informational callout.

### Instructions for AI Assistants (Prompting LLMs)
If you ask an AI (e.g. Claude, Gemini, ChatGPT) to generate new pages using this template, you can provide this prompt:

> *"Use the MSU CSS Template in this workspace. Follow the HTML structure from `content-page.html` or `lab-home.html`. Include the WCAG skip link, the 2-tier MSU header with Spartan Green (`#18453B`), the institutional footer with required links (Call MSU: 517-355-1851, Non-Discrimination, Privacy, Accessibility), and style UI components using DaisyUI classes with the `msu` theme."*

---

## WCAG 2.1 AA Accessibility Features

1. **Skip-to-Content Link**: Every page includes `<a href="#main-content" class="skip-link">Skip to main content</a>`, which becomes visible on keyboard tab focus.
2. **Explicit ARIA Landmarks**: `<header role="banner">`, `<nav aria-label="...">`, `<main id="main-content" role="main">`, `<aside>`, and `<footer role="contentinfo">`.
3. **Contrast Ratios**:
   - Body text: `#1E293B` on `#FFFFFF` / `#F8F9FA` $\rightarrow$ Contrast ratio $\ge 12:1$ (passes AAA).
   - Spartan Green headers: `#18453B` with white text $\rightarrow$ Contrast ratio $9.4:1$ (passes AAA).
4. **Visible Focus Indicators**: High-contrast outline `:focus-visible` with `outline: 3px solid #18453B; outline-offset: 2px;` (and white outline on green backgrounds).
5. **Screen-Reader Status Announcer**: `msu-template.js` includes a live region (`aria-live="polite"`) that announces filter changes and clipboard actions to screen readers.
6. **Accessible Tables & Forms**: All tables feature `<caption`> and `<th scope="col/row">`. All inputs have explicit matching `<label for="...">`.
7. **Accessible Modals**: Native HTML5 `<dialog>` elements with backdrop, focus restoration, and keyboard Escape dismissal.
8. **Reduced Motion**: Automated `@media (prefers-reduced-motion: reduce)` overrides to disable animations for users with vestibular sensitivities.

---

## Build Scripts Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Watches `src/css/input.css` and template HTML files, rebuilding `dist/css/msu-theme.css` on save. |
| `npm run build` | Compiles and minifies the production CSS bundle into `dist/css/msu-theme.css`. |
| `npm run serve` | Launches a local static web server to view and test all HTML pages. |
