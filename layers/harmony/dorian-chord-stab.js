// Jazzy dorian/minor chord stab on every offbeat 8th — quarter-note delay echo.
// Progression: i (Fm9) → iv (Bbm9) → ♭VII7 (Eb7) → v (Cm9). One bar per chord.
// deep-house signature. The "warm" voice (detuned saw, soft envelope, shape)
// is inlined here.

export default () => `chord("<Fm9 Bbm9 Eb7 Cm9>")
    .dict('lefthand').voicing()
    .struct("~ x ~ x ~ x ~ x")
    .add(note("0,.04"))
    .s('sawtooth')
    .attack(.002).decay(.18).sustain(.4).release(.3)
    .shape(.3)
    .cutoff(perlin.range(800, 1800).slow(8))
    .gain(.22)
    .room(.65)
    .delay(.4).delaytime(.49).delayfeedback(.4)`;
