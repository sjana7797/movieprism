import type { GetServerSideProps } from "next";
import Carousel from "../components/Home/Carousel";
import Contents from "../components/Home/Contents";
import Slider from "../components/ui/Slider";
import { ContentOverview } from "../typing";
import { API_OPTION } from "../utils/apiConfig";
import { custAxios } from "../utils/custAxios";

const Home = ({
  trendingData,
  topRatedData,
  popularData,
  tvData,
  topRatedDataIN,
  popularDataIN,
  onAirIndia,
}: {
  trendingData: ContentOverview[];
  topRatedData: ContentOverview[];
  popularData: ContentOverview[];
  tvData: ContentOverview[];
  topRatedDataIN: ContentOverview[];
  popularDataIN: ContentOverview[];
  onAirIndia: ContentOverview[];
}) => {
  return (
    <>
      <Carousel trendingData={trendingData.slice(0, 5)} />
      <Contents contents={trendingData} title="Trending" />
      <Contents contents={topRatedData} title="Top Rated" />
      <Contents contents={popularData} title="Popular" />
      <Contents contents={tvData} title="TV Series" />
      <Slider />
      <Contents contents={topRatedDataIN} title="Top Rated in India" />
      <Contents contents={popularDataIN} title="Popular in India" />
      <Contents contents={onAirIndia} title="Playing in India" />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    .get(API_OPTION.TOP_RATED)
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
  const topRatedDataIN: ContentOverview[] = await custAxios
    .get(API_OPTION.TOP_RATED, { params: { region: "IN" } })
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
    .get(API_OPTION.POPULAR)
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
  const popularDataIN: ContentOverview[] = await custAxios
    .get(API_OPTION.POPULAR, { params: { region: "IN" } })
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
    .get(API_OPTION.POPULAR_TV)
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

  const onAirIndiaData = await custAxios
    .get(API_OPTION.LATEST, {
      params: { region: "IN", language: "hi" },
    })
    .then((res) => res.data);

  const onAirIndia: ContentOverview[] = onAirIndiaData.results.map(
    (movie: any) => {
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

  return {
    props: {
      trendingData,
      topRatedData,
      popularData,
      tvData,
      topRatedDataIN,
      popularDataIN,
      onAirIndia,
    },
  };
};
