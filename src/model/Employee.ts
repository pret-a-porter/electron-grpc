export interface Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  phone: string;
  age: number;
  experience: number;
}

interface Address {
  city: string;
  country: string;
  zip_code: string;
  street_name: string;
}
