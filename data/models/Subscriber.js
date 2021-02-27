import mongoose from 'mongoose';
const arrayUniquePlugin = require('mongoose-unique-array');
import { validateEmail } from '../../lib/validators/email';

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email address is required'],
      validate: {
        validator: validateEmail,
        message: 'Please fill a valid email address',
      },
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    signUpSource: String,
    created_at: Date,
  },
  { timestamps: true }
);

SubscriberSchema.plugin(arrayUniquePlugin);

module.exports = SubscriberSchema;
