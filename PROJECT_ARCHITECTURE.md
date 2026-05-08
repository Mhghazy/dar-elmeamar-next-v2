# Project Architecture & Developer Guide

This document outlines the structural organization of the Dar El-Meamar Next.js application, specifically focusing on layouts, routing, and styling.

## 1. The Layout Hierarchy (The "3 Pillars")

The application uses a nested layout strategy to maintain a clean separation of concerns:

### A. Root Layout (`app/layout.tsx`)
**Role:** The foundational shell of the entire application.
- **HTML/Body Structure:** Defines the `<html>` and `<body>` tags.
- **Global Providers:** Wraps the app in `ThemeProvider` and `LanguageProvider`.
- **Fonts:** Initializes the `Geist` variable fonts.
- **Global Tools:** Injects `ConsoleWarningSuppress` and `PathRedirect`.
- **Global Metadata:** Defines site-wide SEO, OpenGraph, and Twitter metadata.
- **Tailwind Connection:** Imports `globals.css`, which contains the Tailwind directives.

### B. Public Layout (`app/(public)/layout.tsx`)
**Role:** Standardizes the look and feel for all public-facing visitor pages.
- **Navigation:** Injects the `Navbar` component.
- **Footer:** Injects the `Footer` component.
- **Sidebars:** Adds the `SocialContact` floating links.
- **Utilities:** Adds `ScrollToTop` and `ScrollToTopButton`.

### C. Route-Specific Layouts / Components
**Role:** Customizes the environment for specific sub-sections (e.g., Admin).
- While there isn't a separate `admin/layout.tsx`, the admin pages inherit the Root Layout but skip the Public Layout (by being outside the `(public)` group folder).

---

## 2. Route to File Mapping (TSX Files)

For developers looking to modify specific pages, here is the direct path mapping:

| Route | TSX File Path | Primary Components |
| :--- | :--- | :--- |
| **Home (/)** | `app/(public)/page.tsx` | `Hero`, `About`, `Gallery`, `Works` |
| **About (/about)** | `app/(public)/about/page.tsx` | `AboutHero`, `AboutContent` |
| **Services (/services)** | `app/(public)/services/page.tsx` | `ServicesHero`, `ServicesClient` |
| **Works (/works)** | `app/(public)/works/page.tsx` | `WorksHero`, `WorksPhilosophy` |
| **Gallery (/gallery)** | `app/(public)/gallery/page.tsx` | `GalleryHero`, `GalleryShowcase` |
| **Contact (/contact)** | `app/(public)/contact/page.tsx` | `Contact` |
| **Admin Login** | `app/admin/login/page.tsx` | `LoginPage` |
| **Admin Dashboard** | `app/admin/dashboard/page.tsx` | `AdminDashboard` |

---

## 3. Tailwind CSS Integration

The project uses Tailwind CSS for all styling, integrated as follows:

1.  **Directives:** Located in `app/globals.css`.
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
2.  **Configuration:** `tailwind.config.ts` defines the custom color palette (Teal/Gold focus), dark mode (class-based), and font family variables.
3.  **Application:** Styles are applied via `className` attributes in `.tsx` files.
4.  **Dark Mode:** Controlled via the `ThemeProvider`, which toggles the `dark` class on the `html` or `body` element.

---

## 4. Recent Optimizations (2026-05-08)

- **Streaming:** Implemented `Suspense` across the Home and Gallery pages to enable asynchronous "Bolt" loading.
- **Accessibility:** Added unique `id` and `name` attributes to all form fields for better browser autofill and screen reader support.
- **CSP:** Added a permissive meta tag in `app/layout.tsx` to allow `eval` for Turbopack and Vanta.js during development.
- **Build Efficiency:** Optimized package imports for `three` and `vanta` in `next.config.mjs`.
