import { ThumbUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Contents from "../../../../components/Home/Contents.server";
import { ContentOverview, Poster } from "../../../../typing/content";
import { Season as SeasonInterface, TV } from "../../../../typing/tv";
import { API_OPTION, BASE_URL_IMAGE } from "../../../../utils/apiConfig";
import { APP_NAME } from "../../../../utils/appConfig";
import { custAxios } from "../../../../utils/custAxios";
import { m } from "framer-motion";

function Season(props: {
  season: SeasonInterface;
  tv: TV;
  similarTV: ContentOverview[];
}) {
  const { season, tv, similarTV } = props;
  const name = season.name;

  return (
    <>
      <Head>
        <title>{`${name} | ${tv.name} | ${APP_NAME}`}</title>
      </Head>
      <article className="">
        <div className="mx-auto flex max-w-xl flex-wrap justify-between">
          <div className="mx-auto">
            <div className="relative h-72 w-52 rounded-md border-2 border-black">
              <Image
                src={`${BASE_URL_IMAGE}${season.poster_path}`}
                alt={name}
                layout="fill"
                className="rounded-md bg-black"
                placeholder="blur"
                blurDataURL={`${BASE_URL_IMAGE}${season.poster_path}`}
                // loader={uploadcareLoader}
              />
            </div>
            <p className="my-5 text-center">{name}</p>
          </div>
          <div className="mx-5 text-slate-400">
            <p>{season.overview}</p>
          </div>
        </div>
        <div className="m-5 mx-auto grid max-w-[1920px] grid-cols-1 gap-5 rounded-md border-2 border-slate-300 px-5 py-10 md:grid-cols-2 xl:grid-cols-3">
          {season.episodes.map((episode) => {
            return (
              <div
                key={episode.id}
                className="group my-5 flex grow flex-wrap items-center justify-between rounded-md border border-slate-300 p-2"
              >
                <div className="relative mx-auto h-72 w-11/12 overflow-hidden rounded-md border-2 border-black">
                  <Image
                    src={`${BASE_URL_IMAGE}${
                      episode.still_path || season.poster_path
                    }`}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-md bg-black transition-transform duration-200 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL={`${BASE_URL_IMAGE}${
                      episode.still_path || season.poster_path
                    }`}
                    // loader={uploadcareLoader}
                  />
                </div>
                <div className="prose prose-invert my-5 h-auto">
                  <h2>{episode.name}</h2>
                  <p>Episode : {episode.episode_number}</p>
                  <p>{episode.overview}</p>
                  <p className="flex items-center">
                    {episode.air_date} &#9679;{" "}
                    <ThumbUpIcon className="mx-2 h-5" />
                    {episode.vote_count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </article>
      <aside className="my-5 mx-5 rounded-md border-2 border-slate-300">
        <h2 className="mt-5 ml-5 text-2xl">Seasons</h2>
        <p className="mt-5 ml-5">Seasons : {tv.number_of_seasons}</p>
        <div className="flex w-full space-x-5 overflow-x-scroll p-5 scrollbar-hide">
          {tv.seasons.map((season) => {
            const name = season.name || season.season_number;
            return (
              <Link
                key={season.id}
                href={`/content/tv/${tv.id}/${season.season_number}`}
                passHref
              >
                <m.div
                  className="group cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative h-72 w-52 overflow-hidden rounded-md border-2 border-black transition-colors duration-300 hover:border-slate-200">
                    <Image
                      src={`${BASE_URL_IMAGE}${season.poster_path}`}
                      alt={name}
                      layout="fill"
                      className="rounded-md bg-black transition-transform duration-300 group-hover:scale-125"
                      placeholder="blur"
                      blurDataURL={`${BASE_URL_IMAGE}${season.poster_path}`}
                      // loader={uploadcareLoader}
                    />
                  </div>
                  <p className="my-5">{name}</p>
                </m.div>
              </Link>
            );
          })}
        </div>
        <div>
          <Contents title="Similar TV Shows" contents={similarTV} />
        </div>
      </aside>
    </>
  );
}

export default Season;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tvId = context.query.tvId as string;
  const seasonNumber = context.query.season as string;

  const seasonRequest = custAxios.get(API_OPTION.SEASON, {
    params: { tvId, seasonNumber },
  });
  const similarTVRequest = custAxios.get(API_OPTION.SIMILAR_TV, {
    params: { tvId },
  });

  const tvRequest = custAxios.get(API_OPTION.TV, { params: { tvId } });

  const [season, similarTV, tv] = await axios
    .all([seasonRequest, similarTVRequest, tvRequest])
    .then(
      axios.spread((seasonResponse, similarTVResponse, tvResponse) => {
        const season: SeasonInterface = seasonResponse.data;
        const tv: TV = tvResponse.data;
        const similarTV: Poster[] = similarTVResponse.data.results.map(
          (tv: ContentOverview) => {
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
          }
        );

        return [season, similarTV, tv];
      })
    );

  return { props: { season, tv, similarTV } };
};
