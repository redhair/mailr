import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '.';

storiesOf('Primitives|Checkbox', module).add('default', () => {
  return (
    <>
      <Checkbox checked={true} onChecked={() => {}} name="test" label="Uncheck me" />
      <Checkbox checked={false} onChecked={() => {}} name="test" label="Check me" />
    </>
  );
});
