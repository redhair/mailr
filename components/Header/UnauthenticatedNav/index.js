import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heading } from '../../Typography';
import Nav from '../DesktopHeader/Nav';
import DesktopHeaderWrapper from '../DesktopHeader/DesktopHeaderWrapper';

function UnauthenticatedNav({ signIn }) {
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
        <Button level="link" onClick={signIn}>
          Join
        </Button>

        <Button onClick={signIn} level="primary">
          Get My Link
        </Button>
      </Nav>
    </DesktopHeaderWrapper>
  );
}

export default UnauthenticatedNav;
