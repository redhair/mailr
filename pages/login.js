import React from 'react';
import styled from 'styled-components';
import { providers, signIn } from 'next-auth/client';
import Button from '../components/Button';
import { Container, Row, Column } from '../components/Grid';
import { Heading, Text } from '../components/Typography';
import Input from '../components/InputField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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

const EmailSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

export default function Login({ providers }) {
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
            Login
          </Heading>

          <Formik
            initialValues={{}}
            validationSchema={EmailSchema}
            onSubmit={({ email }) => {
              console.log('in');
              signIn('email', { email, callbackUrl: '/dashboard' });
            }}
          >
            {({ handleSubmit }) => (
              <FormWrapper
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Input placeholder="email@example.com" label="Email" hideLabel type="text" name="email" />

                <Button level="primary" type="submit">
                  Sign in with email
                </Button>
              </FormWrapper>
            )}
          </Formik>
          <Divider>
            <Text bold>OR</Text>
          </Divider>
          {Object.values(providers).map((provider, i) => (
            <>
              {provider.id === 'email' ? (
                <></>
              ) : (
                <Button key={i} level="outline" onClick={() => signIn(provider.id)}>
                  {getIcon(provider.id)}&nbsp;Sign in with {provider.name}
                </Button>
              )}
            </>
          ))}
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
