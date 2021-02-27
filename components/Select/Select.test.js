import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '../ThemeProvider';
import Select from '.';
import { Container, Row } from '../Grid';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const items = [
    { name: 'rutgers', value: 'rutgers_slug' },
    { name: 'rowan', value: 'rowan_slug' },
    { name: 'tcnj', value: 'tcnj_slug' },
  ];

  ReactDOM.render(
    <ThemeProvider>
      <Container>
        <Row>
          <Select
            onItemClick={(item) => console.log(item.name)}
            items={items}
            name="school"
            hideLabel
            placeholder="School"
            label="School"
          ></Select>
        </Row>
      </Container>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
