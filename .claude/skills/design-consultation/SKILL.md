---
name: design-consultation
description: Build a project's design system through conversation. Propose aesthetic, typography, color, layout, and motion. Generate a preview HTML showing the system in action, then write DESIGN.md as the project's design source of truth. Use when starting a new project's UI, when asked for "design system" or "brand guidelines", or when no DESIGN.md exists.
---

# design-consultation — vanilla

Build the project's design system through conversation. Output is `DESIGN.md` at the project root, plus an optional `design-preview.html` to validate the system visually.

## When to use

- Starting a new project with no visual identity yet
- User says "design system" / "brand guidelines" / "what should this look like"
- Before `design-shotgun` or `design-html` if no DESIGN.md exists

## Workflow

### 1. Understand the product (5 questions)
Ask all five at once. Pre-fill what you can infer from the codebase / README / DESIGN.md if any exist.

1. **What does it do?** (one sentence)
2. **Who uses it?** (persona, expertise level — e.g. "senior UX researchers", "K-12 teachers", "Taiwan college students learning AI")
3. **What feeling should it have?** (calm / energetic / professional / playful / serious / craft / utilitarian)
4. **Any references?** (sites or apps you admire — "Linear's spacing", "Notion's typography", "Apple Music's color use")
5. **What to avoid?** (no emoji, no gradients, no rounded corners — explicit no-gos)

### 2. Propose the system (5 layers)

#### Aesthetic
One sentence visual concept. Example: "Editorial calm — magazine-style hierarchy, generous whitespace, serif display + sans body."

#### Typography
- **Display** font (for h1, h2, hero)
- **Body** font (for paragraphs, UI text)
- **Mono** font (for code, if relevant)
- **Scale**: h1 / h2 / h3 / body / small / micro in rem
- **Weights** used: 400, 600, 800 (e.g.)
- **Line-heights** by use

Prefer system fonts or Google Fonts free tier. Avoid 6 weights when 3 will do.

#### Color
6-8 tokens max:
| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #... | Page background |
| `--ink` | #... | Primary text |
| `--ink-2` | #... | Secondary text |
| `--muted` | #... | Tertiary text, captions |
| `--accent` | #... | CTA, links, emphasis |
| `--line` | #... | Borders, dividers |

Note brand color if known. Pick colors that pass WCAG AA contrast for text.

#### Layout
- **Grid**: 12-column / 8-column / fluid
- **Spacing scale**: 4 / 8 / 16 / 24 / 40 / 64 (px or rem)
- **Max content width**: 800px / 1200px / fluid
- **Border radius**: 0 / 4px / 8px (pick one scale, don't mix)

#### Motion
- **Philosophy**: subtle / playful / none
- **Default duration**: 150ms / 250ms
- **Default easing**: `ease-out` / `cubic-bezier(...)`
- When in doubt: less motion. Workshop prototypes rarely need it.

### 3. Preview HTML

Write `design-preview.html` showing the system in action. Include:

- **Type specimen**: each heading + body + small with real text
- **Color swatches**: each token as a labeled square
- **Components**: button (primary + secondary), card, input, link
- **Spacing demo**: a small grid showing the scale

### 4. Screenshot + Read

Use the `browse` skill to capture `design-preview.html` at desktop and mobile:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --screenshot=/tmp/design-preview-desktop.png \
  --window-size=1440,900 \
  "file://$(pwd)/design-preview.html"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --screenshot=/tmp/design-preview-mobile.png \
  --window-size=375,812 \
  "file://$(pwd)/design-preview.html"
```

Read both PNGs. Show inline.

### 5. Iterate

Ask the user:
- Does the type feel right?
- Are the colors what you imagined?
- Anything to swap?

Adjust the preview HTML, re-screenshot, re-Read. Two rounds max.

### 6. Write DESIGN.md

Once approved, write `DESIGN.md` to the project root using this structure:

```markdown
# Design System

## Aesthetic
[One-sentence visual concept]

## Typography
- Display: [font, weights]
- Body: [font, weights]
- Mono: [font] (if used)

| Role | Size | Line-height | Weight |
|------|------|-------------|--------|
| h1 | 3rem | 1.05 | 800 |
| h2 | 2.2rem | 1.1 | 800 |
| ... | ... | ... | ... |

## Color
| Token | Value | Use |
|-------|-------|-----|
| --bg | #... | Page background |
| --ink | #... | Primary text |
| ... | ... | ... |

## Layout
- Grid: [12-col / 8-col / fluid]
- Spacing scale: [4 / 8 / 16 / 24 / 40 / 64]
- Max content width: [px]
- Border radius scale: [0 / 4 / 8]

## Motion
- Philosophy: [subtle / playful / none]
- Default duration: [Xms]
- Default easing: [name]

## Components
[brief patterns: button styles, card patterns, input states]

## Avoid
- [explicit no-gos]
```

## Notes

- For existing projects with established visuals: skip steps 1-2, infer the system from existing code, present back for confirmation, then write DESIGN.md
- If user provides Figma / images of references: ask them to describe what they like about them in words. Don't try to OCR designs
