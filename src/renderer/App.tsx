import { Employee } from 'model/Employee';
import { useCallback, useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [list, setList] = useState<Employee[]>([]);

  const fetchAll = useCallback(async () => {
    const response = window.fetchAll();
    response.subscribe((value) => setList(value));
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
            <th>ID</th>
            <th>E-mail</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.email}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
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
