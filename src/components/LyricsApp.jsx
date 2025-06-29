import { useState } from 'react';
import Step1Search from './Step1Search.jsx';
import Step2LyricSelect from './Step2LyricSelect.jsx';
import useFetcher from '../hooks/useFetcher.js';

export default function LyricsApp() {
    const { getSongLyrics } = useFetcher();

    const [step, setStep] = useState(1);
    const [selectedSong, setSelectedSong] = useState(null);
    
    // Function to handle song selection    
    const onSongsSelected = (song) => {
        setSelectedSong(song);
        setStep(2); // Move to the next step after selecting a song
    }

    const next = () => setStep((s) => Math.min(s + 1, 3));
    const back = () => setStep((s) => Math.max(s - 1, 1));

    console.log("Selected song:", selectedSong);

    return (
        <>
            <div>Welcome</div>

            {step === 1 && <Step1Search onSongsSelected={onSongsSelected}/>}
            {step === 2 && <Step2LyricSelect onNext={next} onBack={back} getSongLyrics={getSongLyrics} song={selectedSong}/>}
            {step === 3 && <Step3ImageEditor onBack={back} />}
        </>
    );
}