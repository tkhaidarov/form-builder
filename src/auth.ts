import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { validationLoginSchema } from '@/definitions/schemas';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const validatedCredentials = validationLoginSchema.parse(credentials);
        if (!validatedCredentials.email || !validatedCredentials.password) {
          return null;
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: validatedCredentials.email },
        });
        if (!existingUser || !existingUser.password) {
          return null;
        }
        const passwordMatch = await compare(validatedCredentials.password, existingUser.password);
        if (!passwordMatch) {
          return null;
        }
        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
