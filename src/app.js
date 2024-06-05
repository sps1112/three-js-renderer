//! APP
//-----------------------------------------------
// Import libraries
import "../styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
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

const minecraftTexture = textureLoader.load("static/textures/minecraft.png");
minecraftTexture.colorSpace = THREE.SRGBColorSpace;
minecraftTexture.generateMipmaps = false;
minecraftTexture.minFilter = THREE.NearestFilter;
minecraftTexture.magFilter = THREE.NearestFilter;

const matcapTexture = textureLoader.load("static/textures/matcaps/8.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const gradTexture = textureLoader.load("static/textures/gradients/5.jpg");
gradTexture.generateMipmaps = false;
gradTexture.minFilter = THREE.NearestFilter;
gradTexture.magFilter = THREE.NearestFilter;

const rgbeLoader = new RGBELoader(loadingManager);
rgbeLoader.load("static/textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

const fontLoader = new FontLoader(loadingManager);
fontLoader.load("static/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Siddhartha", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // textGeometry.computeBoundingBox();
  // console.log(textGeometry.boundingBox);
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) / 2.0,
  //   -(textGeometry.boundingBox.max.y - 0.02) / 2.0,
  //   -(textGeometry.boundingBox.max.z - 0.03) / 2.0
  // );
  textGeometry.center();

  const matText = new THREE.MeshMatcapMaterial();
  matText.matcap = matcapTexture;
  const mesh = new THREE.Mesh(textGeometry, matText);
  scene.add(mesh);
});

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
debugObject.ambientColor = 0xffffff;
debugObject.diffuseCol = 0xffffff;
const ambientLight = new THREE.AmbientLight(debugObject.ambientColor, 1);
const pointLight = new THREE.PointLight(debugObject.diffuseCol, 30, 200);
pointLight.position.set(2, 3, 4);
scene.add(ambientLight, pointLight);

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
debugObject.color1 = 0xdd000f;
debugObject.color2 = 0x0066ff;
debugObject.color3 = 0xffffff;
debugObject.color4 = 0xffffff;
debugObject.color5 = 0x00ff44;
debugObject.color6 = 0xffffff;

// Simple Color Material
const matColor = new THREE.MeshBasicMaterial({
  color: debugObject.color1,
});

// Wireframe Material
const matWire = new THREE.MeshBasicMaterial({
  color: debugObject.color2,
  wireframe: true,
});

// Texture Material
const matTexture = new THREE.MeshBasicMaterial({
  color: debugObject.color3,
  map: minecraftTexture,
});

// Complex Texture Material
const matTextureComplex = new THREE.MeshBasicMaterial({
  color: debugObject.color4,
});
matTextureComplex.map = colorTexture;
matTextureComplex.transparent = true;
matTextureComplex.alphaMap = alphaTexture;
matTextureComplex.side = THREE.DoubleSide;

// Normal Color Material
const matNormal = new THREE.MeshNormalMaterial();
matNormal.flatShading = true;

// Mesh Matcap Material
const matMatcap = new THREE.MeshMatcapMaterial();
matMatcap.matcap = matcapTexture;

// Mesh Depth Material
const matDepth = new THREE.MeshDepthMaterial();

// Mesh Lambert Material
const matLambert = new THREE.MeshLambertMaterial();

// Mesh Phong Material
debugObject.phongSpecular = 0x0066ff;
const matPhong = new THREE.MeshPhongMaterial();
matPhong.shininess = 100;
matPhong.specular.set(debugObject.phongSpecular);

// Mesh Toon Material
const matToon = new THREE.MeshToonMaterial();
matToon.gradientMap = gradTexture;

// Mesh PBR Material
const matLit = new THREE.MeshStandardMaterial({
  color: debugObject.color5,
});
matLit.metalness = 0.7;
matLit.roughness = 0.2;

// Mesh PBR Texture Material
const matLitTex = new THREE.MeshStandardMaterial({
  color: debugObject.color6,
});
matLitTex.map = colorTexture;
matLitTex.transparent = true;
matLitTex.alphaMap = alphaTexture;
matLitTex.side = THREE.DoubleSide;
matLitTex.aoMap = occlusionTexture;
matLitTex.aoMapIntensity = 1.0;
matLitTex.displacementMap = heightTexture;
matLitTex.displacementScale = 0.1;
matLitTex.metalnessMap = metallicTexture;
matLitTex.metalness = 1.0;
matLitTex.roughnessMap = roughnessTexture;
matLitTex.roughness = 1.0;
debugObject.normalX = 1.0;
debugObject.normalY = 1.0;
matLitTex.normalMap = normalTexture;
matLitTex.normalScale.set(debugObject.normalX, debugObject.normalY);

// Create the scene objects
const group = new THREE.Group();
group.position.y = 1.0;
scene.add(group);

const ran = new THREE.Mesh(ranGeometry, matColor);
ran.position.y = -1;
// ran.visible = false;
group.add(ran);

const cube = new THREE.Mesh(cubeGeometry, matTexture);
cube.rotation.reorder("YXZ");
cube.position.x = -2.5;
cube.scale.y = 1.25;
group.add(cube);

const torus = new THREE.Mesh(torusGeometry, matWire);
group.add(torus);

const plane = new THREE.Mesh(planeGeometry, matLitTex);
plane.position.z = -3;
plane.scale.set(10, 10, 1);
group.add(plane);

