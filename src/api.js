import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";
export const getCharacters = async (page = 1) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/character`, {
      params: { page },
    });
    return data;
  } catch (error) {
    console.error("Api Hatası:", error);
    return null;
  }
};

export const getEpisodes = async (page = 1) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/episode`, {
      params: { page },
    });
    return data;
  } catch (error) {
    console.error("Bölüm Yükleme Hatası:", error);
    return null;
  }
};
  
