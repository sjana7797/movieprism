import Link from "next/link";
import { useEffect, useState } from "react";
import { ContentOverview } from "../../typing/content";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import "lazysizes";

function CarouselItem({ content }: { content: ContentOverview }) {
  const name = content.name || content.original_title || content.title;
  const poster = `${BASE_URL_IMAGE.replace("original", "w500")}${
    content.poster_path
  }`;
  const [showBackdrop, setShowBackdrop] = useState(false);
  useEffect(() => {
    const shouldShowBackground = screen.width <= 768;
    setShowBackdrop(shouldShowBackground);
  }, []);
  return (
    <Link passHref href={`/content/${content.media_type}/${content.id}`}>
      <div className="group relative mx-2 min-h-[250px] overflow-hidden rounded-lg bg-black opacity-100 shadow-md shadow-emerald-400/20 transition-opacity duration-200 hover:cursor-pointer hover:opacity-50 sm:min-h-[300px] md:min-h-[350px] xl:min-h-[400px]">
        {showBackdrop && (
          <img
            data-src={`${BASE_URL_IMAGE}${content.backdrop_path}`}
            alt={`${name} backdrop`}
            className="lazyload absolute top-0 left-0 min-h-[250px] w-full rounded-md object-cover sm:min-h-[300px] md:min-h-[350px] xl:min-h-[400px]"
          />
        )}
        <div className="absolute top-10 left-10 z-20 rounded-md md:top-1/2 md:w-1/2 md:-translate-y-1/2">
          <h2 className="text-left text-lg font-medium tracking-wide group-hover:text-emerald-400 sm:left-20 sm:text-2xl lg:text-4xl">
            {name}
          </h2>
          <p className="my-1 mr-10 text-left text-sm text-slate-400 line-clamp-3 sm:text-base">
            {content.overview}
          </p>
        </div>

        {!showBackdrop && (
          <div className="absolute top-0 right-0 hidden h-full w-1/2 rounded-md md:block">
            <img
              data-src={poster}
              alt={name}
              className="lazyload h-full w-full object-cover object-center"
            />
          </div>
        )}
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br from-black via-slate-900 to-transparent md:bg-gradient-to-r" />
      </div>
    </Link>
  );
}

export default CarouselItem;
