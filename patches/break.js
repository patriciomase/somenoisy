// break.js — dark progressive house with breakbeat flavor, A minor, 125 BPM
// 16-step grid per cycle. Layered drums + 3-voice bass + percussion shots.

stack(
  // ===== KICKS — punchy 4OTF (909) + sub layer (808) + occasional break-kick =====
  s("bd*4").bank("RolandTR909").gain(0.9),
  s("bd*4").bank("RolandTR808").lpf(100).gain(0.55),
  s("~ ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~ bd ~").bank("RolandTR909").gain(0.45),

  // ===== HATS — closed atmospheric wobble + off-beat open hats high-passed =====
  s("hh*16").bank("RolandTR909")
    .gain(perlin.range(0.1, 0.25))
    .pan(sine.slow(8)),
  s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909")
    .gain(0.3).hpf(500).pan(sine.slow(7).range(0.3, 0.7)).decay(0.3),


  // ===== BASS STACK =====
  // sub pulse — pure sine on the root, locks with the kick
  note("a1*4").s("sine").gain(0.7),

  // reese mid-bass — driving 8ths with accent, vibrato + distortion for teeth
  note("a1 a2 a1 a2 a1 a2 [a1 c2] a2").s("sawtooth")
    .vib(5).vibmod(0.2)
    .lpf(sine.slow(16).range(100, 300)).lpq(10)
    .attack(0.002).release(0.1)
    .gain("0.7 0.5 0.55 0.5 0.7 0.5 0.6 0.5")
    .distort("0.4:0.4"),


).cpm(125/4)
