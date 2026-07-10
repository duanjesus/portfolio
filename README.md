# Duan Jesus — Portfolio

Personal portfolio site: Hero, Tech Stack, Featured Projects, About, GitHub Activity, and Contact, plus a full case study page for each of the three projects it showcases (Social Supply Management, CashPilot, PulseHub).

## Stack

React 18 + TypeScript + Vite, Tailwind CSS, Framer Motion, React Router.

## Development

```bash
npm install
npm run dev
```

## Before deploying

Update the WhatsApp link in `src/sections/Contact.tsx` (marked with `TODO`) — everything else (résumé, LinkedIn, GitHub, email) is already wired up.

## Build

```bash
npm run build
```

Deploys as a static SPA — `vercel.json` includes a rewrite so client-side routes (`/projects/:slug`) don't 404 on refresh.
