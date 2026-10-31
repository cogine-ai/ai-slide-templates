# November 1 composition and asset notices

The final batch contains six templates and 154 demo slides. Four are independently authored compositions; two adapt credited Figma Community slide-deck layouts. Each folder includes `SOURCE-NOTICES.md`, `ASSET-LICENSES/manifest.json` and an asset-license summary. The HTML also carries source and font notices, so a copied deck retains its credits.

| Template | Composition basis | Actual embedded fonts | Photo records |
| --- | --- | --- | ---: |
| [Press Kit Editorial](../templates/press-kit-editorial/SOURCE-NOTICES.md) | Original Cogine AI composition; fictional North Objects brief | Manrope 4.505, variable 200–800, SIL OFL 1.1 | 8 |
| [Interior Design Editorial](../templates/interior-design-editorial/SOURCE-NOTICES.md) | Original Cogine AI composition; fictional Still House study | Tenor Sans and Poppins, SIL OFL 1.1 | 10 |
| [Fashion Editorial Lookbook](../templates/fashion-editorial-lookbook/SOURCE-NOTICES.md) | Original Cogine AI composition; fictional Form & Fabric study | Fogtwo No5 0.87 and Inter 3.018, SIL OFL 1.1 | 9 |
| [Design Review Grid](../templates/design-review-grid/SOURCE-NOTICES.md) | [Design Review](https://www.figma.com/community/file/1383475610293894214/design-review), Figma Community (@figma), CC BY 4.0 adaptation | Inter 300/400 and Tinos Regular, SIL OFL 1.1 | 4 |
| [Research Readout Pastel](../templates/research-readout-pastel/SOURCE-NOTICES.md) | [Research Readout](https://www.figma.com/community/file/1382481559228932486/research-readout), Figma Community (@figma), CC BY 4.0 adaptation | DM Sans 300/400 and Roboto Mono 300, SIL OFL 1.1 | 0 |
| [Personal Branding Playful](../templates/personal-branding-playful/SOURCE-NOTICES.md) | Original Cogine AI composition; fictional Ari Davis brief | Original static Savate (2015 MIT), Poppins 500/600 and Unbounded 700 (SIL OFL 1.1) | 4 |

## Composition rights

The earlier four Pitch studies are superseded. Public viewing, customization and sharing did not establish a standalone template-library redistribution grant for those exact designs and media. The final four templates therefore use independently authored grids, type scales, CSS, slide compositions, fictional copy and native vector artwork. Historical genre references remain credited in metadata as research provenance. Exported Pitch DOM/CSS, source page geometry, logos, photographs and custom artwork are removed. The final designs do not rely on an inferred Pitch redistribution grant.

The two Figma layout adaptations retain attribution to [Figma Community (@figma)](https://www.figma.com/@figma), links to their original template pages, a [CC BY 4.0 license link](https://creativecommons.org/licenses/by/4.0/) and modification notices. Figma's [official licensing documentation](https://help.figma.com/hc/en-us/articles/360042296374-Figma-Community-copyright-and-licensing) explicitly covers sharing and adapting Community slide-deck templates. The implementation reconstructs public previews as native HTML/SVG; it does not embed slide screenshots. Changes include fictional Fieldwork copy and product screens, local navigation, photography replacements in Design Review, and locally editable research demonstrations. The source font identities and editable Figma paint definitions were not obtained; actual fonts and preview-matched colors are disclosed.

Original code and newly authored vector examples follow the repository MIT license. The underlying Figma layout adaptations retain CC BY 4.0 attribution requirements. Neither statement changes the separate photo or font licenses.

## Photography

All 35 per-template photo records now identify individual Pexels pages and photographers. These represent 32 distinct photographs across the batch; repeated uses and reused photographs are mapped explicitly. The four unidentified Design Review photos and all old Pitch photo payloads/variants are removed. Research Readout contains no stock photography. No raw stock-photo collection is distributed separately from the composed HTML decks.

The [official Pexels License](https://www.pexels.com/license/) expressly includes presentations and templates among permitted creative uses. Its [Terms of Service](https://www.pexels.com/terms-of-service/) and restrictions remain applicable: these images are not MIT or CC0, must not be offered as a competing stock-photo collection, and must not imply endorsement. Provider permission does not replace separate personality, trademark or property rights. The selected images and embedded crops were reviewed for identifiable faces, logos and separate artwork; two process photos containing printed drawings or visible branding were replaced in full before acceptance. Illustrative photographs are not claimed as fictional studio portfolio work or client/staff portraits.

Each register retains the primary photo page, photographer, advertised download URL, source and embedded SHA-256, transformation/crop notes, and page/slot uses. The 12 per-template embedded SVG records cover original Fieldwork demonstration artwork; fresh inline geometric diagrams in the four original decks are project-authored. The final registers cover all 47 per-template embedded image payloads, including CSS backgrounds and nested SVG references.

## Fonts

Cabinet Grotesk and the incompletely specified Hanson payload are absent. Press uses unmodified OFL Manrope at its native metrics; Personal uses OFL Unbounded for compact labels alongside Savate and Poppins. The new compositions do not retain the earlier source-font calibration rules. Fashion no longer embeds its unused Nunito Sans credit face.

Savate uses the original static design from [Collectif We.ch](https://github.com/CollectifWech/Savate), with its 2015 MIT notice, rather than borrowing the later variable redraw's license. Notices for the actual embedded OFL files are retained in the HTML and, where present, `FONT-LICENSES/`. The two Figma decks now also contain the full OFL notices inside inert HTML template elements. Metadata describes the implemented fonts, not unavailable source fonts.

## Verification and scope

`node scripts/validate-assets.mjs` checks each declared register against the actual embedded image bytes, creator/license/source fields and positive review status. It rejects an unrecorded image replacement, missing declared register, unknown/pending license status, and mismatched Pexels photo/download IDs. It does not prove a provider's ownership or supply a legal warranty. Six manifests pass; the other 68 legacy templates have no new register and are explicitly reported as unassessed.

The [acceptance record](template-implementation-2026-11-01.acceptance.json) binds these checks to the final HTML and registry hashes. The source-removal comparison covers the prior batch's raster payloads and variants, source custom-art asset IDs and nontrivial path fingerprints. Research caches, raw photo downloads and superseded local studies are ignored workspace evidence, not runtime dependencies or submitted files. Squash merging keeps the superseded source-media commit out of the main branch ancestry; it does not erase already published PR history or external caches.

Retain applicable attribution and license notices when copying or adapting a template. Replacing a photograph or font requires a new suitable license record.
