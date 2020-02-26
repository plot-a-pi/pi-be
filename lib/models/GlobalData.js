const mongoose = require('mongoose');
const Stats = require('./Stats');

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

schema.statics.postToGlobal = async function(socket, newDataPoint){
  const { circumference, diameter } = newDataPoint;
  const teacherId = newDataPoint.teacherId ? newDataPoint.teacherId : 'global';

  const initialStat = {
    count: 1,
    circumferenceMax: circumference,
    diameterMax: diameter,
    diameterTotal: diameter,
    circumferenceTotal: circumference,
    mean: circumference / diameter,
    teacherId
  };

  this
    .create(newDataPoint)
    .then(data => {
      socket.broadcast.emit('UPDATE_GLOBAL', data);
      socket.emit('UPDATE_GLOBAL', data);
    });

  const currentStat = await Stats.findOne().sort({ count: -1 });

  if(!currentStat) await Stats.create(initialStat);

  else {
    await Stats
      .findOne({ teacherId }).sort({ count: -1 })
      .then(recentStat => {
        const circumferenceMax = circumference > recentStat.circumferenceMax ? circumference : recentStat.circumferenceMax;
        const diameterMax = diameter > recentStat.diameterMax ? diameter : recentStat.diameterMax;
        const circumferenceTotal = circumference + recentStat.circumferenceTotal;
        const diameterTotal = diameter + recentStat.diameterTotal;
        const mean = circumferenceTotal / diameterTotal;

        Stats
          .create({
            count: recentStat.count + 1,
            circumferenceMax,
            diameterMax,
            diameterTotal,
            circumferenceTotal,
            mean,
            teacherId
          });
      });
  }

  Promise.all([
    currentStat,
    Stats.find().select('mean')
  ])
    .then(([currentStats, piApproximation]) => {
      if(!currentStats) return;
      const data = {
        ...currentStats.toJSON(),
        piApproximationArray: piApproximation.map(mean => mean.mean)
      };
      socket.broadcast.emit('RETRIEVE_GLOBAL_STATS', data);
      socket.emit('RETRIEVE_GLOBAL_STATS', data);
    });
};

module.exports = mongoose.model('DataPoint', schema);
