---
name: heuristic-evaluation
description: Walk an HTML prototype through Nielsen's 10 usability heuristics. For each heuristic, screenshot the relevant flow, score severity 1-4, and write a specific finding with fix suggestion. Complementary to /design-review (which is taste / aesthetics) — this is structured usability. Trigger words "Nielsen heuristics", "usability eval", "heuristic evaluation", "可用性評估".
---

# heuristic-evaluation

Apply Nielsen's 10 usability heuristics to an HTML prototype, structured and scored. Sister skill to `/design-review` — that one is taste, this one is process.

## When to use

- After a prototype is built (Phase 3 output) and ready for usability scrutiny
- User says "usability eval" / "Nielsen heuristics" / "可用性評估"
- Before showing to a user / stakeholder, to catch obvious usability bugs

## What you get

`heuristic-eval.md` with each of Nielsen's 10 evaluated, severity-scored, with concrete findings.

## Workflow

### 1. Locate prototype

Ask: which HTML file (absolute path) or URL?

### 2. Capture screenshots

Claude **MUST** screenshot:
- Default state at 1440x900 (desktop)
- Default state at 375x812 (mobile)
- Plus any state-specific captures the heuristics need (e.g., hover state, error state — modify HTML temporarily to trigger if needed)

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TARGET="file://$(pwd)/prototype.html"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --screenshot=/tmp/heur-desktop.png --window-size=1440,900 "$TARGET"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --screenshot=/tmp/heur-mobile.png --window-size=375,812 "$TARGET"
```

Read both PNGs.

### 3. Walk all 10 heuristics

For EACH of the 10 below, Claude **MUST** produce:
- **Score**: 0 (not applicable) / 1 (minor) / 2 (moderate) / 3 (major) / 4 (critical)
- **Finding**: specific, grounded in what's on screen
- **Fix**: concrete, actionable
- **Evidence**: which screenshot / what to look at

**Nielsen's 10:**

1. **Visibility of system status** — Does the system keep users informed?
   - Look for: loading states, success/error feedback, progress indicators
2. **Match between system and real world** — Familiar language, real-world conventions?
   - Look for: jargon, unclear icons, abstract terms
3. **User control and freedom** — Easy undo, escape hatches?
   - Look for: clear "back", "cancel", undo on destructive actions
4. **Consistency and standards** — Same things look/work the same way?
   - Look for: button styles, terminology, layout patterns repeating
5. **Error prevention** — Better to prevent than to error-message?
   - Look for: confirmation on destructive actions, format guidance on inputs
6. **Recognition rather than recall** — Options visible, no memorization?
   - Look for: icon-only buttons without labels, hidden features
7. **Flexibility and efficiency of use** — Shortcuts for experts, accessible for novices?
   - Look for: keyboard shortcuts, accelerators, customization
8. **Aesthetic and minimalist design** — No irrelevant info competing for attention?
   - Look for: visual clutter, too many CTAs, decorative noise
9. **Help users recognize, diagnose, recover from errors** — Plain language errors, suggest fixes?
   - Look for: cryptic error codes, dead-end errors with no path forward
10. **Help and documentation** — Help available when needed, easy to find?
    - Look for: tooltips, inline help, search-friendly documentation

For static workshop prototypes, items 1, 5, 9, 10 often score 0 (N/A). That's fine — note it explicitly.

### 4. Output format

```markdown
# Heuristic Evaluation: [prototype name]

**Date:** [date]
**Evaluator:** Claude (vanilla heuristic eval)
**Scope:** Single-page HTML prototype, default state only

## Summary
- Total findings: X
- Critical (4): X
- Major (3): X
- Moderate (2): X
- Minor (1): X

**Top 3 to fix:**
1. [most critical finding]
2. ...
3. ...

---

## 1. Visibility of system status — Score: [0-4]

**Finding:** [specific observation]

**Evidence:** [which screenshot / which element]

**Fix:** [concrete change]

---

## 2. Match with real world — Score: [0-4]
...

[etc for all 10]
```

### 5. Cross-reference

If `/design-review` has been run on this prototype, claude SHOULD note overlaps. They're complementary:
- design-review: aesthetic / spacing / hierarchy / AI slop
- heuristic-evaluation: usability / behavior / errors / system feedback

Don't duplicate findings — note when an issue surfaces in both.

### 6. Fix loop (optional)

If user wants fixes:
- Severity 4 / 3: fix immediately, re-screenshot to verify
- Severity 2: discuss with user, may or may not fix
- Severity 1: list, defer

Workshop prototypes rarely have severity 4 unless something is structurally broken. If you find one, double-check it's not a false positive.

## Quality bar

- All 10 heuristics MUST be addressed (score 0 = N/A is fine, but say so)
- Each non-zero finding MUST cite specific screen evidence
- Each finding MUST have a concrete fix, not "improve UX"
- "Top 3 to fix" MUST be sorted by severity * impact, not severity alone

## Calibration for workshop scale

Static single-page prototypes will mostly score:
- 0 on: 1 (no live system status), 5 (no destructive actions to prevent), 9 (no errors to recover from), 10 (no docs)
- 1-2 on: 2 (jargon), 4 (small inconsistencies), 6 (icon-only buttons), 8 (clutter)
- Rarely 3-4 unless the prototype is genuinely broken

Don't inflate severity to look thorough. A clean prototype with 6 zeroes and 4 ones is a fine prototype.

## What NOT to do

- Don't critique aesthetics here — that's `/design-review`'s job
- Don't invent issues to fill all 10 slots. Score 0 when N/A.
- Don't suggest "add a tooltip" for every recognition issue. Sometimes the fix is "use a clearer label"
- Don't quote the heuristic definition without applying it — application beats theory

## Reference

Nielsen Norman Group, ["10 Usability Heuristics for User Interface Design"](https://www.nngroup.com/articles/ten-usability-heuristics/) (Jakob Nielsen, 1994; updated 2020+).

## See also (進階)

- **[Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills)** — Marie Claire Dean 的 91 個 UX skill。相關 plugin：
  - `prototyping-testing` (8 skills) — heuristic evaluation, A/B testing, prototyping strategies
- **Cognitive Walkthrough** — Nielsen heuristics 的姊妹方法。對特定使用者目標走過介面、找學習曲線問題，補 heuristic 抓不到的「初學者卡點」。值得跟 heuristic eval 一起用。
