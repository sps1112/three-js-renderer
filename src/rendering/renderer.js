//! RENDERER
//---------------------------------------------------------------
//! Renderer Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Renderer Variables
//-----------------------------------------------
class Timer {
  constructor() {
    this.clock = new THREE.Clock();
    this.prevTime = this.clock.getElapsedTime();
    this.currTime = this.prevTime;
    this.deltaTime = 0;
  }

  update() {
    this.currTime = this.clock.getElapsedTime();
    this.deltaTime = this.currTime - this.prevTime;
    this.prevTime = this.currTime;
  }
}

var canvas;
var canvasSize;
var renderer;
var camera;
//-----------------------------------------------

//! Renderer Functions
//-----------------------------------------------
function setupCanvas() {
  canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  canvas = document.getElementById("sceneCanvas");
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(canvasSize.width, canvasSize.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  window.addEventListener("resize", resizeRenderer);
  window.addEventListener("dblclick", processDoubleClick);
}

function setCamera(cam) {
  camera = cam;
}

function resizeRenderer() {
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;

  renderer.setSize(canvasSize.width, canvasSize.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

  camera.update(canvasSize.width / canvasSize.height);
}

function processDoubleClick() {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
//-----------------------------------------------

export {
  Timer,
  canvas,
  canvasSize,
  renderer,
  setupCanvas,
  setupRenderer,
  setCamera,
};
//---------------------------------------------------------------
