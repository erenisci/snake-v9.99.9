import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CellRows: React.FC<Props> = ({ children }) => {
  return <div className='row'>{children}</div>;
};

export default CellRows;
