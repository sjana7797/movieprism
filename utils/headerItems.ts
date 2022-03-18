import {
  BiTv,
  BiCameraMovie,
  BiTrendingUp,
  BiHomeSmile,
  BiNews,
} from "react-icons/bi";

const headerItemsObj = {
  home: {
    title: "Home",
    Icon: BiHomeSmile,
    link: "/",
  },
  trending: {
    title: "trending",
    Icon: BiTrendingUp,
    link: "/content/trending",
  },
  movies: {
    title: "movies",
    Icon: BiCameraMovie,
    link: "/content/movies",
  },
  tv: {
    title: "tv series",
    Icon: BiTv,
    link: "/content/tvseries",
  },
  news: {
    title: "news",
    Icon: BiNews,
    link: "/news",
  },
};

export const headerItems = Object.values(headerItemsObj);
