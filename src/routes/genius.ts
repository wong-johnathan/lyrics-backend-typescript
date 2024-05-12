import { Router } from "express";
import { getSongByID, searchSong } from "../clients/genius.js";
import axios from "axios";
import { puppeteerClient } from "../clients/puppeteer.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Genius routes");
});

router.get("/search/:searchStr", async (req, res) => {
  try {
    const { searchStr } = req.params;
    const data = await searchSong(searchStr);
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/songs/:songID", async (req, res) => {
  try {
    const { songID } = req.params;
    const data = await getSongByID(songID);
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/songs/:songID/lyrics", async (req, res) => {
  try {
    const { songID } = req.params;
    const response = await axios.get(`https://genius.com/songs/${songID}`);
    res.send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/songs/:songID/lyrics/puppeteer", async (req, res) => {
  const { songID } = req.params;
  const data = await getSongByID(songID);
  puppeteerClient({
    url: `http://localhost:3000/genius/songs/${songID}/lyrics`,
    id: data.title,
  });
  res.send("Lyrics are being fetched");
});

export default router;
