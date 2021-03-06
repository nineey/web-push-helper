import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Scraper from "../components/Scraper";
import MessageBuilder from "../components/MessageBuilder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FullScreenSpinner from "../components/elements/Spinner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [dealUrl, setUrl] = useState("https://www.daydeal.ch/");
  const [title, setTitle] = useState("");
  const [daydealPrice, setDayDealPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSent, setDataSent] = useState({ status: false, data: {} });
  const [dealSubtitle, setDealSubtitle] = useState();

  useEffect(() => {
    if (status !== "loading") {
      if (!session) {
        router.push("/api/auth/signin");
      }
    }
  }, [router, session, status]);

  if (status === "loading") {
    return <FullScreenSpinner />;
  }

  if (status === "unauthenticated" || !session) {
    // return router.push("/api/auth/signin");
    return <FullScreenSpinner />;
  }

  return (
    <Layout title="Home: DayDeal Web Push">
      <h2 className="text-xl font-bold mb-2">Schritt 1: Deal-URL eingeben</h2>
      <Scraper
        {...{
          setTitle,
          setImageUrl,
          setDayDealPrice,
          setOriginalPrice,
          dataFetched,
          setDataFetched,
          setDataSent,
          dealUrl,
          setUrl,
          setDealSubtitle,
        }}
      />

      <hr className="mt-5 mb-5" />

      {dataFetched && !dataSent && (
        <>
          <h2 className="text-xl font-bold mb-2">
            Schritt 2: Prüfen und planen
          </h2>

          <MessageBuilder
            {...{
              dealUrl,
              title,
              setTitle,
              imageUrl,
              setImageUrl,
              daydealPrice,
              originalPrice,
              setDataSent,
              dealSubtitle,
            }}
          />
        </>
      )}

      {dataSent.status && dataFetched && (
        <div className="alert alert-success">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <label>
              Message created! Getback-ID: {dataSent.data.message_id}
            </label>
          </div>
        </div>
      )}

      {!dataFetched && !dataSent.status && (
        <div className="alert alert-warning">
          <div className="flex-1">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <label>No data available – please fetch first.</label>
          </div>
        </div>
      )}
    </Layout>
  );
}
