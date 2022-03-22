import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentContainer from "../../../components/ui/ContentContainer";
import LoadMore from "../../../components/ui/LoadMore";
import Nav from "../../../components/ui/Nav";
import { ContentOverview } from "../../../typing";
import { API_OPTION } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";
import { moviesNav } from "../../../utils/nav";

const getMovies = async (
  key: string,
  country: string,
  page: number | undefined,
  genre: string | undefined
) => {
  switch (key) {
    case API_OPTION.NOW_PLAYING:
      return await custAxios
        .get(API_OPTION.NOW_PLAYING, { params: { region: country, page } })
        .then((res) => res.data);
    case API_OPTION.POPULAR:
      return await custAxios
        .get(API_OPTION.POPULAR, { params: { region: country, page } })
        .then((res) => res.data);
    case API_OPTION.TRENDING:
      return await custAxios
        .get(API_OPTION.TRENDING, { params: { media: "movie", page } })
        .then((res) => res.data);
    case API_OPTION.TOP_RATED:
      return await custAxios
        .get(API_OPTION.TOP_RATED, { params: { region: country, page } })
        .then((res) => res.data);
    case API_OPTION.UPCOMMING_MOVIES:
      return await custAxios
        .get(API_OPTION.UPCOMMING_MOVIES, { params: { region: country, page } })
        .then((res) => res.data);
    case API_OPTION.PROVIDER:
      return await custAxios
        .get(API_OPTION.DISCOVER_MOVIE, {
          params: { region: country, page, with_genres: genre || "28" },
        })
        .then((res) => res.data);
    default:
      return await custAxios
        .get(API_OPTION.NOW_PLAYING, { params: { region: country, page } })
        .then((res) => res.data);
  }
};

function Movies({
  moviesContents,
  totalPages,
  country,
  genre,
}: {
  moviesContents: ContentOverview[];
  totalPages: number;
  country: string;
  genre: string | undefined;
}) {
  const router = useRouter();
  const [movies, setMovies] = useState(moviesContents);
  const [genres, setGenres] = useState(moviesNav);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = async () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage++);
    const key = router.query.key as string;
    const data = await getMovies(
      key as string,
      country as string,
      page + 1,
      genre
    );
    const contents = data.results.map((movie: any) => {
      return {
        backdrop_path: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        original_title: movie.original_title || null,
        title: movie.title || null,
        name: movie.name || null,
        poster_path: movie.poster_path || null,
        media_type: "movie",
        first_air_date: movie.first_air_date || null,
        release_date: movie.release_date || null,
        vote_count: movie.vote_count,
      };
    });
    setMovies((prevData) => [...prevData, ...contents]);
    setPage(data.page);
    setIsLoading(false);
  };

  useEffect(() => {
    setMovies(moviesContents);
  }, [moviesContents]);

  useEffect(() => {
    const getGenres = async () => {
      const genres = await custAxios.get("genre/movie/list").then((res) => {
        return res.data.genres.map((genre: { name: string; id: number }) => {
          return {
            title: genre.name,
            link: `/content/movie?key=${API_OPTION.PROVIDER}&genre=${
              genre.id
            }&genreName=${encodeURIComponent(
              genre.name.toString().toLowerCase()
            )}`,
          };
        });
      });
      setGenres((prevGenres) => [...prevGenres, ...genres]);
    };
    getGenres();
  }, []);
  return (
    <>
      <Nav navs={genres} />
      <ContentContainer
        contents={movies}
        title={
          router.query.genreName?.toString() ||
          router.query.key
            ?.toString()
            .replaceAll("_", " ")
            .toLowerCase()
            .toLowerCase() ||
          "On the airPlaying this week"
        }
      />
      {!(page === totalPages) && (
        <LoadMore handleClick={handleClick} isLoading={isLoading} />
      )}
    </>
  );
}

export default Movies;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country, key, genre } = context.query;
  const moviesData = await getMovies(
    key as string,
    country as string,
    undefined,
    genre as string | undefined
  );

  const moviesContents = moviesData.results.map((movie: any) => {
    return {
      backdrop_path: movie.backdrop_path,
      id: movie.id,
      overview: movie.overview,
      original_title: movie.original_title || null,
      title: movie.title || null,
      name: movie.name || null,
      poster_path: movie.poster_path || null,
      media_type: "movie",
      first_air_date: movie.first_air_date || null,
      release_date: movie.release_date || null,
      vote_count: movie.vote_count,
    };
  });

  return {
    props: { moviesContents, totalPages: moviesData.total_pages, country },
  };
};
