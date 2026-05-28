---
name: design-shotgun
description: Visual brainstorming for UI direction. Write N self-contained HTML variants for the same screen, screenshot each, Read them inline so the user can compare side-by-side, then pick a direction. Use when the user says "explore designs", "show me options", "design variants", or hasn't decided on a visual direction yet.
---

# design-shotgun — vanilla

Brainstorm visual design directions by writing multiple HTML variants and showing them to the user. Pure HTML + headless Chrome screenshots. No image generation API needed.

## When to use

- User has a screen in mind but no visual direction
- User says "I don't like how this looks" about an existing page
- Before any serious build, to get alignment on look-and-feel

## Workflow

### 1. Understand the screen
Ask if unclear:
- What page is this for?
- Who's the audience?
- One sentence: what's the user trying to do here?
- Any references (sites/apps you admire)?
- What to avoid?

Check for `DESIGN.md` in the project — if it exists, default to following it unless the user explicitly wants to break out.

### 2. Propose N concepts (BEFORE writing any HTML)
Present 3-4 **distinct directions** in plain English. Each should be a real creative call, not a minor variation.

```
I'll explore 3 directions:

A) "Editorial Calm" — serif display type, lots of whitespace, magazine layout, single accent color
B) "Energetic Tech" — bold sans, gradient accents, geometric blocks, dark mode
C) "Brutalist Minimal" — mono type, grid lines, no rounded corners, raw HTML feel

Confirm before I write the HTML.
```

Get user buy-in. If they want to swap a concept, do it. Two rounds max, then commit.

### 3. Write N HTML variants
- Output to `variants/v1.html`, `variants/v2.html`, etc.
- Each fully self-contained (inline `<style>`, no external CSS / JS frameworks)
- Same content across variants — only the visual approach changes
- Real copy, not lorem ipsum
- Each ~150-300 lines max

### 4. Screenshot each
Use the `browse` skill (headless Chrome). Save PNGs alongside the HTML:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for v in variants/*.html; do
  name=$(basename "$v" .html)
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --screenshot="variants/${name}.png" \
    --window-size=1440,900 \
    "file://$(pwd)/$v"
done
```

### 5. Show inline
Read each PNG in order. The user sees them in chat:

```
Read variants/v1.png
Read variants/v2.png
Read variants/v3.png
```

### 6. Ask for direction
```
Which direction works? Common patterns:
- "Go with B" (pick one cleanly)
- "B's layout, A's typography" (remix)
- "None — all feel too [X]. Try [Y]" (regenerate)
```

### 7. Iterate or commit
- **Remix**: write a v4 combining elements, screenshot, Read, show again
- **Regenerate**: go back to step 2 with new concepts
- **Commit**: write a short note to `variants/APPROVED.md` capturing the choice + why

## Quality bar for variants

Each variant must:
- Look **intentional**, not generic
- Have a clear hierarchy (one obvious primary thing on screen)
- Use real type sizes (not all 16px)
- Avoid AI-slop tells: random emoji, default border-radius everywhere, gradient backgrounds without purpose

## Pass to design-html

When the user approves a direction, hand off to `/design-html` for the production version. Reference the approved variant file in the handoff.
