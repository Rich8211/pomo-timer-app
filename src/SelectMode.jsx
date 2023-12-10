import React, { useContext } from 'react'
import { PomoContext } from './PomoProvider/PomoProvider'

const SelectMode = () => {

    const { setMode, setIsPaused, isPausedRef } = useContext(PomoContext);

    const handlePause = () => {
        setIsPaused(true);
        isPausedRef.current = true;
    }

    return (
        <div className='select-mode'>
            <button onClick={() => { setMode('work'); handlePause() }}>Work</button>
            <button onClick={() => { setMode('break'); setIsPaused(true); handlePause() }}>Break</button>
            <button onClick={() => { setMode('long break'); setIsPaused(true); handlePause() }}>Long Break</button>
        </div>
    )
}

export default SelectMode