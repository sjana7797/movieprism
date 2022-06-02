import Image from "next/image";
import { useRouter } from "next/router";
import { ContentOverview } from "../../typing/content";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import { m } from "framer-motion";
import { fadeInLeft } from "../../animation/variants";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";

function DicoverMovie({ data }: { data: ContentOverview }) {
  const movie = data;
  const router = useRouter();

  const name = movie?.original_title || movie?.name || movie?.title;

  return (
    <section className="mx-5 p-5">
      <m.div
        className="group relative hidden h-96 w-full cursor-pointer overflow-hidden rounded-lg opacity-100 shadow-sm shadow-slate-700 transition-opacity duration-300 hover:opacity-30 md:block"
        initial="offscreen"
        animate="onscreen"
        variants={fadeInLeft}
        onClick={() => router.push(`/content/movie/${movie?.id}`)}
      >
        <div className="absolute right-0 top-0 h-full w-1/2">
          <img
            data-src={`${BASE_URL_IMAGE}${movie.backdrop_path}`}
            className="objec h-full w-full"
            alt={name}
          />
        </div>

        <div className="absolute left-0 top-0 h-full w-full rounded-md bg-gradient-to-r from-black via-slate-900 to-transparent p-5 group-hover:to-emerald-900/40">
          <h4 className="text-2xl font-bold tracking-wider">{name}</h4>
          <p className="my-5 w-1/2 line-clamp-4">{movie.overview}</p>
          <p className="my-5 w-1/2">
            <span className="block">
              Popularity:<em>{movie.popularity}</em>
            </span>
            <span className="block">
              Adult:<em>{movie.adult ? "Yes" : "No"}</em>
            </span>
          </p>
        </div>
      </m.div>
      <m.div
        className="my-5 flex flex-wrap items-center justify-center overflow-hidden md:hidden"
        initial="offscreen"
        animate="onscreen"
        variants={fadeInLeft}
      >
        <img
          data-src={`${BASE_URL_IMAGE.replace("original", "w300")}${
            movie.poster_path
          }`}
          width={200}
          height={288}
          className="lazyload mx-2 h-[288] w-[200px] rounded-md bg-slate-900 transition-transform duration-300 group-hover:scale-110"
          alt={name}
        />
        <div className="prose prose-invert mx-2 my-1">
          <h3 className="">
            {movie.original_title || movie.name || movie.title}
          </h3>
          <p className="line-clamp-3">{movie.overview}</p>
          <p>
            <span className="block">
              Popularity:<em>{movie.popularity}</em>
            </span>
            <span className="block">
              Adult:<em>{movie.adult ? "Yes" : "No"}</em>
            </span>
          </p>
          <div
            className="group flex items-center space-x-2 italic tracking-wider"
            onClick={() => router.push(`/content/movie/${movie?.id}`)}
          >
            <span className="transition-transform duration-300 group-hover:scale-x-105">
              Read More
            </span>
            <span className="transition-transform duration-300 group-hover:scale-x-150">
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      </m.div>
    </section>
  );
}

export default DicoverMovie;
