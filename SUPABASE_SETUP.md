# Supabase Integration Guide

This project is designed to be "Supabase-Ready". It currently uses a **Repository Pattern** that automatically switches between a local Mock Database (LocalStorage) and a live Supabase instance based on your environment configuration.

## 1. Table Schema

To transition to production, create a `projects` table in your Supabase database with the following structure:

### `projects` Table
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key (Default: `gen_random_uuid()`) |
| `created_at` | `timestamptz` | Default: `now()` |
| `title` | `text` | English Project Title |
| `title_ar` | `text` | Arabic Project Title |
| `description` | `text` | English Description |
| `description_ar` | `text` | Arabic Description |
| `category` | `text` | e.g., "Residential", "Commercial" |
| `location` | `text` | English Location |
| `location_ar` | `text` | Arabic Location |
| `year` | `text` | Completion Year |
| `hero_image` | `text` | URL to the cover image |
| `sections` | `jsonb` | Array of sections (see format below) |

### `profiles` Table (User Management)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key (Link to `auth.users.id`) |
| `email` | `text` | Admin Email |
| `username` | `text` | Display Name |
| `role` | `text` | e.g., "admin", "superadmin" |
| `created_at` | `timestamptz` | Default: `now()` |
| `username` | `text` | Display Name |

### `activity_logs` Table
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `created_at` | `timestamptz` | Log Timestamp |
| `user_email` | `text` | Admin who performed action |
| `action` | `text` | e.g. "Created Project" |
| `target` | `text` | Name of project/user affected |
| `type` | `text` | "create", "update", "delete", "auth" |

> [!NOTE]
> To enable user management in the dashboard, set up a Supabase Trigger that automatically creates a profile when a user is invited/signs up, or allow the dashboard to insert directly into this table.

#### `sections` JSON Format
```json
[
  {
    "title": "Project Visuals",
    "title_ar": "مرئيات المشروع",
    "images": [
      { "src": "https://...", "alt": "View 1" }
    ]
  }
]
```

## 2. Storage Setup

1. Create a public bucket named `projects`.
2. Ensure the RLS (Row Level Security) policies allow **authenticated** users to upload/delete and **anonymous** users to read.

## 3. Environment Variables

Update your `.env.local` or Vercel environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Scaling for Future Developers

- **Project Repository**: All data access is centralized in `lib/gallery/projectRepository.ts`. If you need to add a new field (e.g., `client_name`), simply add it to the `Project` interface and it will automatically flow through the Dashboard and Gallery.
- **Image Handling**: The `assets.resolveUrl` utility in `lib/assets/assetFacade.ts` handles path normalization.
- **Translation Service**: The `lib/translationService.ts` can be upgraded from the free Google proxy to a paid API (Google Cloud / DeepL) for production reliability.

## 5. Transition Path
1. Set up the table and storage in Supabase.
2. Add your Supabase credentials to `.env.local`.
3. The application will automatically detect the credentials and stop using `localStorage`.
4. Use the **Admin Dashboard** to migrate/upload your first production projects.
