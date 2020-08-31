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

function MobileHeader({ nav, toggleMobileNav, mobileMenuOpen, signOut }) {
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
          {nav.length > 0 &&
            nav.map((l) => {
              return (
                <a key={l.href} href={l.href}>
                  {l.name}
                </a>
              );
            })}
          <Button level="link" onClick={signOut}>
            Logout
          </Button>
        </MobileNav>
      </MobileMenu>
    </MobileHeaderWrapper>
  );
}

export default MobileHeader;
