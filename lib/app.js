const express = require('express');
const app = express();
const GlobalData = require('../lib/models/GlobalData');
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.json());

io.on('connection', (socket) => {
  socket.on('NEW_GLOBAL_DATA', payload => {
    GlobalData.create(payload)
      .then(data => {
        socket.broadcast.emit('UPDATE_GLOBAL', data);
        socket.emit('UPDATE_GLOBAL', data);
      });
  });

  socket.on('RETRIEVE_DATA_POINTS', () => {
    GlobalData.find()
      .then(points => {
        socket.broadcast.emit('RETRIEVE_DATA_POINTS', points);
        socket.emit('RETRIEVE_DATA_POINTS', points);
      });
  });
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = http;
