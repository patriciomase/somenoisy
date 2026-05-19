// Walking acoustic upright bass through a 4-bar chord progression.
// Each bar: root → 2 → ♭3 → 5 of the local chord. Sampled (gm_acoustic_bass).
// deep-house signature voice — sits above the sine sub, distinct timbre.
//
// Notes are hardcoded for F dorian progression (Fm9 / Bbm9 / Eb7 / Cm9).
// Could be made fully scale-aware later.

export default () => `note(\`<
    [f2 g2 ab2 c3]
    [bb1 c2 db2 f2]
    [eb2 f2 g2 bb2]
    [c2 d2 eb2 g2]
  >\`).s('gm_acoustic_bass')
    .clip(.85)
    .attack(.005).release(.1)
    .gain(.5)
    .room(.2)`;
