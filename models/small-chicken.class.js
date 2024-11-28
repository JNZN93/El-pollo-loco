class SmallChicken extends MovableObject {
  y = 370;
  width = 50;
  height = 60;
  speedY = 0;
  acceleration = 3;
  isKilled = false;
  moveLeftInterval;
  walkingInterval;
  deadInterval;

  offset = {
    top: 10,
    left: 10,
    right: 20,
    bottom: 20,
  };

  walking_sound = new Audio("audio/chicken.mp3");
  dead_sound = new Audio("audio/chicken-dead.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 2200;
    this.speed = 0.5 + Math.random() * 0.4;
    super.applyGravity();
    this.animate();
    allSounds.push(this.walking_sound, this.dead_sound);
  }

/**
 * Animates the chicken's movement and jumping.
 */
animate() {
  if (!this.isDead()) {
    this.randomJump();
    this.moveLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    this.walkingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}

/**
 * Checks if the chicken is above the ground.
 * 
 * @returns {boolean} True if the chicken is above the ground, false otherwise.
 */
isAboveGround() {
  if (this instanceof ThrowableObject) {
    return true;
  } else {
    return this.y < 370;
  }
}

/**
 * Handles the chicken's death animation and sound.
 */
enemyKilled() {
  this.isKilled = true;
  clearInterval(this.moveLeftInterval);
  clearInterval(this.walkingInterval);
  clearInterval(this.deadInterval);
  this.deadInterval = setInterval(() => {
    this.playAnimation(this.IMAGES_DEAD);
  }, 100);

  this.dead_sound.play();
}

/**
 * Makes the chicken jump at a random interval.
 */
randomJump() {
  let jumpInterval = Math.random() * 4000;
  this.deadInterval = setInterval(() => {
    super.jump();
  }, jumpInterval)
}
}
