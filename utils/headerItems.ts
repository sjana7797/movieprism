import {
  HomeIcon,
  LightningBoltIcon,
  FilmIcon,
  DesktopComputerIcon,
  ViewBoardsIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";

const headerItemsObj = {
  home: {
    title: "Home",
    Icon: HomeIcon,
    link: "/",
  },
  trending: {
    title: "trending",
    Icon: LightningBoltIcon,
    link: "/content/trending",
  },
  movies: {
    title: "movies",
    Icon: FilmIcon,
    link: "/content/movies",
  },
  tv: {
    title: "tv series",
    Icon: DesktopComputerIcon,
    link: "/content/tvseries",
  },
  news: {
    title: "news",
    Icon: NewspaperIcon,
    link: "/news",
  },
};

export const headerItems = Object.values(headerItemsObj);
