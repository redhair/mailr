import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../ModalProvider';

import Wrapper from './Wrapper';
import DesktopHeader from './DesktopHeader';
import { useRouter } from 'next/router';

import UnauthenticatedNav from './UnauthenticatedNav';
import MobileUnauthenicatedNav from './MobileUnauthenticatedNav';

Header.propTypes = {
  user: PropTypes.object,
  isFixed: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default function Header({ user, isFixed, signIn, loading, signOut }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { showModal, setModalContent } = useContext(ModalContext);
  const router = useRouter();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (mobileMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  function toggleMobileNav() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function toggleOptions() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <Wrapper isFixed={isFixed}>
        {!!user ? (
          <>
            <DesktopHeader
              loading={loading}
              user={user}
              signOut={signOut}
              menuOpen={menuOpen}
              toggleOptions={toggleOptions}
            />
            <MobileUnauthenicatedNav
              toggleMobileNav={toggleMobileNav}
              mobileMenuOpen={mobileMenuOpen}
              signIn={signIn}
              user={user}
            />
          </>
        ) : (
          <>
            <UnauthenticatedNav signIn={signIn} />
            <MobileUnauthenicatedNav
              toggleMobileNav={toggleMobileNav}
              mobileMenuOpen={mobileMenuOpen}
              signIn={signIn}
            />
          </>
        )}
      </Wrapper>
    </>
  );
}
