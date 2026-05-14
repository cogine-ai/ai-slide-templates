# Structured Outline to Generated Deck

This example shows a direct workflow when the user already provides a clean outline. The agent still chooses a template from metadata, then maps the outline into the copied template without changing the design system.

## User Input

```txt
Create an 8-10 slide Q2 business review deck for the leadership team.
Use a light, practical, metric-heavy style.

Outline:
1. Q2 headline: revenue grew 18% quarter over quarter, but activation lagged plan.
2. KPI scorecard: revenue, active accounts, net retention, activation rate.
3. Revenue mix: enterprise expansion did most of the work.
4. Activation issue: self-serve users stall before workspace setup.
5. Customer segment detail: enterprise, mid-market, self-serve.
6. Three priorities for Q3.
7. Owner and timeline by priority.
8. Decisions needed from leadership.
```

## Template Selection

The agent scans `templates/*/template.json` and chooses `quarterly-review-infographics`.

Metadata fit:

- `tone`: `direct`, `metric-led`, `plainspoken`, `practical`; this matches a leadership review that should make performance easy to scan.
- `density`: `high`; the input includes KPI cards, segment detail, timelines, and decision points.
- `scheme`: `light`; the user explicitly asked for a light style.
- `best_for`: quarterly business reviews, sales updates, operating dashboards, and performance-report decks where the audience needs to scan many charts, cards, and KPI blocks quickly.

Near misses:

- `quarterly-review-meeting` also fits QBR content, but its `density` is `medium-high` and it is better for agenda/status/RAID meeting flow than a metric-heavy dashboard deck.
- `midnight-executive` has the right formality, but its `scheme` is `dark`, which conflicts with the user's light-style request.

## Generated Output Structure

The agent copies the full template folder, then edits only the cloned `template.html` content.

```txt
decks/acme-q2-business-review/
  template.html        # adapted from templates/quarterly-review-infographics/template.html
  template.json        # copied source metadata for traceability
```

The generated HTML keeps the template's existing deck shell:

```html
<main class="deck">
  <section class="slide">...</section>
  <section class="slide">...</section>
  ...
</main>
```

Recommended slide map:

| Slide | Layout role | Adapted content |
|---|---|---|
| 1 | Cover | Q2 Business Review, audience, date |
| 2 | Executive scorecard | Revenue, active accounts, net retention, activation rate |
| 3 | KPI trend | Revenue growth and activation gap |
| 4 | Revenue mix | Enterprise expansion versus other segments |
| 5 | Segment detail | Enterprise, mid-market, self-serve comparison |
| 6 | Problem focus | Workspace setup drop-off for self-serve users |
| 7 | Q3 priorities | Three priority cards with measurable outcomes |
| 8 | Owner timeline | Priority, owner, milestone, target date |
| 9 | Decisions needed | Leadership decisions and tradeoffs |

## Content Handling Rules

- Convert outline headings into takeaway slide titles. Do not use vague labels such as "Revenue Mix" when the slide can say "Enterprise expansion drove most Q2 growth."
- Put one primary message on each slide, even when the template supports high density.
- Use the template's KPI cards, chart blocks, and table structures instead of inventing new components.
- Remove unused demo slides and update any visible counters or progress markers if the template uses them.

## Common Failure Modes

- Overfilling the scorecard slide with every available metric. If there are more than four to six important metrics, split them into a main KPI slide and a segment detail slide.
- Copying outline bullets verbatim into dense cards. Cards should carry short labels, numbers, and implications, not paragraph summaries.
- Choosing a dark executive template because the topic is serious while ignoring the requested `scheme: light`.
- Treating `density: high` as permission to make every slide busy. High density means the template can handle scanning surfaces; it still needs hierarchy.
- Dropping `template.json` from the output folder, which makes it harder to audit why the template was selected later.
