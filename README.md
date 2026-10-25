# MotoLog
A web application designed to track motorcycle maintenance logs and scheduled service tasks.
It helps riders and mechanics organize repairs, inspections, and consumable replacements efficiently.

## Data model

| Field | Type | Notes |
| --- | --- | --- |
| title | text | required, max 100 chars (bike model + task) |
| is_done | boolean | toggled from the list, default false |
| type | fixed values | Consumables, Repair, Inspection |
| system | relation | Transmission, Brakes, Engine, Electrical (from stage 10) |
| user | relation | the owner of the item (from stage 11) |

Sample data used across all stages:
1. Yamaha MT-07 - Oil and filter change, active, Consumables
2. Honda Hornet - Brake pads replacement, done, Repair
3. Kawasaki Ninja 400 - Chain slack check, active, Inspection

## AI usage

| Tool | Used for |
| --- | --- |
| Gemini | data model structure, Stage 1 html and css layout, generating JavaScript code, help with console tests |


Details per stage: see the `ai-log/` folder.

## How to run
Open `index.html` in a browser. No build step, no server.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [ ] Stage 5: local state and events

## Stage 2: data logic
Plain JavaScript, no DOM. moto.js holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Stage 3: Vite and React project
The app now lives in frontend/, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.

## How to run
cd frontend
npm install
npm run dev
Then open the address printed in the terminal (http://localhost:5173).

## Stage 4: components
The list is rendered from the data, through two components:
- `InterventiiList` receives the whole array and renders one card per item
- `InterventieCard` receives a single item through props and displays it


## Checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/README.md?plain=1#L1-L33) | read |
| S1-R2 | AI usage section | [README.md](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/README.md?plain=1#L20-L26) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/ai-log/etapa-01.md?plain=1#L1-L29) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L..-L..](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/index.html#L10-L63) | open the page |
| S1-R5 | finished card looks different | [style.css#L..](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/style.css#L161-L164) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [desktop](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/style.css#L60-L68), [mobile](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/style.css#L171-L175) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [focus](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/style.css#L166-L169), [darkmode](https://github.com/Hoboc0p/MotoLog/blob/639428ee690823ea8a569ad1592a912a4135fa35/style.css#L20-L29) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [commit](https://github.com/Hoboc0p/MotoLog/commit/639428ee690823ea8a569ad1592a912a4135fa35) | commit history |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html#L..](https://github.com/Hoboc0p/MotoLog/blob/573d4f5c660e9a0afb9e477266d1fc469702a50c/index.html#L66) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [interventii.js#L..-L..](https://github.com/Hoboc0p/MotoLog/blob/573d4f5c660e9a0afb9e477266d1fc469702a50c/interventii.js#L4-L8) | read |
| S2-R3 | list, count, search, add, toggle, delete | [interventii.js#L..-L..](https://github.com/Hoboc0p/MotoLog/blob/573d4f5c660e9a0afb9e477266d1fc469702a50c/interventii.js#L10-L63) | console output |
| S2-R4 | add rejects empty name and invalid tag | [interventii.js#L..-L..](https://github.com/Hoboc0p/MotoLog/blob/573d4f5c660e9a0afb9e477266d1fc469702a50c/interventii.js#L31-L42) | read |
| S2-R5 | original array unchanged after add | [interventii.js#L..](https://github.com/Hoboc0p/MotoLog/blob/573d4f5c660e9a0afb9e477266d1fc469702a50c/interventii.js#L74) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](https://github.com/Hoboc0p/MotoLog/blob/main/README.md#stage-2-data-logic), [ai-log/etapa-02.md](https://github.com/Hoboc0p/MotoLog/blob/main/ai-log/etapa-02.md#stage-2-ai-log) | read |
| S2-R7 | commit "Stage 2" pushed | [commit](https://github.com/Hoboc0p/MotoLog/commit/573d4f5c660e9a0afb9e477266d1fc469702a50c) | commit history |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/Hoboc0p/MotoLog/blob/56285b3d04f55c82a553c40b4a54b00fb0315513/frontend/package.json#L6-L11) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [frontend/src/App.jsx#L..-L..](https://github.com/Hoboc0p/MotoLog/blob/56285b3d04f55c82a553c40b4a54b00fb0315513/frontend/src/App.jsx#L6-L19) | edit data, save |
| S3-R3 | data from README, not from the example | [frontend/src/App.jsx#L..-L..](https://github.com/Hoboc0p/MotoLog/blob/56285b3d04f55c82a553c40b4a54b00fb0315513/frontend/src/App.jsx#L2-L4) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/Hoboc0p/MotoLog/blob/56285b3d04f55c82a553c40b4a54b00fb0315513/frontend/src/App.css#L1-L182) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/Hoboc0p/MotoLog/blob/56285b3d04f55c82a553c40b4a54b00fb0315513/frontend/.gitignore#L10) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](https://github.com/Hoboc0p/MotoLog/blob/main/README.md#stage-3-vite-and-react-project), [ai-log/etapa-03.md](https://github.com/Hoboc0p/MotoLog/blob/main/ai-log/etapa-03.md#stage-3-ai-log) | read |
| S3-R7 | commit "Stage 3" pushed | [commit](https://github.com/Hoboc0p/MotoLog/commit/56285b3d04f55c82a553c40b4a54b00fb0315513) | commit history |