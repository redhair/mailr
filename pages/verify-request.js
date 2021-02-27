import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Container, Row, Column } from '../components/Grid';
import { Heading, Text } from '../components/Typography';

const Wrapper = styled(Container)`
  & button {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  & a {
    padding: ${(props) => props.theme.buttonPadding};
    text-decoration: none;

    &:hover {
      background: ${(props) => props.theme.backgroundColor};
      border-radius: 50px;
      transition: all 0.3s ease-in-out;
    }
  }
`;

export default function VerifyRequest({ providers } = {}) {
  return (
    <Wrapper style={{ maxWidth: '400px', textAlign: 'center', width: '100%', margin: '150px auto 100px auto' }}>
      <Row align="center" justify="center">
        <Column xs={12} align="center" justify="center">
          <Heading level={2} style={{ marginBottom: '28px' }}>
            ✨ <br />
            <br />
            Check your email for a link to login
          </Heading>
          <Text>We just sent an email to you with a magic link that you can use to log in to your account.</Text>
          <br />
          <br />
          <Link href="/login">
            <a>
              <Text>
                <i style={{ marginRight: '8px' }} className="fas fa-chevron-circle-left"></i>Back to login
              </Text>
            </a>
          </Link>
        </Column>
      </Row>
    </Wrapper>
  );
}
