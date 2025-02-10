import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlantUMLEditor from "./components/PlantUMLEditor";

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">ClassyCode Prototype</h1>
      <PlantUMLEditor />
    </div>
  );
};

export default App
