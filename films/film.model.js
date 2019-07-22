const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  name: {
    type: String
  },
  yearRelease: {
    type: Number,
  },
  encodingFormat: {
    type: String,
  },
  actorList: {
    type: [String],
  }
});

module.exports = mongoose.model("Film", filmSchema);