import fetchMetaData from "meta-fetcher";

const getPostMetaData = async (url: string) => {
  const search_description = await fetchMetaData(url);
  return search_description.metadata.description;
};

export { getPostMetaData };
