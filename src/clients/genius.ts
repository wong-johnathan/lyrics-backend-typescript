import Axios from "axios";
import { GENIUSAPIKEY } from "../config";
const axios = Axios.create({
  baseURL: "https://api.genius.com/",
  headers: { Authorization: `Bearer ${GENIUSAPIKEY}`,application: "application/json"},
});

type SearchHit = {
  api_path: string;
  artist_names: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: string;
  release_date_for_display: string;
  title: string;
  primary_artist: {
    id: string;
    name: string;
    header_image_url: string;
  };
};

type SearchResultResponse = {
  meta: {
    status: number;
  };
  response: {
    hits: { result: SearchHit }[];
  };
};

export const searchSong = async (searchStr: string) => {
  const response = await axios.get<SearchResultResponse>(
    `search?q=${encodeURI(searchStr)}`,
  );
  // return response.data.response.hits;
  return response.data.response.hits.map(({ result }) => {
    const {
      api_path,
      artist_names,
      header_image_thumbnail_url,
      header_image_url,
      id,
      release_date_for_display,
      title,
      primary_artist,
    } = result;
    return {
      api_path,
      artist_names,
      header_image_thumbnail_url,
      header_image_url,
      id,
      release_date_for_display,
      title,
      primary_artist,
    };
  });
};

export const getSongByID = async (songID: string) => {
  const response = await axios.get(`songs/${songID}`);
  return response.data.response.song;
};
