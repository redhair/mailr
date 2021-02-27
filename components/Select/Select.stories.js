import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '.';

storiesOf('Primitives|Searchbox', module).add('default', () => {
  const items = [
    { name: 'rutgers', value: 'rutgers_slug' },
    { name: 'rowan', value: 'rowan_slug' },
    { name: 'tcnj', value: 'tcnj_slug' },
    { name: 'Rutgers', value: 'rutgers_slug' },
    { name: 'RoWaN', value: 'rowan_slug' },
    { name: 'TCNJ', value: 'tcnj_slug' },
  ];

  return (
    <Select
      onItemClick={(e) => console.log(e.target.name, e.target.value)}
      items={items}
      name="school"
      hideLabel
      placeholder="School"
      label="School"
    ></Select>
  );
});
