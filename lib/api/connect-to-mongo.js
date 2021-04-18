import mongoose from 'mongoose';

// we'll import all the schemas here and return them
// on the mongo connection object
// for use in the handlers
import UserSchema from '../../data/models/User';
import SubscriberScema from '../../data/models/Subscriber';

const connectToMongo = async () => {
  const connection = await mongoose.createConnection(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
  });

  const User = connection.model('User', UserSchema);
  const Subscriber = connection.model('Subscriber', SubscriberScema);

  return {
    connection,
    models: {
      User,
      Subscriber,
    },
  };
};

export default connectToMongo;
