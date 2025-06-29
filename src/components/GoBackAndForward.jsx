import { Box, Button } from '@mui/material';

export default function GoBackAndForward({ goBack, goNext, disableNext = false }) {
    return (
        <Box mt={4} display="flex" justifyContent="space-between">
            <Button
                variant="outlined"
                color="secondary"
                onClick={goBack}
            >
                Back
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={goNext}
                disabled={disableNext}
            >
                Continue
            </Button>
        </Box>
    );
}