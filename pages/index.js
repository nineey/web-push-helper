import Layout from "../components/Layout";
import { useState } from "react";
import ScrapeForm from "../components/scrapeForm/ScrapeForm";
import MessageFields from "../components/editForm/MessageFields";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return router.push("/api/auth/signin");
  }

  return (
    <Layout title="Home: DayDeal Web Push">
      <h2 className="text-xl font-bold mb-2">Enter a deal link:</h2>
      <ScrapeForm
        url={url}
        setUrl={setUrl}
        setTitle={setTitle}
        setImageUrl={setImageUrl}
      />

      <hr className="mt-5 mb-5" />
      <h2 className="text-xl font-bold mb-2">Data for notification</h2>

      {title || imageUrl ? (
        <MessageFields
          title={title}
          setTitle={setTitle}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      ) : (
        <div>Please fetch first.</div>
      )}
    </Layout>
  );
}
