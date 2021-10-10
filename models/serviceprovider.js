const mongoose = require("mongoose");

var serviceproviderSchema = new mongoose.Schema({
    serviceType: String,
    area: String,
    basicCharges: String
})