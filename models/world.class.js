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

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.intervalId = setInterval(() => {
      this.checkCollisions();
      this.checkBottleCollects();
      this.checkBottleCollisions();
      this.checkCoinCollects();
      this.checkThrowObjects();
    }, 100);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

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

  checkBottleCollisions() {
    this.throwableObjects.forEach((throwableObject, index1) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          this.throwableObjects.splice(index1, 1);
          if (enemy instanceof Endboss) {
            enemy.moveLeft();
            enemy.hit();
            this.endbossBar.setPercentage(enemy.energy);
            if (enemy.energy == 0) {
              enemy.enemyKilled();
              setTimeout(() => {
                cancelAnimationFrame(this.animationId);
              }, 2000);
              this.gameWon();
            }
            return;
          }
          enemy.enemyKilled();
        }
      });
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isKillingChicken(enemy) &&
        this.character.canAttack &&
        !enemy.isKilled
      ) {
        enemy.enemyKilled();
        enemy.speed = 0;
        return;
      } else if (
        this.character.isColliding(enemy) &&
        this.character.attackable &&
        !enemy.isKilled
      ) {
        if (this.character.energy == 0) {
          setTimeout(() => {
            cancelAnimationFrame(this.animationId);
          }, 2000);
          this.gameLosed();
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

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

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  addFixedObjects() {
    if (this.character.showEndbossBar) {
      this.addToMap(this.endbossBar);
    }
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
  };

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  playBackgroundMusic() {
    this.backgroundAudio.play();
  }

  gameLosed() {
    let losingScreen = document.getElementById("end-screen-lose");
    this.backgroundAudio.pause();
    this.losingSound.play();
    this.stop();
    this.character.speed = 0;
    losingScreen.classList.remove("d-none");
  }s

  gameWon() {
    let winningScreen = document.getElementById("end-screen-win");
    this.backgroundAudio.pause();
    this.winningSound.play();
    this.stop();
    this.character.speed = 0;
    winningScreen.classList.remove("d-none");
  }
}
