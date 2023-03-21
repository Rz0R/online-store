import React from 'react';

interface WarningProps {
  className: string;
  bgColor: string;
}

function Warning({ className, bgColor }: WarningProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className={className}
    >
      <path fill={bgColor} d="M9.694 468.335L256 30.865l246.306 437.47H9.694z" />
      <g fill="currentColor">
        <path d="M243.2 140.8v204.8c0 7.074 5.726 12.8 12.8 12.8 7.074 0 12.8-5.726 12.8-12.8V140.8c0-7.074-5.726-12.8-12.8-12.8-7.074 0-12.8 5.726-12.8 12.8z" />
        <path d="M508.57 442.735L278.17 43.674a25.602 25.602 0 00-44.34 0L3.43 442.735a25.602 25.602 0 0022.17 38.4h460.8a25.602 25.602 0 0022.17-38.4zm-482.97 12.8L256 56.474l230.4 399.061H25.6z" />
        <circle cx="256" cy="409.6" r="25.6" />
      </g>
    </svg>
  );
}

export default Warning;
