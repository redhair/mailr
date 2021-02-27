import React, { useContext } from 'react';
import styled from 'styled-components';
import { Modal, ModalContext } from '../ModalProvider';
import { Container } from '../Grid';
import Footer from '../Footer';

const InterfaceContainer = styled(Container)`
  background: ${(props) => props.theme.backgroundColor};

  @media (min-width: ${(props) => props.theme.xs}) {
    /* margin-top: 100px; */
  }

  @media (min-width: ${(props) => props.theme.md}) {
    margin-top: 50px;
  }
`;

const Interface = ({ children }) => {
  const { modalContent, showModal, setModalContent } = useContext(ModalContext);

  return (
    <>
      {modalContent && <Modal maxWidth="600px">{modalContent}</Modal>}

      <InterfaceContainer>{children}</InterfaceContainer>
      <Footer />
    </>
  );
};

export default Interface;
