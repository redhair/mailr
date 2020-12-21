import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Heading, Text } from '../components/Typography';
import Alert from '../components/Alert';
import Button from '../components/Button';
import InputField from '../components/InputField';
import LoadingBlock from '../components/LoadingBlock';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import api from './api/users';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 400px;
  text-align: left;
  width: 100%;
  height: 73vh;
  margin: auto;
  margin-bottom: 75px;
  margin-top: 25px;

  @media (min-width: ${(props) => props.theme.xs}) {
    margin-bottom: 75px;
    margin-top: 50px;
    padding-top: 25px;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    margin-bottom: 75px;
    margin-top: 25px;
  }

  opacity: ${(props) => (props.shown ? 100 : 0)};
  transition: all 1s ease-in-out;

  & form,
  & button {
    width: 100%;
  }
`;

const ErrorMessage = styled(Heading)`
  color: ${(props) => props.theme.dangerColor};
`;

const Image = styled.img`
  width: 200px;
  margin-bottom: 36px;
  border-radius: 100%;

  @media (min-width: ${(props) => props.theme.xs}) {
    width: 150px;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    width: 200px;
  }
`;

const EmailSchema = Yup.object().shape({
  email: Yup.string().email(`Oops! Looks like that email isn't valid.`).required('Required'),
  first: Yup.string(),
  last: Yup.string(),
});

function UserLandingPage({ linkId, user }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [shown, setShown] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (linkId && user) {
      setShown(true);
    }
  }, []);

  function onSubmit(e) {
    setLoading(true);
    axios
      .put(`/api/users/${user._id}`, {
        subscriber: {
          email: e.email,
          firstName: e.firstName,
          lastName: e.lastName,
        },
      })
      .then((res) => {
        setAlert({
          message: `Congrats! You have successfully joined ${user.name}'s mailing list.`,
          type: 'success',
        });
        setLoading(false);
      })
      .catch((err) => {
        let msg = err.response.data.error || null;
        setAlert({
          type: 'danger',
          message: msg || 'There was an error, try again later',
        });
      });
  }

  if (error) {
    return (
      <Wrapper shown={shown}>
        <ErrorMessage level={4}>{error}</ErrorMessage>
      </Wrapper>
    );
  }

  const canonical = `https://mailr.link/${linkId}`;
  const metaTitle = `Join ${user.name}'s mailing list`;
  const metaImage = user.image;
  const metaImageAlt = `${user.name}'s avatar`;
  const metaDescription = `The fastest way to grow your mailing list`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription}></meta>
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
      <Wrapper shown={shown}>
        {!!alert && <Alert type={alert.type}>{alert.message}</Alert>}

        {!alert && !!user && (
          <>
            <Image src={user.image} />
            <Heading level={3}>Enter Your Information To Join {user.name}'s mailing list.</Heading>
            <Formik initialValues={{}} validationSchema={EmailSchema} onSubmit={onSubmit}>
              {() => (
                <Form>
                  <InputField placeholder="First Name" label="First Name" hideLabel type="text" name="firstName" />
                  <InputField placeholder="Last Name" label="Last Name" hideLabel type="text" name="lastName" />
                  <InputField
                    placeholder="Enter your email address"
                    label="Email"
                    hideLabel
                    type="email"
                    name="email"
                  />

                  <Button level="primary" disabled={loading}>
                    {loading ? <LoadingBlock quiet small color="white" /> : 'Subscribe'}
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Wrapper>
    </>
  );
}

export async function getStaticPaths() {
  // Get all users
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/users`);
  // Get the links we want to pre-render based on users
  const paths = res.data.map((user) => ({
    params: { linkId: user.link },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { linkId } = params;

  try {
    let { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/users?link=${linkId}`);

    return { props: { linkId: data.link, user: data }, revalidate: 1 };
  } catch (err) {
    console.error(err);
    return { props: { err } };
  }
}

export default UserLandingPage;
