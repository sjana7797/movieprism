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

export interface Movie extends ContentOverview {}
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
