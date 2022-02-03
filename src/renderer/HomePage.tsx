import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const HomePage: FC = () => {
  return (
    <main>
      <h1>Welcome!</h1>
      <nav className={styles.menu}>
        <Link to="/grpc">gRPC</Link>
        <Link to="/ws">WebSocket</Link>
      </nav>
    </main>
  );
};
