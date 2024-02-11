import React, { useContext, useEffect, useState, useRef } from 'react';
import PauseButton from '../Buttons/PauseButton';
import PlayButton from '../Buttons/PlayButton';
import useSound from 'use-sound';
import clickSound from '../../Sounds/click.mp3';
import { PomoContext } from '../../providers/PomoProvider';
import CircleProgressBar from '../CircularProgressBar/CircularProgressBar';
import './Timer.css';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

const Timer = () => {
  const { mode, pomoCount, setPomoCount, isPaused, setIsPaused, isPausedRef } =
    useContext(PomoContext);
  const [soundClick] = useSound(clickSound);

  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    secondsLeftRef.current =
      (mode === 'work'
        ? WORK_MINUTES
        : mode === 'break'
          ? BREAK_MINUTES
          : LONG_BREAK_MINUTES) * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsLeftRef.current === 0) {
        if (mode === 'work') setPomoCount(pomoCount + 1);
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [isPausedRef, pomoCount, setPomoCount, mode]);

  const totalSeconds =
    (mode === 'work'
      ? WORK_MINUTES
      : mode === 'break'
        ? BREAK_MINUTES
        : LONG_BREAK_MINUTES) * 60;
  const percentage = Math.round(
    ((totalSeconds - secondsLeft) / totalSeconds) * 100
  );

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  const handlePlay = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    soundClick();
  };

  const handlePause = () => {
    setIsPaused(true);
    isPausedRef.current = true;
    soundClick();
  };

  return (
    <div className="container-timer">
      {/* <div className="time-remaining">{minutes + ':' + seconds}</div> */}
      <CircleProgressBar
        percentage={percentage}
        circleWidth="400"
        time={minutes + ':' + seconds}
      />
      <div style={{ marginTop: '20px' }}>
        {isPaused ? (
          <PlayButton onClick={handlePlay} />
        ) : (
          <PauseButton onClick={handlePause} />
        )}
      </div>
    </div>
  );
};

export default Timer;
