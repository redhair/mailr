import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE || 'http://localhost:3000',
  debug: false,
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,

  events: {
    signIn: async (message) => {
      /* on successful sign in */
      console.log('SIGN IN: ', message);
      console.log('isNewUser: ', message.isNewUser);
      console.log(message.user.id);
    },
    signOut: async (message) => {
      /* on signout */
      console.log('SIGN OUT: ', message);
    },
    createUser: async (message) => {
      /* user created */
      console.log('USER CREATED: ', message);
      console.log('USER MONGO ID: ', message.id);

      //update user
      try {
        let res = await axios.post(`http://localhost:3000/api/users/${message.id}?action=createLink`);
        console.log('Link gen response: ', { res });
      } catch (err) {
        console.error('Link gen error: ', { err });
      }
    },
    linkAccount: async (message) => {
      /* account linked to a user */
      console.log('LINK ACCOUNT: ', message);
    },
    session: async (message) => {
      /* session is active */
      // console.log('ACTIVE SESSION: ', message);
    },
    error: async (message) => {
      /* error in authentication flow */
      console.log('AUTH ERROR: ', message);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
