import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../components/Typography';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Row } from '../../components/Grid';
import InputField from '../../components/InputField';
import LoadingBlock from '../../components/LoadingBlock';
import Alert from '../../components/Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

Settings.propTypes = {};

const SettingsSchema = Yup.object().shape({
  username: Yup.string(),
});

const FormWrapper = styled(Form)`
  max-width: 500px;
`;

function Settings(props) {
  const [loading, setLoading] = useState(false);

  function onSubmit(e) {
    console.log('submitted form');
  }

  return (
    <>
      <Heading level={1} style={{ marginBottom: '60px' }}>
        Settings
      </Heading>
      <Formik initialValues={{}} validationSchema={SettingsSchema} onSubmit={onSubmit}>
        {() => (
          <FormWrapper>
            {!!alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
            <InputField placeholder="username" label="Username" type="text" name="username" />

            <Button level="secondary" disabled={loading}>
              {loading ? <LoadingBlock quiet small color="white" /> : 'Save'}
            </Button>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
}

export default Settings;
