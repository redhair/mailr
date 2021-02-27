import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../components/Typography';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Row, Column } from '../../components/Grid';
import InputField from '../../components/InputField';
import LoadingBlock from '../../components/LoadingBlock';
import Alert from '../../components/Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { UserContext } from '../../components/UserProvider';
import Checkbox from '../../components/Checkbox';

Settings.propTypes = {};

const FormWrapper = styled(Form)`
  max-width: 500px;
`;

const SettingsSchema = Yup.object().shape({
  subscriber_updates: Yup.bool(),
});

function Settings(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  function onSubmit(e) {
    console.log('submitted form');
  }

  return (
    <Row align="flex-start" justify="flex-start" style={{ height: '100vh' }}>
      <Column xs={12} align="flex-start" justify="flex-start">
        <Heading level={2} style={{ marginBottom: '24px' }}>
          Settings
        </Heading>

        <Formik initialValues={{}} validationSchema={SettingsSchema} onSubmit={onSubmit}>
          {() => (
            <FormWrapper>
              <Checkbox onChecked={() => {}} name="subscriber_updates" label="Subscriber Updates" />

              <Button level="secondary" disabled={loading}>
                {loading ? <LoadingBlock quiet small color="white" /> : 'Save'}
              </Button>
            </FormWrapper>
          )}
        </Formik>
      </Column>
    </Row>
  );
}

export default Settings;
