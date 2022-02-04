const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const faker = require('@faker-js/faker');
const { generateEmployee } = require('./data');

const port = process.env.PORT || 5500;

io.on('connection', (socket) => {
  const BATCH_SIZE = 30000;
  const list = [];

  const add = () => {
    for (let i = 0; i < BATCH_SIZE; i += 1) {
      list.push(generateEmployee());
    }
  };

  const update = (start = 0) => {
    for (let i = start; i < list.length - 1; i += 1) {
      list[i].email = faker.internet.email();
    }
  };

  setInterval(() => {
    if (list.length >= BATCH_SIZE) {
      // update();
    } else {
      add();
    }

    io.emit('data', list);
  }, 10);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
