# Stage 8: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/1D2hDHDxGipo>

## Key requests

### 1. Routing, Multi-Page Structure, and CSS Modules
- Asked: Guide the implementation of Stage 8 for MotoLog: split the app into pages with React Router, add a detail page and 404 page, and migrate component styles to CSS Modules.
- Got: `BrowserRouter` setup in `main.jsx`, route map in `App.jsx`, shared `Layout`, `InterventiiPage`, `InterventieDetaliuPage`, `DesprePage`, `NotFoundPage`, `constants.js`, and individual `.module.css` files alongside a cleaned `index.css`.
- Changed or rejected: Adjusted `InterventieForm` to reuse motorcycle options from `constants.js` and preserved existing MotoLog features (dashboard stats, service sheet modal, theme toggle).

## What I learned / what did not work
- Understood SPA navigation with `<Link>`, `<NavLink end>`, and `<Outlet />` without full page reloads.
- Learned how to read dynamic route parameters via `useParams()` and re-fetch data when `[id]` changes, handling 404 responses cleanly.
- Migrated global styles into scoped `.module.css` files to prevent class name collisions while preserving all `data-testid` markers for automated checks.