import { useState } from "react";
import useFetcher from "../hooks/useFetcher.js";
import SearchSong from "./SearchSong.jsx";
import SelectSong from "./SelectSong.jsx";
import { Container, Box } from "@mui/material";

function Step1Search({ onSongsSelected }) {
    const { getSongInfo } = useFetcher();

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        setLoading(true);
        const data = await getSongInfo(query);
        setSongs(data);

        setLoading(false);
    }

    const handleSelect = (song) => {
        onSongsSelected(song); // pass the selected song to the parent component
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box
                display="flex"
                flexDirection="column"
            >
                <SearchSong onSearch={handleSearch} loading={loading} />
                <SelectSong songs={songs} onSelect={handleSelect}/>
            </Box>
        </Container>
    );
}

export default Step1Search;
