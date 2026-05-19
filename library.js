// library.js — the graph of patches.
// Manual edges define which patches can transition to which.
// Used by the bridge's /library endpoint to drive the browser overlay UI.

export default {
  nodes: [
    'dark-techno',
    'dark-base',
    'deep-house',
  ],

  // Edges are undirected for now. Each entry is [from, to].
  // The transition mechanic is "replace" — sending the new patch's code
  // and letting Strudel handle continuity for any byte-identical shared layers.
  edges: [
    ['dark-techno', 'dark-base'],   // tight pair: shared kick, both A phrygian, similar bass families
    ['dark-base',   'deep-house'],  // long jump: different key (F dorian), different genre
    ['dark-techno', 'deep-house'],  // long jump: tempo + genre + key all different
  ],

  // Optional: the patch to load on first connection if no current state.
  initial: 'dark-base',
};
