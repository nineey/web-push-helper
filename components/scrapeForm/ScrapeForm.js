import { useState } from "react";
import axios from "axios";

export default function ScrapeForm({ url, setUrl, setTitle, setImageUrl }) {
  const [error, setError] = useState("");

  const scrapeHTML = async (url) => {
    try {
      const data = (await axios.get("/api/webScraper", { params: { url } }))
        .data;
      setTitle(data.title);
      setImageUrl(data.imageUrl);
      setError("");
      console.log(data);
    } catch (e) {
      setError("Invalid URL");
    }
  };

  console.log(url);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="URL (https://daydeal.ch/...)"
          className="w-1/2 border-2 border-green-600 p-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
      </div>
      <div className="mt-3">
        <button
          type="submit"
          onClick={() => {
            scrapeHTML(url);
          }}
          className="w-32 bg-green-600 hover:bg-green-500 rounded-md text-white font-bold"
        >
          Fetch!
        </button>
      </div>
      {error ? <div className="mt-3 text-red-500">{error}</div> : <div></div>}
    </>
  );
}
