class Bottle extends CollectableObject {
  width = 100;
  height = 80;
  y = 350;
  collectedSound = new Audio("audio/collect-bottle.mp3");

  offset = {
    top: 10,
    left: 30,
    right: 60,
    bottom: 20,
  };

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 2000;
    allSounds.push(this.collectedSound);
  }

  playSound() {
    this.collectedSound.play();
  }
}
