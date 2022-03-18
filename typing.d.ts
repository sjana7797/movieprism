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
  adult?: boolean;
  popularity?: number;
  genres?: Genre[];
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
}

export interface Page {
  pageInfo: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
}

export interface AnimeList {
  pageInfo: Page;
  media: [AnimePoster];
}
