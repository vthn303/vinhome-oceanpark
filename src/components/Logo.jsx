import React from 'react';

export default function Logo({ size = 32, monochrome = false }) {
  const leftColor = monochrome ? '#ffffff' : '#3949ab';
  const midColor = monochrome ? '#ffffff' : '#0288d1';
  const rightColor = monochrome ? '#ffffff' : '#00acc1';

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <rect x="4" y="14" width="6" height="15" rx="3" fill={leftColor} />
      <rect x="13" y="6" width="6" height="23" rx="3" fill={midColor} />
      <rect x="22" y="2" width="6" height="27" rx="3" fill={rightColor} />
    </svg>
  );
}
