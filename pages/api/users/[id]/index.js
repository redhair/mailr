import mongoMiddleware from '../../../../lib/api/mongo-middleware';
import apiHandler from '../../../../lib/api/api-handler';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { id, action },
    body,
    method,
  } = req;

  function generateLink() {
    return [...Array(6)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
  }

  function generateUniqueLink(proposedLink) {
    return models.User.findOne({ link: proposedLink })
      .then(function (account) {
        if (account) {
          console.log('Username not unique: ' + proposedLink);
          console.log('Trying again...');
          return generateUniqueLink(generateLink());
        }
        console.log('Found unique link: ' + proposedLink);
        return proposedLink;
      })
      .catch(function (err) {
        console.error(err);
        throw err;
      });
  }

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
    POST: async (response) => {
      try {
        if (action === 'createLink') {
          console.log('CREATING UNIQUE LINK FOR: ', id);
          models.User.findByIdAndUpdate(id, { link: await generateUniqueLink(generateLink()) }, { new: true }).exec(
            (error, user) => {
              if (error) {
                connection.close();
                response.status(500).json({ error });
              } else {
                response.status(200).json(user);
                connection.close();
              }
            }
          );
        }
      } catch (err) {
        console.log('Create Link Error: ', err);
      }
    },
    PUT: (response) => {
      models.User.update(
        { _id: id, 'subscribers.email': { $ne: body.subscriber.email } },
        {
          $addToSet: {
            subscribers: {
              email: body.subscriber.email,
              firstName: body.subscriber.firstName,
              lastName: body.subscriber.lastName,
            },
          },
        },
        { safe: true, upsert: true, new: true, runValidators: true },
        (error, user) => {
          if (error) {
            if (error.code === 11000) {
              //11000 means duplicate record
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
