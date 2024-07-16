import React from 'react';

interface Props {
  isSnake: boolean;
  isHeadSnake: boolean;
  isSnack: boolean;
}

const Cells: React.FC<Props> = ({ isSnake, isHeadSnake, isSnack }) => {
  return (
    <div
      className={
        isSnake && isHeadSnake
          ? 'snake-head'
          : isSnake
          ? 'snake'
          : isSnack
          ? 'snack'
          : 'cell'
      }
    ></div>
  );
};

export default Cells;
