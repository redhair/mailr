import mongoose from 'mongoose';
const arrayUniquePlugin = require('mongoose-unique-array');

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

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
      unique: true,
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
  },
  { timestamps: true }
);

SubscriberSchema.plugin(arrayUniquePlugin);

module.exports = SubscriberSchema;
