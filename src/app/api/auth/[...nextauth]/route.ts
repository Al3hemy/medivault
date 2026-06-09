import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "doctor@hospital.ng" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        // Mock authentication for MVP Demo
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
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-demo',
})

export { handler as GET, handler as POST }
