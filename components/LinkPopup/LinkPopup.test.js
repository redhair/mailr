import React from 'react';
import ReactDOM from 'react-dom';
import LinkPopup from '.';
import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <LinkPopup />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
