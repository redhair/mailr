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
import { debounce } from 'lodash';
import Cookies from 'js-cookie';
import Link from 'next/link';

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
  height: 59px;
  width: 313px;
  margin: 6px 0;
  border: ${(props) => `1px solid ${props.theme.primaryColor}`};
  border-radius: 50px;
  justify-content: flex-start;
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

const NextButton = styled(Button)`
  opacity: ${(props) => (props.available ? '100' : '0')};

  transition: opacity 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const SocialButton = styled(Button)`
  color: ${(props) => props.theme.textColor};
`;

const EmailSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

const validationNameFunction = async function (value, resolve) {
  try {
    const res = await axios.post('/api/users?action=checkLink', { link: value });
    console.log({ res });
    // setAvailable(true);
    resolve(true);
  } catch (err) {
    console.log({ err });
    // setAvailable(false);
    resolve(false);
  }
};

const validationDebounced = debounce(validationNameFunction, 1000);

export default function SignUp({ providers, baseUrl }) {
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState('unreleased'); //useState('chooseLink');
  const [available, setAvailable] = useState(true);
  const [selectedLink, setSelectedLink] = useState();
  const [signInOptions, setSignInOptions] = useState({});

  function getIcon(icon) {
    if (icon === 'google') {
      return <i style={{ paddingRight: '12px' }} className="fab fa-google"></i>;
    } else if (icon === 'facebook') {
      return <i style={{ paddingRight: '12px' }} className="fab fa-facebook"></i>;
    }
  }

  const LinkSchema = Yup.object().shape({
    link: Yup.string()
      .test('checkDuplLink', 'That link is already taken!', (value) => {
        return new Promise((resolve) => validationDebounced(value, resolve));
      })
      .required('Required'),
  });

  const canonical = `https://mailr.link/signup`;
  const metaTitle = 'Sign Up';
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
      {<SignInPageContent />}
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

  function SignInPageContent() {
    if (screen === 'unreleased') {
      return (
        <Wrapper style={{ height: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <Row align="center" justify="center">
            <Column xs={12} align="center" justify="center">
              <Heading level={1}>Sorry 🚫</Heading>
              <Text>
                Signups are currently disabled as we are only accepting accounts that are part of our beta group. If you
                are interested in joining mailr's beta group please reach out to{' '}
                <a href="mailto:tom@mailr.link">tom@mailr.link</a> and we will send you an application.
                <br />
                <br /> If you are already part of our beta group you can log in to your account{' '}
                <Link href="/login">
                  <a>here</a>
                </Link>
                .
              </Text>
            </Column>
          </Row>
        </Wrapper>
      );
    }
    if (screen === 'login') {
      return (
        <Wrapper style={{ height: '100%', maxWidth: '400px' }}>
          <Row align="center" justify="center">
            <Column xs={12} align="center" justify="center">
              <Heading level={1} style={{ marginBottom: '28px' }}>
                Sign Up
              </Heading>

              <Formik
                validateOnChange={false}
                initialValues={{}}
                validationSchema={EmailSchema}
                onSubmit={({ email }) => {
                  setSignInOptions({
                    provider: 'email',
                    options: { email, callbackUrl: `${baseUrl}/dashboard/subscribers` },
                  });

                  signIn('email', { email, callbackUrl: `${baseUrl}/dashboard/subscribers` });
                }}
              >
                {({ handleSubmit, handleChange }) => (
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

                        // setScreen('selectLink');
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
    } else if (screen === 'chooseLink') {
      return (
        <Wrapper style={{ height: '70vh', maxWidth: '400px', width: '100%', margin: '200px auto 100px auto' }}>
          <Row align="center" justify="center">
            <Column xs={12}>
              <Heading level={1}>Enter your link</Heading>
              {/* <Input type="text" /> */}
              <Formik
                initialValues={{}}
                validationSchema={LinkSchema}
                onSubmit={({ link }) => {
                  console.log({ link });
                  setSelectedLink(link);
                  Cookies.set('proposedLink', link);

                  setScreen('login');
                }}
              >
                {({ handleSubmit, validateForm, validateField, handleChange, isValidating, errors, touched }) => (
                  <FormWrapper
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <LinkInputContainer>
                      <Text>mailr.link/</Text>

                      <Field
                        // onChange={(e) => {
                        //   handleChange(e);
                        //   console.log('isValidating', isValidating);
                        //   if (isValidating) return;
                        //   validateForm(e);
                        // }}
                        placeholder="yournamehere"
                        label="Link"
                        hideLabel
                        type="text"
                        name="link"
                        autoComplete="off"
                      />
                      <NextButton available={available} level="primary" type="submit" disabled={loading}>
                        {loading ? (
                          <LoadingBlock quiet small color="white" />
                        ) : (
                          <i className="fas fa-chevron-right"></i>
                        )}
                      </NextButton>
                    </LinkInputContainer>
                    {errors.link && touched.link ? <div className="error-message">{errors.link}</div> : null}
                  </FormWrapper>
                )}
              </Formik>
            </Column>
          </Row>
        </Wrapper>
      );
    }
  }
}

export async function getStaticProps(ctx) {
  try {
    return {
      props: { baseUrl: process.env.NEXTAUTH_URL, providers: await providers(ctx) },
    };
  } catch (err) {
    console.error('Sign Up page error', err);
  }
}
