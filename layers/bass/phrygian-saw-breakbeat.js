// Breakbeat-flavoured 2-bar phrygian bass with small random freedoms.
// Each beat has 8ths or 16ths; bar 2 has a roll on the last beat.
// Random sources: micro pitch drift, breathing resonance, gentle volume drift,
// occasional octave drop. dark-base signature voice.

export default () => `note(\`<
    [a1 [a2 a2] a1 a2 [a1 c2] [a2 a2] [a1 bb1] [a2 g1]]
    [a1 [a2 g2] a1 [a2 a2] [a1 f2] [bb1 a2] [a1 c2] [g1 a2]]
  >\`)
    .add(note("0,.04"))
    .s('sawtooth')
    .attack(.001).decay(.09).sustain(.3).release(.05)
    .shape(.6)
    .add(note(perlin.range(-.05, .05)))
    .cutoff(sine.slow(32).range(150, 180))
    .resonance(perlin.range(8, 12).slow(8))
    .lpa(.02).lpenv(-2.5)
    .gain("0.6 0.4 0.5 0.4 0.6 0.4 0.5 0.45")
    .mul(gain(perlin.range(.88, 1).slow(4)))
    .sometimesBy(.12, x => x.add(note(-12)))`;
