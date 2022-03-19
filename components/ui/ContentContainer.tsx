import { ContentOverview } from "../../typing";
import Thumbnail from "./Thumbnail";

function ContentContainer({
  contents,
  title,
}: {
  contents: ContentOverview[];
  title: string;
}) {
  return (
    <section className="mx-5 my-10 rounded-md border border-slate-600 bg-slate-700 p-5 shadow-md">
      <h1 className="text-2xl font-bold capitalize italic tracking-wider">
        {title}
      </h1>
      <div className="my-10 flex-wrap justify-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex">
        {contents.map((content) => (
          <Thumbnail content={content} key={content.id} />
        ))}
      </div>
    </section>
  );
}

export default ContentContainer;
