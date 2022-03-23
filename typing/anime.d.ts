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
