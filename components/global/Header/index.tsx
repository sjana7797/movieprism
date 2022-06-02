import { useRouter } from "next/router";
import { BiSearchAlt } from "react-icons/bi";
import { useSearch } from "../../../context/search";
import { APP_NAME } from "../../../utils/appConfig";
import { headerItems } from "../../../utils/headerItems";
import HeaderItem from "./HeaderItem";

function Header() {
  const router = useRouter();
  const { setIsOpen, isOpen } = useSearch();

  return (
    <>
      <header className="my-5 flex h-auto flex-col items-center justify-between px-10 lg:flex-row">
        <div className="mb-1 flex max-w-2xl grow justify-evenly">
          {headerItems.map((icon, index) => (
            <HeaderItem key={index} icon={icon} />
          ))}
          <div
            className="group flex w-12 cursor-pointer flex-col items-center font-bold text-slate-100 transition-colors duration-300 hover:text-emerald-400 sm:w-20"
            onClick={() => {
              console.log(true, isOpen);
              setIsOpen(true);
              console.log(false, isOpen);
            }}
          >
            <BiSearchAlt className="mb-1 h-8 w-8 group-hover:animate-bounce" />
            <p className="whitespace-nowrap text-lg font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100">
              search
            </p>
          </div>
        </div>
        <h1
          className="mx-auto cursor-pointer self-start text-3xl font-bold uppercase tracking-wider lg:mx-0"
          onClick={() => {
            router.push("/");
          }}
        >
          {APP_NAME}
        </h1>
      </header>
    </>
  );
}

export default Header;
