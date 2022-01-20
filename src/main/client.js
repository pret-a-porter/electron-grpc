const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, '../proto/employee.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);
const employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

function fetchEmployee(id) {
  const client = new employeeProto.Employee(
    'localhost:4500',
    grpc.credentials.createInsecure()
  );

  client.getDetails({ id }, (err, response) => {
    console.log(
      'Employee Details for Employee Id:',
      id,
      '\n',
      response.message
    );
  });
}

exports.fetchEmployee = fetchEmployee;
