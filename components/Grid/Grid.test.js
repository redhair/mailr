import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Column } from '.';
import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <Container></Container>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <Row></Row>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <Column xs={12}></Column>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
