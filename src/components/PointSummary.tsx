import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const PointSummary: React.FC<Props> = ({ children }) => {
  return (
    <div className='summary-container absolute'>
      <h1 className='summary summary-title'>Summary</h1>
      {children}
    </div>
  );
};

export default PointSummary;
