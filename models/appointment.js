const mongoose = require("mongoose");
const {Schema} = require("mongoose");


var appointmentSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    date: Date,
    is_done: { type: Boolean, default: false },
    providerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
