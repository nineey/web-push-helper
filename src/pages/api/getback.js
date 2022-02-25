import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const { messageId } = req.body;
      const data = (
        await axios.get(`https://api.getback.ch/v1/push/message/${messageId}`, {
          headers: {
            Authorization: process.env.GETBACK_API_KEY,
            "Content-Type": "application/json",
          },
        })
      ).data;
      res.status(200).json(data);
    }

    if (req.method === "POST") {
      const {
        title,
        description,
        imageUrl,
        isDraft,
        sendDate,
        dealUrl,
        dealType,
      } = req.body;

      const date = new Date(sendDate);
      const send_at = formatInTimeZone(
        date,
        "Europe/Zurich",
        "yyyy-MM-dd HH:mm"
      );

      // const year = date.getFullYear();
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const hours = String(date.getHours()).padStart(2, "0");
      // const minutes = String(date.getMinutes()).padStart(2, "0");
      // const send_at = `${year}-${month}-${day} ${hours}:${minutes}`;

      const template_id =
        dealType === "special"
          ? process.env.GETBACK_TEMPLATE_ID_SPECIALS
          : process.env.GETBACK_TEMPLATE_ID_DAILY_WEEKLY;

      const ttl =
        dealType === "daily"
          ? process.env.NEXT_PUBLIC_TTL_MINUTES_DAILY
          : dealType === "weekly"
          ? process.env.NEXT_PUBLIC_TTL_MINUTES_WEEKLY
          : process.env.NEXT_PUBLIC_TTL_MINUTES_SPECIAL;

      const autohide =
        dealType === "daily"
          ? process.env.NEXT_PUBLIC_AUTOHIDE_DAILY
          : dealType === "weekly"
          ? process.env.NEXT_PUBLIC_AUTOHIDE_WEEKLY
          : process.env.NEXT_PUBLIC_AUTOHIDE_SPECIAL;

      // prepare body
      const body = {
        is_draft: isDraft === "true" ? true : false,
        template_id: template_id,
        ttl: Number(ttl),
        autohide: Number(autohide),
        send_at: String(send_at),
        lang: {
          de: {
            title: title,
            body: description,
            image: imageUrl,
            link: dealUrl,
            action_buttons: [{ text: "Jetzt bestellen", link: dealUrl }],
          },
        },
      };

      // console.log(body);

      //testing
      // res.status(200).json({ message_id: 123456789 });

      // !!! only uncomment this when you want to trigger real messages !!!
      try {
        const data = (
          await axios.post("https://api.getback.ch/v1/push/message", body, {
            headers: {
              Authorization: process.env.GETBACK_API_KEY,
              "Content-Type": "application/json",
            },
          })
        ).data;
        console.log(data);
        res.status(200).json(data);
      } catch {
        res.status(500).send("Getback API error");
      }
    }
  } else {
    res.status(401).json("No access!");
  }
}
