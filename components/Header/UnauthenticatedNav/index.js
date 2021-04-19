import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import { Row } from '../../Grid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heading, Text } from '../../Typography';
import Nav from '../DesktopHeader/Nav';
import DesktopHeaderWrapper from '../DesktopHeader/DesktopHeaderWrapper';

function UnauthenticatedNav({ signIn }) {
  const router = useRouter();

  return (
    <DesktopHeaderWrapper>
      <Nav>
        <Link href="/">
          <a>
            <Heading level={2}>mailr</Heading>
          </a>
        </Link>
        {/* <Link href="/pricing">
          <a>
            <Text bold>Pricing</Text>
          </a>
        </Link> */}

        {/* <Link href="/blog">
          <a>
            <Text bold>Blog</Text>
          </a>
        </Link> */}

        {/* <Link href="/faq">
          <a>
            <Text bold>FAQ</Text>
          </a>
        </Link> */}
      </Nav>

      <Row align="center" justify="flex-end">
        <Link href="/login">
          <a>
            <Text bold>Login</Text>
          </a>
        </Link>
        <Button style={{ marginLeft: '32px' }} onClick={() => router.push('/signup')} level="primary">
          <i
            className="fas fa-link"
            style={{
              marginRight: '8px',
            }}
          ></i>
          Get Your Link
        </Button>
      </Row>
    </DesktopHeaderWrapper>
  );
}

export default UnauthenticatedNav;
