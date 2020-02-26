const mongoose = require('mongoose');

const schema = mongoose.Schema({
  circumferenceMax: {
    type: Number,
    required: true
  },
  diameterMax: {
    type: Number,
    required: true
  },
  mean: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  teacherId: {
    type: String
  }
});

module.exports = mongoose.model('Stats', schema);
