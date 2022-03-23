import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentContainer from "../../../components/ui/ContentContainer";
import LoadMore from "../../../components/ui/LoadMore";
import Nav from "../../../components/ui/Nav";
import { ContentOverview, Thumbnail } from "../../../typing/content";
import { API_OPTION } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";
import { tvNav } from "../../../utils/nav";

const getTvs = async (
  key: string,
  country: string,
  page: number | undefined,
  genre: string | undefined
) => {
  switch (key) {
    case API_OPTION.ON_THE_AIR:
      return await custAxios
        .get(API_OPTION.ON_THE_AIR, { params: { page } })
        .then((res) => res.data);
    case API_OPTION.TRENDING:
      return await custAxios
        .get(API_OPTION.TRENDING, { params: { media: "tv", page } })
        .then((res) => res.data);
    case API_OPTION.POPULAR_TV:
      return await custAxios
        .get(API_OPTION.POPULAR_TV, { params: { page } })
        .then((res) => res.data);
    case API_OPTION.DISCOVER_TV:
      return await custAxios
        .get(API_OPTION.DISCOVER_TV, {
          params: { region: country, page, with_genres: genre || "10759" },
        })
        .then((res) => res.data);
    default:
      return await custAxios
        .get(API_OPTION.ON_THE_AIR, { params: { page } })
        .then((res) => res.data);
  }
};

function TVSeries({
  tvContents,
  totalPages,
  genre,
  country,
}: {
  tvContents: Thumbnail[];
  genre: string | undefined;
  country: string;
  totalPages: number;
}) {
  const router = useRouter();
  const [tvseries, setTVSeries] = useState(tvContents);
  const [genres, setGenres] = useState(tvNav);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = async () => {
    const key = router.query.key as string;
    setIsLoading(true);
    setPage((prevPage) => prevPage++);
    const data = await getTvs(
      key as string,
      country as string,
      page + 1,
      genre as string | undefined
    );

    const contents: Thumbnail[] = data.results.map((tv: ContentOverview) => {
      return {
        backdrop_path: tv.backdrop_path,
        id: tv.id,
        overview: tv.overview,
        original_title: tv.original_title || null,
        title: tv.title || null,
        name: tv.name || null,
        poster_path: tv.poster_path || null,
        media_type: "tv",
        first_air_date: tv.first_air_date || null,
        release_date: tv.release_date || null,
        vote_count: tv.vote_count,
        genres: tv.genre_ids,
      };
    });
    setTVSeries((prevData) => [...prevData, ...contents]);
    setPage(data.page);
    setIsLoading(false);
  };

  useEffect(() => {
    setTVSeries(tvContents);
  }, [tvContents]);

  useEffect(() => {
    const getGenres = async () => {
      const genres = await custAxios.get("genre/tv/list").then((res) => {
        return res.data.genres.map((genre: { name: string; id: number }) => {
          return {
            title: genre.name,
            link: `/content/tv?key=${API_OPTION.DISCOVER_TV}&genre=${
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
        contents={tvseries}
        title={
          router.query.genreName?.toString() ||
          router.query.key
            ?.toString()
            .replaceAll("_", " ")
            .toLowerCase()
            .toLowerCase() ||
          "On the air"
        }
      />
      {!(page === totalPages) && (
        <LoadMore handleClick={handleClick} isLoading={isLoading} />
      )}
    </>
  );
}

export default TVSeries;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country, key, genre } = context.query;
  const tvData = await getTvs(
    key as string,
    country as string,
    undefined,
    genre as string | undefined
  );

  const tvContents: Thumbnail[] = tvData.results.map((tv: ContentOverview) => {
    return {
      backdrop_path: tv.backdrop_path,
      id: tv.id,
      overview: tv.overview,
      original_title: tv.original_title || null,
      title: tv.title || null,
      name: tv.name || null,
      poster_path: tv.poster_path || null,
      media_type: "tv",
      first_air_date: tv.first_air_date || null,
      release_date: tv.release_date || null,
      vote_count: tv.vote_count,
      genres: tv.genre_ids,
    };
  });

  return {
    props: {
      tvContents,
      totalPages: tvData.total_pages,
      country,
      genre: genre || "",
    },
  };
};
