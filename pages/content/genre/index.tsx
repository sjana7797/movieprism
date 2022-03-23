import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentContainer from "../../../components/ui/ContentContainer";
import LoadMore from "../../../components/ui/LoadMore";
import { ContentOverview, Thumbnail } from "../../../typing/content";
import { API_OPTION } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";

function Genres({
  contentsData,
  totalPages,
  country,
  genre,
  media,
}: {
  contentsData: Thumbnail[];
  totalPages: number;
  country: string;
  genre: string | undefined;
  media: string;
}) {
  const router = useRouter();
  const [contents, setContents] = useState(contentsData);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = async () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage++);
    const data = await custAxios
      .get(
        `${
          media === "movie" ? API_OPTION.DISCOVER_MOVIE : API_OPTION.DISCOVER_TV
        }`,
        {
          params: {
            region: country,
            with_genres: genre || (media === "movie" ? "28" : "10759"),
            page: page + 1,
          },
        }
      )
      .then((res) => res.data);
    const contents = data.results.map((movie: ContentOverview) => {
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
    setContents((prevData) => [...prevData, ...contents]);
    setPage(data.page);
    setIsLoading(false);
  };

  useEffect(() => {
    setContents(contentsData);
  }, [contentsData]);

  return (
    <>
      <ContentContainer
        contents={contents}
        title={
          `${media} - ${router.query.genreName?.toString()}` || "Now playing"
        }
      />
      {!(page === totalPages) && (
        <LoadMore handleClick={handleClick} isLoading={isLoading} />
      )}
    </>
  );
}
export default Genres;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country, genre, media } = context.query;
  const data = await custAxios
    .get(
      `${
        media === "movie" ? API_OPTION.DISCOVER_MOVIE : API_OPTION.DISCOVER_TV
      }`,
      {
        params: {
          region: country,
          with_genres: genre || (media === "movie" ? "28" : "10759"),
        },
      }
    )
    .then((res) => res.data);

  const contentsData: Thumbnail[] = data.results.map(
    (content: ContentOverview) => {
      return {
        backdrop_path: content.backdrop_path,
        id: content.id,
        overview: content.overview,
        original_title: content.original_title || null,
        title: content.title || null,
        name: content.name || null,
        poster_path: content.poster_path || null,
        media_type: media as string,
        first_air_date: content.first_air_date || null,
        release_date: content.release_date || null,
        vote_count: content.vote_count,
      };
    }
  );

  return {
    props: { contentsData, genre, country, media },
  };
};
