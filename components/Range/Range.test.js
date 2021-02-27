import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '../ThemeProvider';
import Range from '.';

describe('<Range />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const prices = [4500, 2700, 2700, 2900];

    ReactDOM.render(
      <ThemeProvider>
        <Range name="price" items={prices} onRangeChange={() => console.log('change')} />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const prices = [1, 2];

    ReactDOM.render(
      <ThemeProvider>
        <Range name="price" items={prices} onRangeChange={() => console.log('change')} />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
