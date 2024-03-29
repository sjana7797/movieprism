import { GetServerSideProps } from "next";
import Head from "next/head";
import Contents from "../../components/Home/Contents";
import { Person } from "../../typing";
import { ContentOverview } from "../../typing/content";
import { API_OPTION, BASE_URL_IMAGE } from "../../utils/apiConfig";
import { APP_NAME } from "../../utils/appConfig";
import { custAxios } from "../../utils/custAxios";
import { m } from "framer-motion";
import "lazysizes/plugins/blur-up/ls.blur-up";

type Credit = {
  character: string;
  title: string | null;
  original_title: string | null;
  id: number;
  poster_path: string | null;
  media_type: string;
  name: string | null;
};

function People({
  person,
  personCredits,
}: {
  person: Person;
  personCredits: ContentOverview[];
}) {
  let gender = "male";
  if (person.gender === 1) {
    gender = "female";
  } else if (person.gender === 0) {
    gender = "NA";
  }
  const blurData =
    gender === "male"
      ? "/img/user-picture-placeholder.png"
      : "/img/female-user-icon.jpg";
  const Data = ({ title, data }: { title: string; data: string }) => {
    return (
      <span className="block capitalize">
        {title} : <em className="text-slate-400">{data}</em>
      </span>
    );
  };
  return (
    <>
      <Head>
        <title>{`${person.name} | ${APP_NAME}`}</title>
      </Head>
      <m.article className="p-5" exit={{ opacity: 0 }}>
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center rounded-md border-2 border-slate-200 p-5">
          <img
            data-src={
              person.profile_path
                ? `${BASE_URL_IMAGE}${person.profile_path}`
                : blurData
            }
            width={234}
            height={352}
            className="bg-slate-100px lazyload min-h-[234px] min-w-[352px] rounded-lg object-cover object-center"
            alt={person.name}
            src={blurData}
          />
          <div className="p-2 text-center">
            <h1 className="text-2xl">{person.name}</h1>
            <p className="text-xl">
              <Data title="gender" data={gender} />
              <Data
                title="place of birth"
                data={person.place_of_birth || "NA"}
              />
              <Data title="birthday" data={person.birthday || "NA"} />
              {person.deathday && (
                <Data title="deathday" data={person.deathday} />
              )}
            </p>
          </div>
        </div>
        <div className="prose prose-invert my-10 mx-auto lg:prose-lg">
          <p>Known for {person.known_for_department}</p>
          <p>Popularity {person.popularity}</p>
          <p>{person.biography}</p>
        </div>
      </m.article>
      <aside>
        <Contents title={`${person.name}'s Credits`} contents={personCredits} />
      </aside>
    </>
  );
}

export default People;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { personId } = context.query;
  const person: Person = await custAxios
    .get(API_OPTION.PEOPLE, {
      params: { personId },
    })
    .then((res) => res.data);

  const personCredits = await custAxios
    .get(API_OPTION.CREDITS, {
      params: { personId },
    })
    .then((res) => {
      const data = res.data;
      const personCredits: Credit[] = data.cast.map((credit: Credit) => {
        return {
          character: credit.character,
          title: credit.title || null,
          original_title: credit.original_title || null,
          id: credit.id,
          poster_path: credit.poster_path,
          media_type: credit.media_type,
          name: credit.name || null,
        };
      });
      return personCredits;
    });

  return {
    props: { person, personCredits },
  };
};
