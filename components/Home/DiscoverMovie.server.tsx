import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContentOverview } from "../../typing/content";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import { m } from "framer-motion";
import { fadeInLeft } from "../../animation/variants";

function DicoverMovie({ data }: { data: ContentOverview[] }) {
  const num = Math.floor(Math.random() * data.length - 1);
  const [movie, setMovie] = useState<ContentOverview>(data[num]);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (movie) {
        const num = Math.floor(Math.random() * data.length - 1);
        const movie = data[num];
        setMovie(movie);
      }
    }, 1000 * 60 * 5); //msec * sec * min
  });

  const name = movie?.original_title || movie?.name || movie?.title;

  return (
    <section className="mx-5 cursor-pointer rounded-md border-2 border-slate-300 p-5">
      <m.div
        className="group relative hidden h-96 w-full rounded-md opacity-100 transition-opacity duration-300 hover:opacity-30 md:block"
        initial="offscreen"
        animate="onscreen"
        variants={fadeInLeft}
        onClick={() => router.push(`/content/movie/${movie?.id}`)}
      >
        <Image
          src={`${BASE_URL_IMAGE}${movie.backdrop_path}`}
          alt={name}
          layout="fill"
          objectFit="cover"
          objectPosition="15% 20%"
          className="rounded-md"
          sizes="100%"
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-md bg-gradient-to-r from-black via-slate-900 to-transparent p-5 group-hover:to-emerald-900/40">
          <h4 className="text-2xl font-bold tracking-wider">{name}</h4>
          <p className="my-5 w-1/2">{movie.overview}</p>
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
        <Image
          src={`${BASE_URL_IMAGE}${movie.poster_path}`}
          width={200}
          height={288}
          layout="fixed"
          className="mx-2 rounded-md bg-slate-900 transition-transform duration-300 group-hover:scale-110"
          alt={name}
        />
        <div className="prose prose-invert mx-2 my-1">
          <h3 className="">
            {movie.original_title || movie.name || movie.title}
          </h3>
          <p>{movie.overview}</p>
          <p>
            <span className="block">
              Popularity:<em>{movie.popularity}</em>
            </span>
            <span className="block">
              Adult:<em>{movie.adult ? "Yes" : "No"}</em>
            </span>
          </p>
        </div>
      </m.div>
    </section>
  );
}

export default DicoverMovie;
