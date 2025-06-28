import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

export default function SelectSong({ songs, onSelect }) {
  // This component will display the list of songs and allow the user to select one

  if (!songs.length) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select a song:
      </Typography>
      <List>
        {songs.map((song) => (
          <ListItem
            key={song.id}
            button
            onClick={() => onSelect(song)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemAvatar>
              <Avatar
                src={song.imageUrl}
                alt={song.name}
                variant="square"
              />
            </ListItemAvatar>
            <ListItemText
              primary={song.name}
              secondary={song.artists}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}