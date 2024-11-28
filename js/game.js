let canvas;
let world;
let keyboard = new Keyboard();
let allSounds = [];
let allSoundsMuted = localStorage.getItem("allSoundsMuted");

/**
 * Initializes the game world and sets up the canvas and keyboard.
 */
function init() {
  deleteWorldInstance();
  allSounds = [];
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.level.resetObjects();
  world.level.addObjects();
  buttonTouchEvents();
  hideStartScreen();
  hideLosingScreen();
  hideWiningScreen();
  initializeVolume();
}

/**
 * Clears all intervals that are currently set.
 */
function clearAllIntervals() {
  for (let i = 1; i < 99999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Deletes the current world instance and clears intervals.
 */
function deleteWorldInstance() {
  if (world) {
    clearAllIntervals();
    world = null;
  }
}

// Event listeners for keyboard input
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = true;
  } else if (e.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (e.keyCode == 37) {
    keyboard.LEFT = true;
  } else if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  } else if (e.keyCode == 32) {
    keyboard.SPACE = true;
  } else if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = false;
  } else if (e.keyCode == 40) {
    keyboard.DOWN = false;
  } else if (e.keyCode == 37) {
    keyboard.LEFT = false;
  } else if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  } else if (e.keyCode == 32) {
    keyboard.SPACE = false;
  } else if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Sets up touch events for the buttons.
 */
function buttonTouchEvents() {
  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

/**
 * Enters fullscreen mode for the overlay element.
 */
function fullscreen() {
  let overlay = document.getElementById("overlay");
  enterFullscreen(overlay);
}

/**
 * Requests fullscreen for the specified element.
 * @param {HTMLElement} element - The element to make fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  }
}

/**
 * Hides the start screen overlay.
 */
function hideStartScreen() {
  let startScreen = document.getElementById("start-screen-overlay");
  startScreen.classList.add("d-none");
}

/**
 * Hides the losing screen overlay.
 */
function hideLosingScreen() {
  let losingScreen = document.getElementById("end-screen-lose");
  losingScreen.classList.add("d-none");
}

/**
 * Hides the winning screen overlay.
 */
function hideWiningScreen() {
  let winningScreen = document.getElementById("end-screen-win");
  winningScreen.classList.add("d-none");
}

/**
 * Toggles the volume of all sounds.
 */
function toggleVolume() {
  let volumeButton = document.getElementById("volume-button");
  if(allSoundsMuted == null) {
    allSoundsMuted = false;
  }

  allSoundsMuted = !allSoundsMuted;
  console.log("toggle " + allSoundsMuted);

  volumeButton.src = allSoundsMuted
    ? "img/10_buttons/unmute.png"
    : "img/10_buttons/mute.png";
  allSounds.forEach((sound) => {
    sound.muted = allSoundsMuted;
  });
  localStorage.setItem("allSoundsMuted", allSoundsMuted);
}

/**
 * Initializes the volume settings based on the stored state.
 */
function initializeVolume() {
  let volumeButton = document.getElementById("volume-button");
  if(allSoundsMuted == null) {
    allSoundsMuted = false;
  }
  if(allSoundsMuted == 'false') {
    allSoundsMuted = false;
  }
  if(allSoundsMuted == 'true') {
    allSoundsMuted = true;
  }
  
  console.log('init ' + allSoundsMuted);

  volumeButton.src = allSoundsMuted ? "img/10_buttons/unmute.png" : "img/10_buttons/mute.png";

  allSounds.forEach((sound) => {
    sound.muted = allSoundsMuted;
  });
  localStorage.setItem("allSoundsMuted", allSoundsMuted);
}

/**
 * Toggles the visibility of the controls container.
 */
function howToPlay() {
    let controlsCon = document.getElementById('controls-container')
    controlsCon.classList.toggle('d-none');
}
