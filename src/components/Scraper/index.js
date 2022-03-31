import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Scraper({
  setTitle,
  setImageUrl,
  setDayDealPrice,
  setOriginalPrice,
  setDataFetched,
  dataFetched,
  setDataSent,
  dealUrl,
  setUrl,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const scrapeHTML = useCallback(async (dealUrl) => {
    setLoading(true);
    try {
      const data = (await axios.get("/api/webScraper", { params: { dealUrl } }))
        .data;
      setTitle(data.title);
      setImageUrl(data.imageUrl);
      setDayDealPrice(data.daydealPrice);
      setOriginalPrice(data.originalPrice);
      setError("");
      setDataFetched(true);
      setDataSent(false);
    } catch (e) {
      setError("Invalid URL or past deal");
      setDataFetched(false);
    }
    setLoading(false);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    scrapeHTML(dealUrl);
  }

  useEffect(() => {
    setUrl(`https://www.daydeal.ch/${slug}`);
  }, [slug]);

  return (
    <>
      <div className="mt-3">
        <form onSubmit={onSubmit}>
          <label className="input-group input-group-md font-semibold">
            <span>https://daydeal.ch/</span>
            <input
              type="text"
              placeholder="slug to deal (OG tags must be set)"
              className="input input-bordered w-full md:w-96 font-semibold"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            ></input>
          </label>
          <div className="flex mt-3 items-center">
            {loading ? (
              <StyledButton className="btn loading"></StyledButton>
            ) : (
              <StyledButton type="submit" className="btn">
                {dataFetched ? "Fetch again" : "Fetch!"}
              </StyledButton>
            )}

            {error && (
              <div className="alert alert-error w-68 ml-3 h-12">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mx-2 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    ></path>
                  </svg>
                  <label>{error}</label>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

const StyledButton = styled.button`
  width: 11.4em;
`;
