// hello.js — smoke test patch for the live-coding bridge
stack(
  s("bd*4"),
  s("hh*8").gain(0.5),
  s("~ cp ~ cp"),
  note("c2 ~ eb2 g1").s("sawtooth").lpf(800).lpq(6).room(0.3)
).cpm(30)
