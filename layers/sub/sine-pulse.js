// Sine sub-bass pulsing on the kick. Parameterised by root note.
// Used by dark-base (a1) and deep-house (f1). Pure sine = no harmonic competition.
//
// Opts:
//   root  note name with octave, e.g. "a1" or "f1" (default "a1")
//   gain  master gain (default 0.65)

export default ({ root = "a1", gain = 0.65 } = {}) =>
  `note("${root}*4").s('sine').gain(${gain})`;
