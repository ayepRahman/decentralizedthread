import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getAddress } from "ethers";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        if (!credentials?.address) return null;
        if (Boolean(getAddress(credentials.address!))) {
          return null;
        }
        return {
          id: credentials.address,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      console.log("JWT", token);

      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      });

      if (dbUser) {
        token.id = dbUser.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.log("session", {
        session,
        token,
      });
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token?.picture;
      }

      return session;
    },
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
