import { P5Instance } from "react-p5-wrapper";
import { BlendModeInfo, createBlendModeInfos } from "./BlendModeInfo";
import ORIGINAL_P5 from 'p5';

export function blendModeDemoSketch(p5: P5Instance) {

  let chosenBlendMode: BlendModeInfo;
  let previousBlendMode: BlendModeInfo;
  let blendModeInfos: BlendModeInfo[];

  let myFont: any;

  let rotationDivision: number;
  type ShapeOptions = any;


  let shapeOptions: ShapeOptions;


  p5.updateWithProps = props => {
    // if (props.counter) {
    //   counter = props.counter;
    // }
  };

  p5.preload = () => {
    myFont = p5.loadFont("/fonts/Roboto-Medium.ttf");
  }

  p5.setup = () => {
    console.log('SETUP')
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.mousePressed(myMousePressed);
    p5.background(100);
    shapeOptions = {
      roundedCorners: p5.random([true, false]),
      isGrayscale: p5.random([true, false, false, false])
    };

    blendModeInfos = createBlendModeInfos();
    rotationDivision = p5.random([1, 1, 1, 1, 1, 3, 8, 8, 16, 16])
    randomiseTheBlendMode();
    p5.rectMode(p5.CENTER);
  }

  p5.draw = () => {
    p5.background(250);
    drawShapes();
    drawAllTextOverlays();
  };

  function myMousePressed() {
    console.log('mousePressed')
    p5.background(100);
    randomiseTheBlendMode();
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
      previousBlendMode = chosenBlendMode;
      console.log('storing previous blend mode: ', previousBlendMode)
      chosenBlendMode = found;
      //@ts-ignore
      p5.blendMode(chosenBlendMode.mode);
    }
  }

  function wipe() {
    p5.push();
    p5.blendMode(p5.BLEND);
    p5.background(50);
    p5.pop();
  }
  function randomiseTheBlendMode() {
    const interestingModes = blendModeInfos.filter(i => !i.skip);
    chosenBlendMode = p5.random(interestingModes);
    p5.blendMode(chosenBlendMode.mode as ORIGINAL_P5.BLEND_MODE);
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
    let xPos = p5.random(p5.windowWidth);
    let yPos = p5.random(p5.windowHeight);

    shapeOptions.isGrayscale ? fillWithRandomGrayscale() : fillWithRandomColour();
    let cornerRadius = p5.random(10, 25);
    p5.noStroke();
    p5.push();
    p5.translate(xPos, yPos);

    p5.rotate(p5.random([0, 1, 2, 3, 4, 5, 6, 7]) * p5.TWO_PI / rotationDivision);
    p5.rect(0, 0, w, h, shapeOptions.roundedCorners ? cornerRadius : 0);
    p5.pop();
  }

  function drawBackingForText(font: any, str: string, x: number, y: number, size: number, vPad: number, w: number) {
    p5.blendMode(p5.BLEND);
    p5.colorMode(p5.RGB);
    p5.fill(0);
    const bounds = font.textBounds(str, x, y, size);
    p5.rectMode(p5.CORNER);
    p5.rect(-10, bounds.y - vPad, w, bounds.h + vPad + vPad);
  }

  function drawAllTextOverlays() {
    let bigTextSize = p5.round(p5.height / 16.5);
    let smallTextSize = p5.round(bigTextSize / 2.4);

    //save the current blend mode, etc
    p5.push();
    //set to a controlled blend mode to get reliable result
    let str = chosenBlendMode.name;

    p5.fill('white');
    p5.textFont(myFont);
    p5.textSize(bigTextSize);
    let shortcutLabel = `(${chosenBlendMode.shortcut})`;
    let b = myFont.textBounds(shortcutLabel, 0, 0, bigTextSize);
    let mainTextX = 20 + b.w + 30;

    let endX = p5.width * 0.66;
    drawBackingForText(myFont, str, 100, p5.height - 100, bigTextSize, 30, endX);
    drawBackingForText(myFont, chosenBlendMode.description, 100, p5.height - 70, smallTextSize, 10, endX);

    p5.fill(255)
    p5.text(shortcutLabel, 20, p5.height - 100);
    p5.text(str, mainTextX, p5.height - 100);
    p5.textSize(smallTextSize);
    p5.text(chosenBlendMode.description, mainTextX, p5.height - 70);


    //side labels

    p5.textSize(smallTextSize);
    for (let info of blendModeInfos) {
      let isCurrent = info.name === chosenBlendMode.name;
      drawSideLabelFor(info, myFont, smallTextSize, isCurrent);
    }

    //restore the blendMode...
    p5.pop();
  }

  function makeSideLabelText(shortcut: string, name: string) { return shortcut + " " + name; }

  interface TextBounds {
    w: number;
    h: number;
    x: number;
    y: number;
  }
  function getWorstSidelabelBounds(font: ORIGINAL_P5.Font, textSz: number): TextBounds {
    const longestName = blendModeInfos.map(bmi => bmi.name).sort((a: string, b: string) => a < b ? 1 : -1)[0];
    return font.textBounds(makeSideLabelText("1", longestName), 0, 0, textSz) as TextBounds;
  }

  function drawSideLabelFor(modeInfo: BlendModeInfo, font: any, textSz: number, isCurrent: boolean) {
    p5.push();
    p5.blendMode(p5.BLEND);
    const worstBounds = getWorstSidelabelBounds(font, textSz);
    const positionsLookup = "1234567890-=qwe".split("");
    console.assert(modeInfo);
    const ix = positionsLookup.indexOf(modeInfo.shortcut);
    const str = makeSideLabelText(modeInfo.shortcut, modeInfo.name);

    p5.textSize(textSz);
    p5.rectMode(p5.CORNER);
    p5.fill(0);
    let y = 30 + p5.height * (1 / positionsLookup.length) * ix;
    const bounds = font.textBounds(str, 0, y, textSz);
    let x = p5.width - worstBounds.w - 40;

    let boxX = x - 20;
    let textX = boxX + 10;

    p5.rect(boxX, bounds.y - 10, bounds.w + 200, bounds.h + 20);

    //textStyle(isCurrent ? BOLDITALIC : NORMAL);

    p5.fill(isCurrent ? 'white' : 'gray');
    p5.text(str, textX, y);

    p5.pop();
  }

}
