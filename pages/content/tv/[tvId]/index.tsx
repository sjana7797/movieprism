import { ThumbUpIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Contents from "../../../../components/Home/Contents";
import { TV, TVCast } from "../../../../typing/tv";
import { ContentOverview, Poster } from "../../../../typing/content";
import { API_OPTION, BASE_URL_IMAGE } from "../../../../utils/apiConfig";
import { custAxios } from "../../../../utils/custAxios";
import { APP_NAME } from "../../../../utils/appConfig";
import ContentImage from "../../../../components/ui/ContentImage";
import axios from "axios";
import { m } from "framer-motion";
import "lazysizes";
import "lazysizes/plugins/blur-up/ls.blur-up";

function TVSeries({
  tv,
  similarTV,
  tvCasts,
}: {
  tv: TV;
  similarTV: Poster[];
  tvCasts: TVCast[];
}) {
  const img = `${BASE_URL_IMAGE}${tv.backdrop_path}`;
  const name = tv.title || tv.original_title || tv.name || "";
  return (
    <>
      <Head>
        <title>{`${name} | ${APP_NAME}`}</title>
      </Head>
      <m.article className="relative h-screen w-full" exit={{ opacity: 0 }}>
        <ContentImage img={img} name={name} />
        <div className="prose prose-sm prose-invert absolute top-1/3 left-10 h-3/5 overflow-y-scroll scrollbar-hide prose-h2:text-5xl prose-p:text-lg prose-p:opacity-80 md:prose-base lg:prose-xl">
          <h2>{name}</h2>
          <p>{tv.overview}</p>
          <p className="flex items-center">
            {tv.release_date || tv.first_air_date} &#9679;{" "}
            <ThumbUpIcon className="mx-2 h-5" />
            {tv.vote_count}
          </p>
          <p>Popularity : {tv.popularity}</p>
          {tv.genres && (
            <div className="flex items-center space-x-5">
              <span className="">Genres </span>
              <div className="flex max-w-xl flex-wrap items-center space-x-5">
                {tv.genres.map((genre) => {
                  return (
                    <Link
                      passHref
                      key={genre.id}
                      href={`/content/genre?media=tv&genre=${
                        genre.id
                      }&genreName=${encodeURIComponent(genre.name)}`}
                    >
                      <span className="my-1 cursor-pointer rounded-md border-2 border-slate-300 py-1 px-2 transition-colors duration-200 hover:bg-slate-300 hover:text-slate-900">
                        {genre.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </m.article>
      <aside className="my-5 mx-5 rounded-md border-2 border-slate-300">
        <div>
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
                      <img
                        data-src={`${BASE_URL_IMAGE.replace(
                          "original",
                          "w300"
                        )}${season.poster_path}`}
                        alt={name}
                        className="lazyload rounded-md bg-black object-cover object-center transition-transform duration-300 group-hover:scale-125"
                      />
                    </div>
                    <p className="my-5">{name}</p>
                  </m.div>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="ml-5 text-2xl">Casts</h2>
          <div className="my-5 flex space-x-5 overflow-x-scroll px-5 scrollbar-hide">
            {tvCasts.map((people) => {
              const blurData =
                people.gender === 2
                  ? "/img/user-picture-placeholder.png"
                  : "/img/female-user-icon.jpg";
              let imgSrc = blurData;
              if (people.profile_path)
                imgSrc = `${BASE_URL_IMAGE.replace(
                  "original",
                  "w300"
                )}${people.profile_path.slice(1)}`;
              return (
                <Link key={people.id} passHref href={`/person/${people.id}`}>
                  <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-md">
                      <img
                        data-srcset={imgSrc}
                        width={238}
                        height={357}
                        alt={people.name}
                        className="lazyload blur--img min-h-[357px] min-w-[238px] rounded-md bg-white object-cover object-center transition-transform duration-300 hover:scale-105"
                        data-src={blurData}
                      />
                    </div>
                    <div className="my-2">
                      <h3>{people.name}</h3>
                      <h3 className="text-sm italic text-slate-400">
                        {people.character}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <Contents title="Similar TV Shows" contents={similarTV} />
        </div>
      </aside>
    </>
  );
}

export default TVSeries;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tvId = context.query.tvId;

  const tvRequest = custAxios.get(API_OPTION.TV, { params: { tvId } });

  const tvSimilarRequest = custAxios.get(API_OPTION.SIMILAR_TV, {
    params: { tvId },
  });
  const tvCastsRequest = custAxios.get(API_OPTION.TV_CAST, {
    params: { tvId },
  });

  const [tv, similarTV, tvCasts] = await axios
    .all([tvRequest, tvSimilarRequest, tvCastsRequest])
    .then(
      axios.spread((tvResponse, tvSimilarResponse, tvCastsResponse) => {
        const tv: TV = tvResponse.data;

        const tvCasts: TVCast[] = tvCastsResponse.data.cast;

        const similarTV = tvSimilarResponse.data.results.map(
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

        return [tv, similarTV, tvCasts];
      })
    );

  return { props: { tv, similarTV, tvCasts } };
};
