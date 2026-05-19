// deep-house — 122 BPM, F dorian. The long-jump destination from the dark cluster.
// Mr Fingers / Larry Heard school: warm kicks, tzz-ka-tzz hat interlock, walking
// acoustic bass, dorian chord stabs, piano counter-melody.

export default {
  name: 'deep-house',
  cpm: 122/4,
  context: { key: 'f:dorian', root: 'f1' },
  samples: {
    src: 'github:tidalcycles/dirt-samples',
    map: {
      bd: ['bd/BT0A0D0.wav','bd/BT0AADA.wav','bd/BT0A0DA.wav'],
      cp: ['cp/HANDCLP0.wav'],
      hh: ['hh27/000_hh27closedhh.wav','hh/000_hh3closedhh.wav'],
      oh: ['oh/000_ho.wav'],
    },
  },
  layers: [
    { id: 'kick/909-4otf', opts: { roundRobin: '<0 1 2 0>', gain: 0.85 } },
    { id: 'hats-closed/pre-clap-hh' },
    { id: 'snare/house-clap' },
    { id: 'hats-open/post-clap-oh' },
    { id: 'hats-closed/16th-swung-dirt' },
    { id: 'sub/sine-pulse', opts: { root: 'f1', gain: 0.6 } },
    { id: 'bass/walking-acoustic' },
    { id: 'harmony/dorian-chord-stab' },
    { id: 'lead/piano-counter-melody' },
  ],
};
