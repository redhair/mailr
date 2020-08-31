import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Tab from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <Tab title="Login">
        <div>Login Form</div>
      </Tab>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
