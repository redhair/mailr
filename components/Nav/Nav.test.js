import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '.';
import { ThemeProvider } from 'styled-components';

describe('Nav', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Nav />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
