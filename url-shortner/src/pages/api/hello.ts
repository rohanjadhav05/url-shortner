// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import  { Url, getDatabaseConnection, connectToDatabase } from  "@/service/mongodb";
export const maxDuration = 25;
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const db = await connectToDatabase();
  switch(req.method){
   case "POST" :
      const url = req.body;
      const uuid = Math.random().toString(32).slice(5);
      const url_short = `http://rohanDev.com/${uuid}`
      const newUrl = new Url({ short_url: url_short , long_url: url})
      console.log("trying to save to database");
      newUrl.save();
      console.log("saved");
      console.log(newUrl);
      res.status(200).json({name : url_short});
      break;
    case "GET" :
      console.log("inside GET "+req.query.surl);
      const longUrl = await Url.findOne({short_url : req.query.surl})
      console.log(longUrl);
      if(longUrl)
      {
        res.status(200).json({name : longUrl.long_url});
      }
      res.json({name : "no data found"}) 
      break;
  }
}
