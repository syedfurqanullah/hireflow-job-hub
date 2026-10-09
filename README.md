# HireFlow Job Hub

HireFlow is a frontend-only job discovery demo built with React, Vite, React Router, and Tailwind CSS. It uses the Adzuna jobs API to browse listings and stores saved jobs and demo sessions in the current browser.

## Run locally

1. Install Node.js LTS and npm.
2. Copy `.env.example` to `.env` and add your Adzuna credentials.
3. Run `npm install` and `npm run dev`.

Available commands: `npm run dev`, `npm run build`, `npm run preview`, and `npm run lint`.

## Environment variables

```env
VITE_ADZUNA_APP_ID=
VITE_ADZUNA_APP_KEY=
VITE_ADZUNA_COUNTRY=us
VITE_LOGO_DEV_TOKEN=
```

The `.env` file is ignored by Git. Vite variables prefixed with `VITE_` are included in browser code, so API tokens are visible to visitors. Use provider-side restrictions and quotas; a production app that needs secret credentials requires a server-side proxy.

## Frontend demo limitations

- Sign up and sign in create a local browser demo session; they do not authenticate against a server.
- Dashboard access checks that local demo session. This is UI behavior, not a security boundary.
- Saved jobs stay in browser storage and are not synced between devices.
- The application form validates input locally. It does not upload a resume, send an application, or track employer status.
- Job descriptions and fields depend on the listings returned by Adzuna. Skills and requirements may be absent when the source listing does not provide them separately.
- Hero job and company figures reflect the current API feed. The API does not provide HireFlow user totals or ratings, so those are shown as unavailable.

## Project structure

```text
src/
  components/  Shared and feature UI
  layouts/     Shared page layouts
  pages/       Route screens
  routes/      Route definitions and frontend access checks
  services/    Adzuna API, local demo auth, and saved jobs
```

## Verification

Run `npm run lint` and `npm run build` before sharing changes. The project does not yet include automated browser or component tests; check the main flows at phone, tablet, desktop, and wide-screen widths before release.
