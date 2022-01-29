import React, { useState } from 'react';
import './BlendModeDemo.css';
import { ReactP5Wrapper } from "react-p5-wrapper";

import { blendModeDemoSketch } from './BlendModeDemoSketch';
import { BlendModeInfo, suggestedStartingBlendMode } from './BlendModeInfo';
import { BlendModeSelector } from './BlendModeSelector';


export function BlendModeDemo() {
  const [counter, setCounter] = useState(0);
  const [backgroundColour, setBackgroundColour] = useState('white');
  const [selectedBlendMode, setSelectedBlendMode] = useState<BlendModeInfo>(() => suggestedStartingBlendMode());
  const [isGrayscale, setIsGrayscale] = useState<boolean>(false);

  return <>

    <button
      className="big"
      title={"this should have no effect on the p5js sketch"}
      onClick={() => { setCounter(p => p + 10) }}>{counter}</button>

    <div><button onClick={() => setBackgroundColour('white')}>White Background</button>
      <button onClick={() => setBackgroundColour('black')}>Black Background</button>
      <button
        onClick={() => setIsGrayscale(p => !p)}
        title={"set whether added shapes use a colour or grayscale palette"}
      >{isGrayscale ? "grayscale" : "colour"} shapes</button>
    </div>

    <BlendModeSelector
      selectedBlendMode={selectedBlendMode}
      setBlendMode={(bm) => setSelectedBlendMode(bm)} />
    <h2>{selectedBlendMode.name}</h2>
    <p>{selectedBlendMode.description}</p>

    <ReactP5Wrapper
      bgColour={backgroundColour}
      blendMode={selectedBlendMode}
      counter={counter}
      isGrayscale={isGrayscale}
      sketch={blendModeDemoSketch}
    />
  </ >

}
export default BlendModeDemo;
