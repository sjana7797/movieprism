import type { GetServerSideProps } from "next";
import Providers from "../components/Home/Providers";
import Carousel from "../components/Home/Carousel";
import Contents from "../components/Home/Contents";
import { ContentOverview, Poster } from "../typing/content";
import { API_OPTION } from "../utils/apiConfig";
import { custAxios } from "../utils/custAxios";
import LatestMovie from "../components/Home/DiscoverMovie";

const Home = ({
  trendingData,
  topRatedData,
  popularData,
  tvData,
  onAir,
  country,
}: // popularDataBollywood,
{
  trendingData: ContentOverview[];
  topRatedData: ContentOverview[];
  popularData: ContentOverview[];
  tvData: ContentOverview[];
  upcommingMovies: ContentOverview[];
  onAir: ContentOverview[];
  country: string;
}) => {
  return (
    <>
      <Carousel trendingData={trendingData.slice(0, 5)} />
      <Contents contents={trendingData} title="Trending" />
      <Contents contents={topRatedData} title="Top Rated" />
      <Providers />
      <Contents contents={popularData} title="Popular" />
      <Contents contents={onAir} title="Now Playing" />
      <LatestMovie country={country} />
      <Contents contents={tvData} title="TV Series On the Air" />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { country } = context.query;
  const trendingData: Poster[] = await custAxios
    .get(API_OPTION.TRENDING, { params: { media: "all" } })
    .then((res) =>
      res.data.results.map((movie: ContentOverview) => {
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
      })
    );
  const topRatedData: Poster[] = await custAxios
    .get(API_OPTION.TOP_RATED, { params: { region: country } })
    .then((res) =>
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
  const popularData: Poster[] = await custAxios
    .get(API_OPTION.POPULAR, { params: { region: country } })
    .then((res) =>
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

  const tvData: Poster[] = await custAxios
    .get(API_OPTION.ON_THE_AIR, { params: { region: country } })
    .then((res) =>
      res.data.results.map((tv: ContentOverview) => {
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
      })
    );

  const onAirData = await custAxios
    .get(API_OPTION.NOW_PLAYING, {
      params: { region: country },
    })
    .then((res) => res.data);

  const onAir: Poster[] = onAirData.results.map((movie: ContentOverview) => {
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
  });

  const upcommingMovies: Poster[] = await custAxios
    .get(API_OPTION.UPCOMMING_MOVIES)
    .then((res) => {
      const movies: Poster[] = res.data.results.map((movie: Poster) => {
        return { ...movie, media_type: "movie" };
      });
      return movies;
    });

  return {
    props: {
      trendingData,
      topRatedData,
      popularData,
      tvData,
      upcommingMovies,
      onAir,
      country,
    },
  };
};
