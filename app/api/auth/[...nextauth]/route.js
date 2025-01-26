import NextAuth from "@node_modules/next-auth";
import GoogleProvider from "@node_modules/next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          // Generate a valid username
          let normalizedUsername = profile.name
            .replace(/[^a-zA-Z0-9]/g, " ") // Hapus karakter non-alphanumeric
            .toLowerCase();

          // Tambahkan angka acak jika username terlalu pendek
          if (normalizedUsername.length < 8) {
            normalizedUsername = `${normalizedUsername}${Math.random().toString(36).substring(2, 10)}`;
          }

          await User.create({
            email: profile.email,
            username: normalizedUsername,
            image: profile.picture, 
          });
        }
        return true;
      } catch (error) {
        console.log("Error during sign-in:", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
