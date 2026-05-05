# Dar El-Meamar — Complete Developer Handbook
### دار المعمار — دليل المطور الكامل
Last Updated: May 2026
Author: Mahmoud Hamdy Ghazy
Version: 2.0 (Next.js Migration)

---

## 1. Project Overview

**Dar El-Meamar** (House of Architecture) is a premier architectural design and construction firm based in Cairo, Egypt, with over 19 years of experience. This repository contains the second version of their digital presence, migrated from a static React/Vite site to a high-performance **Next.js 16** application.

- **Primary URL**: [https://mhghazy.github.io/dar-elmeamar-next-v2](https://mhghazy.github.io/dar-elmeamar-next-v2)
- **Production Domain**: [https://dar-el-meamar.com](https://dar-el-meamar.com) (Pending migration to Vercel)
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
| **three / vanta** | Latest | Visuals | Interactive 3D backgrounds for the Hero section. |

### Technologies NOT Used:
- **GSAP**: Dropped in favor of Framer Motion (reduces bundle size, native React integration).
- **WordPress**: Replaced by a custom Next.js Dashboard + Supabase for better performance and security.
- **Firebase**: Supabase chosen for its relational (PostgreSQL) capabilities and better developer experience.

---

## 3. Why Next.js?

The project was migrated from Vite/React to Next.js to solve several critical production issues:

1. **SEO Optimization**: Next.js provides server-side rendering (SSR) and static site generation (SSG). Search engines see the full content of the page immediately, unlike the previous version which sent an empty HTML shell.
2. **Performance**: Built-in Image Optimization (`next/image`) automatically serves WebP/AVIF images. Static Generation ensures sub-second page loads.
3. **Unified Codebase**: The Admin Dashboard and Public Site live in the same repository, sharing styles, components, and types.
4. **Data Security**: Middleware allows us to protect administrative routes on the server side (once migrated to Vercel).

---

## 4. Repository Structure

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
└── tailwind.config.ts       # Design system and theme configuration
```

---

## 5. The Data Layer (Crucial)

To ensure the app remains functional during migration and development, we use a **Repository Pattern** located in `lib/gallery/`.

### How it works:
All components request data from repositories (e.g., `getProjects()`). The repository automatically detects if a real Supabase backend is configured.
- **If Supabase is configured**: Fetches live data from the database.
- **If NOT configured**: Falls back to `lib/mockDb.ts` which uses `localStorage` to simulate a database.

> [!IMPORTANT]
> **NEVER** bypass the repository layer to call Supabase directly in a component. This ensures the "Demo Mode" continues to work for stakeholders without technical setups.

---

## 6. Development Workflow

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

## 7. SEO & Localization

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

## 8. Deployment Strategy

### Current: GitHub Pages (Demo/Static)
- **Config**: `output: 'export'` and `basePath` are set in `next.config.mjs`.
- **Limitation**: Server-side features (Middleware, real Server Actions) are mocked or disabled.
- **Deployment**: Handled automatically by GitHub Actions (`.github/workflows/nextjs.yml`).

### Future: Vercel (Production/Full-Stack)
To enable the full power of the dashboard, the following steps are required:
1. Purchase `dar-el-meamar.com`.
2. Connect the repository to Vercel.
3. Remove `output: 'export'` and `basePath` from `next.config.mjs`.
4. Update `NEXT_PUBLIC_MOCK_AUTH` to `false` in Vercel environment variables.
5. Setup real Supabase Auth and Database.

---

## 9. Known Issues & Maintenance

1. **Mock Auth**: The login page currently accepts any credentials because of `NEXT_PUBLIC_MOCK_AUTH=true`. This MUST be disabled in production.
2. **Asset Resolution**: All images MUST use the `assets.resolveUrl()` utility to handle the `basePath` correctly on GitHub Pages.
3. **Middleware**: Next.js Middleware does not run on GitHub Pages. Protected routes are currently "soft-protected" in the UI.

---

Created & Maintained by **Mahmoud Hamdy Ghazy**
*Copyright © 2026 Dar El-Meamar. All Rights Reserved.*
