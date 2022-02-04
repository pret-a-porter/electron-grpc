const path = require('path');
const {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const faker = require('@faker-js/faker');
const { generateEmployee } = require('./data');

const employees = [];

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, '../proto/employee.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const employeeProto = loadPackageDefinition(packageDefinition).employee;

function getAll(call) {
  const BATCH_SIZE = 30000;
  const list = [];

  const add = () => {
    for (let i = 0; i < BATCH_SIZE; i += 1) {
      list.push(generateEmployee());
    }
    call.write({ employees: list });
  };

  const update = (start = 0) => {
    // for (let i = start; i < list.length - 1; i += 1) {
    //   list[i].email = faker.internet.email();
    // }
    call.write({ employees: list });
  };

  setInterval(() => {
    if (list.length >= BATCH_SIZE) {
      update();
    } else {
      add();
    }
  }, 10);

  call.on('end', () => {
    call.end();
  });
}

function main() {
  const server = new Server({
    'grpc.max_concurrent_streams': 100,
    'grpc.max_send_message_length': 1024 * 1024 * 1024,
  });
  server.addService(employeeProto.Employee.service, {
    getAll,
  });
  server.bindAsync('0.0.0.0:4500', ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server started');
  });
}

main();
