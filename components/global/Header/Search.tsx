import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

function Search() {
  const [searchQuery, setSearcQuery] = useState("");
  return (
    <section className="mx-5 my-5">
      <div className="mx-auto flex max-w-3xl items-center rounded-lg border-2 border-emerald-400 bg-transparent p-2">
        <SearchIcon className="mx-2 h-8 w-8 text-emerald-400" />
        <input
          type="text"
          className="w-full rounded-none border-0 border-l-2 border-emerald-400 bg-transparent focus:border-emerald-500 focus:ring-0"
          onChange={(event) => {
            setSearcQuery(event.target.value);
          }}
          value={searchQuery}
        />
        {searchQuery && (
          <XIcon
            className="h-8 w-8 cursor-pointer text-emerald-400"
            onClick={() => {
              setSearcQuery("");
            }}
          />
        )}
      </div>
    </section>
  );
}

export default Search;
