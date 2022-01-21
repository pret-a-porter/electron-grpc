const faker = require('@faker-js/faker');

function generateEmployee() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
  };
}

exports.generateEmployee = generateEmployee;
