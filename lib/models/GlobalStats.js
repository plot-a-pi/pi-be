const mongoose = require('mongoose');

const schema = mongoose.Schema({
  count: {
    type: Number,
    required: true
  },
  mean: {
    type: Number,
    required: true
  },
  circumferenceMax: {
    type: Number,
    required: true
  },
  diameterMax: {
    type: Number,
    required: true
  },
  piApproximationsArray: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Stats', schema);
