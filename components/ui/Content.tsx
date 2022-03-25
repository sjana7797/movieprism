import Image from "next/image";
import Link from "next/link";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";
import { m } from "framer-motion";
import { cardVariants } from "../../animation/variants";
import { forwardRef } from "react";
import { Poster } from "../../typing/content";

type Ref = HTMLDivElement;
type Props = { content: Poster };

const Content = forwardRef<Ref, Props>(
  ({ content }: { content: Poster }, ref) => {
    const { poster_path, title, original_title, name } = content;
    const dummyImage = "https://dummyimage.com/208x288/fff/aaa";
    const poster = poster_path ? `${BASE_URL_IMAGE}${poster_path}` : dummyImage;
    const content_name = `${title || original_title || name}`;
    return (
      <Link passHref href={`/content/${content.media_type}/${content.id}`}>
        <m.div
          ref={ref}
          className="group cursor-pointer rounded-md border-2 border-black transition-colors duration-300  hover:border-slate-200"
          variants={cardVariants}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative h-[300px] w-[200px] overflow-hidden">
            <Image
              src={poster}
              alt={content_name}
              layout="fixed"
              width={200}
              height={300}
              objectFit="cover"
              className="transform rounded-md bg-black opacity-100 transition duration-200 group-hover:scale-110 group-hover:opacity-20"
              placeholder="blur"
              blurDataURL={dummyImage}
              // loader={uploadcareLoader}
            />
            <h2 className="absolute top-5 left-5 hidden group-hover:block">
              {content_name}
            </h2>
          </div>
        </m.div>
      </Link>
    );
  }
);

Content.displayName = "Content";
export default Content;
