import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import { m } from "framer-motion";
import { forwardRef } from "react";
import { Thumbnail } from "../../typing/content";
import "lazysizes";

type Ref = HTMLDivElement;
type Props = { content: Thumbnail };

const Thumbnail = forwardRef<Ref, Props>(
  (props: { content: Thumbnail }, ref) => {
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
      `${BASE_URL_IMAGE.replace("original", "w500")}${
        backdrop_path || poster_path
      }` || `${BASE_URL_IMAGE}${poster_path}`;
    const content_name = name || title || original_title;
    return (
      <Link href={`/content/${media_type}/${id}`} passHref>
        <m.div
          className="group transform cursor-pointer p-2 transition duration-200 ease-in hover:z-50 sm:hover:scale-105"
          ref={ref}
        >
          <img
            data-src={poster}
            alt={content_name}
            loading="lazy"
            className="lazyload aspect-video w-full rounded-md bg-slate-900"
          />
          <div className="p-2">
            <p className="max-w-md truncate">{overview}</p>
            <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
              {content_name}
            </h2>
            <p className="flex items-center opacity-0 group-hover:opacity-100">
              {media_type && `${media_type}`} &#9679;{" "}
              {release_date || first_air_date} &#9679;{" "}
              <HandThumbUpIcon className="mx-2 h-5" />
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
