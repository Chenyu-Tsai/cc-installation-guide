---
name: research-plan
description: Turn a research topic into a sharp, structured UX research plan. Defines the question, objectives, hypotheses, recruitment criteria, method, and timeline. Use at the start of any user research effort, before you write any interview question. Trigger words "做研究計劃", "research plan", "我想研究 X", "怎麼設計這個研究".
---

# research-plan

Turn a fuzzy research topic into a tight plan that the rest of the chain (`/interview-guide` → `/interview-simulator` → `/thematic-analysis`) can run on.

## When to use

- User says "我想研究 X" / "幫我做研究計劃" / "我們要訪談用戶但不知道從哪開始"
- Before any interview question gets written
- When a research effort is fuzzy and needs sharpening

## What the user gets

A `research-plan.md` at the project root containing: research question, objectives, hypotheses, recruitment criteria, method, sample size, and timeline.

## Workflow

### 1. Sharpen the question (CRITICAL)

Most users start with a topic ("外送 app"), not a question. Claude **MUST** push to a single research question in this shape:

> I want to understand **[what]** about **[who]** so that we can **[decision / action]**.

Example:
- Bad: "外送 app 的研究"
- Good: "I want to understand **why working parents stop using meal-delivery apps after 3 months** about **users in dual-income households with kids under 10** so that we can **design retention features for the next quarter**."

Ask the user the three slots if missing. **SHOULD** propose a candidate question and let them refine.

### 2. Decompose into 3-5 research objectives

Each objective is one specific thing you want to learn. Format:
- `O1`: Understand the trigger moments that cause attrition
- `O2`: Map the alternative behaviors (cooking, takeout, other apps) that replace the service
- `O3`: ...

### 3. List 2-3 working hypotheses

These are assumptions to test, not conclusions. Each should be specific enough to be wrong.
- `H1`: Price perception worsens after the third order due to ...
- `H2`: Weekday meals are the retention hook; weekend usage is bonus

### 4. Recruitment criteria

- **Inclusion**: who we want to talk to (be specific — "ordered 3+ times in past 6 months", not "regular users")
- **Exclusion**: who we exclude and why
- **Sample size**: 5-8 for exploratory; specify why
- **Diversity targets**: age / income / region / household type — only what matters for this question

### 5. Method

Choose primary + supplementary:
- Semi-structured interviews (1 hour, remote / in-person)
- Diary study (3-7 days)
- Survey (n=100+) — only when validating, not exploring
- Observation / contextual inquiry

For a workshop / short timeline: default to **5-8 semi-structured interviews, 45 min each**.

### 6. Timeline

Concrete dates. Recruit → run → synthesize → present. For workshop scale: 1-2 weeks total.

### 7. Output

Write `research-plan.md` at project root:

```markdown
# Research Plan: [topic]

## Research Question
[one sentence in the [what] / [who] / [decision] shape]

## Objectives
- O1: ...
- O2: ...
- O3: ...

## Hypotheses
- H1: ...
- H2: ...

## Method
[primary + supplementary]

## Participants
- Inclusion: ...
- Exclusion: ...
- Sample size: n=X (because ...)
- Diversity targets: ...

## Timeline
- Recruit: [dates]
- Interviews: [dates]
- Synthesis: [dates]
- Readout: [date]

## Out of scope
[what this study will NOT answer — important for managing expectations]
```

## Quality bar

- Research question MUST fit the [what] / [who] / [decision] shape
- Each objective MUST be specific enough that a stranger could tell whether an interview answered it
- Hypotheses MUST be falsifiable. If "users want a better experience" is a hypothesis, push harder.
- The plan SHOULD be readable in under 90 seconds

## What NOT to do

- Don't propose 8+ objectives. 3-5 is enough.
- Don't write the interview guide here — that's `/interview-guide`'s job.
- Don't invent participants. Recruitment criteria, not specific people.

## Next in chain

```
/interview-guide  ← reads research-plan.md, writes interview-guide.md
```

## See also (進階)

工作坊版到此為止。想要更深的 UX research skill 集：

- **[Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills)** — Marie Claire Dean 的 91 個 UX skill，純 markdown，免費。相關 plugin：
  - `design-research` (12 skills) — personas, journey maps, interviews, usability testing
  - `ux-strategy` (11 skills) — competitive analysis, information architecture, service blueprints
