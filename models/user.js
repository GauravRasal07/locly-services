const mongoose = require("mongoose");
const { Schema } = require("mongoose");

passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  // email: { type: String, unique: true, required: true },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Contact number is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  serviceProvider: {
    type: Boolean,
    default: false,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  password: {
    type: String,
    // required: [true, "Password is required"],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
