# Stage 4: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/ak59AxZYUPW7>

## Key requests

### 1. Component Extraction and Rendering
- Asked: Guide the implementation of Stage 4 for MotoLog by replacing raw JSON with reusable React components according to guidelines.
- Got: Two modular components (`InterventieCard.jsx` and `InterventiiList.jsx`), updated `App.jsx`, prop destructuring, empty list handling, and badge class mapping.
- Changed or rejected: -

## What I learned / what did not work
- Understood the unidirectional data flow in React via props (parent to child).
- Learned the importance of the `key={interventie.id}` prop placed on the outermost mapped element to help React track items reliably.
- Implemented conditional rendering for empty states using an early return.