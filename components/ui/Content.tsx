import Image from "next/image";
import Link from "next/link";
import { ContentOverview } from "../../typing";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import { m } from "framer-motion";

function Content({ content }: { content: ContentOverview }) {
  const { poster_path, title, original_title, name } = content;
  const poster = `${BASE_URL_IMAGE}${poster_path}`;
  const content_name = `${title || original_title || name}`;

  return (
    <Link passHref href={`/content/${content.media_type}/${content.id}`}>
      <m.div className="group transform cursor-pointer rounded-md border-2 border-black transition-transform duration-300 hover:scale-105 hover:border-slate-200">
        <div className="relative h-[300px] w-[200px]">
          <Image
            src={poster}
            alt={content_name}
            layout="fill"
            className="rounded-md bg-black opacity-100 transition-opacity duration-200 group-hover:opacity-20"
            placeholder="blur"
            blurDataURL="https://dummyimage.com/208x288/fff/aaa"
            sizes="200px"
          />
          <h2 className="absolute top-5 left-5 hidden group-hover:block">
            {content_name}
          </h2>
        </div>
      </m.div>
    </Link>
  );
}

export default Content;
