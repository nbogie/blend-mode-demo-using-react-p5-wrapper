import React, { useState } from 'react';
import './App.css';
import { P5Instance, ReactP5Wrapper } from "react-p5-wrapper";
import { count } from 'console';
import { blendModeDemoSketch } from './BlendModeDemoSketch';


export function BlendModeDemo() {
  const [counter, setCounter] = useState(0);

  return <div>
    <div className="big">{counter}</div>
    <button onClick={() => { setCounter(p => p + 1) }}>Plus</button>
    <ReactP5Wrapper counter={counter} sketch={blendModeDemoSketch} />
  </div>
}

export default BlendModeDemo;
