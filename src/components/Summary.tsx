import React from 'react';

interface Props {
  summary: {
    point: number;
    size: number;
    date: Date;
  };
  style: string;
}

const Summary: React.FC<Props> = ({ summary, style }) => {
  const formattedDate =
    summary.date instanceof Date
      ? summary.date.toLocaleDateString()
      : 'Invalid Date';

  return (
    <div className={`summary ${style}`}>
      <p className='summary--p'>
        <span>Size: {`${summary.size}x${summary.size}`}</span>
        <span>Points: {summary.point}</span>
      </p>
      <p className='date'>Date: {formattedDate}</p>
    </div>
  );
};

export default Summary;
