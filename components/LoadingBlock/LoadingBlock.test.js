import React from 'react';
import ReactDOM from 'react-dom';
import LoadingBlock from '.';
import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <LoadingBlock />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <LoadingBlock quiet />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <LoadingBlock quiet small />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <LoadingBlock color="blue" />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
