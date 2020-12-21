import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { sendVerificationRequest } from '../../../templates/emailVerification';

const emailHost = 'smtp.sendgrid.net';
const emailUsername = 'apikey'; // <- don't replace "apikey" it's the actual username
const emailPassword = process.env.SENDGRID_API_KEY;

const options = {
  debug: true,
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: `smtp://${emailUsername}:${emailPassword}@${emailHost}:587`,
      from: 'support@mailr.link',
      sendVerificationRequest: sendVerificationRequest,
    }),
  ],
  database: process.env.DATABASE_URL,
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/verify-request', // (used for check email message)
    newUser: '/dashboard/subscribers?showLink=true', // If set, new users will be directed here on first sign in
  },
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
        let res = await axios.post(`${process.env.NEXTAUTH_URL}/api/users/${message.id}?action=createLink`);
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
