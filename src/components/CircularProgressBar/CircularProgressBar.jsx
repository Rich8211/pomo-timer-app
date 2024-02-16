import React from 'react';
import './CircularProgressBar.css';
import PlayButtonIcon from '../../icons/PlayButtonIcon';
import PauseButtonIcon from '../../icons/PauseButtonIcon';

const CircleProgressBar = ({
  isPaused,
  percentage,
  circleWidth,
  time,
  onPlay,
  onPause,
}) => {
  const radius = 170;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="progress-bar-container">
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
        >
          {time}
        </text>
      </svg>
      <div className="play-pause-button-container">
        <button
          className="play-pause-button"
          onClick={isPaused ? onPlay : onPause}
        >
          {isPaused ? <PlayButtonIcon /> : <PauseButtonIcon />}
        </button>
      </div>
    </div>
  );
};

export default CircleProgressBar;
