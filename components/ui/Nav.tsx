import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  // ${
  //           query.genre === key && "text-green-500 hover:text-green-500"
  //         }
  return (
    <nav className="relative my-10">
      <div className="flex space-x-10 overflow-x-scroll whitespace-nowrap px-10 py-3 text-2xl scrollbar-hide sm:space-x-20 sm:px-20">
        <h2
          // key={key}
          // onClick={() => router.push(`/?genre=${key}`)}
          className={`transform cursor-pointer uppercase italic tracking-wide transition-transform duration-100 last:pr-24 hover:scale-125 hover:text-white active:text-green-500`}
        >
          hhjp
        </h2>
      </div>
    </nav>
  );
}

export default Nav;
