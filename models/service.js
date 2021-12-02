const mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema({
  serviceType: {
    type: String,
  },
  area: {
    type: String,
    required: true,
  },
  basicCharges: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Service", serviceSchema);
