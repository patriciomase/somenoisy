// 808 sub-kick layer — sampled BD from RolandTR808 bank, lowpassed deep.
// Pairs with kick/909-4otf for weight; ducks the same orbit if needed.
//
// Opts:
//   gain        master gain (default 0.5)
//   duckTarget  if set, ducks the given orbit on every hit

export default ({ gain = 0.5, duckTarget = null } = {}) => {
  const duck = duckTarget != null
    ? `.duckorbit(${duckTarget}).duckattack(0.2).duckdepth(0.85)`
    : '';
  return `s("bd*4").bank("RolandTR808").lpf(100).gain(${gain})${duck}`;
};
