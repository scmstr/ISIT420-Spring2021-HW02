// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const ChipSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    required: true
  },
  eaten: {
    type: Boolean,
    required: true
  },
  brand: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Chips", ChipSchema);