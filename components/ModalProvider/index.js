import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import ResponsiveModal from 'react-responsive-modal';

const ModalContext = React.createContext({
  visible: false,
});

class ModalProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalContent: undefined,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setModalContent = this.setModalContent.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  setModalContent(modalContent) {
    this.setState({
      modalContent: modalContent,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <ModalContext.Provider
        value={{
          ...this.state,
          setModalContent: this.setModalContent,
          showModal: this.showModal,
          hideModal: this.hideModal,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  }
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const Header = styled.div`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: ${(props) => props.theme.backgroundColor};
  margin: 0;
`;

const Body = styled.div`
  padding: 42px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  background: ${(props) => props.theme.backgroundColor};
`;

const Modal = ({ header, footer, children, maxWidth = '500px', ...rest }) => {
  const { visible, hideModal } = useContext(ModalContext);
  const theme = useTheme();

  const closeIcon = (
    <svg fill={theme.textColor} width="28" height="28" viewBox="0 0 36 36" data-testid="close-icon">
      <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path>
    </svg>
  );

  return (
    <ResponsiveModal
      center
      open={visible}
      onClose={() => hideModal()}
      blockScroll={false}
      closeIcon={closeIcon}
      styles={{
        overlay: {
          backdropFilter: 'blur(20px)',
          background: 'rgba(0, 0, 0, 0.6)',
        },
        modal: {
          backgroundColor: theme.blackBlue,
          borderRadius: '16px',
          border: `1px solid ${theme.darkGrey}`,
          display: 'flex',
          flexDirection: 'column',
          padding: '0px',
          maxWidth: maxWidth,
          width: '100%',
        },
      }}
      {...rest}
    >
      <Header>{header}</Header>
      <Body>{children}</Body>
      <Footer>{footer}</Footer>
    </ResponsiveModal>
  );
};

Modal.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
};

export { Modal, ModalProvider, ModalContext };
