const faker = require('@faker-js/faker');

function generateEmployee() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}

exports.generateEmployee = generateEmployee;
