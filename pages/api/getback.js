// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const data = (
        await axios.get("https://api.getback.ch/v1/push/message/73423", {
          headers: {
            Authorization: process.env.GETBACK_API_KEY,
            "Content-Type": "application/json",
          },
        })
      ).data;
      console.log(data);
      res.status(200).json("haha!");
    }

    if (req.method === "POST") {
      const { title, imageUrl, isDraft } = req.body;

      // prepare body
      const body = {
        is_draft: isDraft === "true" ? true : false,
        template_id: "mpuxJ",
        send_at: "2022-02-04 16:35",
        lang: {
          de: {
            title: title,
            body: "Testbody nne",
            image: imageUrl,
          },
        },
      };

      res.status(200).json(body);

      // const data = (
      //   await axios.post("https://api.getback.ch/v1/push/message", body, {
      //     headers: {
      //       Authorization: process.env.GETBACK_API_KEY,
      //       "Content-Type": "application/json",
      //     },
      //   })
      // ).data;
      // console.log(data);
      // res.status(200).json(data);
    }
  } else {
    res.status(401).json("No access!");
  }
}
