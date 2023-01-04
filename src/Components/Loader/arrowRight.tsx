import React from 'react';

interface ArrowRightProps {
  className: string;
}

function ArrowRight({ className }: ArrowRightProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#000" d="M11.732 9.36a1 1 0 111.536 1.28l-5 6a1 1 0 11-1.536-1.28l5-6z" />
      <path fill="#000" d="M6.732 4.64a1 1 0 011.536-1.28l5 6a1 1 0 11-1.536 1.28l-5-6z" />
    </svg>
  );
}

export default ArrowRight;
