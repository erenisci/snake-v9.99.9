import React from 'react';

interface Props {
  isSnake: boolean;
  isHeadSnake: boolean;
  isSnack: boolean;
  lastKey: string | null;
}

const Cells: React.FC<Props> = ({ isSnake, isHeadSnake, isSnack, lastKey }) => {
  if (lastKey === 'ArrowUp') lastKey = 'w';
  else if (lastKey === 'ArrowLeft') lastKey = 'a';
  else if (lastKey === 'ArrowDown') lastKey = 's';
  else if (lastKey === 'ArrowRight') lastKey = 'd';

  return (
    <div
      className={
        isSnake && isHeadSnake
          ? 'snake-face'
          : isSnake
          ? 'snake'
          : isSnack
          ? 'snack'
          : 'cell'
      }
    >
      {isSnake && isHeadSnake && lastKey && (
        <>
          <div className={`eye left-eye--${lastKey}`}></div>
          <div className={`eye right-eye--${lastKey}`}></div>
          <div className={`mouth--${lastKey}`}></div>
        </>
      )}
    </div>
  );
};

export default Cells;
