class Chicken extends MovableObject {
  y = 340;
  width = 70;
  height = 90;
  isKilled = false;
  moveLeftInterval;
  walkingInterval;
  deadInterval;

  offset = {
    top: 0,
    left: 10,
    right: 30,
    bottom: 10,
  };

  walking_sound = new Audio("audio/chicken.mp3");
  dead_sound = new Audio("audio/chicken-dead.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 2200;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    allSounds.push(this.walking_sound, this.dead_sound);
  }

  /**
   * Animates the chicken's movement and walking animation.
   */
  animate() {
    if (!this.isDead()) {
      this.moveLeftInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      this.walkingInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 200);
    }
  }

  /**
   * Handles the chicken's death animation and sound.
   */
  enemyKilled() {
    this.isKilled = true;
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkingInterval);
    this.deadInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 100);

    this.dead_sound.play();
  }
}
