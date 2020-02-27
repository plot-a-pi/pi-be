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
  },
  sessionId: {
    type: String,
    default: 'global',
    required: true
  }
});

schema.statics.postToGlobal = function(socket, newDataPoint){
  return this
    .create(newDataPoint)
    .then(data => {
      socket.broadcast.emit('UPDATE_GLOBAL', data);
      socket.emit('UPDATE_GLOBAL', data);
      return data;
    });
};

module.exports = mongoose.model('DataPoint', schema);
