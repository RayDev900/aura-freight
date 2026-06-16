import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',      type: 'email'    },
        password: { label: 'Contraseña', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.usuario.findUnique({
          where: { email: credentials.email },
          include: {
            roles: {
              include: { rol: true }
            }
          }
        })

        if (!user) return null

        const passwordOk = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordOk) return null

        const rolNombre = user.roles[0]?.rol.nombre ?? 'CLIENT'

        return {
          id:    String(user.id),
          email: user.email,
          name:  user.nombre,
          role:  rolNombre,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id   = token.sub ?? ''
      }
      return session
    },
  },

  session: { strategy: 'jwt' },
  pages:   { signIn: '/login' },
})

export { handler as GET, handler as POST }