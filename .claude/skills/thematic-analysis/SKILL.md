---
name: thematic-analysis
description: Synthesize N interview transcripts into 3-5 themes with supporting quotes, plus persona, journey, and opportunity map. Standard qualitative thematic analysis (open coding → axial coding → themes). Works on real or simulated transcripts. Use after /interview-simulator or when you have your own transcripts. Trigger words "做 thematic analysis", "synthesize 訪談", "找主題", "做 persona", "synthesis".
---

# thematic-analysis

Turn raw transcripts into insight. Follows the standard qualitative analysis flow: open coding → axial coding → themes → persona / journey / opportunity.

## When to use

- After `/interview-simulator` produced `transcripts/*.md`
- User has real transcripts in any folder
- User says "做 synthesis" / "找主題" / "從訪談找洞察" / "幫我做 persona"

## Workflow

### 1. Load and survey

Claude **MUST** start by listing all transcripts and confirming with user:
- How many transcripts? Where?
- Any to exclude? (incomplete, wrong persona, etc.)
- Look back at `research-plan.md` if it exists — what objectives are we answering?

### 2. Open coding (pass 1)

Read each transcript. Tag every interesting moment with a short code. Examples:
- `[trust-cooking-identity]`
- `[time-saved-doesnt-stick]`
- `[partner-decides-not-me]`
- `[browsed-but-didnt-order]`

Codes SHOULD be:
- Phrases, not single words
- Behavior-grounded, not interpretation ("said-X" not "feels-Y")
- Numerous (50-150 codes across 5 transcripts is normal)

Don't share the raw code list with the user — it's working notes. But Claude MUST do this pass before jumping to themes.

### 3. Axial coding (pass 2)

Group related codes into clusters. Look for:
- **Recurring patterns** across personas (≥ 3 of N personas show the same code)
- **Contradictions** (some say X, others say opposite)
- **Edge cases** (one persona has a unique pattern worth flagging)

### 4. Themes (3-5 maximum)

A theme is **the answer to a research question, supported by evidence.** Each theme:

```markdown
## Theme: [name]

**Statement:** [1-2 sentence finding — what we now believe]

**Strength:** [strong / moderate / tentative — based on how many transcripts support it]

**Evidence:**
> "Quote 1 with attribution" — P1
> "Quote 2..." — P3
> "Quote 3..." — P4

**Counter-evidence (if any):**
> "P2 said the opposite: ..."

**Implication:** [what this means for design / product]
```

**Quality bar:**
- MUST cite ≥ 2 transcripts per theme. Single-source = not a theme yet
- SHOULD acknowledge counter-evidence when it exists
- MUST distinguish strong themes (most transcripts) from tentative (few)
- 3-5 themes total. More = unfocused; fewer = under-mined

### 5. Persona (2 personas, based on themes)

After themes, produce 2 personas that represent meaningful behavioral types — not demographic averages.

```markdown
## Persona 1: [name]

**Behavior type:** [one sentence — what makes them this type]
**Key quote:** "..."
**Job-to-be-done:** When [situation], I want to [motivation], so I can [outcome].

**Daily reality:**
[paragraph grounded in transcript evidence]

**Pain points (ranked):**
1. [Pain] — [which transcripts showed this]
2. ...

**What success looks like for them:**
[from their perspective]

**Watch out:** [common misread of this persona — what they're NOT]
```

### 6. User journey (1 journey, primary persona)

For the primary persona, map the journey through the relevant domain. 5-7 stages:

| Stage | What they do | What they think | What they feel | Pain / Opportunity |
|-------|--------------|-----------------|----------------|-------------------|
| Trigger | ... | ... | ... | ... |
| Consider | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |

### 7. Opportunity map

3-7 opportunity points. Each opportunity:
- Anchored in a theme
- Specific enough to design against
- Sized: quick win / medium / strategic bet

```markdown
## Opportunity: Pre-empt monotony at order 8-12

**Theme it comes from:** "Time-saved math stops working once meals repeat"
**Size:** Medium
**Why it matters:** This is the attrition trigger. Address it = retain heavy users.
**Possible directions:**
- Auto-suggest novel meals based on past orders
- "Tonight's twist" — one curveball per week
- Recipe spin-off: turn a regular order into a kit
```

### 8. Output

Write `synthesis.md` at project root with all of the above in order:

```
synthesis.md
├── Method note (n=X transcripts, dates, who)
├── Themes (3-5)
├── Personas (2)
├── User journey (1)
├── Opportunity map
└── Open questions for follow-up research
```

## Quality bar

- Every claim MUST cite ≥ 1 quote
- Strong themes MUST appear in ≥ 60% of transcripts
- Personas MUST be behavioral types, not demographic descriptions
- Opportunity map MUST tie each item back to a theme
- The whole synthesis SHOULD be readable in 5 minutes

## What NOT to do

- Don't pad to 8+ themes. Cut weak ones. Tentative themes go in "open questions"
- Don't invent quotes. Every quote MUST appear (verbatim or near-verbatim) in a transcript
- Don't write personas based on demographics ("32-year-old urban professional"). Behavioral patterns ("hides her delivery orders from her mother") > demographics
- Don't skip the counter-evidence — it makes the synthesis trustworthy

## Chain context

```
/research-plan → /interview-guide → /interview-simulator → /thematic-analysis ← you are here
                                                                                  ↓
                                                                         (Phase 3: design)
```

The output `synthesis.md` is what `/design-shotgun` / `/design-consultation` reads to ground their work.

## See also (進階)

- **[Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills)** — Marie Claire Dean 的 91 個 UX skill。相關 plugin：
  - `design-research` (12 skills) — 含 affinity mapping, JTBD framework, value proposition canvas，跟 thematic analysis 互補
- **Braun & Clarke (2006)** — *Using thematic analysis in psychology*。我們用的 6-phase 流程的學術源頭。值得讀，但 workshop 場景用不到全部。
