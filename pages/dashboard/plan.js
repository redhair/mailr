import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading, Text } from '../../components/Typography';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Row, Column } from '../../components/Grid';
import InputField from '../../components/InputField';
import LoadingBlock from '../../components/LoadingBlock';
import Card from '../../components/Card';

import Alert from '../../components/Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { UserContext } from '../../components/UserProvider';

Plan.propTypes = {};

const FormWrapper = styled(Form)`
  max-width: 500px;
`;

const Check = styled.i`
  color: ${(props) => props.theme.primaryColor};
  font-size: 20px;
`;

const PricingColumn = styled(Column)`
  padding: 0 16px;

  @media (min-width: ${(props) => props.theme.xs}) {
    padding: 0;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    padding: 0 12px;
  }
`;

function Plan(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  console.log({ user });

  async function onSubmit(e) {
    console.log({ e }); //e.link

    // PUT to /user/id and change the link with
    // e.link
    // let res = await axios.put(`/api/users/${user._id}?action=editProfile`, { link: e.link });
    console.log({ res });
  }

  return (
    <Row canWrap align="flex-start" justify="flex-start" style={{ height: '100vh' }}>
      <Column xs={12} align="flex-start" justify="flex-start">
        <Heading level={2} style={{ marginBottom: '24px' }}>
          Plan Usage
        </Heading>
        <Card>
          <Row justify="space-between">
            <Heading style={{ margin: 0 }} level={2}>
              Plan: {user.plan}
            </Heading>
            <Heading style={{ margin: 0 }} level={2}>
              {user.subscribers.length} / 100 Subscribers
            </Heading>
          </Row>
        </Card>
      </Column>

      <Column xs={12} align="flex-start" justify="flex-start">
        <Heading level={2} style={{ marginBottom: '24px' }}>
          Upgrades
        </Heading>
      </Column>
      <Column xs={12} sm={6} md={4}>
        <Card>
          <Column>
            <Row canWrap>
              <Heading level={3} style={{ marginRight: '6px' }}>
                Influencer
              </Heading>
            </Row>
            <Row canWrap>
              <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                $9.99
              </Heading>
              <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text>
            </Row>
          </Column>
          <ul>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;1000 Subscriber limit</Text>
            </li>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;Unlimited free exports</Text>
            </li>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;Access to advanced real time growth analytics</Text>
            </li>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;Zero risk refund policy</Text>
            </li>
            <li>
              <Button level="primary">Upgrade</Button>
            </li>
          </ul>
        </Card>
      </Column>
      <Column xs={12} sm={6} md={4}>
        <Card>
          <Column>
            <Row canWrap>
              <Heading level={3} style={{ marginRight: '6px' }}>
                Thought Leader
              </Heading>
            </Row>
            <Row canWrap>
              <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                $19.99
              </Heading>
              <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text>
            </Row>
          </Column>{' '}
          <ul>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;10,000 Subscriber limit</Text>
            </li>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;Unlimited free exports</Text>
            </li>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;Access to advanced real time growth analytics</Text>
            </li>
            <li>
              <Check className="far fa-check-circle"></Check>
              <Text>&nbsp;Zero risk refund policy</Text>
            </li>
            <li>
              <Button level="primary">Upgrade</Button>
            </li>
          </ul>
        </Card>
      </Column>
    </Row>
  );
}

export default Plan;
