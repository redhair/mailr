import React from 'react';
import ReactDOM from 'react-dom';
import Interface from '.';
import { ThemeProvider } from 'styled-components';

describe('Interface', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Interface />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
