import { Employee } from 'model/Employee';
import { useCallback, useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [list, setList] = useState<Employee[]>([]);

  const fetchAll = useCallback(async () => {
    const response = window.fetchAll();
    response.subscribe((value) => {
      console.log('debug: received new batch. Batch size is ', value.length);
      setList(value);
    });
  }, []);

  const generateNewEmployee = useCallback(async () => {
    await window.generate();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <main>
      <h1>Electron gRPC</h1>
      <h3>
        Demonstration of using preload script approach. It provides ability to
        use all power of nodejs functionality
      </h3>
      <hr />
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
        <tfoot>
          <tr>
            <td colSpan={4}>
              <button type="button" onClick={() => generateNewEmployee()}>
                Generate New Employee
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
