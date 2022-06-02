import Image from "next/image";
import { useEffect, useState } from "react";
import { API_OPTION, BASE_URL_IMAGE } from "../../utils/apiConfig";
import { custAxios } from "../../utils/custAxios";

type UpcommingMovie = {
  poster_path: string;
  release_date: string;
  id: string;
  original_title: string;
  title: string;
};

function Slider() {
  const [upcommingMovies, setUpcommingMovies] = useState<UpcommingMovie[]>([]);
  useEffect(() => {
    const getUpcommingMovies = async () => {
      const movies = await custAxios
        .get(API_OPTION.UPCOMMING_MOVIES)
        .then((res) => {
          return res.data.results;
        });
      setUpcommingMovies(movies);
    };
    getUpcommingMovies();
  }, []);
  return (
    <div className="mx-10 rounded-md border-2 border-slate-200 p-5">
      <h2 className="text-xl font-bold tracking-wider">Upcomming Movies</h2>
      <div className="flex w-full space-x-5 overflow-x-scroll p-5 scrollbar-hide">
        {upcommingMovies.map((movie: UpcommingMovie) => {
          return <UpcommingMovie key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}

function UpcommingMovie({ movie }: { movie: UpcommingMovie }) {
  const poster = `${BASE_URL_IMAGE}${movie.poster_path}`;
  const content_name = `${movie.title || movie.original_title}`;
  return (
    <div className="group transform cursor-pointer rounded-md border-2 border-black bg-slate-900">
      <div className="relative h-72 w-52">
        <img
          data-src={poster}
          alt={content_name}
          className="h-full w-full bg-black object-fill opacity-100 transition-opacity duration-200 group-hover:opacity-20"
          placeholder="blur"
          data-src={poster}
        />
        <h2 className="absolute top-5 left-5 hidden group-hover:block">
          {content_name}
        </h2>
      </div>
      <p className="my-2 text-center text-sm">
        Expected Date &#9679; {movie.release_date}
      </p>
    </div>
  );
}

export default Slider;
