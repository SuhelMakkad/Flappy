// backgournd images are of size 2560 * 1440
class BackgroundLayer {
  constructor(image, sppedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2560;
    this.height = 1440;
    this.image = image;
    this.sppedModifier = sppedModifier;
    this.speed = gameSpeed * this.sppedModifier;
  }

  update() {
    this.speed = gameSpeed * this.sppedModifier;

    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = this.x - this.speed;
    this.draw();
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}
