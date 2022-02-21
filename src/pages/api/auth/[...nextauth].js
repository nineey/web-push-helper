import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
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
          credentials.username.toLowerCase() ===
            process.env.CREDENTIALS_USERNAME.toLowerCase() &&
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
  theme: {
    colorScheme: "light",
  },
});
