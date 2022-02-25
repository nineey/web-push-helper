import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

// import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, session, pageProps }) {
  return (
    <>
      <SessionProvider session={session}>
        {/* <ChakraProvider> */}
        <Component {...pageProps} />
        {/* </ChakraProvider> */}
      </SessionProvider>
    </>
  );
}

export default MyApp;
