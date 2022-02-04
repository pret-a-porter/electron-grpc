const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { employees, rows } = require('./data');

const port = process.env.PORT || 5500;

const cachedResponse = {
  employees,
};

io.on('connection', (socket) => {
  let times = 0;

  const interval = setInterval(() => {
    times += 1;
    io.emit('data', cachedResponse);

    if (times === rows) {
      socket.disconnect();
      clearInterval(interval);
    }
  }, 10);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
