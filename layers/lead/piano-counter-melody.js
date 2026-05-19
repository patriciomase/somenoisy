// Acoustic-piano counter-melody — 2-bar call/response in F dorian.
// Bar 1: ascending minor triad fragment (F → Ab → C) — the call
// Bar 2: descending answer (C → Bb → F)
// Dotted-quarter delay (.74s ≈ 3/8 of a bar at 122 BPM) → 3-against-4 cascade.
// Masked to play 3 cycles, rest 1 — breathing.

export default () => `n(\`<
    [~ 0 ~ ~ 2 ~ ~ 4]
    [4 ~ 3 ~ 0 ~ ~ ~]
  >\`).scale("F4:dorian")
    .s('piano')
    .clip(.6)
    .gain(.35)
    .room(.5)
    .delay(.25).delaytime(.74).delayfeedback(.3)
    .pan(.62)
    .mask("<x@3 ~>/4")`;
