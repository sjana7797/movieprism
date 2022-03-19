import { ContentOverview } from "../../typing";
import Content from "../ui/Content";

function Contents({
  contents,
  title,
}: {
  contents: ContentOverview[];
  title: string;
}) {
  return (
    <section className="my-8 mx-5">
      <h2 className="text-xl">{title}</h2>
      <div className="flex w-full space-x-5 overflow-x-scroll p-5 scrollbar-hide">
        {contents.map((content) => (
          <Content content={content} key={content.id} />
        ))}
        {contents.length === 0 && <h2 className="text-xl">No {title}</h2>}
      </div>
    </section>
  );
}

export default Contents;
