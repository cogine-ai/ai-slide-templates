# End-to-End Workflow Examples

These examples show the full path from user input to generated deck structure. They are written for agents using this template library, but they are also useful for humans reviewing what a good workflow should produce.

Each example includes:

- the user's input shape
- the outline or compression step
- metadata-based template selection using `tone`, `density`, `scheme`, and `best_for`
- the generated output folder and slide structure
- common failure modes, especially overfilling slides

## Examples

- [`structured-outline-to-output.md`](structured-outline-to-output.md): structured outline -> template choice -> output structure.
- [`raw-notes-to-output.md`](raw-notes-to-output.md): long script/raw notes -> derived outline -> template choice -> output structure.
