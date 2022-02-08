import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>DayDeal Web Push</title>
        <meta name="description" content="description" />
      </Head>

      <div className="container mx-auto mt-5 px-4 mb-5">
        <Header />

        {children}
      </div>
    </>
  );
}
