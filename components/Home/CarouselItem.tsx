import Image from "next/image";
import Link from "next/link";
import { ContentOverview } from "../../typing";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";

function CarouselItem({ content }: { content: ContentOverview }) {
  const name = content.name || content.original_title || content.title;
  return (
    <Link passHref href={`/content/${content.media_type}/${content.id}`}>
      <div className="group relative h-52 w-full bg-black opacity-100 transition-opacity duration-200 hover:cursor-pointer hover:opacity-50 sm:h-96">
        <Image
          layout="fill"
          src={`${BASE_URL_IMAGE}${content.backdrop_path}`}
          alt={""}
          objectFit="cover"
          className="opacity-40 blur-sm"
        />
        <div className="absolute top-1/2 left-10 -translate-y-1/2">
          <h3 className="text-left text-lg font-medium tracking-wide group-hover:text-emerald-400 sm:left-20 sm:text-2xl lg:text-4xl">
            {name}
          </h3>
          <p className="my-1 mr-10 text-left text-sm text-slate-400 sm:text-base">
            {content.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CarouselItem;
