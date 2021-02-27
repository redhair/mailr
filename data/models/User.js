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
    subscribers: [SubscriberSchema],
    settings: SettingsSchema,
    viewCount: [{ uid: { type: String, required: true } }],
  },
  { timestamps: true }
);

module.exports = UserSchema;
