import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { ContentOverview } from "../../typing";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import { m } from "framer-motion";
import { forwardRef } from "react";

type Ref = HTMLDivElement;
type Props = { content: ContentOverview };

const Thumbnail = forwardRef<Ref, Props>(
  (props: { content: ContentOverview }, ref) => {
    const {
      backdrop_path,
      id,
      overview,
      original_title,
      title,
      name,
      poster_path,
      media_type,
      first_air_date,
      release_date,
      vote_count,
    } = props.content;
    const poster =
      `${BASE_URL_IMAGE}${backdrop_path || poster_path}` ||
      `${BASE_URL_IMAGE}${poster_path}`;
    const content_name = name || title || original_title;
    return (
      <Link href={`/content/${media_type}/${id}`} passHref>
        <m.div
          className="group transform cursor-pointer p-2 transition duration-200 ease-in hover:z-50 sm:hover:scale-105"
          ref={ref}
        >
          <Image
            src={poster}
            width={1920}
            height={1080}
            layout="responsive"
            alt={content_name}
            className="rounded-md bg-slate-900"
          />
          <div className="p-2">
            <p className="max-w-md truncate">{overview}</p>
            <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
              {content_name}
            </h2>
            <p className="flex items-center opacity-0 group-hover:opacity-100">
              {media_type && `${media_type}`} &#9679;{" "}
              {release_date || first_air_date} &#9679;{" "}
              <ThumbUpIcon className="mx-2 h-5" />
              {vote_count}
            </p>
          </div>
        </m.div>
      </Link>
    );
  }
);

Thumbnail.displayName = "Thumbnail";

export default Thumbnail;
