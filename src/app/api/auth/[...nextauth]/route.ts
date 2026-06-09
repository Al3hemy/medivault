import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "doctor@medivault.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.passwordHash) {
          // Keep mock auth working as a fallback for the MVP demo if no user exists in DB
          if (credentials?.email === "patient@medivault.com" && credentials.password === "password") {
            return { id: "1", name: "Adaeze Okafor", email: "patient@medivault.com", role: "PATIENT" }
          }
          if (credentials?.email === "doctor@medivault.com" && credentials.password === "password") {
            return { id: "2", name: "Dr. Ibrahim", email: "doctor@medivault.com", role: "CLINICIAN" }
          }
          if (credentials?.email === "admin@medivault.com" && credentials.password === "password") {
            return { id: "3", name: "Admin Dashboard", email: "admin@medivault.com", role: "ADMIN" }
          }
          if (credentials?.email === "lab@medivault.com" && credentials.password === "password") {
            return { id: "4", name: "Central Lab", email: "lab@medivault.com", role: "LAB" }
          }
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-demo',
})

export { handler as GET, handler as POST }
