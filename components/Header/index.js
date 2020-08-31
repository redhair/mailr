import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../ModalProvider';

import Wrapper from './Wrapper';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { useRouter } from 'next/router';

import UnauthenticatedNav from './UnauthenticatedNav';
import MobileUnauthenicatedNav from './MobileUnauthenticatedNav';

Header.propTypes = {
  user: PropTypes.object,
  nav: PropTypes.array.isRequired,
  isFixed: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default function Header({ user, nav, isFixed, signIn, signOut }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { showModal, setModalContent } = useContext(ModalContext);
  const router = useRouter();

  function toggleMobileNav() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function toggleOptions() {
    setMenuOpen(!menuOpen);
  }

  return (
    <Wrapper isFixed={isFixed}>
      {!!user ? (
        <>
          <DesktopHeader user={user} signOut={signOut} nav={nav} menuOpen={menuOpen} toggleOptions={toggleOptions} />
          <MobileHeader
            user={user}
            signOut={signOut}
            nav={nav}
            toggleMobileNav={toggleMobileNav}
            mobileMenuOpen={mobileMenuOpen}
          />
        </>
      ) : (
        <>
          <UnauthenticatedNav signIn={signIn} />
          <MobileUnauthenicatedNav toggleMobileNav={toggleMobileNav} mobileMenuOpen={mobileMenuOpen} signIn={signIn} />
        </>
      )}
    </Wrapper>
  );
}
