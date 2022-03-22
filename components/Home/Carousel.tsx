import { ContentOverview } from "../../typing";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselComponent } from "react-responsive-carousel";
import CarouselItem from "./CarouselItem";
import Head from "next/head";
import { CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

function Carousel({ trendingData }: { trendingData: ContentOverview[] }) {
  const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 50,
    height: 50,
    cursor: "pointer",
  };

  const settings = {
    autoPlay: true,
    infiniteLoop: true,
    interval: 2000,
    showThumbs: false,
    showStatus: false,
    centerMode: true,
    showIndicators: false,
  };

  return (
    <CarouselComponent
      {...settings}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
          >
            <ChevronLeftIcon />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 15 }}
          >
            <ChevronRightIcon />
          </button>
        )
      }
    >
      {trendingData.map((content) => (
        <CarouselItem content={content} key={content.id} />
      ))}
    </CarouselComponent>
  );
}

export default Carousel;
