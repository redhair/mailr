import React from 'react';
import styled, { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button';
import { Row, Column } from '../Grid';
import { Heading, Text } from '../Typography';

const StripeForm = styled.form`
  .ElementsApp .InputContainer .InputElement {
    color: blue;
  }

  & label {
    color: white;
    font-weight: 900;
    letter-spacing: 0.025em;
  }

  & input,
  & .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 500px;
    padding: 14px 14px;
    font-size: 1em;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border: 0;
    outline: 0;
    border-radius: 4px;
    color: #5498ff;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 50px;

    & input,
    & span {
      color: white !important;
    }
  }

  & input::placeholder {
    color: white;
  }

  & input:focus,
  & .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  & .StripeElement.IdealBankElement,
  & .StripeElement.FpxBankElement,
  & .StripeElement.PaymentRequestButton {
    padding: 0;
  }

  & .InputContainer .InputElement {
    color: ${(props) => props.theme.textColor};
    /* font-family: ${(props) => props.theme.bodyFont}; */
  }
`;

// TODO replace stripe key
const stripePromise = loadStripe(
  'pk_test_51IPXhVLsjKpSIop7XB37uVUyZNg5urnmDoJoCwwl6hHlZXZ1DzoNf1it8MC1tHWbaq4wlN4zeSMYrXxzDEAqC6r90023EmIYVy'
);

Paywall.propTypes = {
  plan: PropTypes.oneOf(['FREE', 'INFLUENCER', 'THOUGHT-LEADER']),
};

function getPriceForPlan(plan) {
  if (plan === 'INFLUENCER') {
    return 9.99;
  } else if (plan === 'THOUGHT-LEADER') {
    return 19.99;
  }
}

function Paywall({ plan, onCompleted }) {
  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const theme = useTheme();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      console.log({ error, paymentMethod });

      onCompleted(error, paymentMethod);
    };

    return (
      <StripeForm style={{ width: '100%' }} onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                iconColor: theme.textColor,
                color: theme.textColor,
                lineHeight: '24px',
                fontWeight: 400,
                fontFamily: theme.bodyFont,
                fontSize: '18px',

                '::placeholder': {
                  color: '#CFD7E0',
                },
              },
            },
          }}
        />
        <Button level="primary" type="submit" disabled={!stripe}>
          Pay
        </Button>
      </StripeForm>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <Row align="flex-start" justify="flex-start">
        <Column xs={12} align="flex-start" justify="flex-start">
          <Heading level={3}>Upgrade 🚀</Heading>
          <Text>Plan: {plan}</Text>
          <Text>Price: ${getPriceForPlan(plan)}</Text>
          <Row align="flex-start" justify="flex-start" style={{ marginTop: '12px' }}>
            <Column xs={12} align="flex-start" justify="flex-start">
              <CheckoutForm />
            </Column>
          </Row>
        </Column>
      </Row>
    </Elements>
  );
}

export default Paywall;
