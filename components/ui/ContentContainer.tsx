import Thumbnail from "./Thumbnail";
import { m } from "framer-motion";
import { thumbNail, thumbNailContainer } from "../../animation/variants";
import { Thumbnail as ThumbnailInterface } from "../../typing/content";

function ContentContainer({
  contents,
  title,
}: {
  contents: ThumbnailInterface[];
  title: string;
}) {
  const MotionThumbnail = m(Thumbnail, { forwardMotionProps: true });
  return (
    <section className="mx-1 my-10 p-2 sm:mx-5">
      <m.h1
        className="text-center text-4xl font-bold capitalize italic tracking-wider"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 5, type: "spring", stiffness: 100 }}
      >
        {title}
      </m.h1>
      <m.div
        className="my-10 flex-wrap justify-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex"
        initial="hide"
        animate="show"
        variants={thumbNailContainer}
        exit={{ opacity: 0 }}
      >
        {contents.map((content) => (
          <MotionThumbnail
            content={content}
            key={content.id}
            variants={thumbNail}
            initial="hide"
            animate="show"
            exit={{ opacity: 0 }}
          />
        ))}
      </m.div>
    </section>
  );
}

export default ContentContainer;
