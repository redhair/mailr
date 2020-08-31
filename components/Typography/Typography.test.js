import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Heading, Text } from '.';

describe('<Heading />', () => {
  it('renders level 1 heading', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Heading level={1}>Heading 1</Heading>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders level 2 heading', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Heading level={2}>Heading 2</Heading>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders level 3 heading', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Heading level={3}>Heading 3</Heading>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders level 4 heading', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Heading level={4}>Heading 4</Heading>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders level 5 heading', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Heading level={5}>Heading 5</Heading>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<Text />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Text>text</Text>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <ThemeProvider theme={{}}>
        <Text type="normal">text</Text>
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
