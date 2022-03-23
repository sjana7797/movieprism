import { ContentOverview } from "../../typing/content";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselComponent } from "react-responsive-carousel";
// import CarouselItem from "./CarouselItem";
import { CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";

const DynamicCarouselItem = dynamic(() => import("./CarouselItem"));

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
    centerSlidePercentage: 97,
  };

  const buttonClassName =
    "bg-transparent text-white transition-colors duration-300 hover:text-emerald-400";
  return (
    <CarouselComponent
      {...settings}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 10 }}
            className={buttonClassName}
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
            style={{ ...arrowStyles, right: 10 }}
            className={buttonClassName}
          >
            <ChevronRightIcon />
          </button>
        )
      }
    >
      {trendingData.map((content) => (
        <DynamicCarouselItem content={content} key={content.id} />
      ))}
    </CarouselComponent>
  );
}

export default Carousel;
