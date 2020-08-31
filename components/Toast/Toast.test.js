import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '.';
import { ThemeProvider } from 'styled-components';

describe('Toast', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Toast />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
