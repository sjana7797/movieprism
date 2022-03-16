import { GetServerSideProps } from "next";
import Image from "next/image";
import { Provider } from "../../../typing";
import { BASE_URL_IMAGE } from "../../../utils/apiConfig";
import { custAxios } from "../../../utils/custAxios";

function Providers(props: { providers: Provider[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 px-5  md:grid-cols-2 lg:grid-cols-3">
      {props.providers.map((provider) => {
        const logo = `${BASE_URL_IMAGE}${provider.logo_path.slice(1)}`;
        return (
          <div
            key={provider.provider_id}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-slate-900 bg-slate-700 p-2 transition-colors duration-300 hover:bg-slate-900"
          >
            <Image
              src={logo}
              alt={provider.provider_name}
              width={100}
              height={100}
              className="transform rounded-md transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-center">{provider.provider_name}</p>
          </div>
        );
      })}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers: Provider[] = await custAxios
    .get("/watch/providers/tv")
    .then((res) => res.data.results);
  return { props: { providers } };
};

export default Providers;
