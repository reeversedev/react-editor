const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now()
  },
  data: String
});

module.exports = mongoose.model("Document", DocumentSchema);
