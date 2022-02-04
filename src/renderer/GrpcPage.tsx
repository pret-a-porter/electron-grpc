import { Employee } from 'model/Employee';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from './Result';

export const GrpcPage: FC = () => {
  const [result, setResult] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const start = performance.now();
    let total = 0;

    const call = window.client
      .getAll({})
      .on('data', (chunk: { employees: Employee[] }) => {
        total += 1;
        console.log(
          'debug: received new batch. Batch size is ',
          chunk.employees.length
        );

        if (total === 100) {
          call.cancel();
          setResult(performance.now() - start);
        }
      })
      .on('error', (error: unknown) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>Electron gRPC</h1>
      <Result value={result} />
    </main>
  );
};
