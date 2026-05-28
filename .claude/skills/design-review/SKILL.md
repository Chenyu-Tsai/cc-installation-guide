---
name: design-review
description: Designer's-eye QA on an HTML prototype or live URL. Screenshot at 3 viewports, list visual + usability issues with severity, then optionally fix them in code. Use when asked to "audit the design", "visual QA", "check if it looks good", or "design polish".
---

# design-review — vanilla

Visual + usability critique of an HTML prototype. Headless Chrome captures what the page actually renders. Claude reads the PNG and reviews like a designer.

## When to use

- After `design-html` produced a prototype and you want a second pass
- Before showing a prototype to a user / stakeholder
- When something "feels off" but you can't articulate why

## Workflow

### 1. Locate target
Ask: which HTML file (absolute path) or URL?

### 2. Capture 3 viewports

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TARGET="file://$(pwd)/prototype.html"   # or http://...

for entry in "375x812:mobile" "768x1024:tablet" "1440x900:desktop"; do
  dims=${entry%%:*}; name=${entry##*:}
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --screenshot=/tmp/review-${name}.png \
    --window-size=${dims/x/,} \
    "$TARGET"
done
```

### 3. Read each PNG
```
Read /tmp/review-mobile.png
Read /tmp/review-tablet.png
Read /tmp/review-desktop.png
```

Claude now sees the rendered output at each viewport.

### 4. Critique

Produce a structured list grouped by category:

#### Visual consistency
- Spacing inconsistencies (random padding values)
- Alignment problems (things that should line up but don't)
- Hierarchy issues (CTAs that don't stand out, multiple competing emphasis)
- Type scale problems (too many sizes, line-height issues)
- Color usage (low contrast, accent overused / underused)

#### Nielsen 10 heuristics (severity 1-4, 4 = critical)
For static prototypes, focus on:
- **#4 Consistency** — same element looks different in two places
- **#6 Recognition over recall** — icons without labels, mystery buttons
- **#8 Aesthetic minimalist** — too much on screen, signal lost in noise
- **#9 Error recognition** — form states (focus, error, disabled) missing

#### AI slop patterns to flag
- Generic gradient backgrounds with no purpose
- Lorem ipsum left in
- Decorative emoji as visual chrome (✨🚀💡)
- Default Bootstrap/Tailwind feel
- 10px rounded corners on everything
- Center-aligned hero, left-aligned everything else (inconsistent alignment)
- Stock illustration that doesn't match the brand

#### Responsive
- Per viewport: what breaks?
- Common issues: text overflow, image cropping wrong, nav unusable on mobile

### 5. Format

Each issue:
```
[severity 1-4] [viewport] Component — Problem — Fix
```

Example:
```
[3][mobile] Header — Logo overlaps menu button below 400px — wrap header in flex with gap: 1rem, or stack vertically
[2][all] CTAs — Primary and secondary buttons look identical — give primary solid fill, secondary outline only
[1][desktop] Hero — Headline left-aligned but everything below centered — pick one direction
```

### 6. Fix (optional)

If the user wants fixes:
- Walk through issues severity-first (4 → 1)
- Edit the HTML
- Re-screenshot the affected viewport
- Read new PNG to verify
- Move to next

Don't try to fix everything. Severity 1 cosmetic issues might not be worth the time on a workshop prototype.

### 7. Before / after (for big fixes)

After fixing severity 3-4 issues:
- Screenshot final state
- Read alongside the original
- Summarize what changed and what didn't

## Tips for sharper critique

- **Trust your first impression** — if it looks AI-generated, say so explicitly and identify which patterns betray it
- **Compare to references** — if user mentioned admired sites, note what's missing from this prototype that those have
- **Look at one thing at a time** — type, then color, then spacing, then hierarchy. Mixing categories produces fuzzy critique
- **Severity discipline** — most issues are 1-2 on workshop prototypes. Save 3-4 for things that genuinely break usability or visual coherence

## See also (進階)

- **[Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills)** — Marie Claire Dean 的 91 個 UX skill。相關 plugin：
  - `visual-critique` (4 skills) — hierarchy analysis, brand consistency, typography audits
  - `ui-design` (14 skills) — 視覺問題的解法庫（layout grids, color systems, responsive patterns）
- **Refactoring UI (Adam Wathan + Steve Schoger)** — 不是 skill，是書 / 線上課，design-review 經常引用的視覺問題模式都來自這裡
