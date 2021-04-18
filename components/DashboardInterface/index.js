import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Modal, ModalContext } from '../ModalProvider';
import { Container } from '../Grid';
import { Text } from '../Typography';
import { Row, Column } from '../Grid';
import Button from '../Button';
import Nav from '../Nav';
import Footer from '../Footer';
import LinkPopup from '../LinkPopup';
import AccessDenied from '../AccessDenied';
import { signin } from 'next-auth/client';
import { UserProvider, UserContext } from '../UserProvider';
const InterfaceContainer = styled(Container)`
  background: ${(props) => props.theme.backgroundColor};
  /* margin-bottom: -40px !important; */
  padding-bottom: 90px !important;
  /* padding-left: 200px !important; */
  @media (min-width: ${(props) => props.theme.xs}) {
    /* padding-left: 150px; */
    /* margin-top: 220px; */
    overflow: scroll;
    /* width: 100%; */
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    /* padding-left: 270px; */
    /* margin-top: 125px; */
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    /* padding-left: 270px; */
    /* margin-top: 125px; */
    width: 100%;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  border-radius: 50px;
  margin-right: 15px;
`;

const HighlightAnchor = styled.a`
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 40px;

  & span {
    color: ${(props) => (props.selected ? 'white' : props.theme.textColorGrey)};
  }

  & i {
    color: ${(props) => (props.selected ? props.theme.primaryColor : 'auto')};
  }

  &:hover span {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const MobileLink = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: ${(props) => props.theme.blackBlue};
  /* position: absolute; */
  left: 0;
  right: 0;
  height: 90px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
  z-index: 10;

  @media (min-width: ${(props) => props.theme.xs}) {
    display: flex;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    display: none;
  }
`;

const CopyButton = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding: 13px 30px;
  font-size: 23px;
  color: ${(props) => props.theme.textColor};
  position: relative;
  outline: 0;
  border-color: ${(props) => props.theme.primaryColor};
  background: ${(props) => props.theme.primaryColor};

  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 18px;
    padding: 10px 28px;
  }
`;

const CopyInput = styled.input`
  background: ${(props) => props.theme.black};
  color: ${(props) => props.theme.textColor};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 15px 30px;
  border: 0;
  outline: 0;
  width: 100%;
  font-family: ${(props) => props.theme.bodyFont};
  font-size: 24px;

  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 16px;
    padding: 15px 20px;
  }
`;

const CopyText = styled(Text)`
  color: ${(props) => props.theme.primaryColor};
  font-size: 12px;
  position: absolute;
  top: ${(props) => (props.show ? '-23px' : '-15px')};
  left: 14px;
  opacity: ${(props) => (props.show ? 100 : 0)};

  transition: opacity 0.1s cubic-bezier(0.3, 0, 0.45, 1), top 0.15s cubic-bezier(0.3, 0, 0.45, 1);
`;

const DashboardInterfaceNav = styled.nav`
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    background: linear-gradient(180deg, rgba(39, 58, 85, 0), #273a55 50.65%, rgba(39, 58, 85, 0));
    top: 0;
    bottom: 0;
    right: -1px;
    height: 100%;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    display: flex;
  }
`;

let _init = false;
const Interface = ({ loading, session, children }) => {
  const [showCopyText, setShowCopyText] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { modalContent, showModal, setModalContent } = useContext(ModalContext);
  const router = useRouter();
  const showLink = router.query.showLink;

  useEffect(() => {
    if (showLink && user && !_init) {
      setModalContent(<LinkPopup link={user.link} />);
      showModal();
      _init = true;
    }
  }, [showLink, user]);

  useEffect(() => {
    if (session && session.user && !user) {
      console.log('querying user');
      axios
        .get(`/api/users?email=${session.user.email}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch(console.error);
    }
  }, [session]);

  const nav = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <i
          className="fas fa-chart-pie"
          style={{
            marginRight: '8px',
            fontSize: '20px',
          }}
        ></i>
      ),
    },
    {
      name: 'Subscribers',
      href: '/dashboard/subscribers',
      icon: (
        <i
          className="fas fa-users"
          style={{
            marginRight: '8px',
            fontSize: '20px',
          }}
        ></i>
      ),
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: (
        <i
          className="fas fa-user"
          style={{
            marginRight: '8px',
            fontSize: '20px',
          }}
        ></i>
      ),
    },
    {
      name: 'Stats',
      href: '/dashboard/analytics',
      icon: (
        <i
          className="fa fa-line-chart"
          style={{
            marginRight: '8px',
            fontSize: '20px',
          }}
        ></i>
      ),
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: (
        <i
          className="fas fa-cog"
          style={{
            marginRight: '8px',
            fontSize: '20px',
          }}
        ></i>
      ),
    },
  ];

  if (!session && !loading) {
    return <AccessDenied />;
  }

  const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <>
      {modalContent && <Modal maxWidth="600px">{modalContent}</Modal>}
      <>
        {/* <MobileLink>
          {user && (
            <>
              <Text>My Link:&nbsp;</Text>
              <a target="_blank" rel="noreferrer" href={'https://mailr.link/' + user.link}>
                <Text>https://mailr.link/{user.link}</Text>
              </a>
            </>
          )}
          <i className="far fa-clipboard"></i>
        </MobileLink> */}
        <MobileLink>
          {user && (
            <>
              <CopyInput
                readOnly
                // autoFocus
                onFocus={(event) => event.target.select()}
                value={'https://mailr.link/' + user.link}
              />
              <CopyButton
                level="outline"
                onClick={() => {
                  setShowCopyText(true);
                  copyToClipboard('https://mailr.link/' + user.link);
                }}
              >
                <CopyText show={showCopyText}>Copied!</CopyText>
                <i className="far fa-clipboard"></i>
              </CopyButton>
            </>
          )}
        </MobileLink>

        <Container>
          <Row canWrap align="flex-start" justify="flex-start">
            <Column xs={0} md={2} align="space-between" justify="flex-start">
              {/* {!!session.user && (
                <Link href="/dashboard">
                  <a>
                    <Row canWrap={false} style={{ marginBottom: '15px' }}>
                      <ProfileImage src={session.user.image} alt="Avatar" />
                      <Text>{!!session.user.name && session.user.name}</Text>
                    </Row>
                  </a>
                </Link>
              )} */}
              <DashboardInterfaceNav>
                <Row justify="flex-start" align="flex-start">
                  <Column justify="flex-start" align="flex-start">
                    {nav.map((n) => {
                      console.log(router.pathname === n.href);
                      return (
                        <Link key={n.name} href={n.href}>
                          <HighlightAnchor selected={router.pathname === n.href}>
                            <Text>{n.icon}</Text>
                            <Text>&nbsp;{n.name}</Text>
                          </HighlightAnchor>
                        </Link>
                      );
                    })}
                  </Column>
                </Row>
              </DashboardInterfaceNav>

              {/* <LinkButton
                level="primary"
                onClick={() => {
                  setModalContent(<LinkPopup link={user.link} />);
                  showModal();
                }}
              >
                <i
                  className="fas fa-link"
                  style={{
                    marginRight: '8px',
                  }}
                ></i>
                <Text bold>&nbsp;My Link</Text>
              </LinkButton> */}
            </Column>
            <Column xs={12} md={10} align="flex-start" justify="flex-start">
              <InterfaceContainer>{children}</InterfaceContainer>
            </Column>
          </Row>
        </Container>
        <Footer />
      </>
    </>
  );
};

export default Interface;
