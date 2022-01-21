const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Subject } = require('rxjs');
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
const employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

function getAll(call) {
  const BATCH_SIZE = 10000;
  const list = [];

  const add = () => {
    for (let i = 0; i < BATCH_SIZE; i += 1) {
      list.push(generateEmployee());
    }
    call.write({ employees: list });
  };

  const update = (start = 0) => {
    for (let i = start; i < list.length - 1; i += 1) {
      list[i] = {
        ...generateEmployee(),
        id: list[i].id,
      };
    }
    call.write({ employees: list });
  };

  setInterval(() => {
    if (list.length >= BATCH_SIZE) {
      update();
    } else {
      add();
    }
  }, 100);
}

function generate(call, callback) {
  const newEmployee = generateEmployee();
  employees.push(newEmployee);
  // subject.next(employees);

  callback(null, {
    employee: newEmployee,
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(employeeProto.Employee.service, {
    generate,
    getAll,
  });
  server.bindAsync(
    '0.0.0.0:4500',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log('Server started');
    }
  );
}

main();
