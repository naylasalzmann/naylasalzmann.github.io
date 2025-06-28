import React from 'react';
import { Button, Box, Typography, TextField, Container } from '@mui/material';

export default function SearchSong({ onSearch, loading }) {

  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) { 
      onSearch(query);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" component="h1" textAlign="center">
            Search for a Song
            </Typography>

            <TextField
            size="small"
            label="Song or Artist"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            />

            <Button
            variant="contained"
            type="submit"
            disabled={loading || !query.trim()}
            sx={{ mt: 2 }}
            >
            {loading ? 'Searching...' : 'Search'}
            </Button>
        </Box>
    </Container>
  );
}