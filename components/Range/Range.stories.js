import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Range from '.';

storiesOf('Primitives|Range', module)
  .add('two values with distribution', () => {
    const prices = [4500, 2700, 2800, 3500, 2900];

    return (
      <Range
        withDistribution
        name="price"
        items={prices}
        defaultMin={3000}
        defaultMax={3500}
        onRangeChange={action('change')}
      />
    );
  })
  .add('single value', () => {
    const prices = [4500, 2700, 2800, 3500, 2900];

    return <Range withSingleValue name="price" items={prices} defaultValue={3000} onRangeChange={action('change')} />;
  });
