import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { APP_NAME } from "../../utils/appConfig";
import { headerItems } from "../../utils/headerItems";

function Header() {
  const router = useRouter();
  return (
    <header className="my-5 flex h-auto flex-col items-center justify-between px-10 sm:flex-row">
      <div className="mb-1 flex max-w-2xl grow justify-evenly">
        {headerItems.map((icon, index) => (
          <Link href={icon.link} key={index} passHref>
            <div className="group flex w-12 cursor-pointer flex-col items-center transition-colors duration-300 hover:text-emerald-400 sm:w-20">
              <icon.Icon className="mb-1 w-8 group-hover:animate-bounce" />
              <p className="whitespace-nowrap text-lg font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100">
                {icon.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <h1
        className="cursor-pointer text-2xl font-bold uppercase tracking-wider"
        onClick={() => {
          router.push("/");
        }}
      >
        {APP_NAME}
      </h1>
    </header>
  );
}

export default Header;
