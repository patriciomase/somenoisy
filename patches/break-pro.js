// break-pro.js — same A-minor dark progressive house intent as break.js, but
// applying production techniques from Felix Roos's tunes.mjs:
//   - real dirt samples (not default banks)
//   - sample round-robin + speed jitter for humanization
//   - reusable bass voice helper
//   - detuned saw + filter envelope + saturation
//   - chord voicings for the pad
//   - mask() for arrangement breathing
//
// FIRST CYCLE WILL BE QUIET while samples download. Subsequent cycles play normally.

samples({
  bd: ['bd/BT0AADA.wav','bd/BT0A0D0.wav','bd/BT0A0A7.wav','bd/BT0A0D3.wav'],
  sd: ['sd/rytm-01-classic.wav','sd/rytm-00-hard.wav'],
  hh: ['hh27/000_hh27closedhh.wav','hh/000_hh3closedhh.wav'],
  oh: ['oh/000_ho.wav'],
  cp: ['cp/HANDCLP0.wav'],
}, 'github:tidalcycles/dirt-samples');

// reusable bass voice — detune layer + envelope + saturation
const bassVoice = x => x
  .add(note("0,.04"))
  .s('sawtooth')
  .attack(.001).decay(.12).sustain(.3).release(.08)
  .shape(.4);

stack(
  // ===== DRUMS — round-robin sample variants, perlin speed jitter =====
  s("bd*4").n("<0 1 2 0 3 0 1 2>")
    .speed(perlin.range(.97, 1.03))
    .gain(.9),

  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ sd").n("<0 1>")
    .gain("0.8 0.8 0.8 0.35").attack(.005),

  s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")
    .gain(.45).room(.5).attack(.01),

  // closed hats — variety + velocity wobble + slight pan motion
  s("hh*16").n("<0 1>")
    .gain(perlin.range(0.1, 0.3))
    .speed(perlin.range(.95, 1.05))
    .pan(sine.slow(8)),

  // open hats on the offbeat — HPF'd, panned wide
  s("~ oh ~ oh ~ oh ~ oh")
    .gain(.4).hpf(2500)
    .pan(sine.slow(7).range(0.3, 0.7)),

  // ===== BASS — sine sub + detuned saw reese with filter envelope =====
  // sub pulse
  note("a1*4").s('sine').gain(.7),

  // reese mid-bass: driving 8ths, filter swells per-note via lpa/lpenv
  note("a1 a2 a1 a2 a1 a2 [a1 c2] a2").apply(bassVoice)
    .cutoff(400).resonance(9)
    .lpa(.03).lpenv(-1.5)
    .gain("0.55 0.4 0.45 0.4 0.55 0.4 0.5 0.4")
    ._scope(),

  // ===== PAD — proper chord voicings, slow filter wobble, breathes via mask =====
  chord("<Am7 Em7 Fmaj7 G7>")
    .dict('lefthand').voicing()
    .add(note("0,.05"))
    .s('sawtooth')
    .attack(2).decay(.5).sustain(.6).release(2)
    .cutoff(perlin.range(400, 1500).slow(8))
    .gain(.15)
    .room(1).delay(.4).delaytime(3/8).delayfeedback(.3)
    .mask("<x@7 ~>/8")
    ._scope(),
).cpm(125/4)
