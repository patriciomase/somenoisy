// verify-dnb.js — DRUMS.md reference patch #3 "DnB amen feel"
setcpm(174/4)
samples('github:tidalcycles/dirt-samples')

stack(
  s("breaks165").slice(8, "0 1 [2 2*2] 3 [4 0] 5 6 7").gain(.9),
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandTR909").gain(.5),           // sub-kick anchor
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR909").gain(.6)             // backbeat reinforcement
)
