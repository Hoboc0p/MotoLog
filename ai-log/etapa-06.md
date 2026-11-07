# Stage 6: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/2VrVoGhk2cYV>

## Key requests

### 1. Mock REST API and Service Configuration
- Asked: Guide the setup of a mock REST backend for MotoLog using json-server and extract API calls into an isolated service module.
- Got: Configured `json-server@0.17.4` in `package.json`, initialized `db.json` with realistic motorcycle maintenance records, set up `src/api.js` using `fetch` with `res.ok` validation, and added `.env.example` defining `VITE_API_URL`.
- Changed or rejected: Preserved custom domain terminology (`interventii`) and attributes (`motoId`, `cost`, `type`) instead of reverting to generic guide names.

### 2. Asynchronous Data Fetching and UI Lifecycle States
- Asked: Connect `App.jsx` to the API on component mount, managing the three lifecycle states: loading, error, and success.
- Got: Integrated `useEffect` with an `ignore` cleanup flag, added `loading` and `error` states, and implemented styled UI feedback matching the dark industrial garage theme.
- Changed or rejected: Ensured existing garage features (bike fleet sidebar, dynamic cost calculator, and filters) work seamlessly with the asynchronously fetched data.

## What I learned / what did not work
- Learned how to trigger asynchronous operations on component mount using `useEffect` with an empty dependency array (`[]`).
- Understood why `fetch` does not throw exceptions on HTTP 404/500 responses and why checking `if (!res.ok)` is mandatory before parsing JSON.
- Mastered the cleanup pattern using a local `ignore` boolean flag inside `useEffect` to avoid race conditions and handle React's development-mode double mounting safely.
- Learned how to read environment variables in Vite via `import.meta.env` and apply nullish coalescing (`??`) for local defaults.
- Understood the architectural value of keeping HTTP requests centralized in `api.js` rather than calling `fetch` directly inside React components.