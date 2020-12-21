import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '../components/Typography';
import { Row, Column, Container } from '../components/Grid';
import Badge from '../components/Badge';

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

const PricingCard = styled.div`
  & ul {
    list-style: none;
    padding: 0;
    list-style-position: outside;
  }

  & li {
    font-size: 20px;
    margin-bottom: 10px;
    list-style-position: inside;
    padding-left: 25px;

    & i {
      margin-left: -25px;
    }
  }

  padding: 40px;
  margin-bottom: 25px;
  position: relative;
  background: white;
  /* width: 100%; */
  min-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 3px 49px 0px rgba(24, 38, 107, 0.16);
  box-sizing: border-box;

  @media (min-width: ${(props) => props.theme.xs}) {
    padding: 20px;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 40px;
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
        <Container>
          <Heading level={2}>Features and pricing</Heading>
          {/* <Button level="outline">Monthly</Button>
          <Button level="outline">Yearly</Button> */}
          <Row align="flex-start" canWrap>
            <PricingColumn xs={12} sm={12} md={4}>
              <PricingCard>
                <Column>
                  <Row canWrap>
                    <Heading level={5} style={{ marginRight: '6px' }}>
                      Free
                    </Heading>
                  </Row>
                  <Row canWrap>
                    <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                      $0.00
                    </Heading>
                    <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text>
                  </Row>
                </Column>
                <ul>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Auto-generated mailr link</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;100 Subscriber limit</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Unlimited free exports</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Access to real time growth metrics</Text>
                  </li>
                </ul>
              </PricingCard>
            </PricingColumn>
            <PricingColumn xs={12} sm={12} md={4}>
              <PricingCard>
                <Column>
                  <Row canWrap>
                    <Heading level={5} style={{ marginRight: '6px' }}>
                      Influencer
                    </Heading>
                  </Row>
                  <Row canWrap>
                    <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                      $99.99
                    </Heading>
                    <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text>
                  </Row>
                </Column>
                <ul>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>
                      &nbsp;Bleeding edge AI powered digital marketing that connects thousands of students to landlords
                      every month
                    </Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Ability to list on our high performance student-facing site</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;State of the art, aggressively audited SEO best practices</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Access to Premium Listings</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Call and email metrics</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Ability to recieve inqueries from our pool of qualified student leads</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Zero risk refund policy</Text>
                  </li>
                </ul>
              </PricingCard>
            </PricingColumn>
            <PricingColumn xs={12} sm={12} md={4}>
              <PricingCard>
                <Column>
                  <Row canWrap>
                    <Heading level={5} style={{ marginRight: '6px' }}>
                      Thought Leader
                    </Heading>
                  </Row>
                  <Row canWrap>
                    <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                      $199.99
                    </Heading>
                    <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month*</Text>
                  </Row>
                </Column>{' '}
                <ul>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Highest placement in the feed</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Top 5 listings per school get promoted on the homepage</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>
                      &nbsp;Top 2 listings per school get our <b>Highly Recommended</b> card and badge
                    </Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Premium listing banner</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>
                      &nbsp;Bleeding edge AI powered digital marketing that connects thousands of students to landlords
                      every month
                    </Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Ability to list on our high performance student-facing site</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;State of the art, aggressively audited SEO best practices</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Access to Premium Listings</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Call and email metrics</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Ability to recieve inqueries from our pool of qualified student leads</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Zero risk refund policy</Text>
                  </li>
                </ul>
              </PricingCard>
            </PricingColumn>
          </Row>
        </Container>
      </Row>
    </>
  );
}
