import type { FC } from 'react';

interface Props {
  value: number;
}

export const Result: FC<Props> = ({ value }) => {
  if (value === 0) {
    return <h2>Loading...</h2>;
  }

  return <h2>100 rows for {value} milliseconds</h2>;
};
