class ThrowableObject extends MovableObject {
  offset = {
    top: 10,
    left: 20,
    right: 40,
    bottom: 20,
  };

  IMAGES_THROWBOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, otherDirection) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROWBOTTLE);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 80;
    this.throw(otherDirection);
  }

/**
 * Throws the object in a specified direction.
 * 
 * @param {boolean} otherDirection - The direction of the throw. If true, the object is thrown to the left; otherwise, it is thrown to the right.
 */
throw(otherDirection) {
  this.speedY = 30;
  this.applyGravity();

  setInterval(() => {
    this.playAnimation(this.IMAGES_THROWBOTTLE);
    if (otherDirection) {
      this.x -= 20;
    } else {
      this.x += 20;
    }
  }, 50);
}
}
