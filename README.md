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
| Gemini | data model structure, Stage 1 html and css layout |

Details per stage: see the `ai-log/` folder.

## How to run
Open `index.html` in a browser. No build step, no server.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript

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