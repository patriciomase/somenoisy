// Atmospheric pluck motif — sparse descending phrase in the upper register.
// Bar 1: e5 → c5 (descending major third).
// Bar 2: a4 → f4 (descending minor third, ♭3 of A — phrygian color).
// Sine + light FM (bell-like), long-delay 3-beat echo for cascading texture.
// dark-base signature.

export default () => `note(\`<
    [~ ~ e5 ~ ~ ~ c5 ~]
    [~ ~ a4 ~ ~ ~ f4 ~]
  >\`)
    .add(note("0,.04"))
    .s('sine').fm(2.5).fmh(2.7)
    .attack(.002).decay(.1).sustain(0).release(.6)
    .lpf(2400).lpa(.005).lpenv(-1)
    .room(.85)
    .delay(.55).delaytime(1.44).delayfeedback(.45)
    .pan(perlin.range(0.25, 0.75).slow(4))
    .gain(.28)`;
