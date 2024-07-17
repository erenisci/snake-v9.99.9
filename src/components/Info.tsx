import React from 'react';

const Info: React.FC = () => {
  return (
    <div className='div-info'>
      <h2>How to Play?</h2>
      <div>
        <p>
          <strong>W or &uarr;</strong>
          <span>:</span>
        </p>
        <span>to go top,</span>
      </div>
      <div>
        <p>
          <strong>A or &larr;</strong>
          <span>:</span>
        </p>
        <span>to go left,</span>
      </div>
      <div>
        <p>
          <strong>S or &darr;</strong>
          <span>:</span>
        </p>
        <span>to go down,</span>
      </div>
      <div>
        <p>
          <strong>D or &rarr;</strong>
          <span>:</span>
        </p>
        <span>to go right,</span>
      </div>
      <div>
        <p>
          <strong>Space</strong>
          <span>:</span>
        </p>
        <span>to go fast...</span>
      </div>
      <p>Good Luck :)</p>
    </div>
  );
};

export default Info;
