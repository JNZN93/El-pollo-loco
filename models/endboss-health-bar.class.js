class EndbossBar extends StatusBar {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  energy = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(this.percentage);
  }

/**
 * Sets the percentage of the endboss bar.
 * @param {number} percentage - The percentage to set (0-100).
 */
setPercentage(percentage) {
  this.percentage = percentage;
  let path = this.IMAGES[this.resolveImageIndex()];
  this.img = this.imageChache[path];
}

/**
 * Resolves the image index based on the current percentage.
 * @returns {number} The index of the image to display.
 */
resolveImageIndex() {
  if (this.percentage == 100) {
    return 5;
  } else if (this.percentage >= 80) {
    return 4;
  } else if (this.percentage >= 60) {
    return 3;
  } else if (this.percentage >= 40) {
    return 2;
  } else if (this.percentage >= 20) {
    return 1;
  } else {
    return 0;
  }
}
}
