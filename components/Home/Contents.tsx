import { useRef } from "react";
import { ContentOverview } from "../../typing";
import Content from "../ui/Content";
import { m } from "framer-motion";
import { container } from "../../animation/variants";

function Contents({
  contents,
  title,
}: {
  contents: ContentOverview[];
  title: string;
}) {
  const lazyRoot = useRef(null);
  return (
    <section className="my-8 mx-5">
      <h2 className="text-xl">{title}</h2>
      <m.div
        className="flex space-x-5 overflow-x-scroll p-5 scrollbar-hide"
        ref={lazyRoot}
        initial="hidden"
        animate="show"
        variants={container}
      >
        {contents.map((content) => (
          <Content content={content} key={content.id} />
        ))}
        {contents.length === 0 && <h2 className="text-xl">No {title}</h2>}
      </m.div>
    </section>
  );
}

export default Contents;
