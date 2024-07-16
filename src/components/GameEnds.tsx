import React from 'react';
import Button from './Button';

interface Props {
  message: string;
  onClick: () => void;
}

const GameEnds: React.FC<Props> = ({ message, onClick }) => {
  return (
    <div className='game-ends'>
      <p className='game-ends--p'>{message}</p>
      <Button onClick={onClick}>Play again</Button>
    </div>
  );
};

export default GameEnds;
