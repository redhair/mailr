import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '../components/Typography';
import Alert from '../components/Alert';
import Button from '../components/Button';
import InputField from '../components/InputField';
import LoadingBlock from '../components/LoadingBlock';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';

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

const EmailSchema = Yup.object().shape({
  email: Yup.string().email(`Oops! Looks like that email isn't valid.`).required('Required'),
  first: Yup.string(),
  last: Yup.string(),
});

function UserLandingPage({ linkId }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [shown, setShown] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (linkId && !user) {
      fetch(`http://localhost:3000/api/users?link=${linkId}`)
        .then((r) => r.json())
        .then((user) => {
          setUser(user);
          setShown(true);
        })
        .catch((err) => setError('Could not find this user'));
    }
  }, []);

  function onSubmit(e) {
    setLoading(true);
    axios
      .put(`http://localhost:3000/api/users/${user._id}`, {
        subscriber: e.email,
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

  return (
    <Wrapper shown={shown}>
      {!!alert && <Alert type={alert.type}>{alert.message}</Alert>}

      {!alert && !!user && (
        <>
          <Heading level={3}>Enter Your Information To Join {user.name}'s mailing list.</Heading>
          <Formik initialValues={{}} validationSchema={EmailSchema} onSubmit={onSubmit}>
            {() => (
              <Form>
                <InputField placeholder="First Name" label="First Name" hideLabel type="text" name="first" />
                <InputField placeholder="Last Name" label="Last Name" hideLabel type="text" name="last" />
                <InputField placeholder="Enter your email address" label="Email" hideLabel type="email" name="email" />

                <Button level="primary" disabled={loading}>
                  {loading ? <LoadingBlock quiet small color="white" /> : 'Subscribe'}
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Wrapper>
  );
}

UserLandingPage.getInitialProps = async (ctx) => {
  const { linkId } = ctx.query;
  return { linkId };
};

export default UserLandingPage;
