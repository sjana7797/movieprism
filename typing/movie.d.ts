import { Gender } from ".";
import { ContentOverview } from "./content";

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

export interface Movie extends ContentOverview {
  production_companies: MovieProductionCompany[];
}
