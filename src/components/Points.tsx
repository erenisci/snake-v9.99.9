import React from 'react';

interface Props {
  point: number;
}

const Point: React.FC<Props> = ({ point }) => {
  return (
    <div className='absolute'>
      <h1 className='point-title'>Points:</h1>
      <span className='point-title--span'> {point}</span>
    </div>
  );
};

export default Point;
