class Character extends MovableObject {
  speed = 10;
  attackable = true;
  x = 120;
  y = 230;
  width = 100;
  height = 200;
  acceleration = 2.5;
  canAttack = false;
  timeStamp = new Date();
  showEndbossBar = false;

  offset = {
    top: 80,
    left: 20,
    right: 40,
    bottom: 90,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("audio/running_2.mp3");
  jumping_sound = new Audio("audio/jumping.mp3");
  hurting_sound = new Audio("audio/pepe-hurt.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.applyGravity();
    this.animate();
    allSounds.push(this.walking_sound, this.jumping_sound, this.hurting_sound);
  }

/**
 * Animates the character by moving and playing its animations.
 */
animate() {
  this.moveCharacter();
  this.playCharacter();
}

/**
 * Moves the character based on user input and game state.
 */
moveCharacter() {
  setInterval(() => {
    this.walking_sound.pause();
    this.walking_sound.playbackRate = 2.1;
    if (this.canMoveRight()) this.moveRight();

    if (this.canMoveLeft()) this.moveLeft();

    if (this.canJump()) this.jump();

    if (this.x >= 2200) this.showEndbossBar = true;

    this.world.camera_x = -this.x + 100;
  }, 1000 / 40);
}

/**
 * Plays the character's animations based on its state.
 */
playCharacter() {
  setInterval(() => {
    if (this.y < 40) {
      this.canAttack = true;
    } else if (this.y == 230) {
      this.canAttack = false;
    }
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playHurt();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.longIdle()) {
        this.playAnimation(this.IMAGES_LONGIDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
      this.attackable = true;
      if (this.pressAnyKey()) {
        this.playAnimation(this.IMAGES_WALKING);
        this.timeStamp = new Date();
      }
    }
  }, 100);
}

/**
 * Checks if the character can move to the right.
 * @returns {boolean} True if the character can move to the right, false otherwise.
 */
canMoveRight() {
  return (
    this.world.keyboard.RIGHT &&
    this.x < this.world.level.level_end_x &&
    this.speed > 0
  );
}

/**
 * Moves the character to the right.
 */
moveRight() {
  this.otherDirection = false;
  super.moveRight();
  this.walking_sound.play();
}

/**
 * Checks if the character can move to the left.
 * @returns {boolean} True if the character can move to the left, false otherwise.
 */
canMoveLeft() {
  return this.world.keyboard.LEFT && this.x > 0 && this.speed > 0;
}

/**
 * Moves the character to the left.
 */
moveLeft() {
  this.otherDirection = true;
  super.moveLeft();
  this.walking_sound.play();
}

/**
 * Checks if the character can jump.
 * @returns {boolean} True if the character can jump, false otherwise.
 */
canJump() {
  return this.world.keyboard.UP && !this.isAboveGround() && this.speed > 0;
}

/**
 * Makes the character jump.
 */
jump() {
  this.timeStamp = new Date();
  this.jumping_sound.playbackRate = 2;
  this.jumping_sound.play();
  super.jump();
}

/**
 * Checks if the character has been idle for a long time.
 * @returns {boolean} True if the character has been idle for a long time, false otherwise.
 */
longIdle() {
  return new Date() - this.timeStamp > 10000;
}

/**
 * Checks if any key is being pressed.
 * @returns {boolean} True if any key is being pressed, false otherwise.
 */
pressAnyKey() {
  return (
    this.world.keyboard.RIGHT ||
    this.world.keyboard.LEFT
  );
}

/**
 * Plays the character's hurt animation and sound.
 */
playHurt() {
  this.attackable = false;
  this.playAnimation(this.IMAGES_HURT);
  this.hurting_sound.play();
}
}
