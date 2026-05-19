// 16th-note white-noise hats — short decay = "tick" character.
// HPF'd for sizzle, perlin gain wobble, slow stereo pan.
// dark-techno signature.

export default () => `s("white").struct("x*16")
    .decay(.04).sustain(0)
    .gain(perlin.range(.12, .3))
    .hpf(4500)
    .pan(sine.slow(8))`;
