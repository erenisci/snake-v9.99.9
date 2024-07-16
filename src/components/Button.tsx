import React, { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ className, children, onClick }) => {
  return (
    <button
      className={className ? className : 'select-form-btn'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
