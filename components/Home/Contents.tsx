import { useRef } from "react";
import Content from "../ui/Content";
import { m } from "framer-motion";
import {
  cardContainerVariants,
  cardVariants,
  fadeInLeft,
} from "../../animation/variants";
import { Poster } from "../../typing/content";

const MotionContent = m(Content, { forwardMotionProps: true });

function Contents({ contents, title }: { contents: Poster[]; title: string }) {
  const lazyRoot = useRef(null);
  return (
    <section className="my-8 mx-5">
      <m.h2
        initial="offscreen"
        animate="onscreen"
        variants={fadeInLeft}
        className="text-xl"
      >
        {title}
      </m.h2>
      <m.div
        className="flex space-x-5 overflow-x-scroll p-5 scrollbar-hide"
        ref={lazyRoot}
        initial="offscreen"
        whileInView="onscreen"
        variants={cardContainerVariants}
        viewport={{ once: true, amount: 0.8 }}
      >
        {contents.map((content) => (
          <MotionContent
            variants={cardVariants}
            content={content}
            key={content.id}
          />
        ))}
        {contents.length === 0 && <h2 className="text-xl">No {title}</h2>}
      </m.div>
    </section>
  );
}

export default Contents;
