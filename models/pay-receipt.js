const mongoose = require("mongoose");

var receiptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Service Provider is required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    modeOfTransaction: {
        type: String,
        required: [true, "Mode of Transaction is required"]
    },
    receiptNumber: {
        type: Number, 
        required: [true, "Receipt Number is required"],
        unique: [true, "Receipt Number already exists"]
    }
});

module.exports = mongoose.model("Receipt", receiptSchema);
