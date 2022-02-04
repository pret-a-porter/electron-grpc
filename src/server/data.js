const faker = require('@faker-js/faker');

function generateAdress() {
  return {
    city: faker.address.city(),
    country: faker.address.country(),
    zip_code: faker.address.zipCode(),
    street_name: faker.address.streetName(),
  };
}

function generateEmployee() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: generateAdress(),
    phone: faker.phone.phoneNumber(),
    age: 100,
    experience: 50,
  };
}

const BATCH_SIZE = 100_000;
const employees = [];
for (let i = 0; i < BATCH_SIZE; i += 1) {
  employees.push(generateEmployee());
}

exports.generateEmployee = generateEmployee;
exports.employees = employees;
exports.rows = 100;
