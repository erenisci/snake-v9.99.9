import React from 'react';

import Button from './Button';

interface Props {
  selectElement: React.RefObject<HTMLSelectElement>;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Form: React.FC<Props> = ({ selectElement, onClick }) => {
  return (
    <form className='select-form'>
      <label>Size:</label>
      <select ref={selectElement}>
        {Array.from({ length: 11 }, (_, i) => 10 + i * 2).map(opt => (
          <option
            key={opt}
            value={opt}
          >
            {opt}
          </option>
        ))}
      </select>
      <Button onClick={onClick}>Create Board</Button>
    </form>
  );
};

export default Form;
