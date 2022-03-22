import { API_OPTION } from "./apiConfig";

export interface Nav {
  title: string;
  link: string;
}

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

export const trendingNav: Nav[] = Object.values(trendingNavObj);

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

export const moviesNav: Nav[] = Object.values(moviesNavObj);

const tvNavObj = {
  air: {
    title: "on the air",
    link: `/content/tv?key=${API_OPTION.ON_THE_AIR}`,
  },
  trending: {
    title: "trending",
    link: `/content/tv?key=${API_OPTION.TRENDING}`,
  },
  popular: {
    title: "popular tv",
    link: `/content/tv?key=${API_OPTION.POPULAR_TV}`,
  },
};

export const tvNav: Nav[] = Object.values(tvNavObj);
