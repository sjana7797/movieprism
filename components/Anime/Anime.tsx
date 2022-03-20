import Image from "next/image";
import Link from "next/link";
import { AnimePoster } from "../../typing";

function Anime({ anime }: { anime: AnimePoster }) {
  return (
    <Link href={`/content/anime/${anime.id}`} passHref>
      <div className="group my-2 flex cursor-pointer flex-col overflow-hidden transition-transform duration-300 sm:hover:scale-105">
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={anime.bannerImage}
            title={
              anime.title.english ||
              anime.title.native ||
              anime.title.userPreferred
            }
            className="object-cover"
            alt={
              anime.title.english ||
              anime.title.native ||
              anime.title.userPreferred
            }
            width={1920}
            height={1080}
            layout="responsive"
          />
          <div
            className={`absolute top-0 left-0 h-full w-full p-1 opacity-0 backdrop-blur transition-opacity delay-200 duration-300 group-hover:opacity-100`}
            style={{
              backgroundColor:
                anime.coverImage.color &&
                `${anime.coverImage.color.slice(
                  0,
                  1
                )}${anime.coverImage.color.slice(1)}8c`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={anime.coverImage.extraLarge}
              alt={
                anime.title.english ||
                anime.title.native ||
                anime.title.userPreferred
              }
              className="mx-auto h-full w-auto rounded-md border object-contain shadow-md"
            />
          </div>
        </div>

        <h2 className="my-2 truncate text-lg font-bold tracking-wider">
          {anime.title.english ||
            anime.title.native ||
            anime.title.userPreferred}
        </h2>
        <p className="truncate">{anime.description}</p>
      </div>
    </Link>
  );
}

export default Anime;
