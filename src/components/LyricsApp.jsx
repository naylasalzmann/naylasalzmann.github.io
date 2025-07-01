import { useState } from 'react';
import Step1Search from './Step1Search.jsx';
import Step2LyricSelect from './Step2LyricSelect.jsx';
import useFetcher from '../hooks/useFetcher.js';
import Step3ImageGenerator from './Step3ImageGenerator.jsx';

// This component will manage the steps of the lyrics app
// It will handle the state of the selected song and the current step
// It will render the appropriate step component based on the current step
// It will also handle the logic for moving to the next step or going back to the previous step

export default function LyricsApp() {
    const { getSongLyrics } = useFetcher();

    const [step, setStep] = useState(1);
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedLines, setSelectedLines] = useState([]); // Array to keep track of selected lines
    
    
    // Function to handle song selection    
    const onSongsSelected = (song) => {
        setSelectedLines([]);
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
            {/* Step 2: This step needs refactoring */}
            {step === 2 && <Step2LyricSelect onNext={next} onBack={back} getSongLyrics={getSongLyrics} song={selectedSong} selectedLines={selectedLines} setSelectedLines={setSelectedLines}/>}
            {step === 3 && <Step3ImageGenerator onBack={back} song={selectedSong} selectedLines={selectedLines}/>}
        </>
    );
}