import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const GameBoard: React.FC<Props> = ({ children }) => {
  return <div className='game-board'>{children}</div>;
};

export default GameBoard;
