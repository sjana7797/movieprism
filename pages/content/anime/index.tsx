import { ApolloProvider, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimeList } from "../../../typing";
import { client } from "../../../utils/apolloClient";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

function Anime({ animes }: { animes: AnimeList }) {
  const router = useRouter();
  const handleClick = (page: number) => {
    router.push(`/content/anime?page=${page}`);
  };
  return (
    <ApolloProvider client={client}>
      <div className="mx-5 my-10 rounded-md bg-slate-700 p-5">
        <h1 className="my-5 text-3xl font-bold italic tracking-wider">Anime</h1>
        <div className="my-10 flex-wrap justify-center gap-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex">
          {animes.media.map((anime) => {
            return (
              <div
                key={anime.id}
                className="group my-2 flex cursor-pointer flex-col overflow-hidden transition-transform duration-300 sm:hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-md">
                  <Image
                    src={anime.bannerImage}
                    title={
                      anime.title.english ||
                      anime.title.native ||
                      anime.title.userPreferred
                    }
                    className="object-cover"
                    alt={
                      anime.title.english ||
                      anime.title.native ||
                      anime.title.userPreferred
                    }
                    width={1920}
                    height={1080}
                    layout="responsive"
                  />
                  <div
                    className={`absolute top-0 left-0 h-full w-full p-1 opacity-0 backdrop-blur transition-opacity delay-200 duration-300 group-hover:opacity-100`}
                    style={{
                      backgroundColor:
                        anime.coverImage.color &&
                        `${anime.coverImage.color.slice(
                          0,
                          1
                        )}${anime.coverImage.color.slice(1)}8c`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={anime.coverImage.extraLarge}
                      alt={
                        anime.title.english ||
                        anime.title.native ||
                        anime.title.userPreferred
                      }
                      className="mx-auto h-full w-auto rounded-md border object-contain shadow-md"
                    />
                  </div>
                </div>

                <h2 className="my-2 truncate text-lg font-bold tracking-wider">
                  {anime.title.english ||
                    anime.title.native ||
                    anime.title.userPreferred}
                </h2>
                <p className="truncate">{anime.description}</p>
              </div>
            );
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

export default Anime;

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
          description
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
