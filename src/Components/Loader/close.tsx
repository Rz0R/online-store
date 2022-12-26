import React from 'react';

interface CloseProps {
  className: string;
}

function Close({ className }: CloseProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M7.757 16.243l8.486-8.486m0 8.486L7.757 7.757"
      />
    </svg>
  );
}

export default Close;
