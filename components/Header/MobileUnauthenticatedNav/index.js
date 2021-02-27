import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UnauthenticatedNav from '../UnauthenticatedNav';
import MobileHeaderWrapper from './MobileHeaderWrapper';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import MobileWrapper from './MobileWrapper';
import MobileNav from './MobileNav';
import MobileMenuBackdrop from './MobileMenuBackdrop';
import Button from '../../Button';
import Link from 'next/link';
import { Heading, Text } from '../../Typography';
import { Row } from '../../Grid';

MobileHeader.propTypes = {
  user: PropTypes.object,
  nav: PropTypes.array.isRequired,
  toggleMobileNav: PropTypes.func.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const NavList = styled.ol`
  list-style-type: circle;
  color: ${(props) => props.theme.textColor};
  width: 100%;
  margin-left: 12px;
  margin-top: -12px;
`;

function MobileHeader({ user, toggleMobileNav, mobileMenuOpen, signIn }) {
  const router = useRouter();

  return (
    <MobileHeaderWrapper justify="space-between" align="center">
      <MobileWrapper>
        <Hamburger onClick={toggleMobileNav} />
      </MobileWrapper>
      <Link href="/">
        <a>
          <Heading style={{ marginBottom: '0' }} level={1}>
            mailr
          </Heading>
        </a>
      </Link>
      <div></div>
      <MobileMenuBackdrop open={mobileMenuOpen} />
      <MobileMenu open={mobileMenuOpen}>
        <Row justify="space-between" align="center" style={{ marginBottom: '12px' }}>
          <Heading style={{ marginBottom: '0' }} level={1}>
            mailr
          </Heading>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              toggleMobileNav();
            }}
          >
            <Text bold>X</Text>
          </div>
        </Row>

        <MobileNav justify="flex-start">
          <Link href="/">Home</Link>

          <Link href="/login">Login</Link>

          <Link href="/pricing">Pricing</Link>
          {!!user && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <NavList style={{ listStyleType: 'circle' }}>
                <li>
                  <Link href="/dashboard/subscribers">Subscribers</Link>
                </li>
                <li>
                  <Link href="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/dashboard/analytics">Stats</Link>
                </li>
                <li>
                  <Link href="/dashboard/plan">Plan</Link>
                </li>
                <li>
                  <Link href="/dashboard/settings">Settings</Link>
                </li>
              </NavList>
            </>
          )}
        </MobileNav>
      </MobileMenu>
    </MobileHeaderWrapper>
  );
}

export default MobileHeader;
