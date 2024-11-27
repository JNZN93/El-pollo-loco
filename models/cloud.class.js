class Cloud extends MovableObject {
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2200;
    this.y = 20;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 20);
  }
}
