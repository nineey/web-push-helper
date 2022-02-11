import axios from "axios";
import { parse } from "node-html-parser";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const { url } = req.query;

    const isValidUrl = (url) => {
      try {
        new URL(url);
      } catch (e) {
        return false;
      }
      return true;
    };

    if (!isValidUrl(url)) {
      console.error("Invalid URL");
    }

    const sourcecode = (await axios.get(url)).data;
    const root = parse(sourcecode);

    const daydealPrice = root.querySelector(
      ".product-pricing__prices-new-price"
    ).textContent;
    const originalPrice = root.querySelector(
      ".product-pricing__prices-old-price .js-old-price"
    ).textContent;
    const dealTitle = root
      .querySelector("[property~=og:description][content]")
      .getAttribute("content");
    const imageUrl = root
      .querySelector("[property~=og:image][content]")
      .getAttribute("content");

    console.log(daydealPrice, originalPrice, dealTitle, imageUrl);

    const finalRes = {
      title: dealTitle,
      daydealPrice: daydealPrice,
      originalPrice: originalPrice,
      imageUrl: imageUrl,
    };

    res.status(200).json(finalRes);
  } else {
    res.status(401).json("No access!");
  }
}
