import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import PlantUMLEditor from "./components/PlantUMLEditor";
import Homepage from './components/HomePage';

const App = () => {
  return (
    // <div className="p-4">
      <div >
      {/* <h1 className="text-xl font-bold">ClassyCode Prototype</h1> */}
      {/* <PlantUMLEditor /> */}
      <Homepage />
    </div>
  );
};

export default App
