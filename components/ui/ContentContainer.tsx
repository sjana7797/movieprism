import { ContentOverview } from "../../typing";
import Thumbnail from "./Thumbnail";
import { m } from "framer-motion";

function ContentContainer({
  contents,
  title,
}: {
  contents: ContentOverview[];
  title: string;
}) {
  const MotionThumbnail = m(Thumbnail);
  return (
    <section className="mx-5 my-10 rounded-md border border-slate-600 bg-slate-700 p-5 shadow-md">
      <h1 className="text-2xl font-bold capitalize italic tracking-wider">
        {title}
      </h1>
      <m.div
        className="my-10 flex-wrap justify-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
      >
        {contents.map((content) => (
          <MotionThumbnail
            content={content}
            key={content.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ))}
      </m.div>
    </section>
  );
}

export default ContentContainer;
