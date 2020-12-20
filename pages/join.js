import React, { useState } from 'react';
import styled from 'styled-components';
import { providers, signIn } from 'next-auth/client';
import Button from '../components/Button';
import { Container, Row, Column } from '../components/Grid';
import { Heading, Text } from '../components/Typography';
import Input from '../components/Input';
import SignInForm from '../components/SignInForm';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';

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
`;

const FormWrapper = styled(Form)`
  width: 100%;

  & button {
    width: 100%;
  }
`;

const UserSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

export default function Join({ providers }) {
  function getIcon(icon) {
    if (icon === 'google') {
      return <i style={{ paddingRight: '12px' }} className="fab fa-google"></i>;
    } else if (icon === 'facebook') {
      return <i style={{ paddingRight: '12px' }} className="fab fa-facebook"></i>;
    }
  }

  return (
    <Wrapper style={{ maxWidth: '400px', width: '100%', margin: '150px auto 100px auto' }}>
      <Row align="center" justify="center">
        <Column xs={12} align="center" justify="center">
          <Heading level={1} style={{ marginBottom: '28px' }}>
            Join
          </Heading>

          {Object.values(providers).map((provider) => (
            <>
              {provider.id === 'email' ? (
                <></>
              ) : (
                <Button level="outline" onClick={() => signIn(provider.id)}>
                  {getIcon(provider.id)}&nbsp;Sign up with {provider.name}
                </Button>
              )}
            </>
          ))}
          <Divider>
            <Text bold>OR</Text>
          </Divider>
          <Formik
            initialValues={{}}
            validationSchema={UserSchema}
            onSubmit={({ email, password }) => {
              // signIn(provider.id, { email });
              // create account with email and password
            }}
          >
            {() => (
              <FormWrapper>
                <Input placeholder="email@example.com" label="Email" hideLabel type="text" name="email" />
                <Input placeholder="Password" label="Password" hideLabel type="password" name="password" />

                <Button level="primary" type="submit">
                  Sign up
                </Button>
              </FormWrapper>
            )}
          </Formik>
        </Column>
      </Row>
    </Wrapper>
  );
}

export async function getServerSideProps(ctx) {
  try {
    return {
      props: { providers: await providers(ctx) },
    };
  } catch (err) {
    console.error('Login page error', err);
  }
}
