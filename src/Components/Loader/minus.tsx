import React from 'react';

interface MinusProps {
  className: string;
}

function Minus({ className }: MinusProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#000" d="M5 11a1 1 0 110-2h10a1 1 0 110 2H5z" />
    </svg>
  );
}

export default Minus;
