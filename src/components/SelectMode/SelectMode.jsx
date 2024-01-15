import React, { useContext } from 'react';
import { PomoContext } from '../../providers/PomoProvider';
import './SelectMode.css'

const SelectMode = () => {
  const { handleSetMode, mode } = useContext(PomoContext);

  return (
    <div className="select-mode">
      <button
        className={mode === 'work' && 'mode-active'}
        onClick={() => handleSetMode('work')}
      >
        Work
      </button>
      <button
        className={mode === 'break' && 'mode-active'}
        onClick={() => handleSetMode('break')}
      >
        Break
      </button>
      <button
        className={mode === 'long break' && 'mode-active'}
        onClick={() => handleSetMode('long break')}
      >
        Long Break
      </button>
    </div>
  );
};

export default SelectMode;
