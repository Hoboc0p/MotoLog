# Stage 3: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/FMZrzAUhfM4S>

## Key requests

### 1. App.jsx implementation and data migration
- Asked: How to migrate the maintenance data array from stage 2 into frontend/src/App.jsx and compute active items while keeping raw JSON output for stage 3?
- Got: The App component structure placing the array outside the function, calculating active items with .filter(), and rendering the header alongside a <pre> element with JSON.stringify.
- Changed or rejected: Adapted the data array to strictly match the MotoLog data model (title, is_done, type) instead of the TaskFlow example.

### 2. Explanation of React App component logic
- Asked: Explain step-by-step how the App function works in React and JSX.
- Got: A concise breakdown covering JSX fragments (<>...</>), className attributes, and curly brace expression interpolation.
- Changed or rejected: Kept the explanations as notes for project evaluation questions.

### 3. Stage 3 verification checklist
- Asked: Generate the verification table for README.md according to the stage 3 requirements.
- Got: The Markdown table mapping IDs S3-R1 through S3-R7 to requirement descriptions and check methods.
- Changed or rejected: None; replaced permalink placeholders with actual commit links after pushing.

## What I learned / what did not work
- Understood why static data arrays are defined outside the React component function to prevent recreation on every re-render.
- Practiced JSX differences compared to HTML (closing tags, `className`, using `{}` for expressions).
- I learned how Vite serves a React application locally and the primary syntax rules of JSX compared to plain HTML. Moving static data outside the component avoids unnecessary re-evaluations during component renders.