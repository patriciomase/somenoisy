// Open hats on the "and" of every beat. The accents (beats 2, 4) hit harder
// — that's the "tzzz" release after the clap in the tzz-ka-tzz interlock.
// Pairs with hats-closed/pre-clap-hh and snare/house-clap.

export default () => `s("~ ~ oh ~ ~ ~ oh ~ ~ ~ oh ~ ~ ~ oh ~")
    .gain("0.35 0.55 0.35 0.55")
    .hpf(1800)`;
