# Dar El-Meamar — Complete Developer Handbook
### دار المعمار — دليل المطور الكامل
Last Updated: May 2026
Author: Mahmoud Hamdy Ghazy
Version: 2.0 (Next.js Migration)

---

## 1. Project Overview

**Dar El-Meamar** (House of Architecture) is a premier architectural design and construction firm based in Cairo, Egypt, with over 19 years of experience. This repository contains the second version of their digital presence, migrated from a static React/Vite site to a high-performance **Next.js 16** application.

- **Primary URL**: [https://mhghazy.github.io/dar-elmeamar-next-v2](https://mhghazy.github.io/dar-elmeamar-next-v2)
- **Production Domain**: [https://darelmeamar.com](https://darelmeamar.com) (Pending migration to Vercel)
- **Target Audience**: 
  - **Public**: Potential clients seeking luxury residential/commercial design and construction.
  - **Internal**: Company employees managing the project gallery via the admin dashboard.

---

## 2. Tech Stack

| Technology | Version | Purpose | Why Chosen |
|:---|:---|:---|:---|
| **Next.js** | `^16.2.4` | Framework | App Router, SSG for public pages, Server Actions for Admin. |
| **React** | `^18.x` | Library | Component-based UI with Concurrent Mode features. |
| **TypeScript** | `^5.x` | Language | Strict typing for large-scale maintainability. |
| **Tailwind CSS** | `^3.4.1` | Styling | Utility-first, optimized for rapid UI development and small bundles. |
| **Framer Motion**| `^12.38.0`| Animations | High-end cinematic transitions and scroll-linked animations. |
| **Supabase** | `^2.105.2`| Backend | PostgreSQL, Authentication, and S3 Storage in one platform. |
| **Lucide React** | `^1.14.0` | Icons | Lightweight, customizable SVG icons. |
| **next-themes** | `^0.4.6`  | Theming | Seamless dark/light mode switching. |
| **next-sitemap** | `^4.2.3`  | SEO | Automatic generation of `sitemap.xml` and `robots.txt`. |
| **sharp** | `^0.33.5` | Optimization | Production-grade image resizing and conversion. |
| **schema-dts** | `^1.1.2`  | SEO | Type-safe JSON-LD structured data for Google. |
| **three / vanta** | Latest | Visuals | Interactive 3D backgrounds for the Hero section. |

### Technologies NOT Used:
- **GSAP**: Dropped in favor of Framer Motion (reduces bundle size, native React integration).
- **WordPress**: Replaced by a custom Next.js Dashboard + Supabase for better performance and security.
- **Firebase**: Supabase chosen for its relational (PostgreSQL) capabilities and better developer experience.

---

## 3. Why Next.js?

The project was migrated from Vite/React to Next.js to solve several critical production issues and prepare for long-term growth:

1. **SEO Optimization**: Next.js provides server-side rendering (SSR) and static site generation (SSG). Search engines see the full content of the page immediately, unlike the previous version which sent an empty HTML shell.
2. **Performance**: Built-in Image Optimization (`next/image`) automatically serves WebP/AVIF images. Static Generation ensures sub-second page loads.
3. **Unified Dashboard Integration**: Next.js allows the **Admin Dashboard** and Public Site to live in the same repository. Using **Route Groups** (`(public)` vs `admin`), we maintain a clean separation of concerns while sharing the same design system and type definitions.
4. **Future Scaling**:
   - **ISR (Incremental Static Regeneration)**: Allows updating the project gallery without a full site rebuild.
   - **Vercel Edge Functions**: Enables low-latency dynamic features as the user base grows.
5. **Data Security**: Middleware allows us to protect administrative routes on the server side (once migrated to Vercel), a feature impossible in a pure static Vite SPA.

---

## 4. Migration Guide: From Vite to Next.js

The transition from the legacy Vite-based application (`legacy-vite-app`) to the modern Next.js ecosystem was a strategic overhaul designed to improve SEO, performance, and developer experience. Below is the step-by-step breakdown of the process.

### Phase 1: Dependency & Environment Audit
1.  **Framework Swap**: Replaced `vite` and `@vitejs/plugin-react` with `next`.
2.  **Routing Overhaul**: Uninstalled `react-router-dom`. All client-side routes in `App.tsx` were mapped to the Next.js `app/` directory structure.
3.  **Animation Refactor**: Deprecated `gsap` (used in legacy for complex timelines) in favor of `framer-motion` and `motion` to reduce bundle size and leverage React-native animation states.
4.  **Environment Variables**: Migrated variables from `.env` (using `VITE_` prefix) to `.env.local` (using `NEXT_PUBLIC_` prefix) to ensure they are accessible in the browser.

### Phase 2: Structural Reorganization
1.  **Entry Point**: The `index.html` and `main.tsx` from Vite were replaced by the Root `layout.tsx` in Next.js.
2.  **Global Styles**: Moved `src/index.css` to `app/globals.css` and updated Tailwind directives for compatibility with Next.js's PostCSS pipeline.
3.  **Asset Migration**: Moved all images from `src/assets` to a top-level `assets/` folder. This allowed for easier reference via the `AssetFacade` utility.

### Phase 3: Component & Page Porting
1.  **Page Components**: Ported components from `src/pages/` to `app/(public)/[route]/page.tsx`.
2.  **Client Directives**: Identified components using browser-only APIs (`window`, `document`, `localStorage`) or libraries like `vanta` and `three.js`, adding the `"use client"` directive to their entry points.
3.  **Next/Image Integration**: Replaced standard `<img>` tags with the `next/image` component. This was critical for the "Luxury" feel, ensuring high-res assets load efficiently.

### Phase 4: Data Layer & Auth Refactoring
1.  **Repository Pattern**: Created `lib/gallery/` repositories to replace ad-hoc `supabase` calls found in legacy components.
2.  **Mock Fallbacks**: Implemented `mockDb.ts` to ensure the site remains "Always Up" even if the Supabase project hasn't been initialized yet.
3.  **Auth Logic**: Migrated authentication checks from local state to the `middleware.ts` (currently mocked for GitHub Pages but ready for Vercel).

### Phase 5: SEO & Meta Parity
1.  **Metadata API**: Replaced `react-helmet` (if used) or manual `document.title` updates with the static and dynamic `metadata` exports.
2.  **Structured Data**: Injected JSON-LD scripts into the head via the root layout, a feature not easily managed in the legacy Vite build.
3.  **Sitemap Generation**: Swapped manual sitemap creation with `next-sitemap` for automated post-build generation.

---

## 4.2. Comparative Analysis: Legacy vs. Next.js

| Feature | Legacy (Vite) | Next.js (Current) |
|:---|:---|:---|
| **First Contentful Paint** | Slow (Hydration dependent) | Ultra-fast (Static HTML) |
| **SEO State** | Poor (Empty shell) | Excellent (Fully indexable) |
| **Routing** | Client-side only | File-system / Hybrid |
| **Animations** | GSAP (Heavy) | Framer Motion (Optimized) |
| **Data Handling** | Prop drilling / Ad-hoc | Repository Pattern |
| **Image Handling** | Manual `<img>` tags | Automatic `next/image` |
| **Backend** | Direct API calls | Data Abstraction Layer |
| **Security** | None (Client only) | ## 5. Repository Structure

```text
dar-elmeamar-next-v2/
├── .github/
│   └── workflows/           # GitHub Actions (Automated Deployment to Pages)
├── app/                     # Next.js App Router (Routes & Layouts)
│   ├── (dashboard)/         # Group for common dashboard layouts
│   │   └── layout.tsx       # Shared dashboard shell
│   ├── (public)/            # Route group for public-facing pages
│   │   ├── about/           # About Us page
│   │   ├── contact/         # Contact page with interactive form
│   │   ├── gallery/         # Dedicated cinematic gallery page
│   │   ├── services/        # Detailed services catalog
│   │   ├── works/           # Portfolio showcase & philosophy
│   │   └── page.tsx         # Root landing page (Hero, About, etc.)
│   ├── admin/               # Internal management routes
│   │   ├── dashboard/       # Main Admin Dashboard page (Project CRUD)
│   │   └── login/           # Authentication portal
│   ├── fonts/               # Local typography (Geist Sans/Mono)
│   ├── globals.css          # Tailwind directives & CSS variables
│   ├── layout.tsx           # Global root layout (SEO, JSON-LD, Providers)
│   ├── opengraph-image.tsx  # Edge runtime dynamic OG image
│   ├── robots.ts            # Robots.txt (Static metadata route)
│   └── sitemap.ts           # Sitemap.xml (Static metadata route)
├── assets/                  # Central image repository (Projects & UI)
├── components/              # Modular React components
├── config/                  # Static site configuration constants
├── context/                 # React Contexts (Language, Theme)
├── lib/                     # Core Logic & Data Abstraction
│   ├── assets/              # Asset Facade for URL path resolution
│   ├── data/                # Data types and gallery stubs
│   ├── gallery/             # REPOSITORY LAYER (Project, User, Logs)
│   ├── supabase/            # Client initialization (with mock fallback)
│   └── mockDb.ts            # LocalStorage-based database for Demo Mode
├── locales/                 # i18n Localization (TypeScript based)
├── public/                  # Public static assets (Vanta.js, etc.)
├── utils/                   # Shared animations and helper functions
├── next-sitemap.config.js   # Main configuration for sitemap generation
├── next.config.mjs          # Next.js build & export configuration
├── tailwind.config.ts       # Design system and theme configuration
```

---

## 6. Core Features & Capabilities

### 6.1. Cinematic Gallery
A high-performance gallery using horizontal scrolling and **Framer Motion** for smooth transitions. Projects are grouped by category and feature high-resolution visuals. The gallery uses an **Asset Facade** to ensure images load correctly across both local dev and GitHub Pages environments.

### 6.2. Interactive Backgrounds
Uses **Vanta.js** and **Three.js** to create dynamic, responsive backgrounds that respond to mouse movement, enhancing the premium feel of the landing page.

### 6.3. Sophisticated Admin Dashboard
Located at `/admin`, this area allows company employees to manage the project portfolio.
- **Demo Mode**: Automatically detects if Supabase is unavailable and falls back to `LocalStorage` for demonstration purposes.
- **Project Management**: Create, edit, and delete projects with multiple sections and images.
- **Activity Log**: Audits all changes made within the dashboard for security and tracking.

---

## 7. The Data Layer & Architecture

To ensure the app remains functional during migration and development, we use a **Repository Pattern** located in `lib/gallery/`. This decouples the UI from the data source entirely.

### 7.1. How it works:
All components request data from repositories (e.g., `getProjects()`). The repository automatically detects if a real Supabase backend is configured.
- **If Supabase is configured**: Fetches live data from the database.
- **If NOT configured**: Falls back to `lib/mockDb.ts` which uses `localStorage` to simulate a database.

### 7.2. Repository Structure:
- `projectRepository.ts`: Handles project CRUD operations.
- `userRepository.ts`: Manages admin users and session state.
- `logRepository.ts`: Handles activity logging for the dashboard.

> [!IMPORTANT]
> **NEVER** bypass the repository layer to call Supabase directly in a component. This ensures the "Demo Mode" continues to work for stakeholders without technical setups.
---

## 8. Development Workflow

### Local Setup
1. **Clone**: `git clone https://github.com/mhghazy/dar-elmeamar-next-v2`
2. **Install**: `npm install`
3. **Environment**: Copy `.env.local.example` to `.env.local`.
4. **Run**: `npm run dev` (Access at `http://localhost:3000/dar-elmeamar-next-v2`)

### Environment Variables
| Variable | Description | Default/Example |
|:---|:---|:---|
| `NEXT_PUBLIC_MOCK_AUTH` | Bypasses login requirement in dev/demo | `true` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `your-project-url` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | `your-anon-key` |

---

## 9. SEO & Localization

### Multi-language Support
The project uses a custom `LanguageContext` to handle **English (EN)** and **Arabic (AR)**.
- Translations are stored in `locales/translations.ts`.
- The `isRTL` flag automatically flips the layout direction and fonts.
- **SEO Metadata**: Every page exports a `metadata` object that includes localized titles and descriptions.

### Search Engine Optimization
- **Sitemap**: Generated to `out/sitemap.xml` excluding admin routes.
- **Robots.txt**: Configured to allow crawlers to all public pages but block `/admin` and `/api`.
- **JSON-LD**: `Organization` and `LocalBusiness` schemas are injected in `app/layout.tsx` for rich search results.
- **Dynamic OG Image**: Automatically generates branded preview images for social media sharing.

---

## 10. Deployment Strategy

### Current: GitHub Pages (Demo/Static)
- **Config**: `output: 'export'` and `basePath` are set in `next.config.mjs`.
- **Limitation**: Server-side features (Middleware, real Server Actions) are mocked or disabled.
- **Deployment**: Handled automatically by GitHub Actions (`.github/workflows/nextjs.yml`).

### Future: Vercel (Production/Full-Stack)
To enable the full power of the dashboard, the following steps are required:
1. Purchase `darelmeamar.com`.
2. Connect the repository to Vercel.
3. Remove `output: 'export'` and `basePath` from `next.config.mjs`.
4. Update `NEXT_PUBLIC_MOCK_AUTH` to `false` in Vercel environment variables.
5. Setup real Supabase Auth and Database.

---

## 11. Known Issues & Maintenance

1. **Mock Auth**: The login page currently accepts any credentials because of `NEXT_PUBLIC_MOCK_AUTH=true`. This MUST be disabled in production.
2. **Asset Resolution**: All images MUST use the `assets.resolveUrl()` utility to handle the `basePath` correctly on GitHub Pages.
3. **Middleware**: Next.js Middleware does not run on GitHub Pages. Protected routes are currently "soft-protected" in the UI.

---

Created & Maintained by **Mahmoud Hamdy Ghazy**
*Copyright © 2026 Dar El-Meamar. All Rights Reserved.*
