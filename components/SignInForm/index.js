import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import InputField from '../InputField';
import LoadingBlock from '../LoadingBlock';
import Alert from '../Alert';
import { Text } from '../Typography';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;

  & a {
    color: ${(props) => props.theme.primaryColor};
  }
`;
const FormWrapper = styled(Form)`
  display: flex;
  text-align: left;
  flex-direction: column;
  min-width: 400px;
  width: 400px;

  @media (max-width: 500px) {
    min-width: 100%;
    width: 100%;
  }
`;

export default function SignInForm({ onSignIn, style }) {
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);

  function onSubmit(userInfo) {
    setLoading(true);
    console.log({ userInfo });
    onSignIn({ ...userInfo }, function (res) {
      if (res.status === 200) {
        setAlert({ type: 'success', message: res.data.message });
      } else {
        setAlert({ type: 'danger', message: res.data.message });
      }
      setLoading(false);
    });
  }

  const UserSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Wrapper style={style}>
      <Formik initialValues={{}} validationSchema={UserSchema} onSubmit={onSubmit}>
        {() => (
          <FormWrapper>
            {alert && <Alert type={alert.type}>{alert.message}</Alert>}
            <InputField placeholder="Username" label="Username" hideLabel type="text" name="username" />
            <InputField placeholder="Password" label="Password" hideLabel name="password" type="password" />
            <Text>
              <a href="/account-recovery">Forgot your password?</a>
            </Text>
            <Button type="submit" level="secondary" disabled={loading}>
              {loading ? <LoadingBlock quiet small color="white" /> : 'Go'}
            </Button>
          </FormWrapper>
        )}
      </Formik>
      {/* <FormWrapper onSubmit={onSubmit}>
        {alert && <Alert type={alert.type}>{alert.message}</Alert>}
        <Input
          placeholder="example@domain.com"
          id="email"
          type="email"
          name="email"
          validations={[valid.required, valid.email]}
          onChange={e => updateUserInfo(e)}
        />
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          onChange={e => updateUserInfo(e)}
          validations={[valid.required]}
        />
        <Text>
          <a href="/account-recovery">Forgot your password?</a>
        </Text>
        <FormButton level="secondary" disabled={loading}>
          {loading ? <LoadingBlock quiet small color="white" /> : 'Go'}
        </FormButton>
        <Text>
          Dont have an account?&nbsp;<a href="/join">Register here.</a>
        </Text>
      </FormWrapper> */}
    </Wrapper>
  );
}

SignInForm.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  style: PropTypes.object,
};
