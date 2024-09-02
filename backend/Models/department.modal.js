const mongoose = require("mongoose");
const { serviceSchema } = require("./service.model");
const { assetSchema } = require("./asset.model");

const departmentSchema = mongoose.Schema({
  departmentName: { type: String, require: true },
  asset: [assetSchema],
});

module.exports = { departmentSchema };
