import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from '../components/ModalProvider';

import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import DashboardInterface from '../components/DashboardInterface';
import ClientInterface from '../components/ClientInterface';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { UserProvider } from '../components/UserProvider';
import { setOptions, getSession, Provider, useSession, signin, signout } from 'next-auth/client';

import theme from '../theme';
import '../styles.css';
import 'react-responsive-modal/styles.css';

const isProduction = process.env.NODE_ENV === 'production';

export default function Client({ Component, pageProps, router }) {
  // async componentDidMount() {
  //   console.log("in app");
  //   // if (isProduction) {
  //   //   LogRocket.init('5oien4/afito', {
  //   //     rootHostname: 'afito.com',
  //   //     network: {
  //   //       requestSanitizer: (request) => {
  //   //         if (request.url.toLowerCase().indexOf('signup') !== -1) {
  //   //           request.body = null;
  //   //         }
  //   //         return request;
  //   //       },
  //   //     },
  //   //   });
  //   //   setupLogRocketReact(LogRocket);
  //   //   ReactGA.initialize('UA-128555364-1');
  //   //   console.log('GA Page View: ', window.location.pathname + window.location.search);
  //   //   ReactGA.pageview(window.location.pathname + window.location.search);
  //   //   ReactPixel.init('244549500250047', {}, { debug: true });
  //   //   ReactPixel.pageView();
  //   // }
  // }
  const [session, loading] = useSession();

  const nav = [
    // {
    //   name: 'Dashboard',
    //   href: '/dashboard',
    //   icon: <i className="fas fa-graph"></i>,
    // },
    {
      name: 'Subscribers',
      href: '/dashboard/subscribers',
      icon: <i className="fas fa-users"></i>,
    },
    // {
    //   name: 'Settings',
    //   href: '/dashboard/settings',
    //   icon: <i className="fas fa-cog"></i>,
    // },
  ];
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <>
            <Header
              user={session ? session.user : null}
              nav={nav}
              isFixed={true}
              signIn={signin}
              loading={loading}
              signOut={async () => {
                await signout();
                router.push('/');
              }}
            />

            {router.pathname.startsWith('/dashboard') ? (
              <DashboardInterface loading={loading} session={session}>
                <Component {...pageProps} />
              </DashboardInterface>
            ) : (
              <ClientInterface>
                <Component {...pageProps} />
              </ClientInterface>
            )}
          </>
        </ModalProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
