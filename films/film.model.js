const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  yearRelease: {
    type: Number,
    required: true
  },
  encodingFormat: {
    type: String,
    required: true,
    enum: ['VHS', 'DVD', 'Blu-Ray']
  },
  actorList: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Film", filmSchema);