import React from 'react';
import './CircularProgressBar.css';

const CircleProgressBar = ({ percentage, circleWidth, time }) => {
  const radius = 170;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="16px"
          r={radius}
          className="circle-background"
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="16px"
          r={radius}
          className="circle-progress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="circle-text"
        >{time}</text>
      </svg>
      <button>
        Play
      </button>
    </div>
  );
};

export default CircleProgressBar;
