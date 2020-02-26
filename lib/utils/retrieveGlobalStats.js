module.exports = function(socket, model){
  Promise.all([
    model.findOne().sort({ count: -1 }),
    model.find().select('mean')
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
