import React from 'react';

const SVG = ({
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 33 17.618'
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M32.767,14a.724.724,0,0,0,.165-.823,4.681,4.681,0,0,0-.659-1.976h0a1.389,1.389,0,0,0,.329-1.153,2.3,2.3,0,0,0-.494-1.482A2.494,2.494,0,0,0,30.3,7.41h0C28.486,5.928,24.534,5.6,23.052,5.6c-.165,0-.494-.165-.494-.329L20.747,1.482A2.582,2.582,0,0,0,18.442,0H16.96A19.649,19.649,0,0,0,9.221,1.482a15.562,15.562,0,0,0-5.1,3.458A17.854,17.854,0,0,0,0,12.349a1.774,1.774,0,0,0,.329,1.317,1.5,1.5,0,0,0,1.317.659H3.787a3.747,3.747,0,0,0,3.787,3.293,3.763,3.763,0,0,0,3.787-3.293H23.217a3.824,3.824,0,0,0,7.574,0h1.153A1.258,1.258,0,0,0,32.767,14Zm-2.8-5.434.165-.165c.329-.165.823,0,1.317.494a2.34,2.34,0,0,1,.329.988v.165h0a17.5,17.5,0,0,0-1.811-1.482ZM14.49,1.153h0A13.309,13.309,0,0,1,17.125.988h1.482a1.44,1.44,0,0,1,1.482.988L21.9,5.6H14.49ZM4.94,5.6a14.255,14.255,0,0,1,8.4-4.281h0V5.6ZM7.574,16.631a2.885,2.885,0,0,1-2.8-2.8,2.885,2.885,0,0,1,2.8-2.8,2.885,2.885,0,0,1,2.8,2.8A2.885,2.885,0,0,1,7.574,16.631Zm19.43,0a2.885,2.885,0,0,1-2.8-2.8,2.8,2.8,0,0,1,5.6,0A2.885,2.885,0,0,1,27,16.631Zm3.787-3.293a3.824,3.824,0,0,0-7.574,0H11.361a3.868,3.868,0,0,0-3.787-3.293,3.763,3.763,0,0,0-3.787,3.293H1.482c1.153-2.8,3.458-4.61,6.092-4.61a5.067,5.067,0,0,1,4.61,2.964c0,.165.165.165.329.329h.329c.165,0,.329-.329.329-.659a6.369,6.369,0,0,0-5.6-3.622,7.677,7.677,0,0,0-6.092,3.293h0a17.792,17.792,0,0,1,2.47-4.446h19.1a15.608,15.608,0,0,1,3.458.329c.165,0,.329,0,.329.165.329,0,.494.165.823.165.165,0,.494.165.659.165.329.165.494.165.659.329a.161.161,0,0,1,.165.165h0l-.329.329h0A8.265,8.265,0,0,0,26.839,7.9a6.183,6.183,0,0,0-5.6,3.622v.329c0,.165.165.165.329.329H21.9c.165,0,.165-.165.329-.329a5.067,5.067,0,0,1,4.61-2.964,4.873,4.873,0,0,1,4.94,4.446h-.988Z"
      fill="#fff"
    />
  </svg>
);

export default SVG;