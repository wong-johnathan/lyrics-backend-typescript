import { Router } from "express";
import { getSongByID, searchSong } from "../clients/genius.js";
import axios from "axios";

const router = Router();

router.get("/", (req, res) => {
  res.send("Genius routes");
});

router.get("/song/:searchStr", async (req, res) => {
  try {
    const { searchStr } = req.params;
    const data = await searchSong(searchStr);
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/song/songID/:songID", async (req, res) => {
  try {
    const { songID } = req.params;
    const data = await getSongByID(songID);
    res.send(data.response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/song/songID/:songID/lyrics", async (req, res) => {
  try {
    const { songID } = req.params;
    const data = await getSongByID(songID);
    const htmlLyrics = await axios.get(data.response.song.url);
    res.send(htmlLyrics.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
