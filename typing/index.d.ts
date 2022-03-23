import { IconType } from "react-icons";
export interface Genre {
  id: number;
  name: string;
}

export interface Provider {
  display_priority: integer;
  logo_path: string;
  provider_name: string;
  provider_id: integer;
}

export enum Gender {
  male = 2,
  female = 1,
  default = 0,
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
