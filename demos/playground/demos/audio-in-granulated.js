// Granulates live audio from the microphone.
// Wear headphones to prevent feedback.

flock.synth({
    synthDef: {
        ugen: "flock.ugen.granulator",
        delayDur: 0.25,
        numGrains: {
            ugen: "flock.ugen.lfNoise",
            freq: 0.5,
            mul: 75,
            add: 75,
            options: {
                interpolation: "linear"
            }
        },
        source: {
            ugen: "flock.ugen.audioIn"
        }
    }
});
