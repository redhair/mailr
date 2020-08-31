import mongoMiddleware from '../../../lib/api/mongo-middleware';
import apiHandler from '../../../lib/api/api-handler';
import { getSession } from 'next-auth/client';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { link, email },
    body,
    method,
  } = req;

  const session = await getSession({ req });

  apiHandler(res, method, {
    GET: (response) => {
      if (link) {
        models.User.findOne({ link }, 'name link', (error, user) => {
          if (error) {
            response.status(500).json({ error });
            connection.close();
          } else {
            response.status(200).json(user);
            connection.close();
          }
        });
      } else if (email) {
        if (session) {
          models.User.findOne({ email }, (error, user) => {
            if (error) {
              response.status(500).json({ error });
              connection.close();
            } else {
              response.status(200).json(user);
              connection.close();
            }
          });
        } else {
          response.status(403).json({ error: 'Unauthorized' });
          connection.close();
        }
      } else {
        models.User.find({}, (error, user) => {
          if (error) {
            response.status(500).json({ error });
            connection.close();
          } else {
            response.status(200).json(user);
            connection.close();
          }
        });
      }
    },
    POST: (response) => {
      function generateLink() {
        return [...Array(6)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
      }

      models.User.create({ ...body, link: generateLink() }, (error, user) => {
        if (error) {
          response.status(500).json({ error });
          connection.close();
        } else {
          response.status(200).json(user);
          connection.close();
        }
      });
    },
  });
});
