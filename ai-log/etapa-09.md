# Stage 9: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/6b7zscEaCT9e>

## Key requests

### 1. Express Backend, Validation, and Frontend Integration
- Asked: Guide the implementation of Stage 9 for MotoLog by replacing `json-server` with a custom Node.js + Express REST API.
- Got: Express backend structure (`package.json`, `.env.example`, `.gitignore`, `src/app.js`, `src/server.js`, `src/validation.js`, `src/routes/interventii.js`), `curl` verification commands, `api.js` error parsing update, and removal of `json-server`.
- Changed or rejected: -

## What I learned / what did not work
- Learned how to structure an Express 5 API with middleware (`cors`, `express.json`), route modules, 404 fallback, and centralized error handling.
- Implemented server-side whitelist validation returning `400` with `{ error: "..." }` and proper REST status codes (`200`, `201`, `204`, `404`).
- Understood how CORS works between `localhost:5173` and `localhost:3001`, and why `api.js` keeps frontend changes minimal when swapping backends.