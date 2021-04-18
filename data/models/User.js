import mongoose from 'mongoose';
import SubscriberSchema from './Subscriber';
import SettingsSchema from './Settings';
import { validateEmail } from '../../lib/validators/email';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
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
    plan: {
      type: String,
      enum: ['FREE', 'INFLUENCER', 'THOUGHT-LEADER'],
      default: 'FREE',
    },
    image: {
      type: String,
      default: 'https://mailr.s3.amazonaws.com/default_user.png',
    },
    subscribers: [SubscriberSchema],
    settings: SettingsSchema,
    viewCount: [{ uid: { type: String, required: true } }],
  },
  { timestamps: true }
);

module.exports = UserSchema;
