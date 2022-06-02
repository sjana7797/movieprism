import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Header from "../components/global/Header";
import { APP_NAME } from "../utils/appConfig";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { SearchProvider, useSearch } from "../context/search";
import dynamic from "next/dynamic";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

// import "lazysizes/plugins/native-loading/ls.native-loading";

// lazySizes.cfg.nativeLoading = {
//   setLoadingAttribute: true,
//   disableListeners: {
//     scroll: true,
//   },
// };

const loadFeatures = () => import("../utils/domMax").then((mod) => mod.DomMax);
const DynamicSearch = dynamic(() => import("../components/global/Search"));
const DynamicTopLoadingBar = dynamic(
  () => import("../components/global/TopLoadingBar")
);

function Layout(props: { children: ReactElement }) {
  const { isOpen } = useSearch();
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  }, []);
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);
  return (
    <AnimatePresence exitBeforeEnter>
      <SearchProvider>
        <>
          <Head>
            <title>{APP_NAME}</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <DynamicSearch />
          <Header />
          {isAnimating && <DynamicTopLoadingBar isAnimating={isAnimating} />}
          <LazyMotion features={loadFeatures} strict>
            <m.main
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              className="min-h-screen"
            >
              {props.children}
            </m.main>
          </LazyMotion>
        </>
      </SearchProvider>
    </AnimatePresence>
  );
}

export default Layout;
