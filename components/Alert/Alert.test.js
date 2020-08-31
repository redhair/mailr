import React from 'react';
import ReactDOM from 'react-dom';
import Alert from '.';
import { ThemeProvider } from 'styled-components';

describe('<Alert />', () => {
  it('renders info alert', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Alert type="info">Hello World</Alert>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders success alert', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Alert type="success">Hello World</Alert>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders warning alert', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Alert type="warning">Hello World</Alert>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders danger alert', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Alert type="danger">Hello World</Alert>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders default alert', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Alert type="">Hello World</Alert>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
