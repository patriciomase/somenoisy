// dub-test.js — dub-techno-ish, A minor, ~125 BPM
// Exercises: drum bank, perlin signal on hats, filter LFO, dub delay,
// scale-degree melody with sometimes(jux(rev)).

stack(
  // four-on-floor kick + offbeat clap
  s("bd*4").bank("RolandTR909").gain(0.95),
  s("~ cp ~ cp").bank("RolandTR909").gain(0.7).room(0.4),

  // hats with smoothed-random dynamics, slow stereo sweep
  s("hh*16").bank("RolandTR909")
    .gain(perlin.range(0.2, 0.55))
    .pan(sine.slow(8)),

  // tudu tudu tudutudu tudu — bouncy octave bass on top of the sub
  note("[a2 a3] [a2 a3] [a2 a3 a2 a3] [a2 a3]").s("sawtooth")
    .lpf(1500).lpq(6)
    .attack(0.005).release(0.18)
    .gain(0.55),
).cpm(125/4)
