import React from 'react';

interface PlusProps {
  className: string;
}

function Plus({ className }: PlusProps) {
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
      <path fill="#000" d="M9 5a1 1 0 012 0v10a1 1 0 11-2 0V5z" />
    </svg>
  );
}

export default Plus;
