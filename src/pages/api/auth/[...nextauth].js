import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // TODO: Integrate with backend API for authentication
        // Example: fetch('/api/v1/auth/login', { ... })
        if (credentials.email === 'demo@demo.com' && credentials.password === 'password') {
          return { id: 1, name: 'Demo User', email: 'demo@demo.com' };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
}); 