const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Subject } = require('rxjs');
const { generateEmployee } = require('./data');

const employees = [];
const subject = new Subject(employees);

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
  subject.subscribe((value) => {
    call.write({ employees: value });
  });
}

function generate(call, callback) {
  const newEmployee = generateEmployee();
  employees.push(newEmployee);
  subject.next(employees);

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
