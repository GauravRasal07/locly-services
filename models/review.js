const mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    review: {
        type: String,
        required: [true, "Review message is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);
