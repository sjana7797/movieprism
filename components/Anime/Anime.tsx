import Link from "next/link";
import { AnimePoster } from "../../typing/anime";
import "lazysizes";

function Anime({ anime }: { anime: AnimePoster }) {
  return (
    <Link href={`/content/anime/${anime.id}`} passHref>
      <div className="group my-2 flex cursor-pointer flex-col overflow-hidden transition-transform duration-300 sm:hover:scale-105">
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <img
            data-src={anime.bannerImage}
            title={
              anime.title.english ||
              anime.title.native ||
              anime.title.userPreferred
            }
            className="lazyload h-60 w-full object-cover"
            alt={
              anime.title.english ||
              anime.title.native ||
              anime.title.userPreferred
            }
            loading="lazy"
            width={1920}
            height={1080}
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
            <img
              data-src={anime.coverImage.extraLarge}
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
        <p
          className="truncate line-clamp-1"
          dangerouslySetInnerHTML={{ __html: anime.description }}
        ></p>
      </div>
    </Link>
  );
}

export default Anime;
