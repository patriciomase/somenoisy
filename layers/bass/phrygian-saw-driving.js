// Driving 8th-note phrygian bass with controlled detune, hpf+lpf+resonance,
// distortion, accent gain pattern. Two-bar alternating riff.
// dark-techno signature voice.
//
// Opts:
//   orbit  routing orbit (must match kick's duckTarget for sidechain) — default 2
//   gain   gain pattern string (default accents downbeats)

export default ({ orbit = 2, gain = '"0.5 0.4 0.45 0.4 0.5 0.4 0.45 0.4"' } = {}) => `note(\`<
    [a1 a2 a1 a2 [a1 bb1] a2 a1 a2]
    [a1 a2 [a1 c2] a2 a1 a2 [g1 a2] [a1 f1]]
  >\`)
    .add(note("0,.04"))
    .s("sawtooth")
    .hpf(80)
    .lpf(380).resonance(5)
    .distort(1.2)
    .attack(.02).decay(.12).sustain(.3).release(.08)
    .gain(${gain})
    .shape(.3)
    .orbit(${orbit})`;
