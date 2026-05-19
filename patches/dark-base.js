// dark-base — 125 BPM, A phrygian. The foundation patch — kick + sub + reese
// + atmospheric pluck motif. Shares the kick factory with dark-techno (different opts).

export default {
  name: 'dark-base',
  cpm: 125/4,
  context: { key: 'a:phrygian', root: 'a1' },
  samples: {
    src: 'github:tidalcycles/dirt-samples',
    map: {
      bd: ['bd/BT0AADA.wav','bd/BT0A0D0.wav','bd/BT0A0A7.wav'],
    },
  },
  layers: [
    { id: 'kick/909-4otf', opts: { roundRobin: '<0 1 2 0 2 1 0 2>', gain: 0.9 } },
    { id: 'sub/sine-pulse', opts: { root: 'a1', gain: 0.7 } },
    { id: 'bass/phrygian-saw-breakbeat' },
    { id: 'lead/pluck-fm-bells' },
  ],
};
