const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { employees } = require('./data');

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

function getDetails(call, callback) {
  callback(null, {
    message: employees.find((employee) => employee.id === call.request.id),
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(employeeProto.Employee.service, {
    getDetails,
  });
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
