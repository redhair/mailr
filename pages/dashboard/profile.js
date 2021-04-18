import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../components/Typography';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Row, Column } from '../../components/Grid';
import InputField from '../../components/InputField';
import LoadingBlock from '../../components/LoadingBlock';
import Alert from '../../components/Alert';
import Avatar from '../../components/AvatarEditor';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { UserContext } from '../../components/UserProvider';
import { uuid } from 'uuidv4';

Profile.propTypes = {};

const FormWrapper = styled(Form)`
  max-width: 500px;
`;

function Profile(props) {
  const setEditorRef = useRef();
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [imageState, setImageState] = useState('old');
  const [displayImage, setDisplayImage] = useState('/default_user.png');
  const [newImageFile, setNewImageFile] = useState([]);
  // console.log({ user });

  useEffect(() => {
    if (user && user.image) {
      setDisplayImage(user.image);
    }
  }, [user]);

  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    link: Yup.string()
      .test('checkDuplLink', 'That link is already taken!', function (value) {
        if (value === user.link) return true;
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

  async function onSubmit(e) {
    console.log({ e }); //e.link

    // PUT to /user/id and change the link with
    // e.link
    setLoading(true);
    let res = await axios.put(`/api/users/${user._id}?action=editProfile`, { ...e });
    console.log({ res });
    if (res.status === 200) {
      setAlert({ type: 'success', message: 'Successfully updated profile' });
      window.location.reload();
    } else {
      setAlert({ type: 'danger', message: 'There was an error' });
    }

    setLoading(false);
  }

  async function onAcceptImage() {
    if (!newImageFile[0]) {
      return setAlert({ type: 'warning', message: 'No image selected, please choose an image before accepting.' });
    }

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }

    console.log({ setEditorRef });
    if (setEditorRef) {
      const canvasScaled = setEditorRef.current.getImageScaledToCanvas();
      console.log({ canvasScaled });

      let filename = `avatar_${uuid()}`;
      let imageFile = dataURLtoFile(canvasScaled.toDataURL(), filename);

      console.log({ imageFile });
      setLoading(true);
      try {
        const res = await axios.post('/api/s3', { filename });
        const { url, fields } = res.data;
        console.log({ url, fields });
        const formData = new FormData();

        Object.entries({ ...fields, file: imageFile }).forEach(([key, value]) => {
          formData.append(key, value);
        });

        console.log({ formData });

        const upload = await axios({
          method: 'post',
          url,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log({ upload });

        if (upload.status === 204) {
          /**
           * upload user with the s3 url + key as
           * the avatar url
           */
          const userUpdate = await axios.put(`/api/users/${user._id}?action=editProfile`, {
            image: `https://mailr.s3.amazonaws.com/${fields.key}`,
          });

          console.log({ userUpdate });
        } else {
          throw 'There was an error with the upload';
        }

        setLoading(false);
      } catch (err) {
        console.error({ err });
      }
    }
  }

  function onDrop(file) {
    setNewImageFile(file);
    setDisplayImage(file[0].preview);
  }

  function cancelNewImage() {
    setImageState('old');
    setDisplayImage(displayImage);
    setNewImageFile([]);
  }

  return (
    <Row align="flex-start" justify="flex-start" style={{ height: '100vh', width: '100%' }}>
      <Column xs={12} align="flex-start" justify="flex-start">
        <Heading level={2} style={{ marginBottom: '24px' }}>
          Profile
        </Heading>
        {!user ? (
          <LoadingBlock />
        ) : (
          <>
            {!!alert && <Alert type={alert.type}>{alert.message}</Alert>}
            <Row align="flex-start" justify="flex-start" canWrap>
              <Avatar
                style={{ marginRight: '64px' }}
                imageState={imageState}
                displayImage={displayImage}
                newImageFile={newImageFile}
                loading={loading}
                onDrop={onDrop}
                onImageState={() => setImageState('new')}
                setEditorRef={setEditorRef}
                cancelNewImage={cancelNewImage}
                onAcceptImage={onAcceptImage}
              />
              <Formik
                initialValues={{ link: user.link, name: user.name }}
                validationSchema={ProfileSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <FormWrapper>
                    <InputField
                      style={{ marginBottom: '8px' }}
                      placeholder="Name"
                      label="Your Name"
                      type="text"
                      name="name"
                    />

                    <InputField
                      style={{ marginBottom: '0px' }}
                      placeholder="Link"
                      label="Your link"
                      type="text"
                      name="link"
                    />
                    {/*TODO: Create unsubscribe options*/}
                    <Button level="primary" disabled={loading}>
                      {loading ? <LoadingBlock quiet small color="white" /> : 'Save'}
                    </Button>
                  </FormWrapper>
                )}
              </Formik>
            </Row>
          </>
        )}
      </Column>
    </Row>
  );
}

export default Profile;
