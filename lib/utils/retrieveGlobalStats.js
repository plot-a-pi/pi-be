module.exports = function(model, sessionId){
  return Promise.all([
    model.findOne({ sessionId }).sort({ count: -1 }),
    model.find({ sessionId }).select('mean')
  ])
    .then(([currentStats, piApproximation]) => {
      if(!currentStats) return;
      return {
        ...currentStats.toJSON(),
        piApproximationArray: piApproximation.map(mean => mean.mean)
      };
    });
};
