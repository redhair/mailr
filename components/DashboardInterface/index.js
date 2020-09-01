import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import { Modal, ModalContext } from '../ModalProvider';
import { Container } from '../Grid';
import { Text } from '../Typography';
import { Row } from '../Grid';
import Button from '../Button';
import Nav from '../Nav';
import LinkPopup from '../LinkPopup';
import AccessDenied from '../AccessDenied';
import { signin } from 'next-auth/client';
import { UserProvider, UserContext } from '../UserProvider';
const InterfaceContainer = styled(Container)`
  @media (min-width: ${(props) => props.theme.xs}) {
    padding-left: 88px;
    margin-top: 100px;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    padding-left: 270px;
    margin-top: 125px;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  border-radius: 50px;
  margin-right: 15px;
`;

const Interface = ({ session, children }) => {
  const { user, setUser } = useContext(UserContext);
  const { modalContent, showModal, setModalContent } = useContext(ModalContext);

  useEffect(() => {
    axios
      .get(`/api/users?email=${session.user.email}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(console.error);
  }, [session]);

  const nav = [
    {
      name: 'Subscribers',
      href: '/dashboard/subscribers',
      icon: <i className="fas fa-users"></i>,
    },
    // {
    //   name: 'Settings',
    //   href: '/dashboard/settings',
    //   icon: <i className="fas fa-cog"></i>,
    // },
  ];

  if (!session) {
    return <AccessDenied />;
  }

  return (
    <>
      {modalContent && <Modal maxWidth="600px">{modalContent}</Modal>}
      <>
        <Nav>
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
          <Button
            level="link"
            onClick={() => {
              setModalContent(<LinkPopup link={user.link} />);
              showModal();
            }}
          >
            <i className="fas fa-link"></i>
            <Text
              style={{
                marginLeft: '8px',
              }}
            >
              &nbsp;My Link
            </Text>
          </Button>

          {nav.map((n) => (
            <Link key={n.name} href={n.href}>
              <a>
                {n.icon}
                <Text
                  style={{
                    marginLeft: '8px',
                  }}
                >
                  &nbsp;{n.name}
                </Text>
              </a>
            </Link>
          ))}
        </Nav>
        <InterfaceContainer>{children}</InterfaceContainer>
      </>
    </>
  );
};

export default Interface;
