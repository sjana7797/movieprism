import { ThumbUpIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Contents from "../../../../components/Home/Contents";
import {
  ContentOverview,
  Season as SeasonInterface,
  TV,
} from "../../../../typing";
import { API_OPTION, BASE_URL_IMAGE } from "../../../../utils/apiConfig";
import { custAxios } from "../../../../utils/custAxios";

function Season(props: {
  season: SeasonInterface;
  tv: TV;
  similarTV: ContentOverview[];
}) {
  const { season, tv, similarTV } = props;
  const name = season.name;

  return (
    <>
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
              />
            </div>
            <p className="my-5 text-center">{name}</p>
          </div>
          <div className="mx-5 text-slate-400">
            <p>{season.overview}</p>
          </div>
        </div>
        <div className="m-5 grid grid-cols-1 gap-5 rounded-md border-2 border-slate-300 px-5 md:grid-cols-2">
          {season.episodes.map((episode) => {
            return (
              <div
                key={episode.id}
                className="my-5 flex max-w-xl grow flex-wrap items-center justify-between rounded-md border border-slate-300 p-2"
              >
                <div className="relative mx-auto h-72 w-52 rounded-md border-2 border-black">
                  <Image
                    src={`${BASE_URL_IMAGE}${
                      episode.still_path || season.poster_path
                    }`}
                    alt={name}
                    layout="fill"
                    className="rounded-md bg-black"
                    placeholder="blur"
                    blurDataURL={`${BASE_URL_IMAGE}${
                      episode.still_path || season.poster_path
                    }`}
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

export default Season;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tvId = context.query.tvId as string;
  const seasonNumber = context.query.season as string;
  const season: SeasonInterface = await custAxios
    .get(API_OPTION.SEASON, { params: { tvId, seasonNumber } })
    .then((res) => res.data);
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
  return { props: { season, tv, similarTV } };
};
