import React, { useState } from 'react';
import './BlendModeDemo.css';
import { ReactP5Wrapper } from "react-p5-wrapper";

import { blendModeDemoSketch } from './BlendModeDemoSketch';
import { createBlendModeInfos } from './BlendModeInfo';


export function BlendModeDemo() {
  const [counter, setCounter] = useState(0);
  // const blendModeInfos = createBlendModeInfos();
  return <div>
    <div className="big">{counter}</div>
    <button onClick={() => { setCounter(p => p + 10) }}>Plus</button>

    <ReactP5Wrapper counter={counter} sketch={blendModeDemoSketch} />
  </div>

}

export default BlendModeDemo;
