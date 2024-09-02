const mongoose = require("mongoose");
const { serviceSchema } = require("./service.model");


const assetSchema = mongoose.Schema({
  assetName: { type: String, require: true },
  service: [serviceSchema],
});

module.exports = { assetSchema };


