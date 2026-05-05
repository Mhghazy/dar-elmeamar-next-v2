# Dar El Meamar Landing

[![Project Documentation](https://img.shields.io/badge/Documentation-Full%20Guide-teal)](./PROJECT_DOCUMENTATION.md)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Setting up Supabase (For Future Developers)

This project is currently using a **Mock Data Abstraction Layer**. To integrate real backend functionality, follow these steps to connect Supabase:

1. **Create a Supabase Project:**
   Go to [Supabase](https://supabase.com/) and create a new project.

2. **Configure Environment Variables:**
   Rename `.env.local.example` to `.env.local` and add your project keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Install Dependencies:**
   Run the following command to install the Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

4. **Database Schema:**
   Create a table named `gallery` in your Supabase SQL editor with the following schema:
   ```sql
   create table public.gallery (
     id uuid default gen_random_uuid() primary key,
     title text not null,
     url text not null,
     category text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```

5. **Storage:**
   Create a public bucket named `gallery` in Supabase Storage.

6. **Update the Abstraction Layer:**
   Replace the mock implementations in `lib/data/gallery.ts` with the actual Supabase client queries. Follow the TODO comments in the file.

7. **Auth:**
   Replace the mock auth logic in `middleware.ts` with real Supabase Auth checks and implement a login flow.
