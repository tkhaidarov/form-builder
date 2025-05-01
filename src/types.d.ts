import NextAuth, { type DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Account {}

  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}
