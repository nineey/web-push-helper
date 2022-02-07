import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  //   providers: [
  //     GithubProvider({
  //       clientId: process.env.GITHUB_ID,
  //       clientSecret: process.env.GITHUB_SECRET,
  //     }),
  //   ],
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === process.env.CREDENTIALS_USERNAME &&
          credentials.password === process.env.CREDENTIALS_PASSWORD
        ) {
          return {
            id: 1,
            name: credentials.username,
          };
        } else {
          // login failed
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   jwt: async ({ token, user }) => {
  //     // first time jwt callback is run, user object is available
  //     if (user) {
  //       token.id = user.id;
  //     }

  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     if (token) {
  //       session.user.id = token.id;
  //     }

  //     return session;
  //   },
  // },
  secret: process.env.CREDENTIALS_SECRET,
  jwt: {
    secret: process.env.CREDENTIALS_SECRET,
    encryption: true,
  },
  theme: {
    colorScheme: "light",
    logo: "", // Absolute URL to image
  },
});
