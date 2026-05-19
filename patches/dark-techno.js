// dark-techno — 132 BPM, A phrygian. Declarative form for the library system.
// Loaded and compiled by the bridge's /play endpoint into Strudel code.

export default {
  name: 'dark-techno',
  cpm: 132/4,
  context: { key: 'a:phrygian', root: 'a1' },
  samples: {
    src: 'github:tidalcycles/dirt-samples',
    map: {
      bd: ['bd/BT0AADA.wav','bd/BT0A0D0.wav','bd/BT0A0A7.wav','bd/BT0A0D3.wav'],
    },
  },
  layers: [
    { id: 'kick/909-4otf', opts: { roundRobin: '<0 1 2 0 3 0 1 2>', gain: 0.95, duckTarget: 2 } },
    { id: 'sub/808-kick',  opts: { duckTarget: 2 } },
    { id: 'bass/phrygian-saw-driving' },
    { id: 'hats-closed/white-noise-16th' },
    { id: 'hats-open/white-noise-offbeat' },
  ],
};
