import { useRef } from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import GoBackAndForward from './GoBackAndForward.jsx';
import ShareLyrics from './ShareLyrics.jsx';

export default function Step3ImageGenerator({ song, selectedLines, onBack }) {

    // This component will display the song information and selected lyrics
    // It will show the song name, artists, album cover, and the selected lyrics lines
    // Combine selected lyrics lines into text

    const imageRef = useRef(null);

    const lyricsText = selectedLines.length > 0
        ? selectedLines.map(i => i.text).join('\n')
        : 'No lyrics selected.';

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <GoBackAndForward
                goBack={onBack}
                goNext={null}
                disableNext={selectedLines.length === 0}
            />
            <Box display="flex" flexDirection="column" gap={1} alignItems="center">
                <Typography variant="h5" gutterBottom>
                    Sounds good!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Now you can share your lyrics on Instagram Stories
                </Typography>

                <Box
                    ref={imageRef}
                    sx={{
                        backgroundColor: '#37474f', // default dark background for now
                        color: '#fff',
                        borderRadius: 3,
                        p: 3,
                        width: '100%',
                        maxWidth: 400,
                        boxShadow: 3,
                        userSelect: 'none',
                        whiteSpace: 'pre-line', // to respect line breaks
                    }}
                >
                    {/* Song Info */}
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <Box
                            component="img"
                            src={song.imageUrl}
                            alt={song.name}
                            sx={{ width: 64, height: 64, borderRadius: 1 }}
                        />
                        <Box>
                            <Typography variant="h6">{song.name}</Typography>
                            <Typography variant="subtitle2">
                                {song.artists}
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Lyrics Text */}
                    <Typography variant="body1" sx={{ minHeight: 150 }}>
                        {lyricsText}
                    </Typography>
                </Box>
            </Box>

            {/* Share Button */}
            <ShareLyrics targetRef={imageRef} songName={song.name} />
        </Container>
    );
}