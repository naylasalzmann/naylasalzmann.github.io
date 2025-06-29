import {
    Box,
    Typography,
    Button,
    Paper,
    Container
} from '@mui/material';
import { useState, useEffect } from 'react';
import GoBackAndForward from './GoBackAndForward.jsx';

// This component will display the lyrics of the selected song and allow the user to select lines
// It will also handle the logic for moving to the next step in the process
// It will receive the selected song as a prop and fetch the lyrics using the Spotify API
// The user can select lines from the lyrics, and when they click "Continue", it will move to the next step

function Step2LyricSelect({ song, getSongLyrics, onNext, onBack, goToScreen }) {
    const [lyrics, setLyrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLines, setSelectedLines] = useState([]); // Array to keep track of selected lines

    useEffect(() => {
        const fetchLyrics = async () => {
            if (!song || !song.artists?.length) return;

            console.log('Fetching lyrics for:', song.artists, song.name);
            setLoading(true);

            try {
                const data = await getSongLyrics(song.artists, song.name);
                setLyrics(data);
            } catch (err) {
                console.error('Unexpected error in lyrics effect:', err);
                setLyrics(null); // this is optional
            } finally {
                setLoading(false);
            }
        };

        fetchLyrics();

        setSelectedLines([]);
    }, [song, getSongLyrics]);

    if (loading) return <div>Loading lyrics...</div>;
    if (!lyrics || lyrics.length === 0) {
        return <div>No lyrics found for this song.</div>;
    }

    const lines = lyrics?.plainLyrics ? lyrics.plainLyrics.split('\n').filter(Boolean) : [];

    const toggleLine = (index) => {
        setSelectedLines((prevSelected) => {
            if (prevSelected.includes(index)) {
                // If the line is already selected, remove it
                return prevSelected.filter((i) => i !== index);
            } else {
                // Otherwise, add it to the selection
                return [...prevSelected, index];
            }
        });
    }

    // Render the lyrics in a selectable format
    const handleLyricSelect = (lyric) => {
        // Handle lyric selection logic here
        console.log('Selected lyric:', lyric);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <GoBackAndForward
                goBack={onBack}
                goNext={onNext}
                disableNext={selectedLines.length === 0}
            />

            <Typography variant="h5" gutterBottom>
                Select lines
            </Typography>

            <Box
                display="flex"
                flexDirection="column"
                gap={1}
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                {lines.map((line, index) => (
                    <Paper
                        key={index}
                        onClick={() => toggleLine(index)}
                        elevation={selectedLines.includes(index) ? 6 : 1}
                        sx={{
                            cursor: 'pointer',
                            padding: 2,
                            width: '100%',
                            maxWidth: 600,
                            textAlign: 'center',
                            backgroundColor: selectedLines.includes(index)
                                ? 'primary.light'
                                : 'background.paper',
                            fontSize: '1.25rem',
                            fontWeight: selectedLines.includes(index) ? 'bold' : 'normal',
                        }}
                    >
                        {line}
                    </Paper>
                ))}
            </Box>
        </Container>
    )
}

export default Step2LyricSelect