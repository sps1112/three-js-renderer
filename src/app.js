//! APP
//-----------------------------------------------
// Import libraries
import "../styles.css";
import * as THREE from "three";
import gsap from "gsap";
import { setupOrbitalControls, updateControls } from "./utils/controls";
import { gui, debugObject, setupGUI } from "./gui/gui";
import { setupLoaders } from "./utils/loader";
import * as GEOMETRY from "./rendering/geometry";
import * as TEXTURE from "./rendering/texture";
import * as MATERIAL from "./rendering/material";
import * as MESH from "./scene/mesh";
import * as SCENE from "./scene/scene";
import * as CAMERA from "./scene/camera";
import * as LIGHT from "./scene/light";
import { setupLightGUI, setupObjectsGUI } from "./gui/widget";
import { Timer } from "./rendering/renderer";
import { setupHelpers, setupLightHelpers } from "./utils/helpers";

// Define the Canvas
const canvasSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", resizeRenderer);
const canvas = document.getElementById("sceneCanvas");
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;

window.addEventListener("dblclick", processDoubleClick);

// Create GUI
setupGUI(canvasSize.width / 4.0);
// Define the Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(canvasSize.width, canvasSize.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

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

// Create the Scene
SCENE.setupScene();

// Texture Loading
//------------------------------------------------------
setupLoaders();

TEXTURE.setupTextures();

//------------------------------------------------------

// // Define Camera Settings
// var pitch = 0; // Angle with X axis
// var yaw = Math.PI / 2; // Angle with Y axis
// const cursor = {
//   x: 0,
//   y: 0,
// };
// var diff = {
//   x: 0,
//   y: 0,
// };
// var mouseSensitivity = 2.0;

// // Start moving camera when mouse is down, set start position
// function onMouseDown(event) {
//   document.addEventListener("mousemove", onMouseMove, false); // Check when mouse is moving
//   document.addEventListener("mouseup", onMouseUp, false); // Check when to stop moving
//   document.addEventListener("mouseout", onMouseOut, false); // Check whether mouse left window

//   if (
//     event.layerX <= canvas.width &&
//     event.layerX >= 0 &&
//     event.layerY <= canvas.height &&
//     event.layerY >= 0
//   ) {
//     cursor.x = 2.0 * (event.clientX / canvas.width - 0.5);
//     cursor.y = 2.0 * ((canvas.height - event.clientY) / canvas.height - 0.5);
//   }
// }

// // Update diff when camera is moving
// function onMouseMove(event) {
//   // make mouse interaction only within canvas
//   if (
//     event.layerX <= canvas.width &&
//     event.layerX >= 0 &&
//     event.layerY <= canvas.height &&
//     event.layerY >= 0
//   ) {
//     var newCursor = {
//       x: 2.0 * (event.clientX / canvas.width - 0.5),
//       y: 2.0 * ((canvas.height - event.clientY) / canvas.height - 0.5),
//     };
//     diff.x = mouseSensitivity * 100 * (newCursor.x - cursor.x);
//     diff.y = mouseSensitivity * 100 * (newCursor.y - cursor.y);
//     cursor.x = newCursor.x;
//     cursor.y = newCursor.y;
//   }
// }

// // Mouse button released
// function onMouseUp(event) {
//   document.removeEventListener("mousemove", onMouseMove, false);
//   document.removeEventListener("mouseup", onMouseUp, false);
//   document.removeEventListener("mouseout", onMouseOut, false);
//   diff = {
//     x: 0,
//     y: 0,
//   };
// }

// // Mouse outside window
// function onMouseOut(event) {
//   document.removeEventListener("mousemove", onMouseMove, false);
//   document.removeEventListener("mouseup", onMouseUp, false);
//   document.removeEventListener("mouseout", onMouseOut, false);
//   diff = {
//     x: 0,
//     y: 0,
//   };
// }
// document.addEventListener("mousedown", onMouseDown, false);

