const mongoose = require('mongoose');

const schema = mongoose.Schema({
  circumference: {
    type: Number,
    required: true
  },
  diameter: {
    type: Number,
    required: true
  },
  circumferenceUnit: {
    type: String,
    required: true,
    enum: ['cm', 'in', 'm', 'ft']
  },
  diameterUnit: {
    type: String,
    required: true,
    enum: ['cm', 'in', 'm', 'ft']
  },
  timeStamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('DataPoint', schema);
