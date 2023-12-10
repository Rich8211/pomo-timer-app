import { createContext, useState, useRef } from "react";

export const PomoContext = createContext();



const PomoProvider = ({ children }) => {


    const [mode, setMode] = useState('work');
    const [pomoCount, setPomoCount] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const isPausedRef = useRef(isPaused);

    return <PomoContext.Provider
        value={{
            mode,
            setMode,
            pomoCount,
            setPomoCount,
            isPaused,
            setIsPaused,
            isPausedRef
        }}
    >
        {children}
    </PomoContext.Provider>
}

export default PomoProvider