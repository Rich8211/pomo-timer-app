import { createContext, useState, useRef } from 'react';

export const PomoContext = createContext();

const PomoProvider = ({ children }) => {
  const [mode, setMode] = useState('work');
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(true);

  const handleSetMode = (mode) => {
    setMode(mode);
    handlePause();
  };

  const handlePause = () => {
    setIsPaused(true);
    isPausedRef.current = true;
  };

  return (
    <PomoContext.Provider
      value={{
        mode,
        setMode,
        isPaused,
        setIsPaused,
        isPausedRef,
        handleSetMode,
      }}
    >
      {children}
    </PomoContext.Provider>
  );
};

export default PomoProvider;
