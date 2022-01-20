const path = require('path');
const grpc = require('@grpc/grpc-js');
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

function getAll(call, callback) {
  callback(null, {
    employees,
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(employeeProto.Employee.service, {
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
