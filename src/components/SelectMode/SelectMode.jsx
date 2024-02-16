import React, { useContext } from 'react';
import { PomoContext } from '../../providers/PomoProvider';
import './SelectMode.css';

import Button from '../Buttons/Button';

const SelectMode = () => {
  const { handleSetMode, mode } = useContext(PomoContext);

  return (
    <div className="select-mode">
      <Button active={mode === 'work'} onClick={() => handleSetMode('work')}>
        Work
      </Button>
      <Button active={mode === 'break'} onClick={() => handleSetMode('break')}>
        Break
      </Button>
      <Button
        active={mode === 'long break'}
        onClick={() => handleSetMode('long break')}
      >
        Long Break
      </Button>
    </div>
  );
};

export default SelectMode;
