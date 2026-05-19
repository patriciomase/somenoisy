// Four-on-the-floor kick using dirt-samples bd round-robin + speed jitter.
// Shared across dark-techno, dark-base, deep-house. Optional sidechain trigger.
//
// Opts:
//   roundRobin  string of sample indices to cycle through, e.g. "<0 1 2 0>"
//   gain        master gain for this layer (default 0.9)
//   duckTarget  if set, ducks the given orbit on every hit (sidechain trigger)

export default ({ roundRobin = "<0 1 2 0>", gain = 0.9, duckTarget = null } = {}) => {
  const duck = duckTarget != null
    ? `.duckorbit(${duckTarget}).duckattack(0.2).duckdepth(0.85)`
    : '';
  return `s("bd*4").n("${roundRobin}").speed(perlin.range(.97, 1.03)).gain(${gain})${duck}`;
};
