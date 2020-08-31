import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '../components/Typography';
import { Row, Column } from '../components/Grid';
const Card = styled.a`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: center;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  & h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  & p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;
export default function Pricing() {
  return (
    <>
      <Row justify="center">
        <Column xs={12} sm={7} align="flex-start">
          <Heading level={1}>Free until you make it big.</Heading>
          <p>
            <Text type="normal">
              We know first hand how hard it is to “make it” as a creator. That’s why we offer a generous free tier for
              you to get started. Take your time and focus on doing what you do best! When you grow out of your plan we
              will send you a message reminding you to upgrade.
            </Text>
          </p>
        </Column>
      </Row>
      <Row align="flex-start">
        <Column xs={12} sm={4} justify="center">
          <Card href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <img
              style={{ marginBottom: '24px' }}
              width="100"
              src="https://img.icons8.com/cotton/500/000000/love-for-money.png"
            />
            <Heading style={{ marginBottom: '24px' }} level={3}>
              Free &rarr; $0/mo
            </Heading>
            <ul style={{ textAlign: 'left' }}>
              <li>
                <Text type="normal">Auto-generated Mailr Link</Text>
              </li>
              <li>
                <Text type="normal">100 Subscriber limit</Text>
              </li>
              <li>
                <Text type="normal">Unlimited free exports</Text>
              </li>
              <li>
                <Text type="normal">Real time Analytics</Text>
              </li>
            </ul>
          </Card>
        </Column>
        <Column xs={12} sm={4}>
          <Card href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <img style={{ marginBottom: '24px' }} width="100" src="https://img.icons8.com/cotton/500/000000/idea.png" />
            <Heading style={{ marginBottom: '24px' }} level={3}>
              Influencer &rarr; $10/mo
            </Heading>
            <ul style={{ textAlign: 'left' }}>
              <li>
                <Text type="normal">Custom Mailr Link</Text>
              </li>
              <li>
                <Text type="normal">1,000 Subscriber limit</Text>
              </li>
              <li>
                <Text type="normal">Unlimited free exports</Text>
              </li>
              <li>
                <Text type="normal">Real time Analytics</Text>
              </li>
            </ul>
          </Card>
        </Column>
        <Column xs={12} sm={4}>
          <Card href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <img
              style={{ marginBottom: '24px' }}
              width="100"
              src="https://img.icons8.com/cotton/500/000000/brain-3.png"
            />

            <Heading style={{ marginBottom: '24px' }} level={3}>
              Thought Leader &rarr; $100/mo
            </Heading>
            <ul style={{ textAlign: 'left' }}>
              <li>
                <Text type="normal">Custom Mailr Link</Text>
              </li>
              <li>
                <Text type="normal">Unlimited Subscribers</Text>
              </li>
              <li>
                <Text type="normal">Unlimited free exports</Text>
              </li>
              <li>
                <Text type="normal">Real Time Analytics</Text>
              </li>
              <li>
                <Text type="normal">Custom landing page</Text>
              </li>
            </ul>
          </Card>
        </Column>
      </Row>
    </>
  );
}
