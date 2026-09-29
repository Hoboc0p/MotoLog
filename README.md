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