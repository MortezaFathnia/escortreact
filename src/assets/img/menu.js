import React from 'react';

const SVG = ({
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 29.341 16.61'
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    fill={fill}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      id="menu"
      d="M8.75,13.5a.75.75,0,0,1,0-1.5h10.5a.75.75,0,0,1,0,1.5Zm-8-6A.75.75,0,0,1,.75,6h18.5a.75.75,0,0,1,0,1.5Zm0-6A.75.75,0,0,1,.75,0h10.5a.75.75,0,0,1,0,1.5Z"
    />
  </svg>
);

export default SVG;
