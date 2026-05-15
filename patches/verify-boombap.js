// verify-boombap.js — DRUMS.md reference patch #2 "Boom-bap"
setcpm(90/4)
stack(
  s("bd ~ ~ bd ~ ~ bd ~ ~ ~ ~ ~ ~ ~ ~ ~").bank("AkaiLinn"),
  s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~").bank("AkaiLinn").gain(.9),
  s("hh*8").bank("AkaiLinn").gain(".6 .4").late("0 .03".fast(4))   // swing
)
