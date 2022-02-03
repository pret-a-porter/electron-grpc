import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Grpc } from './Grpc';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Grpc />} />
      </Routes>
    </Router>
  );
}
