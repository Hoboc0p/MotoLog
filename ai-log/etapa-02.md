# Stage 2: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/atzoD8M55J9r>

## Key requests

### 1. JavaScript Data Logic Implementation
- Asked: Implement the data logic in JavaScript for the MotoLog application (listing, filtering, searching, immutable adding with validation, status toggling, deleting) and provide console tests according to Stage 2 requirements.
- Got: Complete JavaScript code using array methods and structured console test suites.
- Changed or rejected: Modified function names to English names (`listTitles`, `countActive`, `searchByTitle`, `addLog`, `toggleStatus`, `deleteLog`) while keeping Romanian maintenance item titles and types (`Consumabile`, `Reparație`, `Inspecție`).

### 2. Code Breakdown and Explanation
- Asked: Step-by-step explanation of each code block to understand the data logic.
- Got:
  - `TIPURI` & `logs`: Defined allowed tag values and the initial array of objects with unique IDs.
  - `listTitles(list)`: Extracted titles using `.map()`.
  - `countActive(list)`: Filtered active items (`!is_done`) using `.filter()` and counted them via `.length`.
  - `searchByTitle(list, text)`: Performed case-insensitive searching with `.toLowerCase()` and `.includes()`.
  - `nextId(list)`: Computed the next unique ID (`Math.max + 1`) using `.reduce()` to prevent duplicate IDs after deletions.
  - `addLog(list, title, type)`: Validated inputs (non-empty trimmed title and allowed type in `TIPURI`) and returned a new array using `[...list, newItem]`.
  - `toggleStatus(list, id)`: Toggled completion status immutably with `.map()` and `{ ...item, is_done: !item.is_done }`.
  - `deleteLog(list, id)`: Removed an item by ID immutably using `.filter()`.
  - Console test suite: Demonstrated immutability (original array retained 3 items) and validation error handling.
- Changed or rejected: Incorporated the detailed explanations into the development notes to ensure a clear understanding of immutability concepts.

## What I learned / what did not work
- Understood array immutability: functions must not mutate existing arrays via `push` or direct assignment, but return new references using the spread operator (`...`).
- Calculating the next unique ID must be based on the maximum existing ID via `reduce`, rather than `length + 1`, to avoid duplicate keys after deletion.
- Business and data logic can be developed, tested, and verified entirely inside the browser console before connecting it to the DOM.