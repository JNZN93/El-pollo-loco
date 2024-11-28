class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;

/**
 * Applies gravity to the movable object.
 * 
 * This function uses the setInterval function to continuously update the object's position
 * based on its speed and acceleration.
 */
applyGravity() {
  setInterval(() => {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }, 1000 / 25);
}

/**
 * Checks if the movable object is above the ground.
 * 
 * If the object is an instance of ThrowableObject, it is considered to be above the ground.
 * Otherwise, it checks if the object's y position is less than 230.
 * 
 * @returns {boolean} True if the object is above the ground, false otherwise.
 */
isAboveGround() {
  if (this instanceof ThrowableObject) {
    return true;
  } else {
    return this.y < 230;
  }
}

/**
 * Checks if the movable object is colliding with another movable object.
 * 
 * This function checks if the object's bounding box intersects with the other object's bounding box.
 * 
 * @param {MovableObject} mo The other movable object to check for collision.
 * @returns {boolean} True if the objects are colliding, false otherwise.
 */
isColliding(mo) {
  return (
    this.x + this.offset.left + this.width - this.offset.right >
      mo.x + mo.offset.left &&
    this.y + this.offset.top + this.height - this.offset.bottom >
      mo.y + mo.offset.top &&
    this.x + this.offset.left <
      mo.x + mo.offset.left + mo.width - mo.offset.right &&
    this.y + this.offset.top <
      mo.y + mo.offset.top + mo.height - mo.offset.bottom
  );
}

/**
 * Checks if the movable object is killing a chicken.
 * 
 * This function checks if the object's x position is within the chicken's x bounds and
 * if the object's y position is within a certain tolerance of the chicken's y position.
 * 
 * @param {MovableObject} mo The chicken object to check for killing.
 * @returns {boolean} True if the object is killing the chicken, false otherwise.
 */
isKillingChicken(mo) {
  const tolerance = 30;
  return (
    this.x + this.offset.left <
      mo.x + mo.offset.left + mo.width - mo.offset.right &&
    this.x + this.offset.left + this.width - this.offset.right >
      mo.x + mo.offset.left &&
    Math.abs(
      this.y +
        this.offset.top +
        this.height -
        this.offset.bottom -
        mo.y +
        mo.offset.top
    ) <= tolerance
  );
}

/**
 * Applies damage to the movable object.
 * 
 * This function reduces the object's energy by 20 and updates the last hit time.
 * If the object's energy falls below 0, it is set to 0.
 * 
 * @returns {void}
 */
hit() {
  this.energy -= 20;
  if (this.energy < 0) {
    this.energy = 0;
  } else {
    this.lastHit = new Date().getTime();
    console.log(this.energy);
  }
}

/**
 * Checks if the movable object is hurt.
 * 
 * This function checks if the time since the last hit is less than 1 second.
 * 
 * @returns {boolean} True if the object is hurt, false otherwise.
 */
isHurt() {
  let timepassed = new Date().getTime() - this.lastHit;
  timepassed = timepassed / 1000;
  return timepassed < 1;
}

/**
 * Checks if the movable object is dead.
 * 
 * This function checks if the object's energy is 0.
 * 
 * @returns {boolean} True if the object is dead, false otherwise.
 */
isDead() {
  return this.energy == 0;
}

/**
 * Plays an animation on the movable object.
 * 
 * This function updates the object's image based on the current image index and the provided images array.
 * 
 * @param {string[]} images The array of image paths to play.
 * @returns {void}
 */
playAnimation(images) {
  let i = this.currentImage % images.length;
  let path = images[i];
  this.img = this.imageChache[path];
  this.currentImage++;
}

/**
 * Moves the movable object to the right.
 * 
 * This function updates the object's x position based on its speed.
 * 
 * @returns {void}
 */
moveRight() {
  this.x += this.speed;
}

/**
 * Moves the movable object to the left.
 * 
 * This function updates the object's x position based on its speed.
 * 
 * @returns {void}
 */
moveLeft() {
  this.x -= this.speed;
}

/**
 * Makes the movable object jump.
 * 
 * This function sets the object's speedY to 30.
 * 
 * @returns {void}
 */
jump() {
  this.speedY = 30;
}
}
