// Off-beat white-noise "ssshhh" lift — longer decay than the 16ths, lower HPF.
// Sits on every "and" (8th-note offbeats). dark-techno signature.

export default () => `s("white").struct("~ x ~ x ~ x ~ x")
    .decay(.1).sustain(0)
    .gain(.18)
    .hpf(2800)
    .pan(sine.slow(7).range(.3, .7))`;
