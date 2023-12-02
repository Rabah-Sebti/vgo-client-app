const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  // name: String,
  data: String,
  // contentType: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;