class Level {
  enemies;
  clouds;
  backgroundObjects;
  collectableBottles;
  collectableCoins;
  level_end_x = 2800;

  constructor(
    enemies,
    clouds,
    backgroundObjects,
    collectableBottles,
    collectableCoins
  ) {
    this.collectableBottles = collectableBottles;
    this.collectableCoins = collectableCoins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }

  addObjects() {
    for (let i = 0; i < 10; i++) {
      this.enemies.push(new SmallChicken());
      this.enemies.push(new Chicken());
      this.collectableBottles.push(new Bottle());
    }

    for (let i = 0; i < 5; i++) {
      this.collectableCoins.push(new Coin());
    }

    this.enemies.push(new Endboss());
  }

  resetObjects() {
    this.enemies = [];
    this.collectableBottles = [];
    this.collectableCoins = [];
  }
}
