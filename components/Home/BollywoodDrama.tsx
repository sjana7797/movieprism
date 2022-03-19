import Image from "next/image";
import { ContentOverview } from "../../typing";
import { BASE_URL_IMAGE } from "../../utils/apiConfig";

function BollywoodDrama(props: { contents: ContentOverview[] }) {
  const { contents } = props;
  return (
    <div className="my-10 flex w-full grow snap-x snap-mandatory space-x-5 overflow-x-scroll px-5">
      {contents.map((content) => (
        <Content key={content.id} content={content} />
      ))}
    </div>
  );
}

function Content({ content }: { content: ContentOverview }) {
  const name = content.title || content.original_title;
  return (
    <div className="relative h-96 w-11/12 min-w-[92%] snap-center snap-always rounded-lg">
      <Image
        src={`${BASE_URL_IMAGE}${content.backdrop_path.slice(1)}`}
        alt={name}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}

export default BollywoodDrama;
