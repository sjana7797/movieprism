import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).json({ hello: "hello" });
  }
  if (req.method === "POST") {
    res.status(500).send("POST method not allowed");
  }
}
