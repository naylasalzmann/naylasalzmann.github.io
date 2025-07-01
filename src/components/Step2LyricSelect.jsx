import {
    Box,
    Typography,
    Paper,
    Container
} from '@mui/material';
import { useState, useEffect } from 'react';
import GoBackAndForward from './GoBackAndForward.jsx';

// This component will display the lyrics of the selected song and allow the user to select lines
// It will also handle the logic for moving to the next step in the process
// It will receive the selected song as a prop and fetch the lyrics using the Spotify API
// The user can select lines from the lyrics, and when they click "Continue", it will move to the next step

function Step2LyricSelect({ song, getSongLyrics, onNext, onBack, setSelectedLines, selectedLines }) {
    const [lyrics, setLyrics] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLyrics(null);
            } finally {
                setLoading(false);
            }
        };

        fetchLyrics();
    }, [song, getSongLyrics]);

    if (loading) return <div>Loading lyrics...</div>;
    if (!lyrics || lyrics.length === 0) {
        return <div>No lyrics found for this song.</div>;
    }

    const lines = lyrics?.plainLyrics ? lyrics.plainLyrics.split('\n').filter(Boolean) : [];

    const toggleLine = (index, line) => {
        setSelectedLines((prevSelected) => {
            if (prevSelected.includes(index)) {
                // If the line is already selected, remove it
                return prevSelected.filter((i) => i !== index);
            } else {
                // Otherwise, add it to the selection
                return [...prevSelected, { index, text: line }];
            }
        });
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <GoBackAndForward
                goBack={onBack}
                goNext={() => {
                    onNext();
                }}
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
                {lines.map((line, index) => {
                    const isSelected = selectedLines.some(item => item.index === index);
                    console.log('Line:', line, 'isSelected:', isSelected);
                    return (
                        <Paper
                            key={index}
                            onClick={() => toggleLine(index, line)}
                            elevation={isSelected ? 6 : 1}
                            sx={{
                                cursor: 'pointer',
                                padding: 2,
                                width: '100%',
                                maxWidth: 600,
                                textAlign: 'center',
                                backgroundColor: isSelected ? 'primary.light' : 'background.paper',
                                fontSize: '1.25rem',
                                fontWeight: isSelected ? 'bold' : 'normal',
                            }}
                        >
                            {line}
                        </Paper>
                    );
                })}
            </Box>
        </Container>
    )
}

export default Step2LyricSelect