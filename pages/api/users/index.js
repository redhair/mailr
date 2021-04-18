import mongoMiddleware from '../../../lib/api/mongo-middleware';
import apiHandler from '../../../lib/api/api-handler';
import { getSession } from 'next-auth/client';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { link, email, action },
    body,
    method,
  } = req;

  const session = await getSession({ req });

  function checkUniqueLink(proposedLink) {
    return models.User.findOne({ link: proposedLink })
      .then(function (account) {
        if (account) {
          console.log('Username not unique: ' + proposedLink);

          return false;
        }

        console.log('Found unique link: ' + proposedLink);
        return true;
      })
      .catch(function (err) {
        console.error(err);
        throw err;
      });
  }

  function checkUniqueEmail(proposedEmail) {
    return models.User.findOne({ email: proposedEmail })
      .then(function (account) {
        if (account) {
          console.log('Email not unique: ' + proposedEmail);

          return false;
        }

        console.log('Found unique email: ' + proposedEmail);
        return true;
      })
      .catch(function (err) {
        console.error(err);
        throw err;
      });
  }

  apiHandler(res, method, {
    GET: (response) => {
      // console.log({ link });
      if (link) {
        models.User.findOne({ link }, 'name image link', (error, user) => {
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
        // TODO delete this route. Admins only
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
    POST: async (response) => {
      if (action === 'checkLink') {
        console.log('CHECKING UNIQUE LINK');
        let isUnique = await checkUniqueLink(body.link);
        console.log('isUnque?', { link: body.link, isUnique });
        if (isUnique) {
          return await response.status(200).json({ message: 'Link is unique' });
        } else {
          return await response.status(500).json({ error: 'This link is not unique' });
        }
      } else if (action === 'checkEmail') {
        console.log('CHECKING UNIQUE EMAIL');
        let isUnique = await checkUniqueEmail(body.email);
        console.log('isUnque?', { email: body.email, isUnique });
        if (isUnique) {
          return await response.status(200).json({ message: 'Email is unique' });
        } else {
          return await response.status(500).json({ error: 'This email is not unique' });
        }
      } else {
        console.log('CREATE USER CALLED: ', { body });
        await models.User.create({ ...body }, (error, user) => {
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
  });
});
