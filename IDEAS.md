# Ideas — future directions for somenoisy

Captured here so they don't get lost. Each idea is a stake in the ground, not a spec.

---

## 1 · Touch-first visual UI on top of Strudel

**Date raised:** 2026-05-14

### Vision (raw, in user's words)

> Reshape the UI we have now: instead of code, we would see boxes, or some kind of draggable elements, so we make music from a touch screen just dragging elements instead of writing code. The visual UI should translate to code behind the scenes.

### Why this is interesting

- Strudel is keyboard-centric — virtually all DSL music tools are. **Touch-first is a real differentiator.**
- Lowers the barrier for people who want to make music but don't want to learn syntax.
- Generates real Strudel code as output → keeps a clean upgrade path: outgrow the boxes, drop into code.

### Prior art (worth studying before building)

- **Estuary** — browser-based, collaborative Tidal interface. Code-driven but multi-language.
- **Sonic Pi** has block-coding variants (Scratch-like) for kids/beginners.
- **Pure Data / Max/MSP** — node-graph patching. Visual primitive is a box with inlets/outlets.
- **Trackers** (Renoise, Sunvox) — grid-based, vertically-scrolling step sequencers.
- **Push 2, Maschine, Roland MC-707** — hardware step grids; great touch ergonomics.
- **Strudel's own `udels`** — there's a collaborative-editor experiment in `website/src/components/Udels/` worth reading.

### Realistic scoping (tiers)

| Tier | Scope | Rough effort |
|---|---|---|
| **MVP** | Step grid + small palette (drum row, bass row, one synth). Toggle steps, pick a sample, set tempo. Emits Strudel code one-way. Touch-friendly. | A few focused weeks |
| **V2** | Effect modules you drag onto a track (lpf, reverb, delay) with knobs for parameters. Still one-way visual → code. | A few more weeks |
| **V3** | **Bidirectional sync** — edit the code and the visual updates, and vice versa. Requires a Strudel parser. | Months |
| **V4** | Cover the full Strudel surface (every transform, signals, mini-notation operators, conditional modifiers). | Years; arguably impossible to do well |

### Hardest problems

1. **Mapping Strudel's expressiveness to visual primitives.** Mini-notation has ~15 operators; method chains layer on `lpf`, `room`, `every`, `jux`, `sometimes`, signals, etc. Covering all of it visually is a huge UI design problem. Picking a useful subset is the real design work — and where the product lives or dies.
2. **Bidirectional sync.** Parsing arbitrary user-edited code back into a visual representation is hard. Most visual tools dodge this by being one-way (visual is the source of truth, generated code is read-only). Decide early.
3. **The "show or hide the code" boundary.** If users never see code, you lose Strudel's learning-bridge value. If they always see and can edit it, the visual UI becomes optional. Where this line sits defines the product.
4. **Touch interactions.** Multi-touch, drag thresholds, snapping, gesture vs press, screen sizes ranging from phone to studio touchscreen. Different design constraints from desktop mouse.
5. **Keeping up with Strudel upstream.** Heavy UI work is a fork-in-spirit; every Strudel internal change is potential breakage.

### Possible MVP path

A first cut that would be honestly useful:

- A single Astro page in the cloned Strudel website (or a separate companion site).
- 4 tracks: kick, snare/clap, hat, bass. Plus a sub-row for a melodic synth.
- Each drum track = 16-step toggle grid. Tap squares to toggle.
- Each track has: sample/sound dropdown, gain slider, an "effect" slot (one of: `lpf`, `delay`, `room`).
- The melodic track: 16 steps, each with a note (scale-quantized via a key/mode picker at the top).
- A tempo dial.
- An "Eval" button that generates Strudel code and pushes it to the running REPL via the bridge we already built.
- Optional: a read-only "code preview" panel beside the grid so users see what their dragging produces.

That's small, touch-friendly, and entirely **one-way visual → code** — sidesteps the hardest problem. It would already prove the core thesis.

### Open questions

- Standalone web app, or replace/supplement Strudel's existing REPL?
- If standalone: does it run alongside Strudel (using our bridge) or embed `@strudel/web` directly?
- What's the target device? Tablet-first, phone-friendly, or studio touchscreen?
- Visual style — skeuomorphic (looks like a hardware groovebox) or flat/abstract?
- Is the goal "first-time users" or "live performers on a touch surface"? Different products.
- Could the visual layer be **modular** — a palette of "instrument cards" community-built and remixable?

### Decisions to defer

- Bidirectional sync.
- Mini-notation full coverage.
- Custom samples / sample loading UX.

### Next concrete step if we pursue this

Sketch the MVP UI on paper (or in something like Figma / Excalidraw), pick a screen size to target, and build the smallest possible step-grid that pushes to the bridge. Validate the core loop (touch → code → audio) before designing the rest.
