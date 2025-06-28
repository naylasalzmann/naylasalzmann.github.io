import { useEffect, useState } from 'react'

export default function useSpotifyApi() {
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

    const getSongInfo = async (query, limit = 5) => {
        if (!accessToken) {
            console.error('Access token not available');
            return [];
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
            return [];
        }
    }

    const getSongLyrics = async (artistName, trackName) => {
        if (!accessToken) {
            console.error('Access token not available');
            return '';
        }

        const response = await fetch(
            `https://lrclib.net/api/search?q=${encodeURIComponent(artistName)} ${encodeURIComponent(trackName)}`
        );

        if (!response.ok) {
            console.error('Failed to fetch lyrics');
            return '';
        }

        const data = await response.json();
        const exactMatch = data.find(
            (entry) => entry.trackName.toLowerCase().trim() === trackName.toLowerCase().trim()
        );
        return exactMatch || data[0] || null;
    }

    return { getSongInfo, getSongLyrics };
}