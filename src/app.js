import * as THREE from "three";

// Define the Viewport
const sizes = {
  width: 800,
  height: 600,
};

// Load the Canvas
const canvas = document.getElementById("sceneCanvas");
canvas.width = sizes.width;
canvas.height = sizes.height;

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
camera.position.z = 5;
camera.position.x = 0;
scene.add(camera);

// Define basic geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(1, 18, 18);

// Define the materials
const mat1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red
const mat2 = new THREE.MeshBasicMaterial({ color: 0x00ff33 }); // Green
const mat3 = new THREE.MeshBasicMaterial({ color: 0x0066ff }); // Blue

// Create the objects
const cube = new THREE.Mesh(cubeGeometry, mat1);
scene.add(cube);
const sphere = new THREE.Mesh(sphereGeometry, mat2);
sphere.position.x = -2.5;
scene.add(sphere);
const sphere2 = new THREE.Mesh(sphereGeometry, mat3);
sphere2.position.x = 2.5;
scene.add(sphere2);

// Render Loop
function animate() {
  requestAnimationFrame(animate); // Setup callback

  // Do object calculations
  cube.rotation.x += 0.04;
  cube.rotation.y += 0.03;
  sphere.rotation.y += 0.03;
  sphere2.rotation.x += 0.02;

  // Render the scene
  renderer.render(scene, camera);
}
animate();
