# 14 — MIDI / external I/O

Source: <https://strudel.cc/learn/input-output/>

Sending Strudel patterns out to hardware/software synths, and reading MIDI in from controllers. Plus OSC and MQTT routing.

---

## MIDI output

### Basics

```js
// Send note events to a named MIDI port
chord("<C^7 A7 Dm7 G7>").voicing().midi('IAC Driver')

// Use the same pattern only for controller messages (no notes)
note("d e c a f").midi('IAC Driver', { isController: true })
```

### Port and channel selection

```js
// Patternable ports
note('c a f e').midiport('<0 1 2 3>').midi()

// Set a default port
midiport('IAC Driver');

// MIDI channel (1–16)
midichan(2)
```

### `.midi()` options object

| Option | Default | Notes |
|---|---|---|
| `isController` | `false` | If `true`, suppresses note-on/off — CC only |
| `latencyMs` | `34` | Output alignment offset |
| `noteOffsetMs` | `10` | Adjustment for note-off timing |
| `midichannel` | `1` | Default channel |
| `velocity` | `0.9` | Note velocity (0–1) |
| `gain` | `1` | Velocity multiplier |
| `midimap` | `'default'` | Named CC mapping |

---

## Control Change

```js
// Inline: control number 74 (filter cutoff on many synths), value from an LFO
note("c a f e").control([74, sine.slow(4)]).midi()

// Equivalent split form
note("c a f e").ccn(74).ccv(sine.slow(4)).midi()
```

### Reusable CC mappings — `midimaps`

```js
midimaps({ mymap: { lpf: 74 } })
note("c a f e").lpf(sine.slow(4)).midimap('mymap').midi()
```

Advanced — with range and curve:

```js
midimaps({ mymap: {
  lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
}})
note("c a f e").lpf(sine.slow(2).range(400, 2000))
  .midimap('mymap').midi()
```

Global default map:

```js
defaultmidimap({ lpf: 74 })
note("c a f e").midi()
lpf(sine.slow(4).segment(16)).midi()
```

---

## Program change / preset switching

```js
progNum("<0 1>").midi()
note("c3 e3 g3").progNum("<0 1 2>").midi()
```

---

## Sync / transport

```js
stack(midicmd("clock*48,<start stop>/2").midi('IAC Driver'))
```

Recognized commands: `clock` (alias `midiClock`), `start`, `stop`, `continue`.

---

## Expression

```js
// Pitch bend, range -1..1
note("c a f e").midibend(sine.slow(4).range(-0.4, 0.4)).midi()

// Aftertouch / channel pressure, range 0..1
note("c a f e").miditouch(sine.slow(4).range(0, 1)).midi()
```

---

## System exclusive

```js
let id = 0x43; // Yamaha
let data = "0x79:0x09:0x11:0x0A:0x00:0x00";
note("c a f e").sysex(id, data).midi()
// or split:
note("c a f e").sysexid(id).sysexdata(data).midi()
```

---

## MIDI input

### Keyboard / notes

```js
const kb = await midikeys('Arturia KeyStep 32')

kb().s("tri").lpf(80).lpe(6).lpd(0.1).room(2).delay(0.35)

// Use the input as a rhythm trigger
kb("0.5 1").s("saw").add(note(rand.mul(0.3)))
  .lpf(1000).lpe(2).room(0.5)
```

> Note: "note length is fixed as Superdough is not currently set up for undetermined note durations."

### CC input

```js
const cc = await midin('IAC Driver Bus 1')
note("c a f e")
  .lpf(cc(0).range(0, 1000))
  .lpq(cc(1).range(0, 10))
  .sound("sawtooth")

// Channel-specific
const allCC = await midin('IAC Driver Bus 1')
const cc = (ccNum) => allCC(ccNum, 2)   // channel 2 only
```

---

## OSC — SuperDirt integration

Strudel can drive SuperCollider/SuperDirt for traditional Tidal-style audio:

```js
note("c a f e").osc()
s("bd sd").osc()
```

Requires SuperCollider + SuperDirt (or the StrudelDirt fork). Parameter names follow SuperDirt conventions — see TidalCycles docs.

---

## MQTT

Send pattern data as JSON to a broker topic:

```js
note("c a f e").control([...]).mqtt('mqtt.broker.address', '/topic')
```

Receive-side is not supported yet.
