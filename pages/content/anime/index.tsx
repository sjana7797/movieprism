import { ApolloProvider, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { client } from "../../../utils/apolloClient";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Anime from "../../../components/Anime/Anime";
import { AnimeList } from "../../../typing/anime";

function Animes({ animes }: { animes: AnimeList }) {
  const router = useRouter();
  const handleClick = (page: number) => {
    router.push(`/content/anime?page=${page}`);
  };
  return (
    <ApolloProvider client={client}>
      <div className="mx-5 my-10 rounded-md bg-slate-700 p-5">
        <h1 className="text-2xl font-bold italic tracking-wider">Anime</h1>
        <div className="my-10 flex-wrap justify-center gap-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex">
          {animes.media.map((anime) => {
            return <Anime key={anime.id} anime={anime} />;
          })}
        </div>
        <div className="flex w-full justify-between px-5">
          <button
            disabled={animes.pageInfo.currentPage === 1}
            className="rounded-md bg-emerald-400 px-4 py-2 text-center font-medium uppercase text-black opacity-100 transition-colors duration-300 hover:bg-emerald-600 disabled:opacity-40"
            onClick={() => {
              const page = animes.pageInfo.currentPage - 1;
              handleClick(page);
            }}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          <button
            disabled={!animes.pageInfo.hasNextPage}
            className="rounded-md bg-emerald-400 px-4 py-2 text-center font-medium uppercase text-black opacity-100 transition-colors duration-300 hover:bg-emerald-600 disabled:opacity-40"
            onClick={() => {
              const page = animes.pageInfo.currentPage + 1;
              handleClick(page);
            }}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Animes;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query ? (context.query.page as string) : "1";
  const AnimeList = gql`
    query AnimeList($perPage: Int, $page: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(sort: POPULARITY_DESC, type: ANIME) {
          id
          title {
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          description(asHtml: false)
        }
      }
    }
  `;
  const { data: animeData } = await client.query({
    query: AnimeList,
    variables: { perPage: 24, page: parseInt(page) },
  });
  const animes: AnimeList[] = animeData.Page;
  return {
    props: { animes },
  };
};
