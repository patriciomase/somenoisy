// verify-techno.js — DRUMS.md reference patch #1 "Cold techno"
setcpm(130/4)
stack(
  s("bd*4").bank("RolandTR909").gain(.95),
  s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~").bank("RolandTR909").gain(.7),
  s("hh*16").bank("RolandTR909").gain(perlin.range(.2, .5)),
  s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909").gain(.4).hpf(2500),
  s("rim(3,16,2)").bank("RolandTR909").gain(.4).pan(.7)
)
