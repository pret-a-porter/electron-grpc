import type { FC } from 'react';

interface Props {
  rows: number;
  value: number;
}

export const Result: FC<Props> = ({ rows, value }) => {
  if (value === 0) {
    return <h2>Batches: {rows}</h2>;
  }

  return (
    <h2>
      {rows} batches for {value} milliseconds
    </h2>
  );
};
