const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let songs = [
  { id: 1, name: "ABC Song", artist: "Somebody" },
  { id: 2, name: "Ring Around The Rosie", artist: "Somebody Else" }
];

//return list of all songs
app.get("/songs", (req, res) => {
  res.status(200).send(songs);
});

//create a new song, and return new song
app.post("/songs", (req, res) => {
  const songName = req.body.name;
  const songArtist = req.body.artist;
  const songId = songs.length + 1;
  songs.push({ id: songId, name: songName, artist: songArtist });
  console.log(songs);
  res.status(201).send({ id: songId, name: songName, artist: songArtist });
});

//return a song with id
app.get("/songs/:id", (req, res) => {
  const songFound = songs.find(song => song.id === Number(req.params.id));
  if (songFound) {
    res.status(200).send(songFound);
  } else {
    res.status(404).send("Song not found.");
  }
});

//edit a song with id, and return edited song
app.put("/songs/:id", (req, res) => {
  const songFound = songs.find(song => song.id === Number(req.params.id));
  if (songFound) {
    songFound["name"] = req.body.name;
    songFound["artist"] = req.body.artist;
    res.status(200).send(songFound);
  } else {
    res.status(404).send("Song not found.");
  }
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  const songFound = songs.find(song => song.id === Number(req.params.id));
  if (songFound) {
    songs.splice(req.params.id - 1, 1);
    res.status(200).send(songFound);
  } else {
    res.status(404).send("Song not found.");
  }
});
app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
