import mongoMiddleware from '../../../lib/api/mongo-middleware';
import apiHandler from '../../../lib/api/api-handler';
import { getSession } from 'next-auth/client';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { id },
    body,
    method,
  } = req;

  apiHandler(res, method, {
    GET: (response) => {
      models.User.findById(id, (error, user) => {
        if (error) {
          response.status(500).json({ error });
          connection.close();
        } else {
          response.status(200).json(user);
          connection.close();
        }
      });
    },
    POST: (response) => {
      models.User.findByIdAndUpdate(id, body, { new: true }).exec((error, user) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(user);
          connection.close();
        }
      });
    },
    PUT: (response) => {
      models.User.update(
        { _id: id, 'subscribers.email': { $ne: body.subscriber } },
        { $push: { subscribers: { email: body.subscriber } } },
        { safe: true, upsert: true, new: true, runValidators: true },
        (error, user) => {
          if (error) {
            if (error.code === 11000) {
              connection.close();
              response.status(500).json({ error: 'You are already subscribed to this mailing list' });
            } else {
              connection.close();
              response.status(500).json({ error });
            }
          } else {
            console.log('SUCCESSFUL UPDATE: ', { user });
            response.status(200).json({ message: 'Successfully added subscriber' });
            connection.close();
          }
        }
      );
    },
    DELETE: (response) => {
      models.User.findByIdAndDelete(id, (error, user) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json({ user });
          connection.close();
        }
      });
    },
  });
});
