import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import { ThemeProvider } from 'styled-components';

describe('Menu', () => {
  it('renders open menu', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Menu open={true} />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders closed menu', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Menu open={false} />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
