import React from 'react';
import './components.css'; // We'll define the CSS animation here

export default function AnimatedWindow() {
    return (
  <div>
   <svg
    className="window-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 59 59"
  >
    <path style={{ fill: '#F5D9C3' }} d="M7,5v49h45V5H7z" />
    {/* Frame highlights (unchanging) */}
    <g>
      <path style={{ fill: '#FCEDE3' }} d="M30,7v22h20V7H30z M48,27H32V9h16V27z" />
      <path style={{ fill: '#FCEDE3' }} d="M9,29h20V7H9V29z M11,9h16v18H11V9z" />
      <path style={{ fill: '#FCEDE3' }} d="M9,52h20V30H9V52z M11,32h16v18H11V32z" />
      <path style={{ fill: '#FCEDE3' }} d="M30,52h20V30H30V52z M32,32h16v18H32V32z" />
    </g>

    <rect x="5" y="54" style={{ fill: '#D7B29F' }} width="49" height="4" />
    <rect x="5" y="1" style={{ fill: '#D7B29F' }} width="49" height="4" />
    <path style={{ fill: '#B45F74' }} d="M57,2H2C1.447,2,1,1.553,1,1s0.447-1,1-1h55c0.553,0,1,0.447,1,1S57.553,2,57,2z" />
    <path style={{ fill: '#B45F74' }} d="M57,59H2c-0.553,0-1-0.447-1-1s0.447-1,1-1h55c0.553,0,1,0.447,1,1S57.553,59,57,59z" />
     {/* TOP LEFT PANE + DECOR */}
    <g className="left-pane" transform="translate(0, 0)">
      <rect x="10" y="8" width="18" height="20" style={{ fill: '#6E7881' }} />
      <polygon style={{ fill: '#919FAA' }} points="19,27 13,27 21,9 27,9 " />
    </g>

    {/* TOP RIGHT PANE + DECOR */}
    <g className="right-pane" transform="translate(0, 0)">
      <rect x="31" y="8" width="18" height="20" style={{ fill: '#6E7881' }} />
      <polygon style={{ fill: '#919FAA' }} points="40,27 34,27 42,9 48,9 " />
    </g>

    {/* BOTTOM LEFT PANE + DECOR */}
    <g className="left-pane" transform="translate(0, 0)">
      <rect x="10" y="31" width="18" height="20" style={{ fill: '#6E7881' }} />
      <polygon style={{ fill: '#919FAA' }} points="19,50 13,50 21,32 27,32 " />
    </g>

    {/* BOTTOM RIGHT PANE + DECOR */}
    <g className="right-pane" transform="translate(0, 0)">
        <rect x="31" y="31" width="18" height="20" style={{ fill: '#6E7881' }} />
        <polygon style={{ fill: '#919FAA' }} points="40,50 34,50 42,32 48,32 " />
        </g>

  </svg>
  </div>
);
}

