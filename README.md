# Slide Templates

Self-contained HTML slide templates for AI-assisted deck generation.

Each template is a folder under `templates/` with a runnable HTML deck and a JSON metadata file. Agents select templates by scanning `templates/*/template.json`, then clone and adapt the chosen `template.html` for the user's real deck.

## Use With Any AI Agent

Copy this into your AI coding agent:

```txt
Clone https://github.com/cogine-ai/ai-slide-templates and read AGENTS.md before you start. This repo is a library of self-contained HTML slide templates for AI-assisted deck generation. Treat AGENTS.md as the authoritative workflow: use it to select a template, preview options, preserve the chosen template's design system, and produce a finished browser-openable HTML deck from my content.
```

## Structure

```txt
templates/
  <slug>/
    template.html
    template.json
schema/
  template.schema.json
```

The folder name must match `template.json.slug`.

## Current Templates

| Template | Tone | Best For |
|---|---|---|
| `airy-modern` | Minimal, friendly, optimistic | Product strategy, customer research, startup updates, planning workshops |
| `b2b-sales-pitch` | Sharp, fresh, corporate | B2B sales pitches, SaaS proposals, enterprise partnership decks, GTM stories |
| `bright-organized` | Warm, structured, practical | Business reviews, operating plans, team kickoffs, client proposals |
| `classy-agency` | Elegant, restrained, geometric | Agency proposals, brand strategy, consulting-lite service pitches |
| `clinical-infographic` | Clinical, clear, diagrammatic | Medical reports, research explainers, clinical training, science briefs |
| `circuit-tech-dark` | Technical, sharp, engineering-led | Architecture reviews, platform pitches, AI product strategy, developer launches |
| `dark-minimal-ui` | Digital, precise, interface-led | Startup pitches, UI product demos, technology concepts |
| `earthy-handmade` | Handmade, approachable, story-led | Brand manifestos, community workshops, classroom kickoffs, nonprofit stories |
| `editorial-luxury` | Luxury, minimal, art-directed | Premium brand strategy, portfolio presentations, creative direction, launch narratives |
| `glass-ux-studio` | Sleek, digital, experiential | UX case studies, product walkthroughs, app concepts, innovation pitches |
| `gold-line-proposal` | Premium, dark, authoritative | Project proposals, executive concepts, premium service pitches |
| `interactive-portfolio` | Visual, playful, curated | Portfolio reviews, agency credentials, creative case studies |
| `midnight-executive` | Executive, polished, dramatic | Board updates, investor briefings, leadership reviews, strategic reviews |
| `neon-grid-agency` | Neon, graphic, energetic | Creative agency pitches, talent decks, youth brand campaigns |
| `neon-night-pitch` | Expressive, loud, pop | Event pitches, creator decks, nightlife and culture proposals |
| `pastel-research` | Scholarly, gentle, polished | Academic talks, medical science updates, conference presentations |
| `quarterly-review-infographics` | Direct, metric-led, practical | Quarterly business reviews, performance reports, sales updates, executive dashboards |
| `quarterly-review-meeting` | Clear, measured, professional | QBR meetings, operating updates, project reviews, status and RAID reports |
| `smart-business-report` | Friendly, clear, businesslike | Marketing status reports, SaaS reviews, quarterly business updates |

## Template Rules

- `template.html` should be a single-file HTML document that can open directly in a browser.
- Inline CSS is preferred so templates remain portable when cloned.
- Small inline JavaScript is allowed for navigation, progress, or demo behavior.
- `template.json` is the only metadata source of truth.
- Do not add a hand-maintained central index. If a catalog is needed later, generate it from `templates/*/template.json`.
- Sample content should be realistic presentation content, not lorem ipsum.

## Validation

Run:

```sh
node scripts/validate.mjs
```

The validator checks that every template folder has `template.html` and `template.json`, the folder name matches `slug`, required metadata fields exist, `.deck` is present, and `slide_count` matches the HTML slide count.
It also checks common metadata drift: enum values, feature object shape, source attribution shape, and whether declared palette colors and font families are present in the template HTML.
