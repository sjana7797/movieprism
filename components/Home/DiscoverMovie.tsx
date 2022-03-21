import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ContentOverview } from "../../typing";
import { API_OPTION, BASE_URL_IMAGE } from "../../utils/apiConfig";
import { custAxios } from "../../utils/custAxios";

function LatestMovie({ country }: { country: string }) {
  const router = useRouter();
  const fetcher = async () => {
    const movies: ContentOverview[] = await custAxios
      .get(API_OPTION.DISCOVER_SINGLE, { params: { watch_region: country } })
      .then((res) => {
        const data = res.data;
        return data.results;
      });
    return movies;
  };

  const { data, error } = useSWR<ContentOverview[], Error>("dummy", fetcher);

  const [movie, setMovie] = useState<ContentOverview>();

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        const num = Math.floor(Math.random() * data.length - 1);
        console.log("change", num);
        const movie = data[num];
        setMovie(movie);
      }
    }, 1000 * 10);
  });

  const name = movie?.original_title || movie?.name || movie?.title;

  if (error) return <div>{error}</div>;
  return (
    <section
      className="mx-5 cursor-pointer rounded-md border-2 border-slate-300 p-5"
      onClick={() => {
        router.push(`/content/movie/${movie?.id}`);
      }}
    >
      {!movie ? (
        <>
          <div className=" hidden h-96 w-full  animate-pulse rounded-md bg-gradient-to-br from-slate-700 via-gray-700 to-neutral-700 md:block" />
          <div className="my-5 flex flex-wrap items-center justify-center md:hidden">
            <div className="h-[288px] w-[200px] animate-pulse rounded-md bg-slate-700" />
            <div className="my-2 mx-2 flex h-full w-full flex-col space-y-2">
              <div className="h-2 w-full animate-pulse rounded-md bg-slate-700" />
              <div className="h-2 w-8/12 animate-pulse rounded-md bg-slate-700" />
              <div className="h-2 w-10/12 animate-pulse rounded-md bg-slate-700" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative hidden h-96 w-full rounded-md bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900 opacity-100 transition-opacity duration-300 hover:opacity-30 md:block">
            <Image
              src={`${BASE_URL_IMAGE}${movie.backdrop_path}`}
              alt={name}
              layout="fill"
              objectFit="cover"
              objectPosition="15% 20%"
              className="rounded-md"
              sizes="100%"
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
        </>
      )}
    </section>
  );
}

export default LatestMovie;
