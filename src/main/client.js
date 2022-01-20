const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, '../proto/employee.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);
const employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

const client = new employeeProto.Employee(
  'localhost:4500',
  grpc.credentials.createInsecure()
);

function fetchAll() {
  return new Promise((resolve) =>
    client.getAll({}, (err, response) => {
      resolve(response.employees);
    })
  );
}

function generate() {
  return new Promise((resolve) =>
    client.generate({}, (err, response) => {
      resolve(response.employee);
    })
  );
}

exports.fetchAll = fetchAll;
exports.generate = generate;
