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
    phone: '+123456789',
    age: 100,
    experience: 50,
  };
}

exports.generateEmployee = generateEmployee;
