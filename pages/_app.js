import App from 'next/app';
import React from 'react';
import styled from 'styled-components';
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

// import theme from '../theme';
import theme from '../theme_dark';
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

  console.log({ session });

  const Root = styled.div`
    background: ${(props) => props.theme.backgroundBodyColor};
  `;

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <Root>
            {!pageProps.hideHeader && (
              <Header
                user={session ? session.user : null}
                isFixed={false}
                signIn={signin}
                loading={loading}
                signOut={async () => {
                  await signout();
                  router.push('/');
                }}
              />
            )}

            {router.pathname.startsWith('/dashboard') ? (
              <DashboardInterface loading={loading} session={session}>
                <Component {...pageProps} />
              </DashboardInterface>
            ) : (
              <ClientInterface>
                <Component {...pageProps} />
              </ClientInterface>
            )}
          </Root>
        </ModalProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
