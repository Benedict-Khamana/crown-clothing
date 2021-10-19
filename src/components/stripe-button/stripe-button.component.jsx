import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'EUR';
const fromEuroToCent = amount => amount * 100;
const publishableKey =
  'pk_test_51JmEIhCfPbHUu8rY8maKjyM6cOhRcIQWU2Kprdt7hAoysglqsc1hnu9xJQXudx4Dn0QgjiBxMahdMYXAOUwjKkud00q1o2SJLr';
const onToken = token => {
  console.log(token);
  alert('Payment Successful !');
};

const StripeCheckoutButton = ({ price }) => (
  <StripeCheckout
    label='Pay Now'
    name='Crown Clothing Ltd.'
    billingAddress
    shippingAddress
    image='https://stripe.com/img/documentation/checkout/marketplace.png'
    description={`Your total is € ${price}`}
    currency={CURRENCY}
    amount={fromEuroToCent(price)}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
    locale='en'
  />
);

export default StripeCheckoutButton;
