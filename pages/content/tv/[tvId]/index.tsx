import { ThumbUpIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Contents from "../../../../components/Home/Contents";
import { ContentOverview, TV } from "../../../../typing";
import { API_OPTION, BASE_URL_IMAGE } from "../../../../utils/apiConfig";
import { custAxios } from "../../../../utils/custAxios";

function TVSeries({ tv, similarTV }: { tv: TV; similarTV: ContentOverview[] }) {
  const img = `${BASE_URL_IMAGE}${tv.backdrop_path}`;
  const name = tv.title || tv.original_title || tv.name;
  return (
    <>
      <Head>
        <title>{name}</title>
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
                    <span
                      key={genre.id}
                      className="my-1 cursor-pointer rounded-md border-2 border-slate-300 py-1 px-2 transition-colors duration-200 hover:bg-slate-300 hover:text-slate-900"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
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

  const tvSimilarData = await custAxios
    .get(API_OPTION.SIMILAR_TV, { params: { tvId } })
    .then((res) => res.data);

  const similarTV = tvSimilarData.results.map((tv: any) => {
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
  return { props: { tv, similarTV } };
};
