---
name: interview-simulator
description: Simulate realistic user interviews. Given an interview guide and persona descriptions, generate N full transcripts that read like real conversations — with hesitation, tangents, contradiction, emotion. Use to practice synthesis without real interview data, or to stress-test your interview guide before fieldwork. Trigger words "模擬訪談", "simulate interview", "假訪談稿", "練習 synthesis 用的資料".
---

# interview-simulator

Generate synthetic user interview transcripts. Useful when:
- Workshop / class setting where students don't have real interview access yet
- Testing whether your `interview-guide.md` actually surfaces what you want — before spending real recruitment budget
- Pre-fieldwork rehearsal of likely answers + edge cases

**Honesty about limits** (Claude MUST disclose this to the user): synthetic transcripts are useful for practicing **synthesis** and **stress-testing the guide**. They are NOT a substitute for real research. The "users" speak based on training data patterns and the persona you describe, not lived reality.

## When to use

- After `/interview-guide` produced `interview-guide.md`
- User says "模擬訪談" / "假裝跑訪談" / "我需要練習 synthesis 但沒有資料"
- Before real fieldwork: "let's see what answers the guide would likely surface"

## Workflow

### 1. Load inputs

Claude **MUST** read `interview-guide.md` first. If it doesn't exist, suggest `/interview-guide` first.

### 2. Define personas

Two paths:

**Path A — User already has personas** (from `/research-plan`, prior research, or their own list). Use those, vary backstory slightly so each transcript feels distinct.

**Path B — User is stuck** ("我不知道要哪幾個 persona"). Offer the **Adoption Curve template** — 5 archetypes covering the full demand spectrum:

| Archetype | Stance | Behavioral marker |
|-----------|--------|-------------------|
| **Early Adopter** | Enthusiastic, vocal | Adopts fast, evangelizes, tolerates rough edges |
| **Pragmatist** | Cautious, value-focused | Adopts after social proof, asks "what's the ROI" |
| **Skeptic** | Suspicious, prefers status quo | Highlights risks, slow to commit |
| **Lapsed** | Used to use, churned | Knows product intimately, has specific friction memory |
| **Never-tried** | Aware but disengaged | Has alternative behaviors, may have moral / identity blockers |

Pick **3-5 from this list weighted by what the study cares about**. Example weights:
- Attrition study → heavy on **Lapsed + Pragmatist** (people who left + people who might)
- New product validation → heavy on **Early Adopter + Pragmatist + Skeptic**
- Adoption study → **Never-tried + Skeptic + Pragmatist**

Each archetype **MUST be specialized to the actual product/topic** — don't keep them abstract. ("Early Adopter for a meal-delivery app" looks very different from "Early Adopter for a markdown editor".)

Each persona (Path A or B) SHOULD differ on:
- **Behavior pattern** (heavy user / occasional / former / never)
- **Demographics that matter for this study** (age, life stage, region — only what's relevant)
- **Emotional stance** (enthusiastic / frustrated / indifferent / skeptical)
- **Backstory** (one paragraph: who they are, why they're in this category)

Example for "meal-delivery attrition" study (Path B → specialized):
- **P1 — Sharon, 34, Lapsed**: heavy user 6 months, stopped 3 months ago, frustrated
- **P2 — Daniel, 29, Pragmatist (declining)**: orders weekly, ambivalent, watching the bill
- **P3 — Mei, 41, Skeptic / Never-tried**: cooks at home, curious but morally resistant
- **P4 — Jay, 26, Early Adopter**: orders 5x/week, evangelizes the service

### 3. Simulate each interview

For each persona, generate a transcript that:

**MUST include:**
- Full 45-min interview length (~3000-4000 words per transcript)
- Realistic non-verbal moments: "Um...", "[pauses]", "[laughs]", "Let me think"
- At least 2 grounded stories (past-tense specific incidents)
- At least one moment of contradiction (says X, later says Y — like real humans)
- One area where they go off-script (researcher needs to gently redirect)
- A natural arc: tense / warming up / comfortable / wrap

**MUST NOT include:**
- Too-perfect answers that hit every theme in one sentence
- Marketing language (real people don't say "value proposition")
- All personas sharing the same insight (variance is the point)
- More than 3 mentions of the product name per interview (real people forget)

**SHOULD include:**
- Specific places, brands, times — concrete world detail
- Reference to other people in their life ("my partner...", "my coworker said...")
- Mixed feelings on most pain points (rarely 100% negative or positive)

### 4. Structure

Each transcript:

```markdown
# Interview: P1 — Sharon (churned heavy user)

**Date:** [simulated date]
**Duration:** 47 min
**Interviewer:** R (you)
**Persona snapshot:** 34, dual-income, 2 kids (8 + 5), Taipei. Heavy user 6 months, stopped 3 months ago.

---

**R:** Thanks for jumping on. Could you start by telling me a bit about how meals work in your household on a typical weekday?

**Sharon:** Oh god. [laughs] Okay, so... it depends a lot on what kind of week it is. If it's a normal week, my partner picks up the kids by six, and I'm usually still in a meeting until 6:30, 7. So...

[continue full interview, 30+ turns, ~3000-4000 words]
```

Save to `transcripts/p1.md`, `transcripts/p2.md`, etc.

### 5. Variance check

Before declaring done, Claude **MUST** verify across transcripts:
- Did at least 2 personas express contradicting views on a key topic?
- Is there at least one pain point that ONLY one persona has?
- Did at least one persona surprise you with an insight you didn't seed?

If all transcripts feel the same, regenerate with stronger variance instructions.

### 6. Output summary

After writing transcripts, print a one-paragraph summary per persona for the user:

```
P1 — Sharon: churned because the "saved time" math stopped working when meals got monotonous. Surprise: doesn't mention price.
P2 — Daniel: still active but ordering less. Trigger: realized he never opens the app to browse, only to reorder same 3 things.
P3 — Mei: anti-pattern user. Built her identity around cooking; sees delivery as moral failure.
P4 — Jay: super user, but his usage is performative — orders to "experience the city's food scene".
```

This tees up `/thematic-analysis` to find cross-cutting themes.

## Quality bar

- Each transcript MUST be ≥ 2500 words (real interviews are long)
- Across N transcripts, total word count SHOULD be ≥ 10,000 words to give synthesis enough material
- Variance MUST be intentional, not random — each persona's pattern should be coherent

## Disclaimer to include in output

At the top of `transcripts/README.md`:

```
These transcripts are SIMULATED. They are useful for:
- Practicing thematic analysis on consistent material
- Pressure-testing your interview guide
- Workshop / class exercises

They are NOT useful for:
- Making product decisions
- Validating real user behavior
- Substituting for actual fieldwork
```

## Next in chain

```
/thematic-analysis  ← reads transcripts/*.md, produces themes + insights
```

## See also (進階)

- **[Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills)** — Marie Claire Dean 的 91 個 UX skill。相關 plugin：
  - `design-research` (12 skills) — 真實研究的 persona / interview 方法
- **Adoption Curve（Rogers 1962）** — 上面那張 5 archetype 表格的學術來源：Everett Rogers 的 *Diffusion of Innovations*。想搞懂為什麼是這 5 個分類，去看原書。
