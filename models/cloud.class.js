class Cloud extends MovableObject {
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2200;
    this.y = 20;
    this.animate();
  }

  /**
   * Animates the cloud object by continuously moving it to the left.
   */
  animate() {
    /**
     * Sets an interval to call the moveLeft method every 20 milliseconds.
     */
    setInterval(() => {
      this.moveLeft();
    }, 20);
  }
}
