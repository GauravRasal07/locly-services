const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// mongoose.set("useFindAndModify", false);

passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // email: { type: String, unique: true, required: true },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
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
    required: true,
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
