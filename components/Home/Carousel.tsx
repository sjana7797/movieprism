import { ContentOverview } from "../../typing";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselComponent } from "react-responsive-carousel";
import CarouselItem from "./CarouselItem";

function Carousel({ trendingData }: { trendingData: ContentOverview[] }) {
  const settings = {
    autoPlay: true,
    infiniteLoop: true,
    interval: 2000,
    showThumbs: false,
    showStatus: false,
  };
  return (
    <CarouselComponent {...settings}>
      {trendingData.map((content) => (
        <CarouselItem content={content} key={content.id} />
      ))}
    </CarouselComponent>
  );
}

export default Carousel;
