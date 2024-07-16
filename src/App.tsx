import React, { useRef, useState, useEffect, useCallback } from 'react';

import Form from './components/Form';
import GameBoard from './components/GameBoard';
import CellRows from './components/CellRows';
import Cells from './components/Cells';
import Button from './components/Button';
import Points from './components/Points';
import PointSummary from './components/PointSummary';
import GameEnds from './components/GameEnds';
import Summary from './components/Summary';
import Info from './components/Info';

interface PositionProp {
  x: number;
  y: number;
}

interface SummaryProp {
  point: number;
  size: number;
  date: Date;
}

const App: React.FC = () => {
  const [arr, setArr] = useState<number[][]>([[]]);
  const [snake, setSnake] = useState<PositionProp[]>([]);
  const [snack, setSnack] = useState<PositionProp | null>(null);

  const [direction, setDirection] = useState<string | null>(null);
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  const [isMoving, setIsMoving] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);

  const [point, setPoint] = useState<number>(0);
  const [screenAlert, setScreenAlert] = useState<string>('');
  const [summary, setSummary] = useState<SummaryProp[]>(() => {
    const storedSummary = localStorage.getItem('snakeGameSummary');
    return storedSummary ? JSON.parse(storedSummary) : [];
  });

  const [info, setInfo] = useState(false);

  const selectElement = useRef<HTMLSelectElement>(null);

  // For random snack
  const getRandomPosition = (size: number): PositionProp => {
    return {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  };

  // Check snack in snake?
  const isPositionInSnake = (
    pos: PositionProp,
    snake: PositionProp[]
  ): boolean => {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  };

  // Giving the Game-Board Array
  const handleInitializeArray = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const size = +(selectElement.current?.value || 0);
    setArr(Array.from(Array(size), () => new Array(size).fill(0)));
  };

  // When click Start Game button
  const handleGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const size = arr.length;
    const center = Math.floor(size / 2);

    const initialSnake = [{ x: center - 1, y: center }];
    setSnake(initialSnake);

    const newArr = Array.from(Array(size), () => new Array(size).fill(0));
    newArr[center - 1][center] = 1;

    let snackPosition = getRandomPosition(size);
    while (isPositionInSnake(snackPosition, initialSnake))
      snackPosition = getRandomPosition(size);

    setSnack(snackPosition);
    newArr[snackPosition.x][snackPosition.y] = 2;

    setArr(newArr);
    setInfo(false);
    setIsStarted(true);
  };

  // Move snake
  const moveSnake = useCallback(() => {
    if (!snake.length || !direction) return;

    const head = snake[0];
    let newHead: PositionProp = { ...head };

    switch (direction) {
      case 'w':
      case 'ArrowUp':
        newHead.x = head.x === 0 ? arr.length - 1 : head.x - 1;
        break;
      case 'a':
      case 'ArrowLeft':
        newHead.y = head.y === 0 ? arr.length - 1 : head.y - 1;
        break;
      case 's':
      case 'ArrowDown':
        newHead.x = (head.x + 1) % arr.length;
        break;
      case 'd':
      case 'ArrowRight':
        newHead.y = (head.y + 1) % arr.length;
        break;
      default:
        return;
    }

    const newSnake = [newHead, ...snake.slice(0, -1)];
    const newArr = arr.map(row => row.slice());

    // for Congratulations or Game Over
    if (
      point >= arr.length ** 2 * 20 - 40 ||
      newSnake
        .slice(1)
        .some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setIsMoving(false);
      setDirection(null);
      setLastDirection(null);

      const message =
        point >= arr.length ** 2 * 20 - 60 ? 'Congratulations!' : 'Game-Over!';
      setScreenAlert(message);

      const newPoint = point >= arr.length ** 2 * 20 - 40 ? point + 20 : point;
      if (message === 'Congratulations!') setPoint(newPoint);

      const newSummary = [
        ...summary,
        { point: newPoint, size: arr.length, date: new Date() },
      ];
      setSummary(newSummary);
      return;
    }

    if (newHead.x === snack?.x && newHead.y === snack?.y) {
      newSnake.push(snake[snake.length - 1]);
      setPoint(point => point + 20);

      let snackPosition = getRandomPosition(arr.length);
      while (isPositionInSnake(snackPosition, newSnake)) {
        snackPosition = getRandomPosition(arr.length);
      }
      setSnack(snackPosition);
      newArr[snackPosition.x][snackPosition.y] = 2;
    }

    newArr.forEach((row, _) => row.fill(0));
    newSnake.forEach(segment => (newArr[segment.x][segment.y] = 1));

    setSnake(newSnake);
    setArr(newArr);
    setLastDirection(direction);
  }, [snake, snack, point, arr, direction, summary]);

  // Keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!direction && !isMoving && e.key !== 's' && e.key !== 'ArrowDown')
        setIsMoving(true);
      else if (!isMoving) return;

      const validKeys = [
        'ArrowUp',
        'w',
        'ArrowLeft',
        'a',
        'ArrowDown',
        's',
        'ArrowRight',
        'd',
      ];
      if (validKeys.includes(e.key)) {
        if (
          (lastDirection === 'w' && (e.key === 's' || e.key === 'ArrowDown')) ||
          (lastDirection === 'ArrowUp' &&
            (e.key === 's' || e.key === 'ArrowDown')) ||
          (lastDirection === 'a' &&
            (e.key === 'd' || e.key === 'ArrowRight')) ||
          (lastDirection === 'ArrowLeft' &&
            (e.key === 'd' || e.key === 'ArrowRight')) ||
          (lastDirection === 's' && (e.key === 'w' || e.key === 'ArrowUp')) ||
          (lastDirection === 'ArrowDown' &&
            (e.key === 'w' || e.key === 'ArrowUp')) ||
          (lastDirection === 'd' && (e.key === 'a' || e.key === 'ArrowLeft')) ||
          (lastDirection === 'ArrowRight' &&
            (e.key === 'a' || e.key === 'ArrowLeft')) ||
          e.key === lastDirection
        )
          return;

        setDirection(e.key);
      }
    };

    const handleSpacebarDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && !isSpacebarPressed) setIsSpacebarPressed(true);
    };

    const handleSpacebarUp = (e: KeyboardEvent) => {
      if (e.key === ' ') setIsSpacebarPressed(false);
    };

    window.addEventListener('keydown', handleKeyPress);

    window.addEventListener('keydown', handleSpacebarDown);
    window.addEventListener('keyup', handleSpacebarUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);

      window.removeEventListener('keydown', handleSpacebarDown);
      window.removeEventListener('keyup', handleSpacebarUp);
    };
  }, [isMoving, isSpacebarPressed, direction, lastDirection]);

  // Handle move with faster speed when spacebar is held down
  useEffect(() => {
    let intervalTime = 400;
    if (isSpacebarPressed) intervalTime = 200;

    if (isMoving) {
      const interval = setInterval(() => {
        moveSnake();
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isMoving, isSpacebarPressed, moveSnake, arr.length]);

  // Load summary from local storage on mount
  useEffect(() => {
    const storedSummary = localStorage.getItem('snakeGameSummary');
    if (storedSummary) {
      const parsedSummary = JSON.parse(storedSummary).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
      }));
      setSummary(parsedSummary);
    }
  }, []);

  // Save summary to local storage when it changes
  useEffect(() => {
    localStorage.setItem('snakeGameSummary', JSON.stringify(summary));
  }, [summary]);

  // Handle play again action
  const handlePlayAgain = () => {
    setArr([[]]);
    setSnake([]);
    setSnack(null);

    setDirection(null);
    setLastDirection(null);

    setIsMoving(false);
    setIsStarted(false);

    setPoint(0);
    setScreenAlert('');
  };

  return (
    <div className='container'>
      <div className='container-point'>
        <Points point={point} />
      </div>
      <div className='container-main'>
        <h1 className='title'>Snake Game v9.99.9</h1>
        {!isStarted && (
          <Form
            selectElement={selectElement}
            onClick={handleInitializeArray}
          />
        )}
        {arr.length > 1 && !isStarted && (
          <div className='button-start start-margin-top '>
            <Button
              className='select-form-btn'
              onClick={handleGame}
            >
              Start Game
            </Button>
            <button
              className='how-to-play'
              onClick={() => setInfo(info => !info)}
            >
              How to Play?
            </button>
          </div>
        )}
        {arr.length > 0 && arr[0].length > 0 && (
          <GameBoard>
            {info && <Info />}
            {screenAlert && (
              <GameEnds
                message={screenAlert}
                onClick={handlePlayAgain}
              />
            )}
            {arr.map((row, i) => (
              <CellRows key={i}>
                {row.map((cell, j) => {
                  const isHeadSnake =
                    snake.length > 0 && i === snake[0]?.x && j === snake[0]?.y;
                  return (
                    <Cells
                      key={`${i}${j}`}
                      isSnake={cell === 1}
                      isHeadSnake={isHeadSnake}
                      isSnack={snack?.x === i && snack?.y === j}
                    />
                  );
                })}
              </CellRows>
            ))}
          </GameBoard>
        )}
      </div>
      <div className='container-summary'>
        <PointSummary>
          {summary &&
            summary.map((item, i) => (
              <Summary
                summary={item}
                key={i}
              />
            ))}
        </PointSummary>
      </div>
    </div>
  );
};

export default App;
