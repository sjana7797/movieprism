import { ThumbUpIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Contents from "../../../components/Home/Contents";
import { ContentOverview, Movie } from "../../../typing";
import { API_OPTION, BASE_URL_IMAGE } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";

function Movie(props: {
  movie: Movie;
  similarMovie: ContentOverview[];
  recommendations: ContentOverview[];
}) {
  const { movie } = props;
  const img = `${BASE_URL_IMAGE}${movie.backdrop_path}`;
  const name = movie.title || movie.original_title || movie.name;
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
          <p>{movie.overview}</p>
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
        <Contents title="Similar Movies" contents={props.similarMovie} />
        <Contents title="Recommendations" contents={props.recommendations} />
      </aside>
    </>
  );
}

export default Movie;

export const getServerSideProps: GetServerSideProps = async (content) => {
  const movieId = content.query.movieId;

  const movie = await custAxios
    .get(`movie`, { params: { movieId } })
    .then((res) => res.data);

  const similarMovie: ContentOverview[] = await custAxios(API_OPTION.SIMILAR, {
    params: { movieId },
  }).then((res) =>
    res.data.results.map((movie: any) => {
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

  const recommendations: ContentOverview[] = await custAxios(
    API_OPTION.RECOMMENDATIONS,
    {
      params: { movieId },
    }
  ).then((res) =>
    res.data.results.map((movie: any) => {
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

  return {
    props: { movie, similarMovie, recommendations },
  };
};
