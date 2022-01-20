const faker = require('@faker-js/faker');

function generateEmployee() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}

const employees = [generateEmployee(), generateEmployee(), generateEmployee()];

exports.generateEmployee = generateEmployee;
exports.employees = employees;
