import { useState } from "react";
import useSpotifyApi from "../hooks/useSpotifyApi";
import SearchSong from "./SearchSong.jsx";
import SelectSong from "./SelectSong.jsx";
import { Container } from "@mui/material";

function Step1Search({ onNext, onSongsSelected }) {

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetcher = new useSpotifyApi();

    const handleSearch = async (query) => {
        setLoading(true);
        const data = await fetcher.getSongInfo(query);
        setLoading(false);

        setSongs(data);
    }

    const handleSelect = (song) => {
        onSongsSelected(song); // pass the selected song to the parent component
        onNext(); // add song to the state in the parent component
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }} textAlign="center">
            <SearchSong onSearch={handleSearch} loading={loading} />
            <SelectSong songs={songs} onSelect={handleSelect}/>
        </Container>
    );
}

export default Step1Search;
