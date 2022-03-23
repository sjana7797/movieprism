import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentContainer from "../../components/ui/ContentContainer";
import Nav from "../../components/ui/Nav";
import { ContentOverview, Thumbnail } from "../../typing/content";
import { API_OPTION } from "../../utils/apiConfig";
import { custAxios } from "../../utils/custAxios";
import { trendingNav } from "../../utils/nav";

function Trending({
  trendingContents,
  totalPages,
}: {
  trendingContents: Thumbnail[];
  totalPages: number;
}) {
  const router = useRouter();
  const [trending, setTrending] = useState<ContentOverview[]>(trendingContents);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = async () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage++);
    const media = (router.query.media as string) || "all";
    const data = await custAxios
      .get("trending", { params: { page: page + 1, media } })
      .then((res) => res.data);
    setTrending((prevData) => [...prevData, ...data.results]);
    setPage(data.page);
    setIsLoading(false);
  };
  useEffect(() => {
    setTrending(trendingContents);
  }, [trendingContents]);
  return (
    <>
      <Nav navs={trendingNav} />
      <ContentContainer contents={trending} title="Trending this week" />
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

export default Trending;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const media = (context.query.media as string) || "all";
  const trendingData = await custAxios
    .get(API_OPTION.TRENDING, { params: { media } })
    .then((res) => res.data);

  const trendingContents: Thumbnail[] = trendingData.results.map(
    (movie: ContentOverview) => {
      return {
        backdrop_path: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        original_title: movie.original_title || null,
        title: movie.title || null,
        name: movie.name || null,
        poster_path: movie.poster_path || null,
        media_type: movie.media_type,
        first_air_date: movie.first_air_date || null,
        release_date: movie.release_date || null,
        vote_count: movie.vote_count,
      };
    }
  );
  return {
    props: { trendingContents, totalPages: trendingData.total_pages },
  };
};
