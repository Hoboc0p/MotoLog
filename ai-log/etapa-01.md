# Stage 1: AI log

## Tools
- Gemini

## Conversations
- <https://share.gemini.google/aqyZj0pZiguw> 

## Key requests

### 1. Data model validation
- Asked: Check if the MotoLog data model and sample entries comply with Stage 1 requirements.
- Got: Confirmation that the 5 fields and 3 sample entries strictly match the specification.
- Changed or rejected: Kept as proposed, no adjustments needed.

### 2. HTML and CSS mockup generation
- Asked: Generate semantic HTML and CSS adapted for the MotoLog maintenance theme.
- Got: Complete markup and stylesheet with CSS Grid, custom color variables, and dark mode support.
- Changed or rejected: Customized theme colors using an automotive-inspired palette (orange accent) and matching badge colors for intervention types.

### 3. CSS code breakdown and explanation
- Asked: Explain concisely what each CSS selector and block does in the generated stylesheet.
- Got: A categorized breakdown of all rules (box model reset, variables, grid layout, components, accessibility focus, and media queries).
- Changed or rejected: Accepted as reference to better understand accessibility and responsive breakpoints.

## What I learned / what did not work
- Defining theme colors in `:root` allows instant dark mode styling without duplicating CSS selectors.
- Proper box-sizing and semantic tags (`<header>`, `<section>`, `<form>`) make the layout cleaner and fully responsive.
- The `:focus-visible` pseudo-class is essential for accessible keyboard navigation without cluttering mouse clicks.