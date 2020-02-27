const mongoose = require('mongoose');
const retrieveGlobalStat = require('../utils/retrieveGlobalStats');

const schema = mongoose.Schema({
  circumferenceMax: {
    type: Number,
    required: true
  },
  diameterMax: {
    type: Number,
    required: true
  },
  circumferenceTotal:{
    type: Number
  },
  diameterTotal: {
    type: Number
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
  },
  sessionId: {
    type: String
  },
  sessionCount: {
    type: Number,
  }
});

schema.statics.createStat = async function(point, sessionId){
  const { circumference, diameter } = point;
  const { teacherId } = sessionId === 'global' ? { teacherId: 'global' } : await this.model('Session').findById(sessionId);
  const initialStat = {
    count: 1,
    circumferenceMax: circumference,
    diameterMax: diameter,
    diameterTotal: diameter,
    circumferenceTotal: circumference,
    mean: circumference / diameter,
    teacherId,
    sessionId
  };
  const currentStat = await this.findOne({ teacherId, sessionId }).sort({ count: -1 });

  if(!currentStat) await this.create(initialStat);

  else {
    await this
      .findOne({ teacherId, sessionId }).sort({ count: -1 })
      .then(recentStat => {
        const circumferenceMax = circumference > recentStat.circumferenceMax ? circumference : recentStat.circumferenceMax;
        const diameterMax = diameter > recentStat.diameterMax ? diameter : recentStat.diameterMax;
        const circumferenceTotal = circumference + recentStat.circumferenceTotal;
        const diameterTotal = diameter + recentStat.diameterTotal;
        const mean = circumferenceTotal / diameterTotal;

        this
          .create({
            count: recentStat.count + 1,
            circumferenceMax,
            diameterMax,
            diameterTotal,
            circumferenceTotal,
            mean,
            teacherId,
            sessionId
          });
      });
  }

  return retrieveGlobalStat(this, sessionId);
};

module.exports = mongoose.model('Stats', schema);
