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
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        // database look up
        if (
          credentials.username === process.env.CREDENTIALS_USERNAME &&
          credentials.password === process.env.CREDENTIALS_PASSWORD
        ) {
          return {
            name: credentials.username,
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.CREDENTIALS_SECRET,
  jwt: {
    secret: process.env.CREDENTIALS_SECRET,
    encryption: true,
  },
});
