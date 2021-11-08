const BIRD_WIDTH = 1072;
const BIRD_HEIGHT = 842;
const BIRD_WIDTH_TO_SHOW = 100;
const BIRD_HEIGHT_TO_SHOW = 65;
const SPRITE_LENGTH = 17;
const GRAVITY_FACTOR = 20;

const birdSpriteSheet = new Image();
birdSpriteSheet.src = "./assets/images/spritesheet.png";
birdSpriteSheet.width = BIRD_WIDTH;
birdSpriteSheet.height = BIRD_HEIGHT;

class Bird {
  constructor(x, y, birdSpriteSheet, width, height) {
    this.birdFrame = 0;
    this.x = x;
    this.y = y;
    this.birdSpriteSheet = birdSpriteSheet;
    this.height = height;
    this.width = width;
  }

  draw() {
    ctx.drawImage(
      this.birdSpriteSheet,
      this.birdFrame * BIRD_WIDTH,
      0 * BIRD_HEIGHT,
      BIRD_WIDTH,
      BIRD_HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  animate(speed = 25) {
    clearInterval(this.birdFrameInteval);
    this.birdFrameInteval = setInterval(() => {
      if (this.y < canvas.height - this.height * 0.05) {
        this.updateBirdFrame();
      }
    }, speed);
  }

  updateBirdFrame() {
    this.birdFrame++;
    this.birdFrame = this.birdFrame % SPRITE_LENGTH;
    this.draw();
  }

  updateBirdPos(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    clearInterval(this.birdPosInterval);

    if (this.y < 0 || this.y >= canvas.height) {
      gameOver = true;
      handleGameOver();
      return;
    }

    this.birdPosInterval = setInterval(() => {
      if (y === this.y && x === this.x) {
        clearInterval(this.birdPosInterval);
        this.updateBirdPos(this.x, this.y + GRAVITY_FACTOR);
      } else if (x !== this.x) {
        if (x > this.x) this.x += 1;
        else this.x -= 1;
      } else if (y !== this.y) {
        if (y > this.y) this.y += 1;
        else this.y -= 1;
      }
    }, 1);
  }
}
