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

  /**
   * Adds objects to the level, including enemies, collectable bottles, and coins.
   */
  addObjects() {
    /**
     * Adds a specified number of small chickens, chickens, and bottles to the level.
     */
    for (let i = 0; i < 10; i++) {
      this.enemies.push(new SmallChicken());
      this.enemies.push(new Chicken());
      this.collectableBottles.push(new Bottle());
    }

    /**
     * Adds a specified number of coins to the level.
     */
    for (let i = 0; i < 5; i++) {
      this.collectableCoins.push(new Coin());
    }

    /**
     * Adds an end boss to the level.
     */
    this.enemies.push(new Endboss());
  }

  /**
   * Resets the level objects, clearing the enemies, collectable bottles, and coins.
   */
  resetObjects() {
    this.enemies = [];
    this.collectableBottles = [];
    this.collectableCoins = [];
  }
}
