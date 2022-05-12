const mongoose = require("mongoose");
const {Schema} = require("mongoose");


var appointmentSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
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
        type: Number,
        required: [true, "Contact Number is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    is_done: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
