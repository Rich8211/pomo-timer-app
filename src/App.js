import PomoProvider from './PomoProvider/PomoProvider';
import './App.css';
import Timer from './Timer';
import SelectMode from './SelectMode';

function App() {
  return (
    <main>
      <PomoProvider>
      <SelectMode />
      <Timer />
    </PomoProvider>
    </main>
    
  );
}

export default App;
