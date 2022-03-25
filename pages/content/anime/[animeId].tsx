import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "../../../typing/anime";
import { animeBaseUrl } from "../../../utils/animeAPIConfig";
import { APP_NAME } from "../../../utils/appConfig";

function Anime(props: { anime: Anime }) {
  const { anime } = props;
  const name =
    anime.title.english || anime.title.userPreferred || anime.title.native;
  const img = anime.bannerImage;

  return (
    <>
      <Head>
        <title>{`${name} | ${APP_NAME}`}</title>
      </Head>
      <article>
        <section className="relative h-screen w-full">
          {img && (
            <Image
              src={img}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="sticky top-0 opacity-40"
              alt={name}
              priority
              // loader={uploadcareLoader}
            />
          )}
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-slate-900 to-black opacity-[0.85]" />
          <div className="prose prose-sm prose-invert absolute top-1/3 left-10 h-3/5 overflow-y-scroll scrollbar-hide prose-h2:text-5xl prose-p:text-lg prose-p:opacity-80 md:prose-base lg:prose-xl">
            <h2>{name}</h2>
            <p dangerouslySetInnerHTML={{ __html: anime.description }}></p>
            <p className="flex items-center">
              {`${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}`}{" "}
              &#9679; Score {anime.averageScore}
            </p>
            <p>Adult : {anime.isAdult ? "Yes" : "No"}</p>
            <p>Episodes : {anime.episodes}</p>
            {anime.genres && (
              <div className="flex items-center space-x-5">
                <span className="">Genres </span>
                <div className="flex max-w-xl flex-wrap items-center space-x-5">
                  {anime.genres.map((genre, index) => {
                    return (
                      <span
                        key={index}
                        className="my-1 cursor-pointer rounded-md border-2 border-slate-300 py-1 px-2 transition-colors duration-200 hover:bg-slate-300 hover:text-slate-900"
                      >
                        {genre}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="my-10">
          <div>
            <h2 className="ml-5 text-2xl">Characters</h2>
            <div className="my-5 flex space-x-5 overflow-x-scroll px-5 scrollbar-hide">
              {anime.characters.edges.map((people) => {
                const imgSrc = people.node.image.large;
                return (
                  <div key={people.node.id}>
                    <div className="">
                      <Image
                        src={imgSrc}
                        width={238}
                        height={357}
                        layout="fixed"
                        alt={people.node.name.full}
                        className="rounded-md"
                        // loader={uploadcareLoader}
                      />
                    </div>
                    <div className="my-2">
                      <h3>{people.node.name.full}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </article>
      <aside className="my-5 mx-5 rounded-md border-2 border-slate-300 p-5">
        <h2 className="text-xl">Recommendations</h2>
        <div className="flex w-full space-x-5 overflow-x-scroll p-5 scrollbar-hide">
          {anime.recommendations.edges.map((recommended) => {
            const anime = recommended.node.mediaRecommendation;
            const poster = anime.coverImage.extraLarge;
            const content_name =
              anime.title.english ||
              anime.title.native ||
              anime.title.userPreferred;

            return (
              <Link key={anime.id} passHref href={`/content/anime/${anime.id}`}>
                <div className="group transform cursor-pointer snap-start rounded-md border-2 border-black transition-transform duration-300 hover:scale-105 hover:border-slate-200">
                  <div className="relative h-72 w-52">
                    <Image
                      src={poster}
                      alt={content_name}
                      layout="fill"
                      className="rounded-md bg-black opacity-100 transition-opacity duration-200 group-hover:opacity-20"
                      placeholder="blur"
                      blurDataURL={poster}
                      // loader={uploadcareLoader}
                    />
                    <h2 className="absolute top-5 left-5 hidden group-hover:block">
                      {content_name}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default Anime;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const animeId = context.query.animeId as string;
  const gql = String.raw;
  const Anime = gql`
    query Anime($id: Int) {
      Media(id: $id) {
        id
        title {
          english
          native
          userPreferred
        }
        status
        description(asHtml: false)
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        characters(sort: ROLE) {
          edges {
            node {
              id
              name {
                first
                middle
                last
                full
                native
                userPreferred
              }
              image {
                large
                medium
              }
            }
          }
        }
        season
        seasonYear
        seasonInt
        episodes
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        averageScore
        genres
        isAdult
        averageScore
        recommendations(sort: RATING_DESC, page: 1, perPage: 24) {
          edges {
            node {
              mediaRecommendation {
                id
                title {
                  english
                  native
                  userPreferred
                }
                bannerImage
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  const animeData = await fetch(animeBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: Anime,
      variables: { id: parseInt(animeId) },
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

  const anime: Anime = animeData.Media;
  return {
    props: { anime },
  };
};
