import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";
export const getCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/character`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Api Hatası:", error);
    return null;
  }
};


