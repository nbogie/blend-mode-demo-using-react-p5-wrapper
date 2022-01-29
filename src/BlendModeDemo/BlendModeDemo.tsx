import React, { useState } from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";

import { BlendModeInfo, suggestedStartingBlendMode } from './BlendModeInfo';
import { BlendModeSelector } from './BlendModeSelector';
import { Footer, Header } from './HeaderAndFooter';
import { blendModeDemoSketch } from './BlendModeDemoSketch';
import { Button, Container, Heading, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'


export function BlendModeDemo() {
  const [backgroundColour, setBackgroundColour] = useState('white');
  const [selectedBlendMode, setSelectedBlendMode] = useState<BlendModeInfo>(() => suggestedStartingBlendMode());
  const [isGrayscale, setIsGrayscale] = useState<boolean>(false);

  return <Container>
    <VStack>
      <Header />
      <div>
        <HStack>
          <Button
            variant={backgroundColour === 'white' ? 'solid' : 'outline'}
            onClick={() => setBackgroundColour('white')}>White Background</Button>
          <Button
            variant={backgroundColour === 'black' ? 'solid' : 'outline'}
            onClick={() => setBackgroundColour('black')}>Black Background</Button>

          <Button
            onClick={() => setIsGrayscale(p => !p)}
          >
            <Tooltip
              label={`Shapes will be created from ${isGrayscale ? "grayscale" : "colour"} palette`}
            >{(isGrayscale ? "grayscale" : "colour") + " shapes"}</Tooltip>
          </Button>
        </HStack>
      </div>

      <BlendModeSelector
        selectedBlendMode={selectedBlendMode}
        setBlendMode={(bm) => setSelectedBlendMode(bm)} />
      <Heading>{selectedBlendMode.name}</Heading>
      <Text>{selectedBlendMode.description}</Text>

      <ReactP5Wrapper
        bgColour={backgroundColour}
        blendMode={selectedBlendMode}
        isGrayscale={isGrayscale}
        sketch={blendModeDemoSketch}
      />
      <Footer />
    </VStack>
  </Container >

}

export default BlendModeDemo;
