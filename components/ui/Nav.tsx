import { useRouter } from "next/router";

function Nav({ navs }: { navs: { title: string; link: string }[] }) {
  const router = useRouter();

  return (
    <nav className="relative my-10">
      <div className="flex space-x-10 overflow-x-scroll whitespace-nowrap px-10 py-3 text-2xl scrollbar-hide sm:space-x-20 sm:px-20">
        {navs.map((nav, index) => (
          <h2
            key={index}
            onClick={() => router.push(nav.link)}
            className={`transform cursor-pointer font-medium uppercase italic tracking-wider transition-transform duration-100 last:pr-24 hover:scale-125 hover:text-white active:text-green-500 ${
              (router.query.media ||
                router.query.key?.toString().replaceAll("_", " ")) ===
                nav.title && "text-green-400 hover:text-green-400"
            }`}
          >
            {nav.title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-slate-800" />
    </nav>
  );
}

export default Nav;
