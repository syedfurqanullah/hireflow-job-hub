# HireFlow Job Hub

HireFlow Job Hub is a responsive React application for discovering jobs, exploring companies, saving opportunities, and preparing applications. It uses Vite, React Router, Tailwind CSS, and the Adzuna Jobs API. User accounts, saved jobs, applications, and theme preferences are stored locally in the current browser.

## Features

- Search and filter live job listings by keyword, location, category, type, experience, and salary.
- Browse companies and view related opportunities derived from the live job feed.
- Save jobs and review them from the protected dashboard.
- Create a local account with role-aware client-side access checks.
- Prepare an application, validate its fields, and track saved applications on the dashboard.
- Switch between light and dark themes with responsive layouts for mobile, tablet, and desktop.

## Tech stack

- React 19 and React Router
- Vite
- Tailwind CSS 4
- Adzuna Jobs API
- Lucide React icons

## Getting started

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal. For a production build:

```bash
npm run lint
npm run build
npm run preview
```

## Environment variables

Create an ignored local `.env` file for development, or configure these variables in Vercel Project Settings → Environment Variables before deploying:

```env
VITE_ADZUNA_APP_ID=your_app_id
VITE_ADZUNA_APP_KEY=your_app_key
VITE_ADZUNA_COUNTRY=us
```

Redeploy after changing Vercel variables. Because Vite exposes `VITE_` variables in the browser bundle, Adzuna credentials are visible to visitors. Restrict the provider credentials and quotas where possible. A production system that must keep credentials private should use a server-side proxy.

## Project structure

```text
src/
  components/  Reusable UI grouped by feature
  context/     Theme and toast providers/hooks
  layouts/     Shared application shells
  pages/       Route-level screens
  routes/      Route definitions and access guards
  services/    API, jobs, authentication, saved jobs, and applications
  assets/      Optimized visual assets
```

## Storage and application behavior

This repository is a frontend application, not a backend service. Local accounts use salted PBKDF2 password hashes, but browser storage is not a security boundary. Saved jobs, applications, theme preferences, and sessions do not sync between devices. Application forms are validated and recorded locally; submissions and employer status updates still happen through the original job listing.

## Deployment

The included `vercel.json` rewrites routes to `index.html`, allowing React Router pages to load on direct refresh. Connect the repository to Vercel, configure the environment variables for the required environments, and deploy the project with the default Vite build settings.

Before sharing a deployment, run lint and build locally, verify the main routes at multiple viewport sizes, and confirm that the configured Adzuna environment variables are available to the deployment.
