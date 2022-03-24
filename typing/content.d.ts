export interface Poster {
  id: number;
  original_title?: string;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type?: string;
}

export interface Search {
  id: number;
  media_type: "movie" | "tv" | "person";
  original_title?: string;
  title?: string;
  name?: string;
}

export interface Thumbnail extends Poster {
  backdrop_path: string;
  vote_count?: number;
  vote_average?: number;
  first_air_date?: string;
  release_date?: string;
  overview: string;
}

export interface ContentOverview extends Thumbnail {
  adult?: boolean;
  popularity?: number;
  genres?: Genre[];
  status?: string;
  genre_ids?: Genre[];
  original_name?: string;
}
