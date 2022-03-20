import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContentOverview } from "../../typing";
import { API_OPTION, BASE_URL_IMAGE } from "../../utils/apiConfig";
import { custAxios } from "../../utils/custAxios";

function LatestMovie({ country }: { country: string }) {
  const router = useRouter();
  const [movie, setMovie] = useState<ContentOverview>({
    backdrop_path: "",
    id: 0,
    overview: "",
  });
  const name = movie.original_title || movie.name || movie.title;
  useEffect(() => {
    const num = Math.floor(Math.random() * 5);
    const getMovie = async () => {
      const movie = await custAxios
        .get(API_OPTION.DISCOVER_SINGLE, { params: { watch_region: country } })
        .then((res) => res.data.results[num]);
      setMovie(movie);
    };
    getMovie();
  }, [country]);
  return (
    <section
      className="mx-5 cursor-pointer rounded-md border-2 border-slate-300 p-5 opacity-100 transition-opacity duration-300 hover:opacity-30"
      onClick={() => {
        router.push(`/content/movie/${movie.id}`);
      }}
    >
      <div className="relative hidden h-96 w-full rounded-md bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900 md:block">
        <Image
          src={`${BASE_URL_IMAGE}${movie.backdrop_path}`}
          alt={name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-md"
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-md bg-gradient-to-r from-black via-slate-900 to-transparent p-5">
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
      </div>
      <div className="my-5 flex flex-wrap items-center justify-center md:hidden">
        <Image
          src={`${BASE_URL_IMAGE}${movie.poster_path}`}
          width={200}
          height={288}
          layout="fixed"
          className="mx-2 rounded-md bg-slate-900"
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
      </div>
    </section>
  );
}

export default LatestMovie;
