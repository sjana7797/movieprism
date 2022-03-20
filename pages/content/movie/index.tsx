import { GetServerSideProps } from "next";
import { useState } from "react";
import ContentContainer from "../../../components/ui/ContentContainer";
import LoadMore from "../../../components/ui/LoadMore";
import { ContentOverview } from "../../../typing";
import { API_OPTION } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";

function Movies({
  moviesContents,
  totalPages,
  country,
}: {
  moviesContents: ContentOverview[];
  totalPages: number;
  country: string;
}) {
  const [movies, setMovies] = useState(moviesContents);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = async () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage++);
    const data = await custAxios
      .get(API_OPTION.LATEST, { params: { page: page + 1, region: country } })
      .then((res) => res.data);
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
  return (
    <>
      <ContentContainer contents={movies} title="Playing this week" />
      {!(page === totalPages) && (
        <LoadMore handleClick={handleClick} isLoading={isLoading} />
      )}
    </>
  );
}

export default Movies;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country } = context.query;
  const moviesData = await custAxios
    .get(API_OPTION.LATEST, { params: { region: country } })
    .then((res) => res.data);

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
