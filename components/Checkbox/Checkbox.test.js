import React from 'react';
import { create } from 'react-test-renderer';
import 'jest-styled-components';
import Checkbox from '.';
import ThemeProvider from '../ThemeProvider';

describe('Button', () => {
  it('Renders a checkbox', () => {
    const tree = create(
      <ThemeProvider>
        <Checkbox checked={true} name="test" label="Check Me" onChecked={() => {}} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
