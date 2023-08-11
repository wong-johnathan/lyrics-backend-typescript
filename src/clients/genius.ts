import Axios from "axios";
import { GENIUSAPIKEY } from "../config";

const axios = Axios.create({
  baseURL: "https://api.genius.com/",
  headers: { Authorization: `Bearer ${GENIUSAPIKEY}` },
});

export const searchSong = async (searchStr: string) => {
  const response = await axios.get(`search?q=${encodeURI(searchStr)}`);
  return response.data;
};

export const getSongByID = async (songID: string) => {
  const response = await axios.get(`songs/${songID}`);
  return response.data;
};
