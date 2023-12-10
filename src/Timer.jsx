import React, { useContext, useEffect, useState, useRef } from 'react'
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import useSound from 'use-sound';
import clickSound from './Sounds/click.mp3'
import { PomoContext } from './PomoProvider/PomoProvider'

const workMinutes = 25;
const breakMinutes = 5;
const longBreakMinutes = 15;

const Timer = () => {

    const { mode, pomoCount, setPomoCount, isPaused, setIsPaused, isPausedRef } = useContext(PomoContext);
    const [click] = useSound(clickSound)

    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        secondsLeftRef.current = (mode === 'work' ? workMinutes : mode === 'break' ? breakMinutes : longBreakMinutes) * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {

            if (isPausedRef.current) return;

            if (secondsLeftRef.current === 0) {
                if (mode === 'work') setPomoCount(pomoCount + 1);
            }
            tick();
        }, 1000)
        return () => clearInterval(interval);
    }, [isPausedRef,pomoCount, setPomoCount, mode])

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    const handlePlay = () => {
        setIsPaused(false);
        isPausedRef.current = false;
        click();
    }

    const handlePause = () => {
        setIsPaused(true);
        isPausedRef.current = true;
        click();
    }

    return (
        <div>
            <div className='time-remaining'>{minutes + ':' + seconds}</div>
            <div style={{ marginTop: '20px' }}>
                {isPaused
                    ? <PlayButton onClick={handlePlay} />
                    : <PauseButton onClick={handlePause} />}
            </div>
        </div>
    )
}

export default Timer