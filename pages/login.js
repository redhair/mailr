import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { providers, signIn } from 'next-auth/client';
import Button from '../components/Button';
import { Container, Row, Column } from '../components/Grid';
import { Heading, Text } from '../components/Typography';
import Input from '../components/InputField';
import LoadingBlock from '../components/LoadingBlock';
import { Formik, Form, Field } from 'formik';
import Cookies from 'js-cookie';

import * as Yup from 'yup';
import axios from 'axios';

const Divider = styled(Row)`
  border: 0;
  /* width: 100%; */
  padding: 20px 0;

  &::before,
  &::after {
    content: '';
    height: 1px;
    border-bottom: 1px solid #bbbcdd;
    top: 0;
    width: 100%;
  }

  &::before {
    margin-left: -30px;
    margin-right: 25px;
  }

  &::after {
    margin-right: -30px;
    margin-left: 25px;
  }
`;

const Wrapper = styled(Container)`
  & button {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    width: auto;
    margin: 50px auto 100px auto;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    width: 100%;
    margin: 100px auto 130px auto;
  }
`;

const FormWrapper = styled(Form)`
  /* width: 100%; */

  & button {
    width: 100%;
  }

  & .error-message {
    padding-left: 5px;
    margin: 0;

    color: ${(props) => props.theme.dangerColor};
    font-size: 14px;
    font-weight: 700;
    font-family: ${(props) => props.theme.bodyFont};
    width: 100%;
    text-align: left;

    &::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: '\f06a'+ ' ';
    }
  }
`;

const LinkInputContainer = styled.div`
  display: flex;
  margin: 6px 0;
  border: ${(props) => `1px solid ${props.theme.primaryColor}`};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  padding: 0 6px 0 16px;

  & span {
    font-size: 16px !important;
  }

  & input {
    border: 0 !important;
    font-family: ${(props) => props.theme.bodyFont};
    font-size: 16px;
    outline: 0;
    background: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};

    @media (min-width: ${(props) => props.theme.xs}) {
      max-width: 120px;
    }

    @media (min-width: 360px) {
      max-width: 100%;
    }
  }

  & button {
    margin: 4px 0;
    width: 49px !important;
    padding: 14px 0;

    /* height: 50px; */
  }
`;

const SocialButton = styled(Button)`
  color: ${(props) => props.theme.textColor};
`;

const EmailSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

const LinkSchema = Yup.object().shape({
  link: Yup.string()
    .test('checkDuplLink', 'That link is already taken!', function (value) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/users?action=checkLink', { link: value })
          .then((res) => {
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            resolve(false);
          });
      });
    })
    .required('Required'),
});

export default function Login({ providers, baseUrl }) {
  const [loading, setLoading] = useState(false);
  const [signInOptions, setSignInOptions] = useState({});

  function getIcon(icon) {
    if (icon === 'google') {
      return <i style={{ paddingRight: '12px' }} className="fab fa-google"></i>;
    } else if (icon === 'facebook') {
      return <i style={{ paddingRight: '12px' }} className="fab fa-facebook"></i>;
    }
  }

  const canonical = `https://mailr.link/`;
  const metaTitle = 'Login';
  const metaImage = '/logo_transparent.png';
  const metaImageAlt = 'mailr Logo';
  const metaDescription = `mailr makes building a newsletter simple for all influencers. Engage with your audience in a whole new way with mailr.`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="google-site-verification" content="BXb7e_nv3O4Z1slg2aQ1p-DrGj6KDUio0qOG10Ny4UA" />
        <meta name="description" content={metaDescription}></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta name="author" content="mailr"></meta>
        <meta property="application-name" content="mailr"></meta>
        <meta property="msapplication-tooltip" content={metaTitle}></meta>
        <meta property="msapplication-starturl" content="https://mailr.link"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={metaTitle}></meta>
        <meta property="og:description" content={metaDescription}></meta>
        <meta property="og:image" content={metaImage}></meta>
        <meta property="og:image:alt" content={metaImageAlt}></meta>
        <meta property="og:image:width" content="500"></meta>
        <meta property="og:image:height" content="500"></meta>
        <meta property="og:url" content={canonical}></meta>
        <meta property="og:site_name" content="mailr"></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@mailrlink"></meta>
        <meta name="twitter:title" content={metaTitle}></meta>
        <meta name="twitter:description" content={metaDescription}></meta>
        <meta name="twitter:image" content={metaImage}></meta>
        <meta name="twitter:image:alt" content={metaImageAlt}></meta>
      </Head>
      {<LoginPageContent />}
    </>
  );

  async function isUniqueEmail(email) {
    try {
      let unique = await axios.post(`/api/users?action=checkEmail`, { email });
      console.log({ unique });
      return unique;
    } catch (err) {
      console.error(err);
    }
  }

  function LoginPageContent() {
    return (
      <Wrapper style={{ height: '100%', maxWidth: '400px' }}>
        <Row align="center" justify="center">
          <Column xs={12} align="center" justify="center">
            <Heading level={1} style={{ marginBottom: '28px' }}>
              Login
            </Heading>

            <Formik
              initialValues={{}}
              validationSchema={EmailSchema}
              onSubmit={({ email }) => {
                // setLoading(true);
                setSignInOptions({
                  provider: 'email',
                  options: { email, callbackUrl: `${baseUrl}/dashboard/subscribers` },
                });
                //check if login exists
                signIn('email', { email, callbackUrl: `${baseUrl}/dashboard/subscribers` });
              }}
            >
              {({ handleSubmit }) => (
                <FormWrapper
                  style={{ width: '100%' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <Input placeholder="email@example.com" label="Email" hideLabel type="text" name="email" />

                  <Button level="primary" type="submit" disabled={loading}>
                    {loading ? <LoadingBlock quiet small color="white" /> : 'Sign in with email'}
                  </Button>
                </FormWrapper>
              )}
            </Formik>
            <Divider>
              <Text bold>OR</Text>
            </Divider>
            {Object.values(providers).map((provider, i) => {
              if (provider.id !== 'email') {
                return (
                  <SocialButton
                    key={i}
                    level="outline"
                    onClick={() => {
                      setSignInOptions({
                        provider: provider.id,
                        options: { callbackUrl: `${baseUrl}/dashboard/subscribers` },
                      });
                      return signIn(provider.id, { callbackUrl: `${baseUrl}/dashboard/subscribers` });
                    }}
                  >
                    {getIcon(provider.id)}&nbsp;Sign in with {provider.name}
                  </SocialButton>
                );
              }

              return null;
            })}
          </Column>
        </Row>
      </Wrapper>
    );
  }
}

export async function getStaticProps(ctx) {
  try {
    return {
      props: { baseUrl: process.env.NEXTAUTH_URL, providers: await providers(ctx) },
    };
  } catch (err) {
    console.error('Login page error', err);
  }
}
