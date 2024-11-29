class Coin extends CollectableObject {
  width = 150;
  height = 150;
  y = 310;
  collectedSound = new Audio("audio/collect-coin.mp3");

  offset = {
    top: 60,
    left: 60,
    right: 120,
    bottom: 120,
  };

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 2000;
    this.y = 110 + Math.random() * 200;
    allSounds.push(this.collectedSound);
  }

  /**
   * Plays the sound effect when the coin is collected.
   */
  playSound() {
    this.collectedSound.play();
  }
}
