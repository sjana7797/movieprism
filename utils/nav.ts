import { API_OPTION } from "./apiConfig";

const trendingNavObj = {
  all: {
    title: "all",
    link: "/content/trending?media=all",
  },
  movie: {
    title: "movie",
    link: "/content/trending?media=movie",
  },
  tv: {
    title: "tv",
    link: "/content/trending?media=tv",
  },
};

export const trendingNav: { title: string; link: string }[] =
  Object.values(trendingNavObj);

//Movies nav
const moviesNavObj = {
  now_playing: {
    title: "now playing",
    link: `/content/movie?key=${API_OPTION.NOW_PLAYING}`,
  },
  trending: {
    title: "trending",
    link: `/content/movie?key=${API_OPTION.TRENDING}`,
  },
  popular: {
    title: "popular",
    link: `/content/movie?key=${API_OPTION.POPULAR}`,
  },
  top_rated: {
    title: "top rated",
    link: `/content/movie?key=${API_OPTION.TOP_RATED}`,
  },
  upcomming_movies: {
    title: "upcomming movies",
    link: `/content/movie?key=${API_OPTION.UPCOMMING_MOVIES}`,
  },
};

export const moviesNav: { title: string; link: string }[] =
  Object.values(moviesNavObj);
