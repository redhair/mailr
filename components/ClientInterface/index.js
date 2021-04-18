import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, ModalContext } from '../ModalProvider';
import { Container } from '../Grid';
import Footer from '../Footer';
import { UserProvider, UserContext } from '../UserProvider';
import axios from 'axios';

const InterfaceContainer = styled(Container)`
  background: ${(props) => props.theme.backgroundColor};

  @media (min-width: ${(props) => props.theme.xs}) {
    /* margin-top: 100px; */
  }

  @media (min-width: ${(props) => props.theme.md}) {
    margin-top: 50px;
  }
`;

const Interface = ({ loading, session, children }) => {
  const { modalContent, showModal, setModalContent } = useContext(ModalContext);
  const { user, setUser } = useContext(UserContext);

  // useEffect(() => {
  //   if (session && session.user && !user) {
  //     console.log('querying user');
  //     axios
  //       .get(`/api/users?email=${session.user.email}`)
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch(console.error);
  //   }
  // }, [session]);

  return (
    <>
      {modalContent && <Modal maxWidth="600px">{modalContent}</Modal>}

      <InterfaceContainer>{children}</InterfaceContainer>
      <Footer />
    </>
  );
};

export default Interface;
