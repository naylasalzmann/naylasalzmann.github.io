// components/InstagramShare.jsx
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { toPng } from 'html-to-image';
import { sanitizeFileName } from '../utils/fileUtils';

export default function ShareLyrics({ targetRef, songName }) {

  const handleShare = async () => {
    if (!targetRef?.current) return;

    const safeName = sanitizeFileName(song?.name ?? 'song-lyrics');
    
    try {
      const dataUrl = await toPng(targetRef.current);

      // Download image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${safeName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Try to open Instagram (mobile)
      setTimeout(() => {
        window.location.href = 'instagram://camera';
      }, 1500);
    } catch (err) {
      console.error('Failed to share image to Instagram:', err);
    }
  };

  return (
    <Box mt={3} textAlign="center">
      <Button
        onClick={handleShare}
        variant="contained"
        sx={{
          backgroundColor: '#E1306C',
          '&:hover': { backgroundColor: '#C42D5F' },
        }}
      >
        Share to Instagram Stories
      </Button>
      <Typography variant="body2" mt={1} color="text.secondary">
        Downloads image & opens Instagram Stories (try on mobile)
      </Typography>
    </Box>
  );
}
