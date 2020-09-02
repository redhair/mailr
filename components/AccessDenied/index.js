import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { signin } from 'next-auth/client';

AccessDenied.propTypes = {};

function AccessDenied(props) {
  return (
    <div>
      <Button level="primary" onClick={() => signin()}>
        Sign in
      </Button>
    </div>
  );
}

export default AccessDenied;
