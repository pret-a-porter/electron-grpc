import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { GrpcPage } from './GrpcPage';
import { HomePage } from './HomePage';
import { WebSocketPage } from './WebSocketPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grpc" element={<GrpcPage />} />
        <Route path="/ws" element={<WebSocketPage />} />
      </Routes>
    </Router>
  );
}
