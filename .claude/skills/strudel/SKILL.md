---
name: strudel
description: Authors idiomatic Strudel patches (beats, basslines, melodies, full loops) for the strudel.cc browser-based live-coding music REPL — a JavaScript port of TidalCycles. Use when the user asks Claude to write, compose, build, generate, sketch, remix, or extend Strudel code — e.g. "write me a techno beat", "compose a chill ambient loop in Strudel", "sketch a polyrhythmic bassline", "add a breakdown to this Strudel patch". Triggers on imperative authoring requests for live-coding music code; NOT for "how do I" or "what does X do" questions about the Strudel language itself.
---

# Strudel patch author

## When this skill applies

**Fires on:** imperative requests to write, compose, build, sketch, generate, extend, or remix Strudel code. Keywords: "make me", "write a", "compose", "sketch", "build me a", "give me a", "track", "beat", "loop", "groove", "pattern", "patch", "bassline", "melody", "chord progression", "breakdown", "drop", "remix this", "evolve this".

**Does NOT fire on:** questions about the Strudel language ("what does jux do?", "how does mini-notation work?", "explain scales"). Those are reference lookups — read from `docs/` directly, do not engage this workflow.

## Output contract

Every response produces code that **runs as-is when pasted into <https://strudel.cc>**:

- One self-contained block, wrapped in a ` ```js ` fence.
- Begins with `setcpm(...)` if tempo is non-default (default is 30 cpm = 2s cycle).
- Use a single top-level `stack(...)` for multi-layer pieces, or comma-stacking inside a quoted pattern when ≤ 2 layers and it stays readable.
- Inline comments only when a choice is non-obvious — one short line max.
- After the code block: 2–4 bulleted variations the user can swap in. Phrase as "swap X for Y to get Z", not as full alternative patches.

## Composition workflow

1. **Clarify only if intent is ambiguous.** Genre + mood is enough. If the user said only "a beat", ask "what flavor — techno, hip-hop, DnB, broken, ambient?" Otherwise just pick and ship.
2. **Pick tempo + key.** Set `setcpm()` matching the genre (see PATTERNS.md for defaults). Pick a scale/mode that fits the mood.
3. **Build bottom-up:** kick → percussion → bass → harmony/pad → melody/lead → effects pass.
4. **Always include subtle variation.** At least one `<...>` alternation, or a `.sometimes(...)` / `.degrade()`. Static patterns get boring fast.
5. **Suggest variations after the code**, never inline alternative full versions.

## When you need language detail

The reference docs at `docs/` (relative to the project root) cover every Strudel feature. **Do not read all of them.** Read only what the current task needs.

See [REFERENCE.md](REFERENCE.md) for the curated menu: task → which doc to open.

## Compositional idioms

Genre starters, drum-machine shorthand, mode-to-mood mapping, common moves: see [PATTERNS.md](PATTERNS.md). Consult before writing if the request hits an unfamiliar genre.

## Drum patterns — deep reference

Rhythm fundamentals, beat anatomy, syncopation/ghost-notes, polymeter vs polyrhythm, the ABAC/AAAD phrase framework, fills and empties (the "kick drop"), drum-machine character profiles, and paste-ready drum bodies for techno / boom-bap / DnB / dark prog: see [DRUMS.md](DRUMS.md). **Consult any time a request involves drums** — it has both the *why* (theory) and the *how* (Strudel-specific implementation).

## Common pitfalls

Lazy sample loading, sample-index ordering, tempo defaults, mini-notation traps, single vs double quotes: see [GOTCHAS.md](GOTCHAS.md). Skim before submitting code — these account for most "it doesn't sound right" reports.
