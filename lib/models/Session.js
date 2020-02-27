const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacherId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Session', schema);
