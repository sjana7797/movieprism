import { ThumbUpIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Contents from "../../../../components/Home/Contents";
import { TV, TVCast } from "../../../../typing/tv";
import { ContentOverview, Poster } from "../../../../typing/content";
import { API_OPTION, BASE_URL_IMAGE } from "../../../../utils/apiConfig";
import { custAxios } from "../../../../utils/custAxios";
import { APP_NAME } from "../../../../utils/appConfig";

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
  const name = tv.title || tv.original_title || tv.name;
  return (
    <>
      <Head>
        <title>{`${name} | ${APP_NAME}`}</title>
      </Head>
      <section className="relative h-screen w-full">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="sticky top-0 opacity-40"
          alt={name}
          priority
        />
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-slate-900 to-black opacity-[0.85]" />
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
      </section>
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
                  <div className="transform cursor-pointer">
                    <div className="relative h-72 w-52 rounded-md border-2 border-black transition-transform duration-300 hover:scale-105 hover:border-slate-200">
                      <Image
                        src={`${BASE_URL_IMAGE}${season.poster_path}`}
                        alt={name}
                        layout="fill"
                        className="rounded-md bg-black"
                        placeholder="blur"
                        blurDataURL={`${BASE_URL_IMAGE}${season.poster_path}`}
                      />
                    </div>
                    <p className="my-5">{name}</p>
                  </div>
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
                imgSrc = `${BASE_URL_IMAGE}${people.profile_path.slice(1)}`;
              return (
                <Link key={people.id} passHref href={`/person/${people.id}`}>
                  <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-md">
                      <Image
                        src={imgSrc}
                        width={238}
                        height={357}
                        layout="fixed"
                        alt={people.name}
                        className="rounded-md bg-white transition-transform duration-300 hover:scale-105"
                        blurDataURL={blurData}
                        placeholder="blur"
                        objectFit="cover"
                        objectPosition="center"
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
  const tv: TV = await custAxios
    .get(API_OPTION.TV, { params: { tvId } })
    .then((res) => res.data);
  const tvCasts: TVCast[] = await custAxios
    .get(API_OPTION.TV_CAST, { params: { tvId } })
    .then((res) => {
      return res.data.cast;
    });

  const tvSimilarData = await custAxios
    .get(API_OPTION.SIMILAR_TV, { params: { tvId } })
    .then((res) => res.data);

  const similarTV: Poster[] = tvSimilarData.results.map(
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
  return { props: { tv, similarTV, tvCasts } };
};
