import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingIndicator({ message = "Loading..." }) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            <CircularProgress color="primary" />
            <Typography variant="body1" mt={2}>
                {message}
            </Typography>
        </Box>
    );
}