// Define the Camera
const aspectRatio = canvasSize.width / canvasSize.height;
const orthoSize = 6.0;
const camera = new CAMERA.PerspectiveCam(60, aspectRatio, 0.1, 1000, 5);
// const camera = new CAMERA.OrthographicCam(orthoSize, aspectRatio, 0.1, 1000, 5);
SCENE.scene.add(camera.cam);

GEOMETRY.setupGeometry();
MATERIAL.setupMaterials();
SCENE.setEnvironment();
SCENE.populateScene();

// Define Lights
SCENE.addLight(new LIGHT.AmbientLight(0xffffff, 0.5));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 30, 200, [2, 3, 4]));
SCENE.addLight(new LIGHT.PointLight(0x550099, 15, 200, [-2, 2, 2]));

// Add other utilities
setupHelpers();
setupLightHelpers();

// Define some parameters
const timer = new Timer();
const rpm = {
  group: 0,
  sphere: 30,
  torus: 45,
  cubeX: 25,
  cubeY: 20,
};

// Define controls
setupOrbitalControls(camera.cam, canvas, MESH.group);

// Define Animations
// gsap.to(cube.position, { duration: 1, delay: 0.5, y: 2 });
// gsap.to(cube.position, { duration: 1, delay: 2.0, y: 0 });

// Setup GUI for scene
//-----------------------------------------------
setupLightGUI();
setupObjectsGUI();

const otherGUI = gui.addFolder("Misc");
otherGUI.add(rpm, "group").name("Group RPM").min(-120).max(120).step(0.1);
otherGUI.add(rpm, "torus").name("Torus RPM").min(-120).max(120).step(0.1);
otherGUI.add(rpm, "sphere").name("Sphere RPM").min(-120).max(120).step(0.1);
otherGUI
  .add(MESH.sphere.position, "x")
  .name("Sphere X")
  .min(-5)
  .max(5)
  .step(0.01);

debugObject.spin = () => {
  gsap.to(MESH.group.rotation, {
    duration: 1.0,
    delay: 0.0,
    z: MESH.group.rotation.z + Math.PI,
  });
};
otherGUI.add(debugObject, "spin").name("Spin Group");
//-----------------------------------------------

// Render Loop
var update = function () {
  // Time Calculations
  timer.update();
  //   console.log("Framerate: " + 1.0 / deltaTime);

  // Do camera calculations
  // camera.position.x =
  //   group.position.x + camDistance * Math.cos(pitch) * Math.cos(yaw);
  // camera.position.y = group.position.y + camDistance * Math.sin(pitch);
  // camera.position.z =
  //   group.position.z + camDistance * Math.cos(pitch) * Math.sin(yaw);
  // camera.lookAt(group.position);

  // Do object calculations
  MESH.cube.rotateX(((2 * Math.PI * rpm.cubeX) / 60.0) * timer.deltaTime);
  MESH.cube.rotateY(((2 * Math.PI * rpm.cubeY) / 60.0) * timer.deltaTime);
  MESH.sphere.rotateY(((2 * Math.PI * rpm.sphere) / 60.0) * timer.deltaTime);
  MESH.torus.position.y = 2.0 * Math.sin(1.0 * timer.currTime);
  MESH.torus.rotateX(((2 * Math.PI * rpm.torus) / 60.0) * timer.deltaTime);
  MESH.group.rotateZ(((2 * Math.PI * rpm.group) / 60.0) * timer.deltaTime);

  // Update controls
  updateControls();

  // Render the scene
  renderer.render(SCENE.scene, camera.cam);
  //   renderer.render(scene, camOrtho);

  // // Update Camera
  // yaw = yaw + diff.x * deltaTime;
  // pitch = THREE.MathUtils.clamp(
  //   pitch - diff.y * deltaTime,
  //   -Math.PI / 2,
  //   Math.PI / 2
  // );
  // diff = {
  //   x: 0,
  //   y: 0,
  // };

  // Setup callback
  window.requestAnimationFrame(update);
};
update();
//-----------------------------------------------
