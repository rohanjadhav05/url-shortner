// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/service/mongodb";
let hashMap = new Map();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const client = await clientPromise;
  const db = client.db("url_shortner");
  switch(req.method){
   case "POST" :
      const url = req.body;
      const uuid = Math.random().toString(32).slice(5);
      const url_short = `http://rohanDev.com/${uuid}`
      let savedUrl = await db.collection("url").insertOne({"short_url" : url_short, "long_url" : url})
      res.status(200).json({name : url_short});
      break;
    case "GET" :
      const filter = { "short_url": req.body };
      const allPosts = await db.collection("url").find({}).toArray();
      res.json(allPosts);
      //res.redirect(allPosts[0]);
      break;
  }
}
