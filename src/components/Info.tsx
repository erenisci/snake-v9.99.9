import React from 'react';

const Info: React.FC = () => {
  return (
    <div className='div-info'>
      <h2>How to play?</h2>
      <p>
        <strong>W or &uarr;</strong>: to go top,
      </p>
      <p>
        <strong>A or &larr;</strong>: to go left,
      </p>
      <p>
        <strong>S or &darr;</strong>: to go down,
      </p>
      <p>
        <strong>D or &rarr;</strong>: to go right.
      </p>
      <p>Good Luck :)</p>
    </div>
  );
};

export default Info;
