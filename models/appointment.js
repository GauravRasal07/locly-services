const mongoose = require("mongoose");
const {Schema} = require("mongoose");


var appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    providerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    is_done: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
