# Template Research 2026-06-16

Goal: find a new batch of good-looking slide template directions that are not already covered by the current `ai-slide-templates` library. The target count is a multiple of 3; this pass recommends 9 candidates.

## Current Coverage Check

The current production library has 45 templates. Existing source inspiration already covers:

- Slidesgo: dark UI pitch, interactive portfolio, medical infographic, agency, project proposal, UX studio, formal research, QBR, roadmap-adjacent business decks, real estate, sustainability, customer journey, brand guidelines, architecture, modern wave, and several pitch/proposal systems.
- SlidesCarnival: neon, graffiti, grunge, psychedelic, Matisse, law, 5S, HR, mental health, programming workshop, B2B sales, and retro/classroom styles.
- Gamma, Beautiful.ai, Visme, Presentations.ai, Plus AI, PPT Design: business, executive, editorial luxury, nonprofit, grant, photo mosaic, and retro analog directions.

Internal artifacts checked:

- `previews/source-screenshots/candidates.md`: earlier source candidates have been converted or split into current production templates.
- `previews/refined-2026-05-20/reference-notes.md`: all 9 refined candidates are now represented in `templates/`.
- `previews/round21/candidates.json`: all 21 round21 candidates are now represented in `templates/`.
- `.tmp/generate-next-nine-templates.mjs`: the next-nine generation pass corresponds to current production templates.
- `/Users/kiedis/Coding/worktrees/ai-slide-templates-issue-*`: no additional unpublished candidate set found beyond older snapshots of current templates.

Conclusion: internal resources are mostly exhausted for new source discovery. The new shortlist should come from external channels, while avoiding duplicates with the 45 current templates.

## Recommended 9 New Candidates

### 1. `newsroom-broadcast`

- Source: SlidesCarnival Breaking News Slides
- URL: https://www.slidescarnival.com/template/breaking-news-slides/240173
- Coverage gap: no current template has a broadcast/newsroom visual system with lower-thirds, ticker bars, urgent live-update framing, or red/blue editorial motion cues.
- Visual direction: bold blue/red editorial panels, animated-news framing, headline blocks, field-report modules, timeline alerts, map/quote pages, chart callouts.
- Best for: company announcements, incident updates, market/news briefings, product launch live updates, public affairs decks.
- Density: medium-high.
- Implementation notes: use CSS ticker bars, map placeholders, media frames, alert chips, and editorial lower-third components; do not reuse source imagery or animation assets.

### 2. `newspaper-editorial`

- Source: SlidesMania Newspaper template
- URL: https://slidesmania.com/newspaper-free-presentation-template/
- Coverage gap: current `editorial-luxury` is magazine/premium, not a true newspaper/reporting layout. No template currently provides columns, mastheads, grayscale image treatment, article sections, or broadsheet-style dense text rhythm.
- Visual direction: monochrome/cream paper surface, serif masthead, ruled columns, grayscale image blocks, issue metadata, pull quotes, section labels.
- Best for: editorial reports, research digests, policy/news briefs, historical storytelling, internal newsletters.
- Density: high.
- Implementation notes: build true column-safe layouts with headline hierarchy, pull quote slots, index pages, article-card grids, and grayscale image placeholders.

### 3. `survey-results-infographics`

- Source: Slidesgo Survey Results Infographics
- URL: https://slidesgo.com/theme/survey-results-infographics
- Coverage gap: current QBR templates cover business metrics, but not survey-specific result storytelling with respondent segments, question cards, Likert scales, ranking bars, and confidence callouts.
- Visual direction: clean infographic pages, multiple chart modules, survey question headers, respondent breakdowns, comparison cards, icon-led result grids.
- Best for: user research, employee engagement, market surveys, academic polling, customer feedback reports.
- Density: high.
- Implementation notes: create editable HTML/CSS charts instead of screenshots; include survey-specific layouts such as Likert matrix, ranking list, segment comparison, and quote clusters.

### 4. `product-roadmap-infographics`

- Source: Slidesgo Product Roadmap Infographics
- URL: https://slidesgo.com/theme/product-roadmap-infographics
- Coverage gap: existing templates include timelines inside broader decks, but there is no dedicated roadmap vocabulary with swimlanes, release trains, quarter tracks, dependency paths, and milestone variants.
- Visual direction: roadmap-first infographic toolkit with arcs, lanes, release cards, milestone paths, priority bands, and product-phase diagrams.
- Best for: product strategy, quarterly planning, roadmap reviews, launch sequencing, platform migration plans.
- Density: medium-high.
- Implementation notes: make repeated roadmap layouts portable and editable; include horizontal lanes, curved-path timeline, now/next/later board, dependency map, and release calendar.

### 5. `abstract-3d-maximalist-pitch`

- Source: SlidesCarnival Motion Graphics App Pitch Deck
- URL: https://www.slidescarnival.com/template/motion-graphics-app-pitch-deck/33085
- Coverage gap: `programming-workshop-3d` is dark/technical and `glass-ux-studio` is sleek/product-led; the library lacks a vibrant abstract 3D maximalist pitch style.
- Visual direction: saturated blue/green/purple abstract 3D forms, large type, luminous gradients, app/podcast/creator pitch layouts, big section breaks.
- Best for: creator economy, media pitches, consumer app pitches, event concepts, bold marketing narratives.
- Density: medium.
- Implementation notes: use CSS gradients, generated 3D-like blobs, and layered geometric objects; no source 3D assets.

