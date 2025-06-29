import { useEffect, useState } from 'react'

export default function useFetcher() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", "4d6b7066ac2443cf82a29b79e9920e88");
        params.append("client_secret", "cddfc0b1c87e4131ae0f3622bdc5b731");

        const fetchToken = async () => {
            try {
                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params,
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch access token');
                }

                const data = await response.json();
                setAccessToken(data.access_token);

            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        }

        fetchToken();
    }, []);

    // TODO: Refactor
    const getSongInfo = async (query, limit = 5) => {
        if (!accessToken) {
            console.error('Access token not available');
            return null;
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch song info');
            }

            const data = await response.json();
            return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artists: track.artists.map(artist => artist.name).join(', '),
                album: track.album.name,
                previewUrl: track.preview_url,
                imageUrl: track.album.images[0]?.url || '',
            }));
        } catch (error) {
            console.error('Error fetching song info:', error);
            return null;
        }
    }

    const getSongLyrics = async (artistName, trackName) => {
        if (!artistName || !trackName) {
            console.error('Artist name or track name is missing');
            return '';
        }

        // Fetch lyrics from the external API
        try {
            const response = await fetch(
                `https://lrclib.net/api/search?q=${encodeURIComponent(artistName)} ${encodeURIComponent(trackName)}`
            );

            if (!response.ok) {
                console.error('Failed to fetch lyrics');
                return null;
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            const exactMatch = data.find(
                (entry) => entry.trackName.toLowerCase().trim() === trackName.toLowerCase().trim() &&
                entry.artistName.toLowerCase().includes(artistName.toLowerCase())
            );

            // Return the exact match if found, otherwise return the first available entry
            console.log('Fetched lyrics:', data, exactMatch, trackName, artistName);

            return exactMatch || data[0] || null;

        } catch (error) {
            console.error('Error fetching song lyrics:', error);
            return null;
        }
    }

    return { getSongInfo, getSongLyrics };
}