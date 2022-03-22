import { IconType } from "react-icons";
export interface Genre {
  id: number;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: integer;
  id: integer;
  name: string;
  overview: string;
  poster_path: string;
  season_number: integer;
}

export interface ContentOverview {
  backdrop_path: string;
  id: number;
  overview: string;
  original_title?: string;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type?: string;
  first_air_date?: string;
  release_date?: string;
  vote_count?: number;
  vote_average?: number;
  adult?: boolean;
  popularity?: number;
  genres?: Genre[];
  status?: string;
}

export interface Provider {
  display_priority: integer;
  logo_path: string;
  provider_name: string;
  provider_id: integer;
}

enum Gender {
  male = 2,
  female = 1,
  default = 0,
}
export interface MovieCast {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieProductionCompany {
  name: string;
  id: integer;
  logo_path: string | null;
  origin_country: string;
}

export interface Movie extends ContentOverview {
  production_companies: MovieProductionCompany[];
}
export interface TV extends ContentOverview {
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  status: string;
  tagline: string;
}

export interface TV_EPISODE {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  season_number: integer;
  vote_count: integer;
  still_path: string;
}
export interface Season {
  _id: string;
  air_date: string;
  name: string;
  overview: string;
  id: integer;
  poster_path: string | null;
  season_number: integer;
  episodes: TV_EPISODE[];
}

export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt;
  source: { name: string; url: string };
}
export interface News {
  totalArticles: number;
  articles: Article[];
}

export interface Poster {
  poster_path: string;
  release_date: string;
  id: string;
  original_title: string;
  title: string;
  media_type: string;
}

export interface AnimePoster {
  id: number;
  title: {
    english: string;
    native: string;
    userPreferred: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  bannerImage: string;
  description: string;
}

export interface Page {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface AnimeList {
  pageInfo: Page;
  media: [AnimePoster];
}

export interface AnimeDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface AnimeCharacter {
  edges: [
    {
      node: {
        id: number;
        name: {
          first: string;
          middle: string;
          last: string;
          full: string;
          native: string;
          userPreferred: string;
        };
        image: {
          large: string;
          medium: string;
        };
      };
    }
  ];
}
export interface Anime extends AnimePoster {
  status: string;
  startDate: AnimeDate;
  endDate: AnimeDate;
  season: string;
  seasonYear: number;
  seasonInt: number;
  episodes: number;
  averageScore: number;
  genres: [string];
  isAdult: boolean;
  characters: AnimeCharacter;
  recommendations: {
    edges: [
      {
        node: {
          mediaRecommendation: AnimePoster;
        };
      }
    ];
  };
}

export interface MovieVideos {
  name: string;
  key: string;
  site: string;
  size: integer;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type HeaderItem = {
  title: string;
  Icon: IconType;
  link: string;
};

export interface Person {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: integer;
  name: string;
  also_known_as: [string];
  gender: 0 | 1 | 2 | 3;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
  original_title: string | null;
  name: string | null;
}

export interface TVCast {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

interface Image {
  aspect_ratio: number;
  file_path: string;
  height: integer;
  iso_639_1: null | string;
  vote_average: integer;
  vote_count: integer;
  width: integer;
}
export interface ContentImages {
  id: number;
  backdrops: [Image];
  posters: [Image];
}
