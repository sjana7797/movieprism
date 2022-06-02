import type { GetServerSideProps } from "next";
import Providers from "../components/Home/Providers";
import Carousel from "../components/Home/Carousel.server";
import Contents from "../components/Home/Contents";
import { ContentOverview, Poster } from "../typing/content";
import { API_OPTION } from "../utils/apiConfig";
import { custAxios } from "../utils/custAxios";
import DicoverMovie from "../components/Home/DiscoverMovie";
import axios from "axios";
import Head from "next/head";
import { APP_NAME } from "../utils/appConfig";

const Home = ({
  trendingData,
  topRatedData,
  popularData,
  tvData,
  onAir,
  discoverMovie,
}: {
  trendingData: ContentOverview[];
  topRatedData: Poster[];
  popularData: Poster[];
  tvData: Poster[];
  upcommingMovies: Poster[];
  onAir: Poster[];
  discoverMovie: ContentOverview;
}) => {
  return (
    <>
      <Head>
        <title>Home | {APP_NAME}</title>
      </Head>
      <Carousel trendingData={trendingData.slice(0, 5)} />
      <Contents contents={trendingData} title="Trending" />
      <Contents contents={topRatedData} title="Top Rated" />
      <Providers />
      <Contents contents={popularData} title="Popular" />
      <Contents contents={onAir} title="Now Playing" />
      <DicoverMovie data={discoverMovie} />
      <Contents contents={tvData} title="TV Series On the Air" />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country } = context.query;

  const trendingRequest = custAxios.get(API_OPTION.TRENDING, {
    params: { media: "all" },
  });
  const topRatedRequest = custAxios.get(API_OPTION.TOP_RATED, {
    params: { region: country },
  });
  const popularRequest = custAxios.get(API_OPTION.POPULAR, {
    params: { region: country },
  });
  const tvRequest = custAxios.get(API_OPTION.ON_THE_AIR, {
    params: { region: country },
  });
  const onTheAirRequest = custAxios.get(API_OPTION.NOW_PLAYING, {
    params: { region: country },
  });
  const upcommingMoviesRequest = custAxios.get(API_OPTION.UPCOMMING_MOVIES);
  const dicoverRequest = custAxios.get(API_OPTION.DISCOVER_MOVIE, {
    params: { watch_region: country },
  });

  const [
    trendingData,
    topRatedData,
    popularData,
    tvData,
    onAir,
    upcommingMovies,
    discoverMovie,
  ] = await axios
    .all([
      trendingRequest,
      topRatedRequest,
      popularRequest,
      tvRequest,
      onTheAirRequest,
      upcommingMoviesRequest,
      dicoverRequest,
    ])
    .then(
      axios.spread(
        (
          trendingResponse,
          topRatedResponse,
          popularResponse,
          tvResponse,
          onTheAirResponse,
          upcommingMoviesResponse,
          dicoverResponse
        ) => {
          const trendingData: Poster[] = trendingResponse.data.results.map(
            (movie: ContentOverview) => {
              return {
                backdrop_path: movie.backdrop_path,
                id: movie.id,
                overview: movie.overview,
                original_title: movie.original_title || null,
                title: movie.title || null,
                name: movie.name || null,
                poster_path: movie.poster_path || null,
                media_type: movie.media_type,
                first_air_date: movie.first_air_date || null,
                release_date: movie.release_date || null,
                vote_count: movie.vote_count,
              };
            }
          );
          const topRatedData: Poster[] = topRatedResponse.data.results.map(
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
          const popularData: Poster[] = popularResponse.data.results.map(
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
          const tvData: Poster[] = tvResponse.data.results.map(
            (tv: ContentOverview) => {
              return {
                backdrop_path: tv.backdrop_path,
                id: tv.id,
                overview: tv.overview,
                original_title: tv.original_title || null,
                name: tv.original_name || null,
                title: tv.title || null,
                poster_path: tv.poster_path || null,
                release_date: tv.release_date || null,
                vote_count: tv.vote_count,
                media_type: "tv",
                genres: tv.genre_ids,
              };
            }
          );
          const onAir: Poster[] = onTheAirResponse.data.results.map(
            (movie: ContentOverview) => {
              return {
                backdrop_path: movie.backdrop_path,
                id: movie.id,
                overview: movie.overview,
                title: movie.title || null,
                original_title: movie.original_title || null,
                name: movie.name || null,
                poster_path: movie.poster_path || null,
                media_type: "movie",
                first_air_date: movie.first_air_date || null,
                release_date: movie.release_date || null,
                vote_count: movie.vote_count,
              };
            }
          );

          const upcommingMovies: Poster[] =
            upcommingMoviesResponse.data.results.map((movie: Poster) => {
              return { ...movie, media_type: "movie" };
            });

          const discoverMovies: ContentOverview[] =
            dicoverResponse.data.results;

          const num = Math.floor(Math.random() * discoverMovies.length - 1);

          const discoverMovie = discoverMovies[num];

          return [
            trendingData,
            topRatedData,
            popularData,
            tvData,
            onAir,
            upcommingMovies,
            discoverMovie,
          ];
        }
      )
    );

  return {
    props: {
      trendingData,
      topRatedData,
      popularData,
      tvData,
      upcommingMovies,
      onAir,
      discoverMovie,
    },
  };
};
