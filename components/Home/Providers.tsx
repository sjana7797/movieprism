import Image from "next/image";
import Link from "next/link";
import { providers } from "../../utils/providersItems";
import { m } from "framer-motion";
function Providers() {
  return (
    <div className="mx-5">
      <h2 className="text-xl">Providers</h2>
      <div className="flex space-x-5 overflow-x-scroll p-5 scrollbar-hide">
        {providers.map((provider) => (
          <Link key={provider.key} href={provider.link} passHref>
            <m.div
              className="group relative h-auto min-h-[180px] min-w-[320px] cursor-pointer overflow-hidden rounded-md border-2 border-transparent transition-colors duration-300 hover:border-slate-300"
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={provider.img}
                alt={provider.title}
                className="rounded-md bg-slate-200 transition-transform duration-300 group-hover:scale-110"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </m.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Providers;
