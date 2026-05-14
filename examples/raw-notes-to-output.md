# Raw Notes to Generated Deck

This example shows the workflow when the user gives long script-like notes instead of a slide outline. The agent first derives a concise outline, then chooses a template based on the intended audience and metadata.

## User Input

```txt
Turn these notes into a 6-8 slide deck for a product strategy readout.
Audience: product, design, and customer success leads.
I want it to feel clear, optimistic, and not too salesy.

Raw notes:
We interviewed 12 operations leads across B2B SaaS teams. The pattern was
pretty consistent: onboarding breaks down when the workspace needs multiple
people to finish setup. Admins invite teammates, but those teammates do not
know why they were invited, what account they should connect, or what "done"
looks like. Customer success sees the stalled workspaces later, but by then
the user has already decided the product feels heavy.

The strongest quote was: "I thought I was waiting on legal, but really we just
never finished the account mapping." We also saw three repeated workarounds:
admins create dummy accounts, success teams send manual setup checklists, and
sales engineers run live setup calls for high-value accounts.

The opportunity is not another settings page. It is a shared progress model:
one place that shows who needs to do what, what is already connected, and what
is blocking activation. A small pilot could target the invite-to-first-success
flow for teams with three or more invited users.
```

## Derived Outline

Before choosing layouts, the agent compresses the notes into a presentation outline:

1. Research readout title and audience.
2. Core finding: multi-person setup is where onboarding breaks.
3. Evidence: interviews, repeated support patterns, and representative quote.
4. Current workaround cost: dummy accounts, manual checklists, live setup calls.
5. Product opportunity: shared progress model, not another settings page.
6. Pilot scope: invite-to-first-success for teams with three or more invited users.
7. Success metrics: activation completion, time to first success, support escalation rate.
8. Next steps and owners.

## Template Selection

The agent scans `templates/*/template.json` and chooses `airy-modern`.

Metadata fit:

- `tone`: `minimal`, `friendly`, `considered`, `optimistic`; this matches a product strategy readout that should feel clear and non-salesy.
- `density`: `medium`; the raw notes are long, but the final deck should compress them into a few readable insights.
- `scheme`: `light`; the user asked for clarity and an optimistic feel, and the source material does not require a dark technical mood.
- `best_for`: product strategy, customer research, startup updates, planning workshops, and decks that need a polished but low-pressure feel.

Near misses:

- `circuit-tech-dark` has strong technical credibility, but its `density` is `high` and `scheme` is `dark`, which would make a customer-research readout feel heavier than requested.
- `quarterly-review-infographics` can carry more information, but its `tone` is metric-led and practical rather than warm product strategy.

## Generated Output Structure

The agent copies the full selected template folder into the output workspace.

```txt
decks/workspace-activation-research/
  template.html        # adapted from templates/airy-modern/template.html
  template.json        # copied source metadata for selection traceability
```

The generated `template.html` keeps the original runtime and styling:

```html
<main class="deck">
  <section class="slide">...</section>
  <section class="slide">...</section>
  ...
</main>
<script>
  // Existing template navigation remains in place.
</script>
```

Recommended slide map:

| Slide | Layout role | Adapted content |
|---|---|---|
| 1 | Cover | Workspace Activation Research |
| 2 | Key finding | Multi-person setup is where onboarding breaks |
| 3 | Evidence | 12 interviews, repeated support patterns, one short quote |
| 4 | Workarounds | Dummy accounts, manual checklists, live setup calls |
| 5 | Opportunity | Shared progress model with role-specific next actions |
| 6 | Pilot | Invite-to-first-success for teams with three or more invited users |
| 7 | Metrics | Activation completion, time to first success, support escalation |
| 8 | Next steps | Owners, decision needed, pilot start date |

## Content Handling Rules

- Derive the outline before editing HTML. Long notes are source material, not slide copy.
- Use short, specific slide titles that carry the argument.
- Keep the representative quote short and give it its own visual treatment if the template has a quote or emphasis layout.
- Preserve the template's fonts, palette, spacing, slide classes, and navigation behavior.
- If useful details do not fit, move them into speaker notes outside the deck or an appendix slide, rather than shrinking text.

## Common Failure Modes

- Selecting a high-density template only because the input is long. Template `density` should match the desired output, not the size of the raw source.
- Turning the raw notes into paragraphs on slides. The generated deck should present synthesized claims, evidence, and next actions.
- Overfilling the evidence slide with all interview details. Use the strongest pattern, one quote, and a compact support signal.
- Mixing templates when a needed layout is missing. Add a native-feeling slide in the chosen template's design system instead.
- Recoloring or simplifying the template to make more text fit. Split the content instead.
