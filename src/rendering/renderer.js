//! RENDERER
//---------------------------------------------------------------
//! Renderer Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { scene, group } from "../scene/scene";
import { PerspectiveCam, OrthographicCam } from "../scene/camera";
import {
  checkKey,
  checkMouseButton,
  checkMouseButtonDown,
  checkMouseButtonUp,
  logMouse,
  setupOrbitalControls,
  startInput,
  updateControls,
} from "../utils/controls";
import { updateGUI } from "../gui/gui";
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
var timer;
var callbacks;
//-----------------------------------------------

//! Renderer Functions
//-----------------------------------------------
function setupRenderer() {
  canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  canvas = document.getElementById("sceneCanvas");
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(canvasSize.width, canvasSize.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

  window.addEventListener("resize", resizeRenderer);
  window.addEventListener("dblclick", processDoubleClick);
}

function setCamera() {
  const aspectRatio = canvasSize.width / canvasSize.height;
  const orthoSize = 6.0;
  camera = new PerspectiveCam(60, aspectRatio, 0.1, 1000, 6);
  // camera = new OrthographicCam(orthoSize, aspectRatio, 0.1, 1000, 5);
  camera.cam.position.x = 5.0;
  camera.cam.position.y = 5.0;
  scene.add(camera.cam);
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

function startRenderLoop(list) {
  timer = new Timer();
  callbacks = list;
  // setupOrbitalControls(camera.cam, canvas, group);
  startInput();
  renderLoop();
}

function renderLoop() {
  // Time Calculations
  timer.update();
  //   console.log("Framerate: " + 1.0 / deltaTime);

  // Execute callbacks (like object calculations)
  callbacks.forEach((callback) => callback(timer.deltaTime));

  // Check Input
  if (checkKey("z")) {
    // console.log(checkMouseButton(0));
    // console.log(checkMouseButton(1));
    // console.log(checkMouseButton(2));
    logMouse();
  }

  if (checkMouseButton(0)) {
    camera.cam.position.x -= 5.0 * timer.deltaTime;
  }
  if (checkMouseButton(1)) {
    camera.cam.position.x = 5.0;
  }
  if (checkMouseButton(2)) {
    camera.cam.position.x += 5.0 * timer.deltaTime;
  }

  // Render the scene
  renderer.render(scene, camera.cam);

  // Update GUI()
  updateGUI();

  // End frame
  updateControls(canvasSize);
  window.requestAnimationFrame(renderLoop);
}
//-----------------------------------------------

export {
  Timer,
  canvas,
  canvasSize,
  renderer,
  setupRenderer,
  setCamera,
  camera,
  startRenderLoop,
};
//---------------------------------------------------------------
