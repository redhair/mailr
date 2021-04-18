import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Heading, Text } from '../components/Typography';
import { Row, Column, Container } from '../components/Grid';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Range from '../components/Range';
import { ModalContext } from '../components/ModalProvider';
import { useSession } from 'next-auth/client';
import Paywall from '../components/Paywall';
import axios from 'axios';

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
  background: ${(props) => props.theme.backgroundColor};
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
  const [subscribers, setSubscribers] = useState(3000);
  const { showModal, setModalContent } = useContext(ModalContext);
  const [session, loading] = useSession();
  const router = useRouter();

  console.log({ session });

  function registerPayingUser(token) {
    return axios.post('/api/stripe', { token });
  }

  function handleUpgradePlan(plan) {
    if (!!session) {
      setModalContent(
        <Paywall
          // stripeKey={process.env.REACT_APP_STRIPE_KEY}
          onCompleted={async (stripeError, stripeToken) => {
            if (stripeError) {
              console.error({ stripeError });
              // return onError(stripeError);
              return;
            }

            if (stripeToken) {
              try {
                let res = await registerPayingUser(stripeToken);
                // if token successfully saved, set to active
                if (res.status === 200) {
                  upgradePlanTo(plan);
                }
              } catch (err) {
                console.error('Error registering paid user: ', { err });
              }
            } else {
              upgradePlanTo(plan);
            }
          }}
          plan={plan}
        />
      );
      showModal();
    } else {
      //redirect to login
      // router.push('/login');
    }
  }

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
      <Row align="flex-start" style={{ marginTop: '75px' }}>
        <Container>
          <Heading level={2} style={{ marginBottom: '36px' }}>
            Features and benefits
          </Heading>
          {/* <Button level="outline">Monthly</Button>
          <Button level="outline">Yearly</Button> */}
          <Row align="flex-start" canWrap>
            <PricingColumn xs={12} sm={12} md={4}>
              <PricingCard>
                <Column>
                  <Row canWrap>
                    <Heading level={3} style={{ marginRight: '6px' }}>
                      Free
                    </Heading>
                  </Row>
                  <Row canWrap>
                    <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                      $0.00
                    </Heading>
                    {/* <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text> */}
                  </Row>
                </Column>
                <ul>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Auto-generated mailr link</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;1,000 Subscriber limit</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Unlimited free exports</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;Access to real time growth metrics</Text>
                  </li>
                  <li>
                    <Button level="primary">Create account</Button>
                  </li>
                </ul>
              </PricingCard>
            </PricingColumn>
            <PricingColumn xs={12} sm={12} md={4}>
              <PricingCard>
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
                    <Text>&nbsp;Custom mailr link</Text>
                  </li>
                  <li>
                    <Check className="far fa-check-circle"></Check>
                    <Text>&nbsp;5,000 Subscriber limit</Text>
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
                    <Button onClick={() => handleUpgradePlan('INFLUENCER')} level="primary">
                      Get Started
                    </Button>
                  </li>
                </ul>
              </PricingCard>
            </PricingColumn>
            <PricingColumn xs={12} sm={12} md={4}>
              <PricingCard>
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
                  <li>
                    <Button onClick={() => handleUpgradePlan('THOUGHT-LEADER')} level="primary">
                      Get Started
                    </Button>
                  </li>
                </ul>
              </PricingCard>
            </PricingColumn>
          </Row>
        </Container>
      </Row>
      <Row align="flex-start" style={{ marginTop: '75px' }}>
        <Container>
          <Heading level={2} style={{ marginBottom: '36px' }}>
            Estimate your cost
          </Heading>
          <Text>
            A Subscriber is an email address that is subscribed to your mailing list. Choose exactly how many
            subscribers you wish to have and don't pay for what you don't need.
          </Text>
          <PricingCard style={{ marginTop: '50px' }}>
            <Row style={{ height: 'auto' }} canWrap>
              <Column xs={12} sm={8} style={{ height: 'auto' }}>
                <Range
                  withSingleValue
                  step={5000}
                  name="subscribers"
                  defaultValue={5000}
                  items={[5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]}
                  onRangeChange={(value) => {
                    setSubscribers(value);
                  }}
                />
              </Column>
              <Column xs={12} sm={4}>
                <Heading level={3} style={{ marginBottom: '0px' }}>
                  {Number(subscribers).toLocaleString()}
                </Heading>
                <Text>Subscribers</Text>
              </Column>
            </Row>
            <Row align="flex-start" style={{ marginTop: '50px' }} canWrap>
              <PricingColumn xs={12} sm={12} md={6}>
                <PricingCard>
                  <Column>
                    <Row canWrap>
                      <Heading level={3} style={{ marginRight: '6px' }}>
                        Influencer
                      </Heading>
                    </Row>
                    <Row canWrap>
                      <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                        ${(9.99 + parseInt(subscribers / 5) * 0.01 - 10).toFixed(2)}
                      </Heading>
                      <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text>
                    </Row>
                  </Column>
                  <ul>
                    <li>
                      <Check className="far fa-check-circle"></Check>
                      <Text>&nbsp;Custom mailr link</Text>
                    </li>

                    <li>
                      <Check className="far fa-check-circle"></Check>
                      <Text>&nbsp;Unlimited free exports</Text>
                    </li>

                    <li>
                      <Check className="far fa-check-circle"></Check>
                      <Text>&nbsp;Zero risk refund policy</Text>
                    </li>
                    <li>
                      <Button level="primary">Get Started</Button>
                    </li>
                  </ul>
                </PricingCard>
              </PricingColumn>
              <PricingColumn xs={12} sm={12} md={6}>
                <PricingCard>
                  <Column>
                    <Row canWrap>
                      <Heading level={3} style={{ marginRight: '6px' }}>
                        Thought Leader
                      </Heading>
                    </Row>
                    <Row canWrap>
                      <Heading style={{ marginBottom: 0, color: '#0070f3' }} level={3}>
                        ${(19.99 + parseInt(subscribers / 5) * 0.01 - 10).toFixed(2)}
                      </Heading>
                      <Text style={{ color: 'rgb(153 157 166)' }}>&nbsp;per month</Text>
                    </Row>
                  </Column>
                  <ul>
                    <li>
                      <Check className="far fa-check-circle"></Check>
                      <Text>&nbsp;Custom mailr link</Text>
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
                      <Button level="primary">Get Started</Button>
                    </li>
                  </ul>
                </PricingCard>
              </PricingColumn>
            </Row>
          </PricingCard>
        </Container>
      </Row>
    </>
  );
}
