import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    subscriber_updates: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = SettingsSchema;