### 6. `nineties-memphis-pitch`

- Source: SlidesCarnival Illustrative Creative 90's Style Presentation
- URL: https://www.slidescarnival.com/template/90-style-pitch-deck/22394
- Coverage gap: current retro templates lean psychedelic, grunge, halftone, or analog-brutalist. There is no clean 90s Memphis system with playful geometry, sticker shapes, team/profile pages, timelines, charts, and photo-collage layouts.
- Visual direction: bright geometric Memphis shapes, squiggles, sticker-like frames, playful title cards, collage pages, retro chart language.
- Best for: creative pitches, education, culture decks, youth campaigns, informal team stories.
- Density: medium.
- Implementation notes: keep geometry editable with CSS/SVG; avoid emoji-heavy gimmicks unless used as optional decorations.

### 7. `elegant-product-launch`

- Source: Slidesgo Elegant Product Launch
- URL: https://slidesgo.com/theme/elegant-product-launch
- Coverage gap: current proposal and product templates cover business/UX, but not a premium launch narrative with product reveal, mockups, timeline, market map, launch plan, and refined commerce styling.
- Visual direction: elegant product-first pages, mockup frames, launch timeline, positioning boards, premium image blocks, clean charts and maps.
- Best for: product launches, campaign plans, premium consumer products, brand/product roadshows.
- Density: medium.
- Implementation notes: prioritize a first-viewport product signal, hero product frame, mockup showcase, launch calendar, market map, and campaign asset grid.

### 8. `finance-startup-statements`

- Source: Slidesgo Financial Statements for Startups Pitch Deck
- URL: https://slidesgo.com/theme/financial-statements-for-startups-pitch-deck
- Coverage gap: existing QBR and executive templates show metrics, but there is no finance-native startup pitch deck with financial statements, runway, cost structure, scenario tables, and investor-oriented numeric rigor.
- Visual direction: startup finance deck with tables, compact charts, cash-flow views, runway gauges, KPI cards, and investor-summary pages.
- Best for: fundraising, CFO reviews, financial model walkthroughs, startup board packs, investor diligence.
- Density: high.
- Implementation notes: build readable table/card hybrids, not spreadsheet screenshots; support P&L, cash runway, revenue bridge, assumptions, and use-of-funds layouts.

### 9. `colorful-keynote-system`

- Source: GraphicRiver colorful pitch deck / Keynote marketplace results
- URL: https://graphicriver.net/colorful-and-pitch%20deck-graphics-in-presentation-templates
- Coverage gap: current colorful templates are either operational (`bright-organized`) or style-specific art decks. The library does not yet have a premium marketplace-style Keynote system with polished colorful pitch sections, gradient geometry, portfolio modules, and modern agency/startup flexibility.
- Visual direction: bright Keynote-like blocks, colorful gradients, clean vector geometry, large section numerals, portfolio grids, multipurpose pitch modules.
- Best for: agency pitch, startup overview, creative business profile, portfolio-heavy marketing deck.
- Density: medium.
- Implementation notes: treat this as an aggregate market direction, not one source clone. Pull composition ideas from the category and build an original system with no marketplace assets.

## Reserve Candidates

These are useful but lower priority because they overlap more with existing templates:

- Slidesgo Product Launch Marketing Plan: useful marketing-plan variant, but overlaps with `elegant-product-launch` and `modern-business-proposal`.
- Slidesgo AI App / AI Finance / AI Chatbot pitch decks: useful if we want more AI-specific decks, but current `circuit-tech-dark`, `dark-minimal-ui`, and `glass-ux-studio` already cover adjacent tech moods.
- SlideModel Professional Business Slide Deck: strong premium business source, but overlaps with `linear-qbr`, `bright-organized`, and `smart-business-report`.
- Slidesgo Old Newspaper / Newspaper Journalist Academy: alternatives if `newspaper-editorial` needs more newspaper source diversity.
- GraphicRiver Grid Keynote category: useful if we later want a stricter Swiss/keynote grid system distinct from `colorful-keynote-system`.

## Suggested Build Order

1. `survey-results-infographics`, `product-roadmap-infographics`, `finance-startup-statements`
   - Highest utility; fills repeatable business/research gaps.
2. `newsroom-broadcast`, `newspaper-editorial`, `elegant-product-launch`
   - Strong visual identities and clear use cases.
3. `abstract-3d-maximalist-pitch`, `nineties-memphis-pitch`, `colorful-keynote-system`
   - Broadens visual range and helps the library feel less corporate.

## Source Safety

- Use public pages only as visual references for composition, layout rhythm, typography mood, palette, and slide vocabulary.
- Do not copy proprietary slide assets, screenshots, source illustrations, template files, icons, photos, or downloadable PowerPoint/Keynote files.
- Rebuild with independent HTML/CSS/SVG placeholders and source-inspired metadata notes.
