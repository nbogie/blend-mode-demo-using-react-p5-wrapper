import React, { useState } from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";

import { BlendModeInfo, suggestedStartingBlendMode } from './BlendModeInfo';
import { BlendModeSelector } from './BlendModeSelector';
import { Footer, Header } from './HeaderAndFooter';
import { blendModeDemoSketch } from './BlendModeDemoSketch';


export function BlendModeDemo() {
  const [backgroundColour, setBackgroundColour] = useState('white');
  const [selectedBlendMode, setSelectedBlendMode] = useState<BlendModeInfo>(() => suggestedStartingBlendMode());
  const [isGrayscale, setIsGrayscale] = useState<boolean>(false);

  return <>
    <Header />
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
      isGrayscale={isGrayscale}
      sketch={blendModeDemoSketch}
    />
    <Footer />
  </ >

}

export default BlendModeDemo;
