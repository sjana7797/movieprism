import { GetServerSideProps } from "next";
import { useState } from "react";
import ContentContainer from "../../../components/ui/ContentContainer";
import LoadMore from "../../../components/ui/LoadMore";
import { ContentOverview } from "../../../typing";
import { API_OPTION } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";

function TVSeries({
  tvContents,
  totalPages,
}: {
  tvContents: ContentOverview[];

  totalPages: number;
}) {
  const [tvseries, setTVSeries] = useState(tvContents);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = async () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage++);
    const data = await custAxios
      .get(API_OPTION.ON_THE_AIR, {
        params: {
          page: page + 1,
        },
      })
      .then((res) => res.data);

    const contents = data.results.map((tv: any) => {
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
  return (
    <>
      <ContentContainer contents={tvseries} title="On The Air" />
      {!(page === totalPages) && (
        <LoadMore handleClick={handleClick} isLoading={isLoading} />
      )}
    </>
  );
}

export default TVSeries;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tvData = await custAxios
    .get(API_OPTION.ON_THE_AIR)
    .then((res) => res.data);

  const tvContents = tvData.results.map((tv: any) => {
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
    props: { tvContents, totalPages: tvData.total_pages },
  };
};
