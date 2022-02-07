import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

export default function ScrapeForm({ slug, setSlug, setTitle, setImageUrl }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://daydeal.ch/");

  const scrapeHTML = async (url) => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    setUrl(`https://daydeal.ch/${slug}`);
  }, [slug]);

  return (
    <>
      <span class="text-lg mr-3">https://daydeal.ch/</span>
      <input
        type="text"
        placeholder="slug to deal"
        className="input input-bordered w-96 text-lg font-semibold"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      ></input>

      <div className="mt-3 flex flew-row items-center">
        {loading ? (
          <button class="btn loading w-36"></button>
        ) : (
          <button
            onClick={() => {
              scrapeHTML(url);
            }}
            class="btn btn-active w-36"
            role="button"
            aria-pressed="true"
          >
            Fetch!
          </button>
        )}
        {error && (
          <div class="alert alert-error w-48 ml-3">
            <div class="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
              <label>{error}</label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
