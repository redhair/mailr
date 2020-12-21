import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { signin } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Container, Row, Column } from '../Grid';
import { Heading, Text } from '../Typography';

AccessDenied.propTypes = {};

function AccessDenied(props) {
  const router = useRouter();
  return (
    <Container>
      <Row>
        <Column xs={12} align="center" justify="center">
          <Heading level={3}>Unauthorized</Heading>
          <Text>You are not authorized to access this page. Please sign in to see this page.</Text>
          <Button level="primary" onClick={() => router.push('/login')}>
            Sign in
          </Button>
        </Column>
      </Row>
    </Container>
  );
}

export default AccessDenied;
