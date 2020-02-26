const express = require('express');
const app = express();
const GlobalData = require('../lib/models/GlobalData');
const Stats = require('../lib/models/Stats');
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.json());

io.on('connection', (socket) => {
  socket.on('NEW_GLOBAL_DATA', payload => {
    GlobalData.postToGlobal(socket, payload);
  });

  socket.on('RETRIEVE_DATA_POINTS', () => {
    GlobalData.find()
      .then(points => {
        socket.broadcast.emit('RETRIEVE_DATA_POINTS', points);
        socket.emit('RETRIEVE_DATA_POINTS', points);
      });
  });

  socket.on('RETRIEVE_GLOBAL_STATS', () => {
    Promise.all([
      Stats.findOne().sort({ count: -1 }),
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
  });
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = http;
