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
  grpc.credentials.createInsecure(),
  {
    'grpc.max_concurrent_streams': 100,
    'grpc.max_receive_message_length': 1024 * 1024 * 1024,
  }
);

exports.client = client;
