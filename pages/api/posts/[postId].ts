import { NextApiRequest, NextApiResponse } from "next";
import { bloggerAxios } from "../../../utils/custAxios";
import { getPostMetaData } from "../../../utils/getPostMetaData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { postId } = req.query;

    const post = await bloggerAxios
      .get(`posts/${postId}`, {
        params: {
          fetchImages: true,
          fields: `title,labels,published,images,content,status,url`,
        },
      })
      .then((res) => res.data);
    const search_description = await getPostMetaData(post.url);
    res.status(200).json({ ...post, search_description });
  }
  if (req.method === "POST") {
    res.status(500).send("POST method not allowed");
  }
}
