const pipeImgDown = new Image();
pipeImgDown.src = "./assets/images/pipeDown.png";
pipeImgDown.width = 100;
pipeImgDown.height = 400;
const pipeImgUp = new Image();
pipeImgUp.src = "./assets/images/pipeUp.png";
pipeImgUp.width = 100;
pipeImgUp.height = 400;

class Pipe {
  constructor(x, y, width, height, isAbove) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isAbove = isAbove;
  }

  draw() {
    if (this.isAbove) {
      ctx.drawImage(pipeImgDown, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(pipeImgUp, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.x -= gameSpeed;
    this.draw();
  }
}
