import { P5Instance } from "react-p5-wrapper";


export function blendModeDemoSketch(p5: P5Instance) {

  let counter = 99;

  p5.updateWithProps = props => {
    if (props.counter) {
      counter = props.counter;
    }
  };

  p5.setup = () => p5.createCanvas(600, 400);

  p5.draw = () => {
    p5.background(250);
    p5.push();
    p5.textSize(100);
    p5.fill(0);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.rotate(p5.frameCount * 0.01);
    p5.text("c:" + counter, 0, 0);
    p5.pop();
  };
}
