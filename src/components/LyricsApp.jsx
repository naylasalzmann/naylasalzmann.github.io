import React, { useState } from 'react'
import Step1Search from './Step1Search.jsx'

export default function LyricsApp() {

    const [step, setStep] = useState(1);
    const [selectedSong, setSelectedSong] = useState(null);
    
    // Function to handle song selection    
    const onSongsSelected = (song) => {
        setSelectedSong(song);
        setStep(2); // Move to the next step after selecting a song
    }

    const next = () => setStep((s) => Math.min(s + 1, 3));
    const back = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <>
            <div>Welcome</div>

            {step === 1 && <Step1Search onNext={next} onSongsSelected={onSongsSelected}/>}
            {step === 2 && <Step2LyricSelect onNext={next} onBack={back} />}
            {step === 3 && <Step3ImageEditor onBack={back} />}
        </>
    );
}