import { Gender } from ".";
import { ContentOverview } from "./content";

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
