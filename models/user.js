const mongoose = require("mongoose");

// mongoose.set("useFindAndModify", false);

passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  contactNumber: String,
  isAdmin: { type: Boolean, default: false },
  serviceProvider: { type: Boolean, default: false },
  providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Serviceprovider"
  },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
