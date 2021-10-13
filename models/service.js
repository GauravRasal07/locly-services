const mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema({
    serviceType: String,
    area: String,
    basicCharges: String,
    description: String,
    provider: String,
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    } 
});

module.exports = mongoose.model("Service", serviceSchema);