//! APP
//-----------------------------------------------
// Import libraries
import "../styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

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
const gui = new GUI({
  title: "Scene Properties",
  width: canvasSize.width / 4.0,
  closeFolders: true,
});
// gui.close();
// gui.hide();
window.addEventListener("keydown", (event) => {
  if (event.key == "h") {
    gui.show(gui._hidden);
  }
});
const debugObject = {};

// Texture Loading
//------------------------------------------------------
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("Start to load asset");
};
loadingManager.onProgress = () => {
  console.log("Loading asset");
};
loadingManager.onLoad = () => {
  console.log("Loaded Assets Succesfully");
};
loadingManager.onError = () => {
  console.log("Error!!! Asset could not be loaded");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("static/textures/door/color.jpg");
colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
colorTexture.magFilter = THREE.NearestFilter;
const alphaTexture = textureLoader.load("static/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("static/textures/door/height.jpg");
const normalTexture = textureLoader.load("static/textures/door/normal.jpg");
const occlusionTexture = textureLoader.load(
  "static/textures/door/ambientOcclusion.jpg"
);
const metallicTexture = textureLoader.load(
  "static/textures/door/metalness.jpg"
);
const roughnessTexture = textureLoader.load(
  "static/textures/door/roughness.jpg"
);
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

  camera.aspect = canvasSize.width / canvasSize.height;
  camera.updateProjectionMatrix();
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
const scene = new THREE.Scene();

// Define the Camera
const aspectRatio = canvasSize.width / canvasSize.height;
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
debugObject.lightCol = 0xffffff;
const pointLight = new THREE.PointLight(debugObject.lightCol, 2, 100);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

// Define basic geometry
debugObject.sphereSubdivisions = 18;
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(
  1,
  debugObject.sphereSubdivisions,
  debugObject.sphereSubdivisions
);
const torusGeometry = new THREE.TorusGeometry(0.8, 0.2, 18, 18);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 10, 10);
//-------------------------------------
const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
const triGeometry = new THREE.BufferGeometry();
triGeometry.setAttribute("position", positionAttribute);

const triCount = 100;
const posArray = new Float32Array(triCount * 3 * 3);
for (var i = 0; i < triCount * 3 * 3; i++) {
  posArray[i] = Math.random() - 0.5;
}
const posAttribute = new THREE.BufferAttribute(posArray, 3);
const ranGeometry = new THREE.BufferGeometry();
ranGeometry.setAttribute("position", posAttribute);
//-------------------------------------

// Define the materials
debugObject.color1 = 0xffffff;
debugObject.color2 = 0x00ff44;
debugObject.color3 = 0x0066ff;
debugObject.color4 = 0xdd000f;
debugObject.color5 = 0xffffff;
const mat1 = new THREE.MeshBasicMaterial({
  color: debugObject.color1,
  map: colorTexture,
}); // Red
const mat2 = new THREE.MeshStandardMaterial({
  color: debugObject.color2,
  roughness: 0.3,
}); // Green Lit
const mat3 = new THREE.MeshBasicMaterial({
  color: debugObject.color3,
  wireframe: true,
}); // Blue Wireframe
const mat4 = new THREE.MeshBasicMaterial({
  color: debugObject.color4,
  wireframe: true,
}); // Blue Wireframe
const mat5 = new THREE.MeshBasicMaterial({
  color: debugObject.color5,
});

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

const tri = new THREE.Mesh(triGeometry, mat3);
group.add(tri);

const ran = new THREE.Mesh(ranGeometry, mat4);
ran.position.y = -1;
group.add(ran);

const plane = new THREE.Mesh(planeGeometry, mat5);
plane.position.z = -3;
plane.scale.set(10, 10, 1);
group.add(plane);

// Add other utilities
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(15, 15);
scene.add(gridHelper);
const lightHelper = new THREE.PointLightHelper(pointLight, 0.1, 0xffffff);
scene.add(lightHelper);

// Define some parameters
const clock = new THREE.Clock();
var prevTime = clock.getElapsedTime();
const rpm = {
  group: 0,
  sphere: 30,
  torus: 45,
  cubeX: 25,
  cubeY: 20,
};

// Define controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;
controls.enablePan = false;
controls.target.y = group.position.y;
controls.update();

// Define Animations
// gsap.to(cube.position, { duration: 1, delay: 0.5, y: 2 });
// gsap.to(cube.position, { duration: 1, delay: 2.0, y: 0 });

// Setup GUI for scene
//-----------------------------------------------
const lightGUI = gui.addFolder("Point Light");
lightGUI
  .add(pointLight.position, "x")
  .name("Light X")
  .min(-5)
  .max(5)
  .step(0.01);
lightGUI
  .add(pointLight.position, "y")
  .name("Light Y")
  .min(-5)
  .max(5)
  .step(0.01);
lightGUI
  .add(pointLight.position, "z")
  .name("Light Z")
  .min(-5)
  .max(5)
  .step(0.01);
lightGUI
  .add(pointLight, "intensity")
  .name("Light Intensity")
  .min(0)
  .max(10)
  .step(0.01);
lightGUI
  .addColor(debugObject, "lightCol")
  .name("Light Color")
  .onChange((value) => {
    pointLight.color.set(value);
  });

const objectGUI = gui.addFolder("Objects");
objectGUI.add(cube, "visible").name("Cube Visibility");
objectGUI
  .addColor(debugObject, "color1")
  .name("Mat1 Color")
  .onChange((value) => {
    mat1.color.set(value);
  });
objectGUI
  .add(debugObject, "sphereSubdivisions")
  .name("Sphere Subdivisions")
  .min(2)
  .max(72)
  .step(1)
  .onChange((value) => {
    sphere.geometry.dispose();
    sphere.geometry = new THREE.SphereGeometry(1, value, value);
  });
objectGUI
  .addColor(debugObject, "color2")
  .name("Mat2 Color")
  .onChange((value) => {
    mat2.color.set(value);
  });
objectGUI.add(mat2, "wireframe").name("Mat2 Wireframe");
objectGUI
  .addColor(debugObject, "color3")
  .name("Mat3 Color")
  .onChange((value) => {
    mat3.color.set(value);
  });
objectGUI
  .addColor(debugObject, "color4")
  .name("Mat4 Color")
  .onChange((value) => {
    mat4.color.set(value);
  });
objectGUI
  .addColor(debugObject, "color5")
  .name("Mat5 Color")
  .onChange((value) => {
    mat5.color.set(value);
  });
objectGUI.add(mat5, "wireframe").name("Mat5 Wireframe");

const otherGUI = gui.addFolder("Misc");
otherGUI.add(rpm, "group").name("Group RPM").min(-120).max(120).step(0.1);
otherGUI.add(rpm, "torus").name("Torus RPM").min(-120).max(120).step(0.1);
otherGUI.add(rpm, "sphere").name("Sphere RPM").min(-120).max(120).step(0.1);
otherGUI.add(sphere.position, "x").name("Sphere X").min(-5).max(5).step(0.01);

debugObject.spin = () => {
  gsap.to(group.rotation, {
    duration: 1.0,
    delay: 0.0,
    z: group.rotation.z + Math.PI,
  });
};
otherGUI.add(debugObject, "spin").name("Spin Group");
//-----------------------------------------------

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
  cube.rotateX(((2 * Math.PI * rpm.cubeX) / 60.0) * deltaTime);
  cube.rotateY(((2 * Math.PI * rpm.cubeY) / 60.0) * deltaTime);
  sphere.rotateY(((2 * Math.PI * rpm.sphere) / 60.0) * deltaTime);
  torus.position.y = 2.0 * Math.sin(1.0 * currTime);
  torus.rotateX(((2 * Math.PI * rpm.torus) / 60.0) * deltaTime);
  group.rotateZ(((2 * Math.PI * rpm.group) / 60.0) * deltaTime);

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
