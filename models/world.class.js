class World {
  character;
  level = level1;
  canvas;
  animationId;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  endbossBar = new EndbossBar();
  throwableObjects = [];
  collectedBottles = 0;
  collectedCoins = 0;
  timeStamp = new Date();
  backgroundAudio = new Audio("audio/background-sound.mp3");
  losingSound = new Audio("audio/losing-sound.mp3");
  winningSound = new Audio("audio/winning-sound.mp3");
  intervalId = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character();
    this.draw();
    this.setWorld();
    this.run();
    this.playBackgroundMusic();
    this.backgroundAudio.volume = 0.2;
    allSounds.push(this.backgroundAudio, this.losingSound, this.winningSound);
  }

  /**
   * Sets the world for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the game loop at a specified interval.
   */
  run() {
    this.intervalId = setInterval(() => {
      this.checkCollisions();
      this.checkBottleCollects();
      this.checkBottleCollisions();
      this.checkCoinCollects();
      this.checkThrowObjects();
    }, 100);
  }

  /**
   * Stops the game loop.
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Checks if the player can throw an object.
   */
  checkThrowObjects() {
    if (this.collectedBottles != 0) {
      if (this.keyboard.D && new Date() - this.timeStamp > 1000) {
        let bottle = new ThrowableObject(
          this.character.x + 50,
          this.character.y + 50,
          this.character.otherDirection
        );
        this.throwableObjects.push(bottle);
        this.collectedBottles -= 1;
        this.bottleBar.setPercentage(this.collectedBottles * 20);
        this.timeStamp = new Date();
      }
    }
  }

  /**
   * Checks for collisions between thrown objects and enemies.
   */
  checkBottleCollisions() {
    this.throwableObjects.forEach((throwableObject, index1) => {
      this.level.enemies.forEach((enemy) => {
        if (this.bottleHitEnemy(throwableObject, enemy)) {
          this.throwableObjects.splice(index1, 1);
          if (this.enemyIsEndboss(enemy)) {
            this.endbossIsHitted(enemy);
            if (enemy.energy == 0) {
              this.endbossIsDead(enemy);
              this.gameWon();
            }
            return;
          }
          enemy.enemyKilled();
        }
      });
    });
  }

/**
 * Checks if a thrown object has hit an enemy.
 * @param {ThrowableObject} throwableObject - The thrown object.
 * @param {Enemy} enemy - The enemy to check.
 * @returns {boolean} True if the thrown object has hit the enemy, false otherwise.
 */
bottleHitEnemy(throwableObject, enemy) {
  return throwableObject.isColliding(enemy);
}

/**
 * Checks if an enemy is the end boss.
 * @param {Enemy} enemy - The enemy to check.
 * @returns {boolean} True if the enemy is the end boss, false otherwise.
 */
enemyIsEndboss(enemy) {
  return enemy instanceof Endboss;
}

/**
 * Handles the end boss being hit.
 * @param {Endboss} enemy - The end boss that was hit.
 */
endbossIsHitted(enemy) {
  enemy.moveLeft();
  enemy.hit();
  this.endbossBar.setPercentage(enemy.energy);
}

/**
 * Handles the end boss being killed.
 * @param {Endboss} enemy - The end boss that was killed.
 */
endbossIsDead(enemy) {
  enemy.enemyKilled();
  setTimeout(() => {
    cancelAnimationFrame(this.animationId);
  }, 2000);
}

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.enemyIsKilled(enemy)) {
        enemy.enemyKilled();
        enemy.speed = 0;
        return;
      } else if (this.characterIsHittable(enemy)) {
        if (this.character.energy == 0) {
          this.characterIsDead();
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

/**
 * Checks if an enemy is killed by the character.
 * @param {Enemy} enemy - The enemy to check.
 * @returns {boolean} True if the enemy is killed, false otherwise.
 */
enemyIsKilled(enemy) {
  return (
    this.character.isKillingChicken(enemy) &&
    this.character.canAttack &&
    !enemy.isKilled
  );
}

/**
 * Handles the character's death.
 */
characterIsDead() {
  setTimeout(() => {
    cancelAnimationFrame(this.animationId);
  }, 2000);
  this.gameLosed();
}

/**
 * Checks if the character is hittable by an enemy.
 * @param {Enemy} enemy - The enemy to check.
 * @returns {boolean} True if the character is hittable, false otherwise.
 */
characterIsHittable(enemy) {
  return (
    this.character.isColliding(enemy) &&
    this.character.attackable &&
    !enemy.isKilled
  );
}

  /**
   * Checks for collisions between the character and collectable bottles.
   */
  checkBottleCollects() {
    this.level.collectableBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.collectedBottles != 5) {
          this.collectedBottles += 1;
          bottle.playSound();
          this.level.collectableBottles.splice(index, 1);
          this.bottleBar.setPercentage(this.collectedBottles * 20);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and collectable coins.
   */
  checkCoinCollects() {
    this.level.collectableCoins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        if (this.collectedCoins != 5) {
          this.collectedCoins += 1;
          coin.playSound();
          this.level.collectableCoins.splice(index, 1);
          this.coinBar.setPercentage(this.collectedCoins * 20);
        }
      }
    });
  }

  /**
   * Draws the game scene.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.collectableBottles);
    this.addObjectsToMap(this.level.collectableCoins);
    this.ctx.translate(-this.camera_x, 0);
    this.addFixedObjects();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.animationId = requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Stops the animation.
   */
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /**
   * Adds fixed objects to the game scene.
   */
  addFixedObjects() {
    if (this.character.showEndbossBar) {
      this.addToMap(this.endbossBar);
    }
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
  }

  /**
   * Adds an object to the game scene.
   * @param {Object} mo - The object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally.
   * @param {Object} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips an image back to its original state.
   * @param {Object} mo - The object to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Adds multiple objects to the game scene.
   * @param {Array} objects - The objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Plays the background music.
   */
  playBackgroundMusic() {
    this.backgroundAudio.play();
  }

  /**
   * Handles the game over scenario.
   */
  gameLosed() {
    let losingScreen = document.getElementById("end-screen-lose");
    this.backgroundAudio.pause();
    this.losingSound.play();
    this.stop();
    this.character.speed = 0;
    losingScreen.classList.remove("d-none");
  }

  /**
   * Handles the game won scenario.
   */
  gameWon() {
    let winningScreen = document.getElementById("end-screen-win");
    this.backgroundAudio.pause();
    this.winningSound.play();
    this.stop();
    this.character.speed = 0;
    winningScreen.classList.remove("d-none");
  }
}
