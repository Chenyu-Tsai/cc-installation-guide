---
name: design-html
description: Turn an approved design direction (from /design-shotgun) or a DESIGN.md system into a production-quality HTML/CSS page. Self-contained, responsive, semantic, accessible. Use when asked to "finalize this design", "turn this into HTML", "build me a page", or after design-shotgun lands.
---

# design-html — vanilla

Write a single production-grade HTML/CSS file from an approved design direction. No frameworks, no build step — just clean HTML + inline CSS the user can open in any browser.

## When to use

- After `/design-shotgun` produced an approved variant
- User says "implement this design" / "build me a page" / "turn this into HTML"
- DESIGN.md exists and you need to produce a page that follows it

## Workflow

### 1. Locate the source

One of:
- **Approved variant**: `variants/v2.html` from `/design-shotgun` + `variants/APPROVED.md` notes
- **DESIGN.md**: system tokens to follow
- **From scratch**: user describes the page, design system inferred or proposed inline

### 2. Confirm scope

Quick check:
- What page? (homepage / pricing / dashboard / etc.)
- What goes on it? (sections, content, CTAs)
- What's the user trying to do here?
- Where does this fit in the broader product?

### 3. Write the HTML

Single self-contained file (`prototype.html` or whatever the project wants). Inline `<style>`. No external assets unless absolutely necessary.

**Structure rules:**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Real heading hierarchy (one `<h1>`, then `<h2>`, `<h3>` in order)
- `alt` text on every `<img>`
- `aria-label` on icon-only buttons
- Focus styles visible (don't kill `outline` without replacement)

**CSS rules:**
- CSS variables for tokens (`--bg`, `--ink`, `--accent`) — match DESIGN.md exactly
- Mobile-first OR explicit desktop-first with media queries — pick one approach, consistent throughout
- No unused styles
- Avoid `!important`
- Spacing from the design scale, not random values

**Content rules:**
- Real copy, not lorem ipsum
- No emoji as decoration (unless the brand calls for it)
- Images: skip placeholder services; use a colored block with the intended subject as alt text if no real image yet

### 4. Screenshot

Use the `browse` skill:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for entry in "375x812:mobile" "768x1024:tablet" "1440x900:desktop"; do
  dims=${entry%%:*}; name=${entry##*:}
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --screenshot=/tmp/prototype-${name}.png \
    --window-size=${dims/x/,} \
    "file://$(pwd)/prototype.html"
done
```

### 5. Read PNGs to verify

```
Read /tmp/prototype-desktop.png
Read /tmp/prototype-tablet.png
Read /tmp/prototype-mobile.png
```

Check the rendered page against the approved direction. Things to verify:
- Does the type hierarchy match the variant?
- Is the accent color used correctly (not overused)?
- Spacing consistent?
- Anything obviously broken at smaller viewports?

### 6. Iterate

If anything's off:
- Edit the HTML
- Re-screenshot the affected viewport
- Re-Read
- Repeat until it matches

Iterate 2-3 rounds max. If still off, the design direction probably needs revisiting — go back to `/design-shotgun`.

### 7. Hand off

```bash
open prototype.html
```

Opens in the user's default browser for them to interact / share / continue editing.

## Quality bar

A workshop prototype should be:
- **Recognizable** — looks like the approved variant, not generic AI-template
- **Responsive** — readable + usable at 375 / 768 / 1440 widths
- **Semantic** — could pass a basic Lighthouse accessibility audit
- **Self-contained** — opens correctly with `open prototype.html`, no missing assets

A workshop prototype does NOT need to be:
- Pixel-perfect (it's a prototype, not production)
- Fully interactive (static is fine for visual review)
- Cross-browser tested (Chrome is the target)

## Pass to design-review

After this skill produces the prototype, suggest `/design-review` for a designer's-eye QA pass before declaring done.
