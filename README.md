# HireFlow Job Hub

HireFlow Job Hub is a job-search platform frontend built with React. It is being developed as a place for job seekers to explore jobs and companies, manage applications, and maintain a profile.

> **Work in progress:** This project is not finished. The current app is an early frontend scaffold: the responsive navigation and shared layout are in place, while the main pages and user flows are still being built. Some routes currently show placeholder content. There is no backend or live job data yet.

## Current progress

- React single-page application with client-side routing.
- Shared public-site layout and responsive navigation.
- Initial reusable UI components and page components for jobs, companies, authentication, and a job-seeker dashboard.
- Home, jobs, companies, about, and contact routes are registered; several currently display placeholder content.

### Planned work

- Build out the job search, filters, job details, and company pages.
- Connect the existing page and component scaffolding to the app routes.
- Complete authentication, profile, and dashboard flows.
- Add data/API integration and finish responsive and accessibility checks.

Features are subject to change as development continues.

## Tech stack

- React
- Vite
- React Router
- Tailwind CSS

## Getting started

### Requirements

- Node.js (LTS recommended)
- npm

### Run locally

```bash
git clone <repository-url>
cd "HireFlow Job Hub"
npm install
npm run dev
```

Vite prints the local development URL in the terminal after the server starts.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## Project structure

```text
src/
├── components/   # Shared UI and feature components
├── layouts/      # Shared page layouts
├── pages/        # Page-level components in development
├── routes/       # Application route definitions
├── assets/       # Images and other imported assets
├── App.jsx       # Root app and router setup
└── main.jsx      # Application entry point
```

## Contributing

This project is actively being developed. Issues and pull requests are welcome; please keep in mind that structure and features may change while work is in progress.
