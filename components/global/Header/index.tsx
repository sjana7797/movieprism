import { useRouter } from "next/router";
import React from "react";
import { APP_NAME } from "../../../utils/appConfig";
import { headerItems } from "../../../utils/headerItems";
import HeaderItem from "./HeaderItem";

function Header() {
  const router = useRouter();
  return (
    <header className="my-5 flex h-auto flex-col items-center justify-between px-10 md:flex-row">
      <div className="mb-1 flex max-w-2xl grow justify-evenly">
        {headerItems.map((icon, index) => (
          <HeaderItem key={index} icon={icon} />
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
