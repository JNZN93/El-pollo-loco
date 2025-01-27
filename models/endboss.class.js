class Endboss extends MovableObject {
  height = 400;
  width = 200;
  y = 50;
  isKilled = false;
  otherDirection = false;
  walksLeft = false;
  offset = {
    top: 50,
    left: 20,
    right: 20,
    bottom: 80,
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  dead_sound = new Audio("audio/chicken-dead.mp3");
  hurtSound = new Audio("audio/endboss-hurt.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2800;
    this.animate();
    allSounds.push(this.dead_sound, this.hurtSound);
  }
  /**
   * Animates the Endboss object by updating its position and animation state.
   */
  animate() {
    setInterval(() => {
      if (this.x <= 0) {
        this.otherDirection = true;
      } else if (this.x >= 2800) {
        this.otherDirection = false;
      }
      if (this.isHurt()) {
        this.playHurtAnimation();
      } else if (this.isDead()) {
        this.playDeadAnimation();
      } else {
        if (!this.walksLeft) {
          this.playAnimation(this.IMAGES_ALERT);
        } else {
          if (!this.otherDirection) {
            this.moveLeftAnimation();
          } else {
            this.moveRightAnimation();
          }
        }
      }
    }, 200);
  }

  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.otherDirection = false;
    this.hurtSound.play();
    this.walksLeft = true;
  }

  playDeadAnimation() {
    this.isKilled = true;
    this.playAnimation(this.IMAGES_DEAD);
  }

  moveLeftAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
  }

  moveRightAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveRight();
  }

  /**
   * Plays the death animation and sound for the Endboss object.
   */
  enemyKilled() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 200);
    this.dead_sound.play();
  }

  /**
   * Moves the Endboss object to the left by subtracting its speed from its x position.
   */
  moveLeft() {
    this.x -= this.speed * 350;
  }

  /**
   * Moves the Endboss object to the right by adding its speed to its x position.
   */
  moveRight() {
    this.x += this.speed * 350;
  }
}
