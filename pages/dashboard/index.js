import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../components/Typography';
import { Row, Column } from '../../components/Grid';
import Card from '../../components/Card';

Dashboard.propTypes = {};

const NumberedList = styled.ol`
  padding: 0;
  & li {
    color: ${(props) => props.theme.textColor};
    font-family: ${(props) => props.theme.bodyFont};
    font-size: 16px;
  }
`;

function Dashboard(props) {
  return (
    <Row align="flex-start" justify="flex-start" style={{ height: '100vh' }}>
      <Column xs={12} align="flex-start" justify="flex-start">
        <Heading level={2} style={{ marginBottom: '24px' }}>
          Here's your weekly breakdown.
        </Heading>
        <Row canWrap align="flex-start">
          <Column style={{ paddingRight: '24px' }} xs={12} sm={6}>
            <Card>
              <Heading level={3}>Percent Growth</Heading>
              <Text>+30%</Text>
            </Card>
          </Column>
          <Column xs={12} sm={6}>
            <Card>
              <Heading level={3}>Subscribers</Heading>
              <Text>+3</Text>
            </Card>
          </Column>
          <Column style={{ paddingRight: '24px' }} xs={12} sm={6}>
            <Card>
              <Heading level={3}>Top Refferers</Heading>
              <NumberedList>
                <li>
                  <Text>youtube.com</Text>
                </li>
                <li>
                  <Text>youtube.com</Text>
                </li>
                <li>
                  <Text>youtube.com</Text>
                </li>
                <li>
                  <Text>youtube.com</Text>
                </li>
                <li>
                  <Text>youtube.com</Text>
                </li>
              </NumberedList>
            </Card>
          </Column>
          <Column xs={12} sm={6}>
            <Card>
              <Heading level={3}>Total Visits</Heading>
              <Text>500 visits</Text>
            </Card>
          </Column>
          <Column xs={12} sm={6}>
            <Card>
              <Heading level={3}>Conversion Rate</Heading>
              <Text>50%</Text>
            </Card>
          </Column>
          <Column xs={12} sm={6}>
            <Card>
              <Heading level={3}>Newest Subscriber</Heading>
              <Text>tombonanni@gmail.com</Text>
            </Card>
          </Column>
        </Row>
      </Column>
    </Row>
  );
}

export default Dashboard;
