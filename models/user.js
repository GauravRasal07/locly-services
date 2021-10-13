const mongoose = require("mongoose");
const {Schema} = require("mongoose");

// mongoose.set("useFindAndModify", false);

passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    // email: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    contactNumber: String,
    isAdmin: { type: Boolean, default: false },
    serviceProvider: { type: Boolean, default: false },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: "Service"
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref:"Appointment"
      }
    ],
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
