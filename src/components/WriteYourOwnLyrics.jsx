import { Box, Typography } from '@mui/material';
import PublishLyricsForm from './PublishLyricsForm';

export default function WriteYourOwnLyrics({ message = "No lyrics found for this song." }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={8}
      px={2}
      textAlign="center"
    >
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
      <Typography variant="body1" mt={2}>
        Write your own lyrics (yet to be implemented) or try another song.
      </Typography>
    </Box>
  );
}
