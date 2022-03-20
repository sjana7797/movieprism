import { GetServerSideProps } from "next";
import { useState } from "react";
import ContentContainer from "../../../components/ui/ContentContainer";
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
        <div
          className={`mx-auto my-5 flex w-min cursor-pointer items-center whitespace-nowrap rounded-xl bg-emerald-400 px-4 py-2 text-lg font-bold tracking-wider text-slate-900 ${
            isLoading && "cursor-wait opacity-50"
          }`}
          onClick={handleClick}
        >
          {isLoading ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{" "}
              <span> Processing...</span>
            </>
          ) : (
            "Load More"
          )}
        </div>
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
