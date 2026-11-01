# Stage 5: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/QKRzczrK0JI1>

## Key requests

### 1. Interactive State Management and Stage 5 Core Requirements
- **Asked:** Guide the implementation of Stage 5 according to the laboratory specifications by making the maintenance list interactive using `useState`, handling toggling and deletions, updating derived header counters, and implementing a dark/light theme switcher.
- **Got:** 
  - State initialization in `App.jsx` using `useState`.
  - Immutable handler functions (`handleToggle` with `.map()` and `handleDelete` with `.filter()`).
  - Propagation of handler functions via props down through `InterventiiList` to `InterventieCard`.
  - Controlled checkbox inputs (`checked` + `onChange`) and accessible delete buttons (`aria-label`).
  - Theme switching logic updating React state and writing `data-theme` to `document.documentElement`.
- **Changed or rejected:** Preserved project-specific naming conventions (`InterventiiList`, `InterventieCard`, `interventii`) and Romanian entity attributes.

### 2. UI Overhaul & Workshop Racing Aesthetics
- **Asked:** Redesign the user interface beyond the standard guide mockup into a modern, mechanical workshop / racing garage look, including a custom motorcycle-themed cursor.
- **Got:** 
  - Custom dark industrial palette (deep asphalt/carbon backgrounds, KTM-inspired racing orange accents `#f95700`, category-specific color badges).
  - Custom SVG wrench cursor embedded as a data URI for default and interactive elements.
  - Distinct active and completed card styles with border accents and smooth hover elevations.

### 3. Advanced Garage & Service Features
- **Asked:** Implement original features to enhance functionality and differentiate the project:
  - Progress bar for overall service completion.
  - Multi-bike fleet selector ("Garajul Meu" 2-column sidebar layout).
  - Cost and budget tracking (paid vs. remaining costs calculated live).
  - Quick category filtering pills (Toate, Consumabile, Reparație, Inspecție).
  - Bulk action to clear completed service tasks ("Curăță finalizate").
  - Digital Service Sheet modal ("Fișă Service") with one-click clipboard export.
- **Got:** 
  - Two-column responsive dashboard (`.container-garage`) with motorcycle fleet filters (`MOTOCICLETE`).
  - Multi-criteria derived filtering combining both bike ID and maintenance type.
  - Real-time financial metrics (`costAchitat`, `costRamas`) rendered inside the mini-dashboard.
  - Clean modal window displaying maintenance summaries and a copy-to-clipboard text report generator.

## What I learned / what did not work
- **Immutable State Updates:** Learned why direct mutations (`push`, `splice`, or property assignment) fail to trigger proper re-renders, and mastered functional updater patterns (`setInterventii(prev => ...)`) with `.map()` and `.filter()`.
- **Derived State vs. Redundant State:** Maintained counts (`total`, `active`, `finalizate`), budget figures (`costAchitat`, `costRamas`), and the completion percentage purely as derived values recalculated on each render, eliminating synchronization bugs.
- **Controlled Elements & Event Bubbling:** Understood the necessity of binding `checked` with `onChange` on form inputs to avoid React console warnings, and used `e.stopPropagation()` in modal containers to prevent background click closures.
- **CSS Variable Theming:** Managed light and dark modes through CSS custom properties toggled by a top-level `data-theme` attribute, respecting system preferences as default.