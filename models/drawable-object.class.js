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

/**
 * Loads an image from the specified path.
 * @param {string} path - The path to the image file.
 */
loadImage(path) {
  this.img = new Image();
  this.img.src = path;
}

/**
 * Loads multiple images from the specified array of paths.
 * @param {string[]} arr - An array of paths to image files.
 */
loadImages(arr) {
  arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imageChache[path] = img;
  });
}

/**
 * Draws the loaded image on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
draw(ctx) {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

/**
 * Draws a frame around the object on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @throws {Error} If the object is not an instance of Character or SmallChicken.
 */
drawFrame(ctx) {
  if (this instanceof Character || this instanceof SmallChicken ) {
    ctx.beginPath();
    ctx.stroke();
  }
}

/**
 * Draws a frame around the object on the canvas, taking into account the offset.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @throws {Error} If the object is not an instance of Character, SmallChicken, or Chicken.
 */
drawOffsetFrame(ctx) {
  if (this instanceof Character || this instanceof SmallChicken || this instanceof Chicken) {
    ctx.beginPath();
    //ctx.rect( this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
    ctx.stroke();
  }
}
}
