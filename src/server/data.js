const faker = require('@faker-js/faker');

function generateEmployee() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
    phone: '+123456789',
    age: 100,
    experience: 50,
    country: 'Test',
    zip_code: '12345',
    street_name: 'Test',
  };
}

exports.generateEmployee = generateEmployee;
