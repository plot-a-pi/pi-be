const express = require('express');
const app = express();
const GlobalData = require('../lib/models/GlobalData');
const Stats = require('../lib/models/Stats');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const retrieveGlobalStat = require('./utils/retrieveGlobalStats');


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
    retrieveGlobalStat(socket, Stats);
  });
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = http;
