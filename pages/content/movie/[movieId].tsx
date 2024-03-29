import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Contents from "../../../components/Home/Contents";
import { API_OPTION, BASE_URL_IMAGE } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";
import { m } from "framer-motion";
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
import ContentImage from "../../../components/ui/ContentImage";
import axios from "axios";
import "lazysizes";
import "lazysizes/plugins/blur-up/ls.blur-up";

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
      <m.article exit={{ opacity: 0 }}>
        <section className="relative h-screen w-full">
          <ContentImage img={img} name={name} />
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
              <HandThumbUpIcon className="mx-2 h-5" />
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
            <m.div
              className="cursor-grab overflow-hidden"
              ref={backdropCarousel}
            >
              <m.div
                className="flex items-center space-x-5 px-5 py-5"
                drag="x"
                dragConstraints={{ right: 0, left: -backdropWidth }}
                transition={{ type: "spring", bounce: 0.25 }}
              >
                {images.backdrops.map((backdrop, index) => {
                  return (
                    <m.div
                      key={index}
                      className="relative min-h-[400px] min-w-[500px]"
                    >
                      <img
                        data-src={`${BASE_URL_IMAGE.replace(
                          "original",
                          "w500"
                        )}${backdrop.file_path}`}
                        width={backdrop.width}
                        height={backdrop.height}
                        alt={name}
                        loading="lazy"
                        className="lazyload pointer-events-none rounded-lg"
                      />
                    </m.div>
                  );
                })}
              </m.div>
            </m.div>
          </div>
          <div className="my-5">
            <h2 className="ml-5 text-2xl">Posters</h2>
            <m.div className="cursor-grab overflow-hidden" ref={posterCarousel}>
              <m.div
                className="flex items-center space-x-5 px-5 py-5"
                drag="x"
                dragConstraints={{ right: 0, left: -posterWidth }}
              >
                {images.posters.map((poster, index) => {
                  return (
                    <m.div
                      key={index}
                      className="relative min-h-[400px] min-w-[200px]"
                    >
                      <img
                        data-src={`${BASE_URL_IMAGE.replace(
                          "original",
                          "w300"
                        )}${poster.file_path}`}
                        alt={name}
                        loading="lazy"
                        className="lazyload pointer-events-none h-full w-full rounded-lg"
                      />
                    </m.div>
                  );
                })}
              </m.div>
            </m.div>
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
                      <img
                        data-src={imgSrc}
                        alt={production.name}
                        className="height-[1080px] aspect-video w-[1920px] rounded-md lazyload"
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
                    <div key={video.id} className="max-w-[640px] rounded-md">
                      <iframe
                        width="640"
                        height="360"
                        data-src={`https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&color=red&modestbranding=1`}
                        className="lazyload lazyload aspect-video rounded-md"
                        allowFullScreen
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
                    imgSrc = `${BASE_URL_IMAGE.replace(
                      "original",
                      "w300"
                    )}${people.profile_path.slice(1)}`;
                  return (
                    <Link
                      key={people.id}
                      passHref
                      href={`/person/${people.id}`}
                    >
                      <div className="group cursor-pointer">
                        <div className="overflow-hidden rounded-md">
                          <img
                            data-src={imgSrc}
                            width={238}
                            height={357}
                            alt={people.name}
                            className="lazyload min-h-[357px] min-w-[238px] rounded-md bg-white object-cover object-center transition-transform duration-300 hover:scale-105"
                            src={blurData}
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
      </m.article>
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

  const movieRequest = custAxios.get(`movie`, { params: { movieId } });
  const castRequest = custAxios.get(API_OPTION.MOVIE_CAST, {
    params: { movieId },
  });
  const similarMovieRequest = custAxios(API_OPTION.SIMILAR, {
    params: { movieId },
  });
  const recommendationsRequest = custAxios(API_OPTION.RECOMMENDATIONS, {
    params: { movieId },
  });
  const videosRequest = custAxios.get(API_OPTION.VIDEO_URL, {
    params: { movieId },
  });

  const imagesRequest = custAxios.get(API_OPTION.IMAGES, {
    params: { id: movieId, media: "movie" },
  });

  const [movie, cast, similarMovie, recommendations, videos, images] =
    await axios
      .all([
        movieRequest,
        castRequest,
        similarMovieRequest,
        recommendationsRequest,
        videosRequest,
        imagesRequest,
      ])
      .then(
        axios.spread(
          (
            movieResponse,
            castResponse,
            similarMovieResponse,
            recommendationsResponse,
            videosResponse,
            imagesResponse
          ) => {
            const movie: MovieInterface = movieResponse.data;

            const cast: MovieCast[] = castResponse.data.cast;

            const similarMovie: Poster[] =
              similarMovieResponse.data.results.map(
                (movie: ContentOverview) => {
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
                }
              );

            const recommendations: Poster[] =
              recommendationsResponse.data.results.map(
                (movie: ContentOverview) => {
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
                }
              );

            const videos: MovieVideos[] = videosResponse.data.results;

            const images: ContentImages = {
              id: imagesResponse.data.id,
              backdrops: imagesResponse.data.backdrops.slice(0, 5),
              posters: imagesResponse.data.posters.slice(0, 5),
            };

            return [movie, cast, similarMovie, recommendations, videos, images];
          }
        )
      );
  return {
    props: { movie, similarMovie, recommendations, cast, videos, images },
  };
};
