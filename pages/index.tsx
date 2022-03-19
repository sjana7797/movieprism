import type { GetServerSideProps } from "next";
import Providers from "../components/Home/Providers";
import Carousel from "../components/Home/Carousel";
import Contents from "../components/Home/Contents";
import { ContentOverview, Poster } from "../typing";
import { API_OPTION } from "../utils/apiConfig";
import { custAxios } from "../utils/custAxios";

const Home = ({
  trendingData,
  topRatedData,
  popularData,
  tvData,
  onAir,
}: // popularDataBollywood,
{
  trendingData: ContentOverview[];
  topRatedData: ContentOverview[];
  popularData: ContentOverview[];
  tvData: ContentOverview[];
  upcommingMovies: ContentOverview[];
  onAir: ContentOverview[];
}) => {
  return (
    <>
      <Carousel trendingData={trendingData.slice(0, 5)} />
      <Contents contents={trendingData} title="Trending" />
      <Contents contents={topRatedData} title="Top Rated" />
      <Providers />
      <Contents contents={popularData} title="Popular" />
      <Contents contents={onAir} title="On The Air" />
      <Contents contents={tvData} title="TV Series" />
      {/* <BollywoodDrama contents={popularDataBollywood} /> */}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country } = context.query;
  const trendingData: ContentOverview[] = await custAxios
    .get(API_OPTION.TRENDING)
    .then((res) =>
      res.data.results.map((movie: any) => {
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
  const topRatedData: ContentOverview[] = await custAxios
    .get(API_OPTION.TOP_RATED, { params: { region: country } })
    .then((res) =>
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
  const popularData: ContentOverview[] = await custAxios
    .get(API_OPTION.POPULAR, { params: { region: country } })
    .then((res) =>
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

  const tvData: ContentOverview[] = await custAxios
    .get(API_OPTION.POPULAR_TV, { params: { region: country } })
    .then((res) =>
      res.data.results.map((tv: any) => {
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
    .get(API_OPTION.LATEST, {
      params: { region: country },
    })
    .then((res) => res.data);

  const onAir: ContentOverview[] = onAirData.results.map((movie: any) => {
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
    },
  };
};
