const mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema({
  serviceType: {
    type: String,
  },
  area: {
    type: String,
    required: [true, "Please enter area"],
  },
  basicCharges: {
    type: Number,
    required: [true, "Please enter basic charges"],
  },
  description: {
    type: String,
  },
  provider: {
    type: String,
    required: [true, "Please enter provider"],
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Service", serviceSchema);
