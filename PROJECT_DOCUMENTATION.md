# Dar El Meamar Landing Project Documentation

Welcome to the full documentation for **Dar El Meamar**, a high-end architectural and construction firm's landing page. This project is built using modern web technologies to provide an immersive, luxurious, and performant experience.

---

## 1. Project Overview

**Dar El Meamar** is a premier global construction and architectural design firm. The website showcases their portfolio, services, and luxury living concepts.

- **URL**: [https://mhghazy.github.io/dar-elmeamar-next-v2](https://mhghazy.github.io/dar-elmeamar-next-v2)
- **Primary Goal**: Showcase luxury residential and commercial projects with a cinematic user experience.
- **Key Features**:
  - Immersive cinematic gallery with horizontal scrolling.
  - Multi-language support (English & Arabic).
  - Admin Dashboard for project management.
  - Dark/Light mode support.
  - Advanced animations and interactive backgrounds.

---

## 2. Tech Stack

### Core
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Context (LanguageContext)
- **Backend/DB**: [Supabase](https://supabase.com/) (with Mock Layer fallback)

### UI & Styling
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Motion](https://motion.dev/)
- **3D/Graphics**: [Three.js](https://threejs.org/), [OGL](https://github.com/o-gl/ogl), [Vanta.js](https://www.vantajs.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

### Localization
- **Library**: `i18next`, `react-i18next`
- **Management**: Custom `LanguageContext` for seamless switching.

---

## 3. Project Structure

```text
dar-el-meamar-next/
├── app/                    # Next.js App Router (Routes & Layouts)
│   ├── (dashboard)/        # Dashboard specific routes
│   ├── (public)/           # Public facing pages (Home, Gallery, etc.)
│   ├── admin/              # Admin-only routes (Dashboard, Login)
│   ├── layout.tsx          # Root Layout (Providers, Metadata, SEO)
│   └── globals.css         # Global styles & Tailwind directives
├── components/             # Reusable UI Components
│   ├── Gallery.tsx         # The cinematic gallery component
│   ├── Hero.tsx            # Landing hero section with Vanta background
│   ├── Navbar.tsx          # Responsive navigation with language switcher
│   ├── Works.tsx           # Project showcase section
│   └── Tools/              # Utility components (ThemeProvider, etc.)
├── context/                # React Contexts
│   └── LanguageContext.tsx # Manages EN/AR state and translations
├── lib/                    # Data Layer & External Integrations
│   ├── supabase/           # Supabase client configuration
│   ├── gallery/            # Project & User repositories
│   ├── assets/             # Asset Facade for URL resolution
│   └── mockDb.ts           # LocalStorage-based mock database
├── locales/                # Translation JSON files (en/ar)
├── utils/                  # Animation & Helper functions
└── public/                 # Static assets (images, fonts, etc.)
```

---

## 4. Core Features

### 4.1. Cinematic Gallery
A high-performance gallery using horizontal scrolling and Framer Motion for smooth transitions. Projects are grouped by category and feature high-resolution visuals.

### 4.2. Localization (i18n)
The site supports English and Arabic. The `LanguageProvider` wraps the application, providing the current language and a function to toggle it. Metadata and SEO tags are also localized.

### 4.3. Admin Dashboard
A sophisticated management area accessible at `/admin`.
- **Demo Mode**: Automatically detects if Supabase is unavailable and falls back to `LocalStorage` for demonstration purposes.
- **Project Management**: Create, edit, and delete projects with multiple sections and images.
- **Auto-Translation**: Integrated with a translation service to automatically generate Arabic content from English input.
- **Activity Log**: Audits all changes made within the dashboard.

### 4.4. Interactive Backgrounds
Uses **Vanta.js** and **Three.js** to create dynamic, responsive backgrounds that respond to mouse movement, enhancing the premium feel.

---

## 5. Architecture & Data Flow

### Data Layer Abstraction
The project uses a repository pattern (`lib/gallery/`) to decouple the UI from the data source.
- `projectRepository.ts`: Handles project CRUD operations.
- `userRepository.ts`: Manages admin users.
- `logRepository.ts`: Handles activity logging.

Each repository checks for `isUiMode` (Mock mode) to decide whether to hit the Supabase API or use the local `mockDb.ts`.

### State Management
- **Theming**: `next-themes` manages the dark/light mode state.
- **Language**: `LanguageContext` handles i18n state and provides translation keys.

---

## 6. Development Workflow

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
NEXT_PUBLIC_MOCK_AUTH=true # Set to true to bypass auth in local dev
```

### Running Locally
```bash
npm run dev
```

---

## 7. SEO & Performance

- **Metadata**: Optimized per-page metadata in `layout.tsx` and specific page files (`about`, `services`, etc.) with localized titles and descriptions.
- **Sitemap/Robots**: Automated generation using `next-sitemap`. Configured to exclude admin areas and optimized for GitHub Pages.
- **Dynamic OG Image**: Implemented `opengraph-image.tsx` using `next/og` for a high-end, dynamic preview image.
- **Structured Data**: Integrated `LocalBusiness` and `Organization` JSON-LD in the root layout for improved search engine rich results.
- **Image Optimization**: Extensive use of `next/image` and `sharp` for responsive and optimized image loading.

- **Performance**: Documented in `PERFORMANCE_OPTIMIZATION.md`.

---

## 8. Deployment

The project is configured for **Static Export** (`output: 'export'`) to be hosted on GitHub Pages.
- **Build Command**: `npm run build`
- **Output**: The `out/` directory contains the static files.
- **Asset Handling**: All assets are resolved through `assetFacade.ts` to ensure correct paths on GitHub Pages.

---

Created by **Antigravity AI** for **Dar El Meamar**.
