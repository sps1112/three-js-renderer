//! APP
//-----------------------------------------------
// Import libraries
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

// Define the Canvas
const canvasSize = {
  width: 800,
  height: 600,
};
const canvas = document.getElementById("sceneCanvas");
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;

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

// Define the Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(canvas.width, canvas.height);

// Create the Scene
const scene = new THREE.Scene();

// Define the Camera
const aspectRatio = canvas.width / canvas.height;
const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
var camDistance = 5;
camera.position.set(0, 0, camDistance);
scene.add(camera);

const orthoSize = 6.0;
const camOrtho = new THREE.OrthographicCamera(
  -aspectRatio * 0.5 * orthoSize,
  aspectRatio * 0.5 * orthoSize,
  0.5 * orthoSize,
  -0.5 * orthoSize,
  0.1,
  1000
);
camOrtho.position.set(0, 0, 5);
scene.add(camOrtho);

// Define Lights
const ambientLight = new THREE.AmbientLight(0x3a3a3a);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Define basic geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(1, 12, 12);
const torusGeometry = new THREE.TorusGeometry(0.8, 0.2, 18, 18);

// Define the materials
const mat1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red
const mat2 = new THREE.MeshStandardMaterial({ color: 0x00ff33 }); // Green Lit
const mat3 = new THREE.MeshBasicMaterial({ color: 0x0066ff, wireframe: true }); // Blue Wireframe

// Create the scene objects
const group = new THREE.Group();
group.position.y = 1.0;
scene.add(group);

const cube = new THREE.Mesh(cubeGeometry, mat1);
cube.rotation.reorder("YXZ");
cube.position.x = -2.5;
cube.scale.y = 1.5;
group.add(cube);

const sphere = new THREE.Mesh(sphereGeometry, mat2);
sphere.position.x = 2.5;
group.add(sphere);

const torus = new THREE.Mesh(torusGeometry, mat3);
group.add(torus);

// Add other utilities
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Define some parameters
const clock = new THREE.Clock();
var prevTime = clock.getElapsedTime();
const rpm = 4;

// Define controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.y = group.position.y;
controls.update();

// Define Animations
// gsap.to(cube.position, { duration: 1, delay: 0.5, y: 2 });
// gsap.to(cube.position, { duration: 1, delay: 2.0, y: 0 });

// Render Loop
var update = function () {
  // Time Calculations
  const currTime = clock.getElapsedTime();
  const deltaTime = currTime - prevTime;
  prevTime = currTime;
  //   console.log("Framerate: " + 1.0 / deltaTime);

  // Do camera calculations
  // camera.position.x =
  //   group.position.x + camDistance * Math.cos(pitch) * Math.cos(yaw);
  // camera.position.y = group.position.y + camDistance * Math.sin(pitch);
  // camera.position.z =
  //   group.position.z + camDistance * Math.cos(pitch) * Math.sin(yaw);
  // camera.lookAt(group.position);

  // Do object calculations
  cube.rotateX(2 * Math.PI * 0.4 * deltaTime);
  cube.rotateY(2 * Math.PI * 0.3 * deltaTime);
  sphere.rotateY(2 * Math.PI * 0.5 * deltaTime);
  torus.position.y = 2.0 * Math.sin(1.0 * currTime);
  torus.rotateX(2 * Math.PI * 0.75 * deltaTime);
  group.rotateZ(((2 * Math.PI * rpm) / 60.0) * deltaTime);

  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
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
