import React from 'react';
import Registration from './Componentes/rigstration';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Registration />
      </div>
    </ThemeProvider>
  );
}

export default App;