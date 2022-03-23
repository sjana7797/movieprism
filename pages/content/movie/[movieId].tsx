import { ThumbUpIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Contents from "../../../components/Home/Contents";
import { API_OPTION, BASE_URL_IMAGE } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Movie as MovieInterface,
  MovieCast,
  MovieVideos,
} from "../../../typing/movie";
import { ContentOverview, Poster } from "../../../typing/content";
import { ContentImages } from "../../../typing";
import { APP_NAME } from "../../../utils/appConfig";
import { capitaliseString } from "../../../utils/capitaliseString";

function Movie(props: {
  movie: MovieInterface;
  similarMovie: Poster[];
  recommendations: Poster[];
  cast: MovieCast[];
  videos: MovieVideos[];
  images: ContentImages;
}) {
  const { movie, cast, similarMovie, recommendations, videos, images } = props;
  const img = `${BASE_URL_IMAGE}${movie.backdrop_path}`;
  const name = movie.title || movie.original_title || movie.name || "";

  const [backdropWidth, setBackdropWidth] = useState(0);
  const backdropCarousel = useRef<HTMLDivElement>(null);
  const [posterWidth, setPosterWidth] = useState(0);
  const posterCarousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widthBackdrop =
      (backdropCarousel.current?.scrollWidth || 0) -
      (backdropCarousel.current?.offsetWidth || 0);
    const widthPoster =
      (posterCarousel.current?.scrollWidth || 0) -
      (posterCarousel.current?.offsetWidth || 0);
    setBackdropWidth(widthBackdrop);
    setPosterWidth(widthPoster);
  }, []);
  return (
    <>
      <Head>
        <title>{`${capitaliseString(name)} | ${APP_NAME}`}</title>
      </Head>
      <article>
        <section className="relative h-screen w-full">
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="sticky top-0 opacity-40"
            alt={name}
            blurDataURL="https://dummyimage.com/1920x1080/fff/aaa"
            placeholder="blur"
            priority
          />
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-slate-900 to-black opacity-[0.85]" />
          <div className="prose prose-sm prose-invert absolute top-1/3 left-10 h-3/5 overflow-y-scroll scrollbar-hide prose-h2:text-5xl prose-p:text-lg prose-p:opacity-80 md:prose-base lg:prose-xl">
            <h2>{name}</h2>
            <p>{movie.overview}</p>
            <p>
              Score :{" "}
              {movie.vote_average ? `${movie.vote_average * 10}%` : "NA"}
            </p>
            <p>Status : {movie.status}</p>
            <p className="flex items-center">
              {movie.release_date || movie.first_air_date} &#9679;{" "}
              <ThumbUpIcon className="mx-2 h-5" />
              {movie.vote_count}
            </p>
            <p>Adult : {movie.adult ? "Yes" : "No"}</p>
            <p>Popularity : {movie.popularity}</p>
            {movie.genres && (
              <div className="flex items-center space-x-5">
                <span className="">Genres </span>
                <div className="flex max-w-xl flex-wrap items-center space-x-5">
                  {movie.genres.map((genre) => {
                    return (
                      <Link
                        key={genre.id}
                        passHref
                        href={`/content/genre?media=movie&genre=${
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
        <section className="my-10">
          <div className="my-5">
            <h2 className="ml-5 text-2xl">Backdrops</h2>
            <motion.div
              className="cursor-grab overflow-hidden"
              ref={backdropCarousel}
            >
              <motion.div
                className="flex items-center space-x-5 px-5 py-5"
                drag="x"
                dragConstraints={{ right: 0, left: -backdropWidth }}
                transition={{ type: "spring", bounce: 0.25 }}
              >
                {images.backdrops.map((backdrop, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="relative min-h-[400px] min-w-[500px]"
                    >
                      <Image
                        src={`${BASE_URL_IMAGE}${backdrop.file_path}`}
                        layout="responsive"
                        width={backdrop.width}
                        height={backdrop.height}
                        alt={name}
                        className="pointer-events-none rounded-lg"
                        priority
                        sizes="500px"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
          <div className="my-5">
            <h2 className="ml-5 text-2xl">Posters</h2>
            <motion.div
              className="cursor-grab overflow-hidden"
              ref={posterCarousel}
            >
              <motion.div
                className="flex items-center space-x-5 px-5 py-5"
                drag="x"
                dragConstraints={{ right: 0, left: -posterWidth }}
              >
                {images.posters.map((poster, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="relative min-h-[400px] min-w-[200px]"
                    >
                      <Image
                        src={`${BASE_URL_IMAGE}${poster.file_path}`}
                        layout="responsive"
                        width={poster.width}
                        height={poster.height}
                        alt={name}
                        className="pointer-events-none rounded-lg"
                        priority
                        sizes="200px"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="my-10">
          <div className="my-5">
            <h2 className="ml-5 text-2xl">Productions</h2>
            <div className="my-5 flex space-x-10 overflow-x-scroll px-5 scrollbar-hide">
              {movie.production_companies.map((production) => {
                let imgSrc = "/favicon.ico";
                if (production.logo_path)
                  imgSrc = `${BASE_URL_IMAGE}${production.logo_path.slice(1)}`;
                return (
                  <div key={production.id}>
                    <div className="">
                      <Image
                        src={imgSrc}
                        width={1920}
                        height={1080}
                        layout="responsive"
                        alt={production.name}
                        className="rounded-md"
                      />
                    </div>
                    <div className="my-2">
                      <h3>{production.name}</h3>
                      <h3 className="text-sm italic text-slate-400">
                        {production.origin_country}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-5">
            <div>
              <h2 className="ml-5 text-2xl">Videos</h2>
              <div className="my-5 flex space-x-5 overflow-x-scroll px-5 scrollbar-hide">
                {videos.map((video) => {
                  return (
                    <div key={video.id} className="max-w-[640px]">
                      <iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        className="rounded-md"
                      ></iframe>
                      <div className="my-2 flex flex-col space-y-2">
                        <p>{video.name}</p>
                        <p>{video.type}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="ml-5 text-2xl">Casts</h2>
              <div className="my-5 flex space-x-5 overflow-x-scroll px-5 scrollbar-hide">
                {cast.map((people) => {
                  const blurData =
                    people.gender === 2
                      ? "/img/user-picture-placeholder.png"
                      : "/img/female-user-icon.jpg";
                  let imgSrc = blurData;
                  if (people.profile_path)
                    imgSrc = `${BASE_URL_IMAGE}${people.profile_path.slice(1)}`;
                  return (
                    <Link
                      key={people.id}
                      passHref
                      href={`/person/${people.id}`}
                    >
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
          </div>
        </section>
      </article>
      <aside className="my-5 mx-5 rounded-md border-2 border-slate-300">
        <Contents title="Similar Movies" contents={similarMovie} />
        <Contents title="Recommendations" contents={recommendations} />
      </aside>
    </>
  );
}

export default Movie;

export const getServerSideProps: GetServerSideProps = async (content) => {
  const movieId = content.query.movieId;

  const movie: MovieInterface = await custAxios
    .get(`movie`, { params: { movieId } })
    .then((res) => res.data);
  const cast: MovieCast[] = await custAxios
    .get(API_OPTION.MOVIE_CAST, { params: { movieId } })
    .then((res) => res.data.cast);

  const similarMovie: Poster[] = await custAxios(API_OPTION.SIMILAR, {
    params: { movieId },
  }).then((res) =>
    res.data.results.map((movie: ContentOverview) => {
      return {
        backdrop_path: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        original_title: movie.original_title || null,
        title: movie.title || null,
        poster_path: movie.poster_path || null,
        release_date: movie.release_date || null,
        vote_count: movie.vote_count,
        media_type: "movie",
      };
    })
  );

  const recommendations: Poster[] = await custAxios(
    API_OPTION.RECOMMENDATIONS,
    {
      params: { movieId },
    }
  ).then((res) =>
    res.data.results.map((movie: ContentOverview) => {
      return {
        backdrop_path: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        original_title: movie.original_title || null,
        title: movie.title || null,
        poster_path: movie.poster_path || null,
        release_date: movie.release_date || null,
        vote_count: movie.vote_count,
        media_type: "movie",
      };
    })
  );

  const videos: MovieVideos[] = await custAxios
    .get(API_OPTION.VIDEO_URL, {
      params: { movieId },
    })
    .then((res) => res.data.results);

  const images: ContentImages = await custAxios
    .get(API_OPTION.IMAGES, {
      params: { id: movieId, media: "movie" },
    })
    .then((res) => {
      const data = res.data;
      return {
        id: data.id,
        backdrops: data.backdrops.slice(0, 5),
        posters: data.posters.slice(0, 5),
      };
    });
  return {
    props: { movie, similarMovie, recommendations, cast, videos, images },
  };
};
