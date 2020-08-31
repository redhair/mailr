import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../Typography';
import DesktopHeaderWrapper from './DesktopHeaderWrapper';
import Avatar from './Avatar';
import Menu from './Menu';
import Nav from './Nav';
import AuthenticatedNav from './AuthenticatedNav';
import Button from '../../Button';
import { Heading } from '../../Typography';
import Link from 'next/link';

DesktopHeader.propTypes = {
  user: PropTypes.object,
  nav: PropTypes.array.isRequired,
  toggleOptions: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

function DesktopHeader({ user, nav, toggleOptions, menuOpen, signOut }) {
  return (
    <DesktopHeaderWrapper>
      <Link href="/">
        <a>
          <Heading style={{ marginBottom: '0' }} level={2}>
            mailr
          </Heading>
        </a>
      </Link>

      <Nav>
        <AuthenticatedNav onClick={toggleOptions}>
          <Text style={{ fontWeight: '900', color: 'black' }}>Hi, {!!user.name && user.name}!</Text>
          <Avatar src={user.image} alt="Profile Avatar" />

          <Menu
            open={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {nav.length > 0 &&
              nav.map((l) => {
                return (
                  <Link key={l.name} href={l.href}>
                    <a onClick={toggleOptions}>{l.name}</a>
                  </Link>
                );
              })}
            <Button level="link" onClick={signOut}>
              <Text style={{ color: '#334150' }}>Logout</Text>
            </Button>
          </Menu>
        </AuthenticatedNav>
      </Nav>
    </DesktopHeaderWrapper>
  );
}

export default DesktopHeader;
