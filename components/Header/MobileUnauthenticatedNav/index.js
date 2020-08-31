import React from 'react';
import PropTypes from 'prop-types';
import UnauthenticatedNav from '../UnauthenticatedNav';
import MobileHeaderWrapper from './MobileHeaderWrapper';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import MobileWrapper from './MobileWrapper';
import MobileNav from './MobileNav';
import Button from '../../Button';
import Link from 'next/link';
import { Heading } from '../../Typography';

MobileHeader.propTypes = {
  user: PropTypes.object,
  nav: PropTypes.array.isRequired,
  toggleMobileNav: PropTypes.func.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

function MobileHeader({ toggleMobileNav, mobileMenuOpen, signIn }) {
  return (
    <MobileHeaderWrapper justify="space-between" align="center">
      <Link href="/">
        <a>
          <Heading style={{ marginBottom: '0' }} level={2}>
            mailr
          </Heading>
        </a>
      </Link>

      <MobileWrapper>
        <Hamburger onClick={toggleMobileNav} />
      </MobileWrapper>
      <MobileMenu open={mobileMenuOpen}>
        <MobileNav justify="center">
          <Button level="link" onClick={signIn}>
            Login
          </Button>
          <Button level="link" onClick={signIn}>
            Join
          </Button>
        </MobileNav>
      </MobileMenu>
    </MobileHeaderWrapper>
  );
}

export default MobileHeader;
