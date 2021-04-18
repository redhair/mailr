import mongoMiddleware from '../../../lib/api/mongo-middleware';
import apiHandler from '../../../lib/api/api-handler';
import { getSession } from 'next-auth/client';

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

function getStripeAmountForPlan(plan) {
  if (plan === 'INFLUENCER') {
    return 999;
  } else if (plan === 'THOUGHT-LEADER') {
    return 1999;
  } else {
    return 0;
  }
}

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: {},
    body,
    method,
  } = req;

  const session = await getSession({ req });

  apiHandler(res, method, {
    GET: (response) => {
      // models.User.find({}, (error, user) => {
      //   if (error) {
      //     response.status(500).json({ error });
      //     connection.close();
      //   } else {
      //     response.status(200).json(user);
      //     connection.close();
      //   }
      // });
    },
    POST: async (response) => {
      const token = body.token;
      const plan = token.plan;
      console.log({ token });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: getStripeAmountForPlan(plan),
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
      });
      response.status(200).json({ paymentIntent });
      connection.close();
    },
  });
});
