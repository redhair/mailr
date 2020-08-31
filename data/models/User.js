import mongoose from 'mongoose';
import SubscriberSchema from './Subscriber';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  subscribers: [SubscriberSchema],
});

module.exports = UserSchema;