const sphere = new THREE.Mesh(sphereGeometry, matLit);
sphere.position.x = 2.5;
group.add(sphere);

// Add other utilities
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);
const lightHelper = new THREE.PointLightHelper(
  pointLight,
  0.1,
  debugObject.diffuseCol
);
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
// controls.enablePan = false;
controls.target.y = group.position.y;
controls.update();

// Define Animations
// gsap.to(cube.position, { duration: 1, delay: 0.5, y: 2 });
// gsap.to(cube.position, { duration: 1, delay: 2.0, y: 0 });

// Setup GUI for scene
//-----------------------------------------------
const lightGUI = gui.addFolder("Lights");
lightGUI
  .addColor(debugObject, "ambientColor")
  .name("Ambient Color")
  .onChange((value) => {
    ambientLight.color.set(value);
  });
lightGUI
  .add(ambientLight, "intensity")
  .name("Ambient Intensity")
  .min(0)
  .max(5)
  .step(0.1);
lightGUI
  .add(pointLight.position, "x")
  .name("Light X")
  .min(-10)
  .max(10)
  .step(0.1);
lightGUI
  .add(pointLight.position, "y")
  .name("Light Y")
  .min(-10)
  .max(10)
  .step(0.1);
lightGUI
  .add(pointLight.position, "z")
  .name("Light Z")
  .min(-10)
  .max(10)
  .step(0.1);
lightGUI
  .addColor(debugObject, "diffuseCol")
  .name("Diffuse Color")
  .onChange((value) => {
    pointLight.color.set(value);
    lightHelper.color = value;
    lightHelper.update();
  });
lightGUI
  .add(pointLight, "intensity")
  .name("Diffuse Intensity")
  .min(0)
  .max(100)
  .step(0.5);

const objectGUI = gui.addFolder("Objects");
objectGUI.add(ran, "visible").name("Random Geometry Visibility");
objectGUI
  .addColor(debugObject, "color1")
  .name("Color Material's Color")
  .onChange((value) => {
    matColor.color.set(value);
  });
objectGUI
  .addColor(debugObject, "color2")
  .name("Wireframe Material's Color")
  .onChange((value) => {
    matWire.color.set(value);
  });
objectGUI
  .addColor(debugObject, "color3")
  .name("Texture Material's Color")
  .onChange((value) => {
    matTexture.color.set(value);
  });
objectGUI.add(matTexture, "wireframe").name("Texture Material's Wireframe");
objectGUI
  .addColor(debugObject, "color4")
  .name("ComplexTex Material's Color")
  .onChange((value) => {
    matTextureComplex.color.set(value);
  });
objectGUI
  .add(matTextureComplex, "wireframe")
  .name("ComplexTex Material's Wireframe");
objectGUI
  .addColor(debugObject, "phongSpecular")
  .name("Phong Material's Specular")
  .onChange((value) => {
    matPhong.specular.set(value);
  });
objectGUI
  .add(matPhong, "shininess")
  .name("Phong Material's Shininess")
  .min(0)
  .max(512)
  .step(2);
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
  .addColor(debugObject, "color5")
  .name("Lit Material's Color")
  .onChange((value) => {
    matLit.color.set(value);
  });
objectGUI
  .add(matLit, "metalness")
  .name("Lit Material's Metalness")
  .min(0)
  .max(1)
  .step(0.01);
objectGUI
  .add(matLit, "roughness")
  .name("Lit Material's Roughness")
  .min(0)
  .max(1)
  .step(0.01);
objectGUI.add(matLit, "wireframe").name("Lit Material's Wireframe");
objectGUI
  .add(matLit, "flatShading")
  .name("Lit Material's FlatShading")
  .onChange(() => {
    matLit.needsUpdate = true;
  });

objectGUI
  .addColor(debugObject, "color6")
  .name("LitTex Material's Color")
  .onChange((value) => {
    matLitTex.color.set(value);
  });
objectGUI
  .add(matLitTex, "aoMapIntensity")
  .name("LitTex Material's AO Intensity")
  .min(0)
  .max(2)
  .step(0.01);
objectGUI
  .add(matLitTex, "displacementScale")
  .name("LitTex Material's Height")
  .min(0)
  .max(2)
  .step(0.01);
objectGUI
  .add(matLitTex, "metalness")
  .name("LitTex Material's Metalness")
  .min(0)
  .max(2)
  .step(0.01);
objectGUI
  .add(matLitTex, "roughness")
  .name("LitTex Material's Roughness")
  .min(0)
  .max(2)
  .step(0.01);
objectGUI
  .add(debugObject, "normalX")
  .name("LitTex Material's NormalX")
  .min(0)
  .max(2)
  .step(0.01)
  .onChange((value) => {
    matLitTex.normalScale.set(value, debugObject.normalY);
  });
objectGUI
  .add(debugObject, "normalY")
  .name("LitTex Material's NormalY")
  .min(0)
  .max(2)
  .step(0.01)
  .onChange((value) => {
    matLitTex.normalScale.set(debugObject.normalX, value);
  });
objectGUI.add(matLitTex, "wireframe").name("LitTex Material's Wireframe");
objectGUI
  .add(matLitTex, "flatShading")
  .name("LitTex Material's FlatShading")
  .onChange(() => {
    matLitTex.needsUpdate = true;
  });

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
