---
name: interview-guide
description: From a research plan, generate a structured semi-structured interview guide — 10-12 questions across warmup, context, pain points, current solutions, opportunity, wrap. Each question has rationale and follow-up probes. Use after /research-plan, before any interviewing. Trigger words "寫訪綱", "interview guide", "訪談題綱", "做訪談題目".
---

# interview-guide

Turn `research-plan.md` into a real interview guide a researcher can run with. Not just questions — questions with **rationale + probes + section flow**.

## When to use

- After `/research-plan` produced `research-plan.md`
- User says "寫訪綱" / "做訪談題目" / "interview guide"
- Before any interview happens (real or simulated)

## What the user gets

`interview-guide.md` at project root: a 45-min semi-structured guide, 10-12 main questions in 6 sections, each with rationale and probes.

## Workflow

### 1. Load the research plan

Claude **MUST** read `research-plan.md` first. If it doesn't exist, suggest running `/research-plan` first. Don't write a guide without a plan — it'll be unfocused.

Pull from the plan:
- Research question
- Objectives (each O1, O2, O3 SHOULD be addressed by at least one question)
- Hypotheses (each H1, H2 SHOULD have at least one question that could falsify it)
- Persona / inclusion criteria

### 2. Structure: 6 sections, 10-12 questions total

**A. Warmup (2 questions, 5 min)** — low-stakes, build rapport
- Background, role, daily routine in the area of interest
- Goal: get them talking, surface context

**B. Context / current situation (2 questions, 8 min)** — establish their world
- What they currently do in the relevant domain
- What tools / services / habits exist

**C. Pain points & frustrations (3-4 questions, 15 min)** — the meat
- Open-ended exploration of friction
- "Tell me about the last time..." → grounded stories beat opinions
- Each pain question SHOULD address an objective

**D. Current solutions & workarounds (2 questions, 8 min)** — what they do instead
- Reveals real value drivers + competitive set
- "If [your product] didn't exist tomorrow, what would you do?"

**E. Future / opportunity (1-2 questions, 5 min)** — wishful, but anchored
- "If you could wave a magic wand..." — careful, can produce wishful answers
- Better: "Describe what 'great' looks like in this area"

**F. Wrap (1 question, 2 min)**
- "Anything I should have asked but didn't?"
- "Who else should I talk to?"

### 3. Question quality bar

Each question **MUST** pass these checks:

| Test | Why |
|------|-----|
| Open-ended | "Tell me about..." beats "Do you...?" |
| Grounded in past behavior | "Last time you did X" beats "How often do you X?" |
| One topic per question | Compound questions confuse |
| Neutral framing | "What's frustrating?" not "What's good?" |
| Specific enough to answer | "How is your work going?" is too vague |

Bad: "Do you like our app?"  
Good: "Walk me through the last time you opened our app — what were you trying to do, and how did it go?"

### 4. Add rationale + probes for each question

```markdown
### Q3 (Pain points)
**Question:** Tell me about the last time you tried to [X] but gave up.

**Why we ask:** Addresses O2 (attrition triggers). Past-tense grounding pulls real stories instead of theoretical complaints.

**Probes if they're short:**
- What happened just before that?
- What did you do next?
- How did you feel in that moment?
- Has that happened before?
```

### 5. Output

`interview-guide.md`:

```markdown
# Interview Guide: [topic]

**Duration:** 45 min
**Style:** Semi-structured
**Links to:** research-plan.md (objectives O1-O5, hypotheses H1-H3)

## A. Warmup (5 min)
### Q1 — ...
### Q2 — ...

## B. Context (8 min)
### Q3 — ...
### Q4 — ...

## C. Pain & frustration (15 min)
...

## D. Current solutions (8 min)
...

## E. Opportunity (5 min)
...

## F. Wrap (2 min)
### Q11 — Anything I should have asked but didn't?
### Q12 — Who else should I talk to?

## Logistics
- Recording: ask consent at start
- Notes: take during, summarize within 30 min after
- Compensation: [if applicable]

## Interviewer reminders
- Silence is OK — wait 5 seconds before re-prompting
- Don't lead. "Tell me more" / "What do you mean by X?"
- If they say "it depends" — ask for a specific example
```

## Quality bar

- Each objective in the plan MUST be addressable by ≥ 1 question
- Each hypothesis MUST have ≥ 1 question that could falsify it
- Total questions: 10-12 (not 6, not 20)
- ≥ 70% of questions SHOULD be past-tense / grounded ("tell me about the last time...")

## Next in chain

```
/interview-simulator  ← uses interview-guide.md + persona to generate transcripts
```

(For real interviews, take this guide to your live sessions instead.)

## See also (進階)

- **[Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills)** — Marie Claire Dean 的 91 個 UX skill。相關 plugin：
  - `design-research` (12 skills) — 含更深的 interview methods（contextual inquiry, diary study, intercept）
