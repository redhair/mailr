import React from 'react';
import { create } from 'react-test-renderer';
import Button from '.';
import { ThemeProvider } from 'styled-components';

describe('Button', () => {
  it('Applies primary styles', () => {
    const tree = create(
      <ThemeProvider theme={{}}>
        <Button level="primary" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Applies secondary styles', () => {
    const tree = create(
      <ThemeProvider theme={{}}>
        <Button level="secondary" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Applies danger styles', () => {
    const tree = create(
      <ThemeProvider theme={{}}>
        <Button level="danger" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Applies outline styles', () => {
    const tree = create(
      <ThemeProvider theme={{}}>
        <Button level="outline" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders a full width button', () => {
    const tree = create(
      <ThemeProvider theme={{}}>
        <Button level="primary" fullWidth />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
