import React, { useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from '../../Typography';
import DesktopHeaderWrapper from './DesktopHeaderWrapper';
import Avatar from './Avatar';
import { useRouter } from 'next/router';
import Menu from './Menu';
import Nav from './Nav';
import AuthenticatedNav from './AuthenticatedNav';
import AccountInfo from './AccountInfo';
import { Modal, ModalContext } from '../../ModalProvider';

import LinkPopup from '../../LinkPopup';
import Button from '../../Button';
import { Heading } from '../../Typography';
import { Row } from '../../Grid';
import Link from 'next/link';

DesktopHeader.propTypes = {
  user: PropTypes.object,
  nav: PropTypes.array.isRequired,
  toggleOptions: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const LinkButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 40px; */
  /* padding: 6px 32px; */
  background: ${(props) => {
    return `linear-gradient(90deg, ${props.theme.primaryColor}, #4c9fff)`;
  }};
`;

function DesktopHeader({ user, loading, nav, toggleOptions, menuOpen, signOut }) {
  const { modalContent, showModal, setModalContent } = useContext(ModalContext);
  const router = useRouter();
  const theme = useTheme();

  return (
    <DesktopHeaderWrapper>
      {loading ? (
        <div style={{ height: '40px' }}></div>
      ) : (
        <AuthenticatedNav onClick={toggleOptions}>
          <Nav>
            <Link href="/">
              <a>
                <Heading style={{ marginBottom: '0' }} level={2}>
                  mailr
                </Heading>
              </a>
            </Link>
            <Link href="/dashboard">
              <a>
                <Text
                  style={
                    router.pathname.indexOf('/dashboard') > -1
                      ? { borderBottom: `3px solid ${theme.primaryColor}` }
                      : { borderBottom: '3px solid transparent' }
                  }
                  bold
                >
                  Dashboard
                </Text>
              </a>
            </Link>
            {/* <Link href="/pricing">
              <a>
                <Text
                  style={
                    router.pathname === '/pricing'
                      ? { borderBottom: `3px solid ${theme.primaryColor}` }
                      : { borderBottom: '3px solid transparent' }
                  }
                  bold
                >
                  Pricing
                </Text>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <Text
                  style={
                    router.pathname === '/blog'
                      ? { borderBottom: `3px solid ${theme.primaryColor}` }
                      : { borderBottom: '3px solid transparent' }
                  }
                  bold
                >
                  Blog
                </Text>
              </a>
            </Link>
            <Link href="/faq">
              <a>
                <Text
                  style={
                    router.pathname === '/faq'
                      ? { borderBottom: `3px solid ${theme.primaryColor}` }
                      : { borderBottom: '3px solid transparent' }
                  }
                  bold
                >
                  FAQ
                </Text>
              </a>
            </Link> */}
          </Nav>
          <div>
            <Row>
              <LinkButton
                level="primary"
                onClick={() => {
                  setModalContent(<LinkPopup link={user.link} />);
                  showModal();
                }}
              >
                <i className="fas fa-link" style={{}}></i>
                {/* <Text bold>&nbsp;My Link</Text> */}
              </LinkButton>
              <Avatar
                user={user}
                onClick={() => {
                  //show account modal
                  setModalContent(<AccountInfo signOut={signOut} user={user} />);
                  showModal();
                }}
              />
            </Row>
          </div>
        </AuthenticatedNav>
      )}
    </DesktopHeaderWrapper>
  );
}

export default DesktopHeader;
