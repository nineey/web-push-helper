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
      const { title, description, imageUrl, isDraft, sendDate, dealType } =
        req.body;
      const date = new Date(sendDate);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const send_at = `${year}-${month}-${day} ${hours}:${minutes}`;
      const template_id =
        dealType === "special"
          ? process.env.GETBACK_TEMPLATE_ID_SPECIALS
          : process.env.GETBACK_TEMPLATE_ID_DAILY_WEEKLY;

      // prepare body
      const body = {
        is_draft: isDraft === "true" ? true : false,
        template_id: template_id,
        send_at: send_at,
        lang: {
          de: {
            title: title,
            body: description,
            image: imageUrl,
            link: "https://daydeal.ch",
            action_buttons: [
              { text: "Jetzt bestellen", link: "https://daydeal.ch" },
            ],
          },
        },
      };

      //testing
      res.status(200).json({ message_id: 123456789 });

      // !!! only uncomment this when you want to trigger real messages !!!
      // try {
      //   const data = (
      //     await axios.post("https://api.getback.ch/v1/push/message", body, {
      //       headers: {
      //         Authorization: process.env.GETBACK_API_KEY,
      //         "Content-Type": "application/json",
      //       },
      //     })
      //   ).data;
      //   console.log(data);
      //   res.status(200).json(data);
      // } catch {
      //   res.status(500).send("Getback API error");
      // }
    }
  } else {
    res.status(401).json("No access!");
  }
}
