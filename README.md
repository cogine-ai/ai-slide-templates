# Slide Templates

Self-contained HTML slide templates for AI-assisted deck generation.

Each template is a folder under `templates/` with a runnable HTML deck and a JSON metadata file. Agents select templates by scanning `templates/*/template.json`, then clone and adapt the chosen `template.html` for the user's real deck.

## Use With Any AI Agent

Copy this into your AI coding agent:

```txt
Clone https://github.com/cogine-ai/ai-slide-templates and read AGENTS.md before you start. This repo is a library of self-contained HTML slide templates for AI-assisted deck generation. Treat AGENTS.md as the authoritative workflow: use it to select a template, preview options, preserve the chosen template's design system, and produce a finished browser-openable HTML deck from my content.
```

For better results, read [INPUT_GUIDE.md](INPUT_GUIDE.md) before asking an agent to build a deck. It explains what content to provide, how to brief audience and tone, and when the agent should synthesize an outline first.

## Examples

See [`examples/`](examples/) for end-to-end workflow examples that show the input, metadata-based template selection, derived deck outline, generated output structure, and common failure modes.

- [`structured-outline-to-output.md`](examples/structured-outline-to-output.md): a structured outline turned into a metric-led business review deck.
- [`raw-notes-to-output.md`](examples/raw-notes-to-output.md): long script/raw notes compressed into a clear product research deck.

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
| `5s-training` | Soft, procedural, practical | 5S training, operations workshops, process improvement, team enablement |
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
| `hr-orientation` | Bright, playful, supportive | HR orientation, new-hire onboarding, culture introductions, internal training |
| `interactive-portfolio` | Visual, playful, curated | Portfolio reviews, agency credentials, creative case studies |
| `linear-qbr` | Restrained, linear, formal | Quarterly business reviews, board updates, operating cadence, portfolio reviews |
| `midnight-executive` | Executive, polished, dramatic | Board updates, investor briefings, leadership reviews, strategic reviews |
| `modern-business-proposal` | Bold, techno, sales-led | Modern business proposals, client pitches, service offers, project plans |
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
- Do not standardize fonts across templates. Typography is part of each template's identity and should follow the source-inspired style as closely as practical.
- Sample content should be realistic presentation content, not lorem ipsum.

## Validation

Run:

```sh
node scripts/validate.mjs
```

The validator checks that every template folder has `template.html` and `template.json`, the folder name matches `slug`, required metadata fields exist, `.deck` is present, and `slide_count` matches the HTML slide count.
It also checks common metadata drift: enum values, feature object shape, source attribution shape, and whether declared palette colors and font families are present in the template HTML.

Optional heavier visual/runtime validation is separate so the structural validator stays fast:

```sh
node scripts/validate-visual.mjs
node scripts/validate-visual.mjs --template airy-modern
```

The visual validator launches a local Chrome/Chromium-compatible browser at a 16:9 `1280x720` viewport. It checks browser console errors, uncaught runtime exceptions, visible text/content overflow on active slides, and basic navigation behavior when a template declares navigation features. Set `CHROME_BIN=/path/to/chrome` or pass `--browser /path/to/chrome` if Chrome is not in a standard location.
It requires Node.js 22 or newer and Chrome/Chromium 112 or newer.
