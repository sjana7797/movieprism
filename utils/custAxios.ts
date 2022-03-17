import axios from "axios";
import { API_OPTION } from "./apiConfig";

const addingAPIKey = () => {
  return `?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
};

const custAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

custAxios.interceptors.request.use((config) => {
  const { url } = config;
  switch (url) {
    case API_OPTION.TRENDING:
      config.url = `${url}/all/week`;
      break;
    case API_OPTION.MOVIE:
      config.url = `${url}/${config.params.movieId}`;
      break;
    case API_OPTION.TOP_RATED:
      config.url = `/movie/top_rated`;
      break;
    case API_OPTION.LATEST:
      config.url = `/movie/now_playing`;
      break;
    case API_OPTION.POPULAR:
      config.url = `/movie/popular`;
      break;
    case API_OPTION.SIMILAR:
      config.url = `/movie/${config.params.movieId}/similar`;
      break;
    case API_OPTION.SIMILAR_TV:
      config.url = `/tv/${config.params.tvId}/similar`;
      break;
    case API_OPTION.RECOMMENDATIONS:
      config.url = `/movie/${config.params.movieId}/recommendations`;
      break;
    case API_OPTION.POPULAR_TV:
      config.url = `/tv/popular`;
      break;
    case API_OPTION.TV:
      config.url = `/tv/${config.params.tvId}`;
      break;
    case API_OPTION.ON_THE_AIR:
      config.url = `/tv/on_the_air`;
      break;
    case API_OPTION.SEASON:
      const tvId = config.params.tvId;
      const seasonNumber = config.params.seasonNumber;
      config.url = `/tv/${tvId}/season/${seasonNumber}`;
      break;
  }
  config.url += addingAPIKey();
  return config;
});

export { custAxios };
