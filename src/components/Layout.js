import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>Web Push Helper</title>
        <meta name="description" content="Web Push Helper" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="container mx-auto mt-5 px-4 mb-5">
        <Header />

        {children}
      </div>
    </>
  );
}
