//! RENDERER
//---------------------------------------------------------------
//! Renderer Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { scene } from "../scene/scene";
import { PerspectiveCam, OrthographicCam } from "../scene/camera";
import { checkKeyDown, startControls, updateControls } from "../utils/controls";
import { gui, updateGUI } from "../gui/gui";
import { updateSceneGUI } from "../gui/widget";
import { setSceneGUI, setupLightGUI, setupObjectsGUI } from "../gui/widget";
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
}

function setCamera() {
  const aspectRatio = canvasSize.width / canvasSize.height;
  const orthoSize = 6.0;
  camera = new PerspectiveCam(60, aspectRatio, 0.1, 1000, 6);
  // camera = new OrthographicCam(orthoSize, aspectRatio, 0.1, 1000, 5);
  camera.cam.position.x = 0.0;
  camera.cam.position.y = 20.0;
  camera.cam.position.z = 20.0;
}

function resizeRenderer() {
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;

  renderer.setSize(canvasSize.width, canvasSize.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

  camera.update(canvasSize.width / canvasSize.height);
}

function updateFullScreen() {
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

function updateFocus(target) {
  camera.setTarget(target);
}

function startRenderLoop(list, target) {
  timer = new Timer();
  callbacks = list;

  // Set Camera to target of choice
  scene.add(camera.cam);
  camera.setProperties(35.0, Math.PI * 0.35, 0, 0.1, 2);
  updateFocus(target);

  // Setup GUI for the scene
  if (gui) {
    setSceneGUI();
    setupObjectsGUI();
    setupLightGUI();
  }
  // Start rendering
  startControls();
  renderLoop();
}

function renderLoop() {
  // Time Calculations
  timer.update();

  // Execute callbacks (like object calculations or physics update)
  callbacks.forEach((callback) => callback(timer.deltaTime));

  // Check for Input
  if (checkKeyDown("f")) {
    updateFullScreen();
  }

  // Render the scene
  camera.updateLookAt(timer.deltaTime);
  renderer.render(scene, camera.cam);

  // End frame
  updateGUI();
  updateSceneGUI();
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
  updateFocus,
};
//---------------------------------------------------------------
