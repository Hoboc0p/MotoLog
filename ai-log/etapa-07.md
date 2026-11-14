# Stage 7: AI log

## Tools

- Gemini

## Conversations

- <https://share.gemini.google/kVOwuLveUqdA>

## Key requests

### 1. Controlled Form and Validation Implementation
- Asked: Guide the implementation of a controlled form in React for adding new maintenance logs, including data validation and submitting data to the server before updating UI.
- Got: Created `TaskForm.jsx` (styled as `.garage-form`) featuring controlled inputs (`value` + `onChange`) for title, motorcycle ID, category, and cost. Included local validation throwing custom error messages and handling the `disabled` state during submission. 
- Changed or rejected: Maintained the complex garage layout by placing the new form directly within the left `garage-sidebar` panel instead of standardizing to the guide's simple layout. Adapted field names and sample values to match MotoLog's specific JSON schema (`motoId`, `cost`, `type`).

### 2. Full CRUD Operations and Remote State Sync
- Asked: Expand the API module to support POST, PATCH, and DELETE operations, and refactor the `App.jsx` handler functions to execute server requests before modifying the React state.
- Got: Added a central `request()` helper function in `api.js` to manage headers and response parsing. Updated `handleAdd`, `handleToggle`, and `handleDelete` in `App.jsx` to await server confirmation.
- Changed or rejected: -

### 3. Automated Testing Preparation
- Asked: Configure the project for the automated grading script.
- Got: Created `tw.json` mapping database keys and providing `sample` data. Added `data-testid` and `data-id` attributes to `TaskForm.jsx`, `InterventieCard.jsx`, and `InterventiiList.jsx` according to specifications.

## What I learned / what did not work
- Mastered the "controlled component" pattern in React where the form inputs are driven entirely by `useState`, preventing the browser from managing DOM state independently.
- Understood the "Server First, State Second" architecture: saving data to the backend via POST/PATCH before updating the frontend array ensures that the UI only reflects successfully persisted data and correctly utilizes server-generated IDs.
- Learned to prevent default form submission behaviors (`e.preventDefault()`) to avoid page reloads that clear React state.
- Realized the necessity of clearing previous error messages (`setEroare("")`) on a new submit attempt to avoid stale UI feedback.