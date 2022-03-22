import {
  BiTv,
  BiCameraMovie,
  BiTrendingUp,
  BiHomeSmile,
  BiNews,
  BiHash,
} from "react-icons/bi";

import { AiOutlineAliwangwang } from "react-icons/ai";
import { HeaderItem } from "../typing";

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
    link: "/content/movie",
  },
  tv: {
    title: "tv series",
    Icon: BiTv,
    link: "/content/tv",
  },
  genres: {
    title: "genres",
    Icon: BiHash,
    link: "/content/genres",
  },
  anime: {
    title: "anime",
    Icon: AiOutlineAliwangwang,
    link: "/content/anime",
  },

  news: {
    title: "news",
    Icon: BiNews,
    link: "/news",
  },
};

export const headerItems: HeaderItem[] = Object.values(headerItemsObj);
