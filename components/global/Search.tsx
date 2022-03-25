import { SearchIcon } from "@heroicons/react/outline";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { useSearch } from "../../context/search";
import { useRouter } from "next/router";
import { Fragment } from "react";

function Search() {
  const {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    contents,
    setContents,
  } = useSearch();

  const router = useRouter();
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-emerald-400/[0.12] p-1 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            value={contents}
            as="div"
            onChange={() => {
              null;
            }}
            className="relative mx-auto max-w-4xl divide-y divide-slate-700 rounded-xl bg-slate-900 shadow-2xl shadow-black ring-1 ring-white/20"
          >
            <div className="flex h-16 items-center px-4">
              <SearchIcon className="h-8 w-8 text-slate-200" />
              <Combobox.Input
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
                value={searchQuery}
                className="w-full border-0 bg-transparent text-xl text-slate-200 placeholder:text-slate-400 focus:ring-0"
                placeholder="Search Content..."
              />
            </div>
            <Combobox.Options className="max-h-96 overflow-y-auto py-4 text-lg">
              {contents.map((content) => {
                return (
                  <Combobox.Option value={content.id} key={content.id}>
                    {({ active }) => {
                      const name =
                        content.name || content.original_title || content.title;
                      return (
                        <div
                          className={`cursor-pointer space-x-3 px-4 py-2 ${
                            active ? "bg-emerald-400/50" : "bg-transparent"
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                            setContents([]);
                            router.push(
                              content.media_type === "person"
                                ? `/person/${content.id}`
                                : `/content/${content.media_type}/${content.id}`
                            );
                          }}
                        >
                          <span className="font-medium text-slate-100">
                            {name}
                          </span>
                          <span className="italic text-slate-400">
                            {content.media_type}
                          </span>
                        </div>
                      );
                    }}
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default Search;
