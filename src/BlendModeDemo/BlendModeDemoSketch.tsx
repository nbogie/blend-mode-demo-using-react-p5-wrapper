import { P5Instance } from "react-p5-wrapper";
import { BlendModeInfo, createBlendModeInfos } from "./BlendModeInfo";
import ORIGINAL_P5 from 'p5';

export function blendModeDemoSketch(p5: P5Instance) {

  let chosenBlendMode: BlendModeInfo;
  // let previousBlendMode: BlendModeInfo;
  let blendModeInfos: BlendModeInfo[];

  // let myFont: ORIGINAL_P5.Font;

  let rotationDivision: number;
  type ShapeOptions = any;

  let bgColour: string = 'black';
  let shapeOptions: ShapeOptions = {
    roundedCorners: true,
    isGrayscale: false
  };

  let setupRan = false;

  p5.updateWithProps = props => {
    // console.log('update with props: ', { props })
    if (props.bgColour) {
      bgColour = props.bgColour;
      if (setupRan) { // we should only do this if the prop value changed.
        // p5.background(bgColour);
      }
    }
    if (props.blendMode) {
      if (setupRan) {
        //p5 will have a renderer by now
        updateChosenBlendMode(props.blendMode)
      } else {
        chosenBlendMode = props.blendMode;
      }
    }
    shapeOptions.isGrayscale = props.isGrayscale;
  };

  p5.preload = () => {
    // myFont = p5.loadFont("/fonts/Roboto-Medium.ttf");
  }

  p5.setup = () => {
    console.log('SETUP')
    const canvas = p5.createCanvas(640, 480);
    canvas.mousePressed(myMousePressed);

    p5.background(bgColour);

    blendModeInfos = createBlendModeInfos();
    rotationDivision = p5.random([1, 1, 1, 1, 1, 3, 8, 8, 16, 16])
    setupRan = true;
    updateChosenBlendMode(chosenBlendMode);
    // randomiseTheBlendMode();
  }

  p5.draw = () => {
    if (p5.frameCount % 8 === 1)
      drawShapes();
  };

  function myMousePressed() {
    p5.background(100);
    randomiseTheBlendMode();//this needs to do so in a way that lets react know, too...
  }

  //We *might* prefer to say canvas.keyPressed(callback) to only catch key events when canvas in focus.
  p5.keyPressed = () => {
    if (p5.key === 'b') {
      shapeOptions.isGrayscale = !shapeOptions.isGrayscale;
      wipe();
    }
    if (p5.key === 'r') {
      shapeOptions.roundedCorners = !shapeOptions.roundedCorners;
    }
    if (p5.key === 'c') {
      wipe();
    }
    if (p5.key === ' ') {
      p5.noLoop();
    }
    const found = blendModeInfos.find(info => p5.key === info.shortcut);
    if (found) {
      updateChosenBlendMode(found);
    }
  }

  function updateChosenBlendMode(modeInfo: BlendModeInfo) {
    // previousBlendMode = chosenBlendMode;
    chosenBlendMode = modeInfo;
    p5.blendMode(modeInfo.mode as ORIGINAL_P5.BLEND_MODE);
  }

  function wipe() {
    p5.push();
    p5.blendMode(p5.BLEND);
    p5.background(bgColour);
    p5.pop();
  }

  function randomiseTheBlendMode() {
    const interestingModes = blendModeInfos.filter(i => !i.skip);
    updateChosenBlendMode(p5.random(interestingModes));
  }

  function fillWithRandomColour() {
    p5.colorMode(p5.HSB, 360, 100, 100);
    let h = p5.random(360);
    let s = p5.random([100, 40]);
    let b = 100;
    p5.fill(h, s, b);
  }

  function fillWithRandomGrayscale() {
    p5.colorMode(p5.RGB);
    p5.fill(p5.random(255));
  }

  function drawShapes() {
    let w = p5.random(50, 300);
    let h = p5.random(50, 300);
    let xPos = p5.random(p5.width);
    let yPos = p5.random(p5.height);

    shapeOptions.isGrayscale ? fillWithRandomGrayscale() : fillWithRandomColour();
    let cornerRadius = p5.random(10, 25);
    p5.noStroke();
    p5.push();
    p5.translate(xPos, yPos);

    p5.rotate(p5.random([0, 1, 2, 3, 4, 5, 6, 7]) * p5.TWO_PI / rotationDivision);
    p5.rectMode(p5.CENTER);
    p5.rect(0, 0, w, h, shapeOptions.roundedCorners ? cornerRadius : 0);
    p5.pop();
  }

}
