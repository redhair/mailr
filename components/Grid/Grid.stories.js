import React from 'react';
import { storiesOf } from '@storybook/react';
import { Container, Row, Column } from '.';

storiesOf('Primitives|Grid', module).add('default', () => {
  return (
    <Container style={{ border: '5px solid green' }}>
      <Row canWrap={true} style={{ border: '5px solid red' }}>
        <Column xs={2} sm={4} md={6} lg={10} xl={12} style={{ border: '5px solid blue' }}>
          xs=2 sm=4 md=6 lg=10 xl=12
        </Column>
        <Column xs={2} sm={4} md={6} lg={10} xl={12} style={{ border: '5px solid blue' }}>
          xs=2 sm=4 md=6 lg=10 xl=12
        </Column>
        <Column xs={2} sm={4} md={6} lg={10} xl={12} style={{ border: '5px solid blue' }}>
          xs=2 sm=4 md=6 lg=10 xl=12
        </Column>
        <Column xs={2} sm={4} md={6} lg={10} xl={12} style={{ border: '5px solid blue' }}>
          xs=2 sm=4 md=6 lg=10 xl=12
        </Column>
      </Row>
    </Container>
  );
});
