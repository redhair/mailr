import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heading } from '../../Typography';
import Nav from '../DesktopHeader/Nav';
import DesktopHeaderWrapper from '../DesktopHeader/DesktopHeaderWrapper';

function UnauthenticatedNav({ signIn }) {
  const router = useRouter();

  return (
    <DesktopHeaderWrapper>
      <Link href="/">
        <a>
          <Heading level={2}>mailr</Heading>
        </a>
      </Link>
      <Nav>
        <Button level="link" onClick={signIn}>
          Login
        </Button>
        <Button level="link" onClick={() => router.push('join')}>
          Join
        </Button>

        <Button onClick={() => router.push('join')} level="primary">
          Get My Link
        </Button>
      </Nav>
    </DesktopHeaderWrapper>
  );
}

export default UnauthenticatedNav;
