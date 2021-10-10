const mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema({
  serviceType: String,
  area: String,
  basicCharges: String,
  description: String,
  provider: String
});

module.exports = mongoose.model("Service", serviceSchema);