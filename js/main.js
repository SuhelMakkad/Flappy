/**
 * Background Art taken from - https://opengameart.org/content/hills-scenery-background-seamless
 * Bird Art taken from - https://opengameart.org/content/flappy-bird-sprite-icy-flying-character
 * Background Music -   Fluffing a Duck Kevin MacLeod (incompetech.com)
                        Licensed under Creative Commons: By Attribution 3.0 License
                        http://creativecommons.org/licenses/by/3.0/
                        Music promoted by https://www.chosic.com/free-music/all/
 * Flap Sound - https://www.myinstants.com/instant/flappy-birds-wing/
 * Crash Sound - https://www.myinstants.com/instant/bruh/
*/

const gmaeOverModal = document.getElementById("game-over-modal");
const startModal = document.getElementById("start-modal");

const startBtn = document.getElementById("start-btn");
const muteBtn = document.getElementById("svg-unmuted");
const unMuteBtn = document.getElementById("svg-muted");

const scoreEle = document.getElementById("score");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const obsticalWidth = 100;
const gameSpeed = 5;
const backgroundAudio = new Audio("./assets/audio/background.mp3");
const flapdAudio = new Audio("./assets/audio/flap.mp3");
const crashAudio = new Audio("./assets/audio/bruh.mp3");

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./assets/images/background/sky.png";
backgroundLayer1.width = 2560;
backgroundLayer1.height = 1440;
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./assets/images/background/background_hills.png";
backgroundLayer2.width = 2560;
backgroundLayer2.height = 1440;
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./assets/images/background/clouds.png";
backgroundLayer3.width = 2560;
backgroundLayer3.height = 1440;
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./assets/images/background/middle_part.png";
backgroundLayer4.width = 2560;
backgroundLayer4.height = 1440;
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./assets/images/background/foreground.png";
backgroundLayer5.width = 2560;
backgroundLayer5.height = 1440;

const backgroundLayers = [
  new BackgroundLayer(backgroundLayer1, 0.2),
  new BackgroundLayer(backgroundLayer2, 0.4),
  new BackgroundLayer(backgroundLayer3, 0.6),
  new BackgroundLayer(backgroundLayer4, 0.8),
  new BackgroundLayer(backgroundLayer5, 1),
];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let obsticalLength = canvas.height / 2 + 150;
let playAudio = true;
let gameOver = false;
let gameAnimation;
let spawnPipesInterval;
let bird;
let pipes;
let score = 0;

function startAudio() {
  if (!playAudio) return;
  if (typeof backgroundAudio.loop == "boolean") {
    backgroundAudio.loop = true;
  } else {
    backgroundAudio.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
  }
  backgroundAudio.play();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundLayers.forEach((backgroundLayer) => backgroundLayer.update());

  pipes.forEach((pipe) => {
    pipe.update();

    //collision detection
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + pipe.width > pipe.x &&
      bird.y < pipe.y + pipe.height &&
      bird.y + bird.height > pipe.y
    ) {
      handleGameOver();
      gameOver = true;
      return;
    }

    if (pipe.x < -obsticalWidth) {
      setTimeout(() => {
        pipes.splice(pipes.indexOf(pipe), 1);
      });
    }
  });

  bird.draw();
  if (gameOver) return;

  gameAnimation = requestAnimationFrame(animate);
}

function spawnPipes() {
  spawnPipesInterval = setInterval(() => {
    let length = getRandomInt(canvas.height * 0.3, obsticalLength);

    if (length > canvas.height * 0.6) length = canvas.height * 0.6;
    pipes.push(new Pipe(canvas.width, -length, 100, canvas.height));
    pipes.push(new Pipe(canvas.width, canvas.height - length + 300, 100, canvas.height, true));
  }, 3500);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleGameOver() {
  playAudio && crashAudio.play();

  if (score > 0) {
    enterNameModal.style.display = "block";
  } else {
    gmaeOverModal.style.display = "block";
  }
  clearInterval(scoreInterval);
  clearInterval(spawnPipesInterval);
  clearInterval(bird.birdFrameInteval);
  clearInterval(bird.birdPosInterval);
  cancelAnimationFrame(gameAnimation);

  console.log("%cGame Over", "color: red");
}

function restartGame() {
  gameOver = false;
  gmaeOverModal.style.display = "none";
  startModal.style.display = "none";
  score = 0;
  scoreEle.innerHTML = score;

  bird = new Bird(
    canvas.width / 2,
    canvas.height / 2,
    birdSpriteSheet,
    BIRD_WIDTH_TO_SHOW,
    BIRD_HEIGHT_TO_SHOW
  );

  pipes = [
    new Pipe(canvas.width, -obsticalLength, obsticalWidth, canvas.height),
    new Pipe(canvas.width, obsticalLength, obsticalWidth, canvas.height, true),
  ];
  animate();
  bird.animate();
  bird.updateBirdPos(bird.x, bird.y - 50);
  spawnPipes();

  scoreInterval = setInterval(() => {
    score++;
    scoreEle.innerHTML = score;
  }, 3700);
}

function initGame() {
  backgroundLayers.forEach((backgroundLayer) => backgroundLayer.update());
  initAnimation = requestAnimationFrame(initGame);
}

window.addEventListener("load", () => {
  initGame();
  startBtn.addEventListener("click", () => {
    startAudio();
    cancelAnimationFrame(initAnimation);
    restartGame();
  });
});

window.addEventListener("keydown", (e) => {
  if (gameOver && gmaeOverModal.style.display !== "none") {
    restartGame();
  }
  if (e.code === "Space") {
    if (bird) {
      bird.updateBirdPos(bird.x, bird.y - 50);
      playAudio && flapdAudio.play();
    }
  }
});

window.addEventListener("touchstart", () => {
  if (gameOver && gmaeOverModal.style.display !== "none") {
    restartGame();
  }
  if (bird) {
    bird.updateBirdPos(bird.x, bird.y - 50);
    playAudio && flapdAudio.play();
  }
});

window.addEventListener("click", () => {
  if (gameOver && gmaeOverModal.style.display !== "none") {
    restartGame();
  }
  if (bird) {
    bird.updateBirdPos(bird.x, bird.y - 50);
    playAudio && flapdAudio.play();
  }
});

muteBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  muteBtn.style.display = "none";
  unMuteBtn.style.display = "block";

  playAudio = false;
  backgroundAudio.pause();
});

unMuteBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  muteBtn.style.display = "block";
  unMuteBtn.style.display = "none";

  startAudio();
});
