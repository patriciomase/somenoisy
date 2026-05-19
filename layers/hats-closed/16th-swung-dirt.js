// 16th-note closed hats from dirt-samples with UK garage swing.
// Every other 16th is pushed late by .02 cycle = the head-nod groove.
// deep-house / classic house signature.

export default () => `s("hh*16").n("<0 1>")
    .gain(perlin.range(.15, .35))
    .late("0 .02".fast(8))
    .pan(sine.slow(6))`;
