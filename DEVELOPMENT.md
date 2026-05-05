# Local Development Guide

This guide explains how to set up the Dar El Meamar project and its Admin Dashboard on your local machine.

## 1. Prerequisites
- Node.js 18+ 
- npm or yarn

## 2. Installation
```bash
npm install
```

## 3. Environment Configuration
Create a `.env.local` file in the root directory. You can use the following template for a quick start:

```env
# Bypass authentication for local dashboard testing
NEXT_PUBLIC_MOCK_AUTH=true

# (Optional) Supabase Configuration
# If these are missing, the app defaults to using browser LocalStorage
# NEXT_PUBLIC_SUPABASE_URL=your-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## 4. Running the Project
```bash
npm run dev
```
The site will be available at `http://localhost:3000`.

## 5. Accessing the Dashboard
Go to [http://localhost:3000/admin](http://localhost:3000/admin).

### How it works in Mock Mode:
- **Login**: Click the login button. With `NEXT_PUBLIC_MOCK_AUTH=true`, any email/password will work, or it will skip the check entirely.
- **Data**: Projects and activity logs will be saved to your browser's **LocalStorage**. 
- **Persistence**: Your changes will persist as long as you use the same browser and don't clear your site data.
- **Production Sync**: To move data to production, you will need to set up Supabase and add the real keys to your `.env.local`.

## 6. Building for Production (Static Export)
To test the production build locally:
```bash
npm run build
```
The static files will be generated in the `out/` directory.
