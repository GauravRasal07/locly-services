const mongoose = require("mongoose");

var receiptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    modeOfTransaction: {
        type: String,
        required: true
    },
    receiptNumber: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Receipt", receiptSchema);
