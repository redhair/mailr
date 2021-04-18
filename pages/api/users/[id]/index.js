import nodemailer from 'nodemailer';
import mongoMiddleware from '../../../../lib/api/mongo-middleware';
import apiHandler from '../../../../lib/api/api-handler';
import { html, text } from '../../../../templates/newSubscriber';
import { uuid } from 'uuidv4';

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
          models.User.findByIdAndUpdate(id, { link: await generateUniqueLink(body.link) }, { new: true }).exec(
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
      console.log('PUT User');
      if (action === 'editProfile') {
        models.User.findOneAndUpdate({ _id: id }, { ...body }, (error, user) => {
          console.log(error, user);
          if (error) {
            return response.status(500).json({ error });
          }

          return response.status(200).json({ user });
        });
      } else if (action === 'pageView') {
        const viewId = { uid: req.cookies.cookieName }; //uuidv4();

        models.User.findOneAndUpdate({ _id: id }, { $addToSet: { viewCount: viewId } }, (error, user) => {
          if (error) {
            console.log('Page View Error', error);
          }

          console.log('Successfully recorded page view for: ', id);
        });
      } else {
        models.User.findOneAndUpdate(
          { _id: id, 'subscribers.email': { $ne: body.subscriber.email } },
          {
            $addToSet: {
              subscribers: {
                email: body.subscriber.email,
                firstName: body.subscriber.firstName,
                lastName: body.subscriber.lastName,
                created_at: new Date(),
              },
            },
          },
          { safe: true, upsert: true, new: true, runValidators: true },
          (error, user) => {
            console.log({ error, user });
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
              //send email to user
              console.log('Sending email to:', user.email);
              const emailHost = 'smtp.sendgrid.net';
              const emailUsername = 'apikey'; // <- don't replace "apikey" it's the actual username
              const emailPassword = process.env.SENDGRID_API_KEY;
              nodemailer.createTransport(`smtp://${emailUsername}:${emailPassword}@${emailHost}:587`).sendMail(
                {
                  to: user.email,
                  from: 'support@mailr.link',
                  subject: `You have a new subscriber! 🎉`,
                  text: text({ name: user.name }),
                  html: html({ name: user.name }),
                },
                (error) => {
                  if (error) {
                    console.error('SEND_VERIFICATION_EMAIL_ERROR', user.email, error);
                    connection.close();
                    response.status(500).json({ message: 'SEND_VERIFICATION_EMAIL_ERROR', error });
                  }
                  connection.close();
                  response.status(200).json({ message: 'Successfully added subscriber' });
                }
              );
            }
          }
        );
      }
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
