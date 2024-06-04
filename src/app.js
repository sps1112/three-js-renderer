// Import libraries
import * as THREE from "three";
import gsap from "gsap";

// Define the Canvas
const canvasSize = {
  width: 800,
  height: 600,
};
const canvas = document.getElementById("sceneCanvas");
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;

// Define the Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(canvas.width, canvas.height);

// Create the Scene
const scene = new THREE.Scene();

// Define the Camera
const camera = new THREE.PerspectiveCamera(
  60,
  canvas.width / canvas.height,
  0.1,
  1000
);
camera.position.set(0, 0, 5);
scene.add(camera);

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
scene.add(group);
camera.lookAt(group.position);

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
const rpm = 5;

// Define Animations
// gsap.to(cube.position, { duration: 1, delay: 0.5, y: 2 });
// gsap.to(cube.position, { duration: 1, delay: 2.0, y: 0 });

// Render Loop
var animate = function () {
  // Time Calculations
  const currTime = clock.getElapsedTime();
  const deltaTime = currTime - prevTime;
  prevTime = currTime;

  // Do object calculations
  //   camera.position.x = 2.0 * Math.sin(1.0 * currTime);
  //   camera.lookAt(group.position);
  cube.rotateX(2 * Math.PI * 0.4 * deltaTime);
  cube.rotateY(2 * Math.PI * 0.3 * deltaTime);
  sphere.rotateY(2 * Math.PI * 0.5 * deltaTime);
  torus.position.y = 2.0 * Math.sin(1.0 * currTime);
  torus.rotateX(2 * Math.PI * 0.75 * deltaTime);
  group.rotateZ(((2 * Math.PI * rpm) / 60.0) * deltaTime);

  // Render the scene
  renderer.render(scene, camera);

  // Setup callback
  window.requestAnimationFrame(animate);
};
animate();
