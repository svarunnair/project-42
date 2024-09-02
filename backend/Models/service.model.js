const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  url: { type: String, require: true },

});

const serviceSchema = mongoose.Schema({
  issue: { type: String, require: true },
  image: [imageSchema],
  description: { type: String, require: true },
  status: { type: String, require: true },
});


module.exports= {serviceSchema,imageSchema}