const path = require('path');
const {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { employees, rows } = require('./data');

const pathToProto = path.resolve(__dirname, '../proto/employee.proto');

const packageDefinition = protoLoader.loadSync(pathToProto, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const employeeProto = loadPackageDefinition(packageDefinition).employee;

const cachedResponse = employeeProto.Employee.service.getAll.responseSerialize({
  employees,
});

function getAll(call) {
  let times = 0;

  const interval = setInterval(() => {
    times += 1;
    call.write(cachedResponse);

    if (times === rows) {
      clearInterval(interval);
      call.end();
    }
  }, 10);
}

function main() {
  const server = new Server({
    'grpc.max_send_message_length': 1024 * 1024 * 1024,
  });

  server.register(
    '/employee.Employee/getAll',
    getAll,
    (value) => value,
    employeeProto.Employee.service.getAll.requestDeserialize,
    'serverStream'
  );
  server.bindAsync('0.0.0.0:4500', ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server started');
  });
}

main();
