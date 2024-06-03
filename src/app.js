// Load the Canvas
const canvas = document.querySelector(".renderer");

// Define the Viewport
const sizes = {
  width: 800,
  height: 600,
};

// Create the Scene
const scene = new THREE.Scene();

// Define the Renderer
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Define the Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.x = -1;
scene.add(camera);

// Define the Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Render Loop
function animate() {
  requestAnimationFrame(animate); // Setup callback

  // Do object calculations
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;

  // Render the scene
  renderer.render(scene, camera);
}
animate();
