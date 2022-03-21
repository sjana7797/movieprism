import { NextApiRequest, NextApiResponse } from "next";
import { bloggerAxios } from "../../../utils/custAxios";
import { getPostMetaData } from "../../../utils/getPostMetaData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const pageToken = req.query.pageToken;
    const posts = await bloggerAxios
      .get("posts", {
        params: {
          fetchBodies: false,
          fetchImages: true,
          pageToken,
          fields: `nextPageToken,items.title,items.labels,items.published,items.images,items.id,items.url`,
        },
      })
      .then((res) => res.data);

    for (let i = 0; i < posts.items.length; i++) {
      const search_description = await getPostMetaData(posts.items[i].url);
      posts.items[i].search_description = search_description;
    }
    res.status(200).json(posts);
  }
  if (req.method === "POST") {
    res.status(500).send("POST method not allowed");
  }
}
