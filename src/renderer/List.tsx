import { Employee } from 'model/Employee';
import type { FC } from 'react';

interface Props {
  list: Employee[];
}

export const List: FC<Props> = ({ list }) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th className="id-column">ID</th>
          <th className="email-column">E-mail</th>
          <th>First name</th>
          <th>Last name</th>
          <th>City</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Experience</th>
          <th>ZIP code</th>
          <th>Country</th>
          <th>Street</th>
        </tr>
      </thead>
      <tbody>
        {list.slice(0, 300).map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.email}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.address.city}</td>
            <td>{employee.phone}</td>
            <td>{employee.age}</td>
            <td>{employee.experience}</td>
            <td>{employee.address.zip_code}</td>
            <td>{employee.address.country}</td>
            <td>{employee.address.street_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
