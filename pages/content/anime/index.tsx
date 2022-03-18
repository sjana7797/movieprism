import { ApolloProvider, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { AnimeList } from "../../../typing";
import { client } from "../../../utils/apolloClient";

function Anime({ animes }: { animes: AnimeList }) {
  return (
    <ApolloProvider client={client}>
      <div className="mx-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {animes.media.map((anime) => {
          return (
            <div
              key={anime.id}
              className="group flex cursor-pointer flex-col overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-md">
                <Image
                  src={anime.bannerImage}
                  title={
                    anime.title.english ||
                    anime.title.native ||
                    anime.title.userPreferred
                  }
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  alt={
                    anime.title.english ||
                    anime.title.native ||
                    anime.title.userPreferred
                  }
                  width={1920}
                  height={1080}
                  layout="responsive"
                />
                <div className="absolute top-0 left-0 h-full w-full bg-white bg-opacity-20 p-1 opacity-0 backdrop-blur-sm transition-opacity delay-200 duration-300 group-hover:opacity-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={anime.coverImage.extraLarge}
                    alt={
                      anime.title.english ||
                      anime.title.native ||
                      anime.title.userPreferred
                    }
                    className="mx-auto h-full w-auto rounded-md object-contain shadow-md"
                  />
                </div>
              </div>

              <h2 className="my-2 text-center text-lg opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100">
                {anime.title.english ||
                  anime.title.native ||
                  anime.title.userPreferred}
              </h2>
            </div>
          );
        })}
      </div>
    </ApolloProvider>
  );
}

export default Anime;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query ? (context.query.page as string) : "1";
  console.log(page);
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
