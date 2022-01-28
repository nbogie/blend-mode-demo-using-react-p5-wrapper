import React, { useState } from 'react';
import './BlendModeDemo.css';
import { P5Instance, ReactP5Wrapper } from "react-p5-wrapper";

import { blendModeDemoSketch2 } from './BlendModeDemoSketch';


export function BlendModeDemo() {
  const [counter, setCounter] = useState(0);

  return <div>
    <div className="big">{counter}</div>
    <button onClick={() => { setCounter(p => p + 10) }}>Plus</button>
    <ReactP5Wrapper counter={counter} sketch={blendModeDemoSketch2} />
  </div>
}

export default BlendModeDemo;
