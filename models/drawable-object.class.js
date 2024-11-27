class DrawableObject {
  img;
  imageChache = [];
  currentImage = 0;
  x;
  y;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof SmallChicken ) {
      ctx.beginPath();
      ctx.stroke();
    }
  }

  drawOffsetFrame(ctx) {
    if (this instanceof Character || this instanceof SmallChicken || this instanceof Chicken) {
      ctx.beginPath();
      //ctx.rect( this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
      ctx.stroke();
    }
  }
}
