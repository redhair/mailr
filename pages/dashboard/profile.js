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
import axios from 'axios';
import { UserContext } from '../../components/UserProvider';

Profile.propTypes = {};

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

const FormWrapper = styled(Form)`
  max-width: 500px;
`;

function Profile(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  // console.log({ user });

  async function onSubmit(e) {
    console.log({ e }); //e.link

    // PUT to /user/id and change the link with
    // e.link
    let res = await axios.put(`/api/users/${user._id}?action=editProfile`, { link: e.link });
    console.log({ res });
  }

  return (
    <Row align="flex-start" justify="flex-start" style={{ height: '100vh' }}>
      <Column xs={12} align="flex-start" justify="flex-start">
        <Heading level={2} style={{ marginBottom: '24px' }}>
          Profile
        </Heading>
        {!user ? (
          <LoadingBlock quiet />
        ) : (
          <Formik initialValues={{ link: user.link }} validationSchema={LinkSchema} onSubmit={onSubmit}>
            {() => (
              <FormWrapper>
                <InputField placeholder="Link" label="My link" type="text" name="link" />
                {/*TODO: Create unsubscribe options*/}
                <Button level="secondary" disabled={loading}>
                  {loading ? <LoadingBlock quiet small color="white" /> : 'Save'}
                </Button>
              </FormWrapper>
            )}
          </Formik>
        )}
      </Column>
    </Row>
  );
}

export default Profile;
