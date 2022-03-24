import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContentOverview, Search } from "../typing/content";
import { custAxios } from "../utils/custAxios";

const isOpen = false;
const searchQuery = "";
const contents: Search[] = [];
const setIsOpen: Dispatch<SetStateAction<boolean>> = () => {
  null;
};
const setSearchQuery: Dispatch<SetStateAction<string>> = () => {
  null;
};
const setContents: Dispatch<SetStateAction<Search[]>> = () => {
  null;
};

const SearchContext = createContext({
  isOpen,
  setIsOpen,
  searchQuery,
  setSearchQuery,
  contents,
  setContents,
});

const SearchProvider = ({ children }: { children: ReactElement }) => {
  const [contents, setContents] = useState<Search[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getSearchData = async () => {
      if (searchQuery) {
        const searchContents = await custAxios
          .get("/search/multi", {
            params: { query: searchQuery.toLowerCase() },
          })
          .then((res) => {
            const data: Search[] = res.data.results.map(
              (search: ContentOverview) => {
                return {
                  id: search.id,
                  media_type: search.media_type,
                  original_title: search.original_title || null,
                  title: search.title || null,
                  name: search.name,
                };
              }
            );
            return data;
          });
        setContents(searchContents);
      }
    };

    getSearchData();
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        setIsOpen,
        searchQuery,
        setSearchQuery,
        contents,
        setContents,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
