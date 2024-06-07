//! APP
//-----------------------------------------------
// Import libraries
import "../styles.css";
import { setupOrbitalControls, updateControls } from "./utils/controls";
import { setupGUI } from "./gui/gui";
import { setupLoaders } from "./utils/loader";
import * as GEOMETRY from "./rendering/geometry";
import * as TEXTURE from "./rendering/texture";
import * as MATERIAL from "./rendering/material";
import * as MESH from "./scene/mesh";
import * as SCENE from "./scene/scene";
import * as CAMERA from "./scene/camera";
import * as LIGHT from "./scene/light";
import * as RENDERER from "./rendering/renderer";
import { setupLightGUI, setupObjectsGUI } from "./gui/widget";
import { setupHelpers, setupLightHelpers } from "./utils/helpers";
import { fonts, loadFont } from "./rendering/font";

// Define the Canvas and Renderer
RENDERER.setupCanvas();
RENDERER.setupRenderer();

// Create GUI
setupGUI(RENDERER.canvasSize.width / 4.0);

// Create the Scene
SCENE.setupScene();

// Texture and Font Loading
setupLoaders();
TEXTURE.setupTextures();
loadFont("fonts/helvetiker_regular.typeface.json");
loadFont("fonts/helvetiker_bold.typeface.json");

// Define the Camera
const aspectRatio = RENDERER.canvasSize.width / RENDERER.canvasSize.height;
const orthoSize = 6.0;
const camera = new CAMERA.PerspectiveCam(60, aspectRatio, 0.1, 1000, 6);
// const camera = new CAMERA.OrthographicCam(orthoSize, aspectRatio, 0.1, 1000, 5);
RENDERER.setCamera(camera);
SCENE.scene.add(camera.cam);

// Setup the scene
//-------------------------------------------
// Background
SCENE.setEnvironment();

// Add objects
SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.SPHERE, 24),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0x00ff22),
    [2, 0, 0],
    [0, 0, 0],
    [1, 1, 1]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CUBE, 1),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXTURE, 0xffffff),
    [-2, 0, 0],
    [0, 0, 0],
    [1, 1, 1]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.TORUS, 3),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TOON, 0x6600ff),
    [0, -1, 0],
    [Math.PI / 2.0, 0, 0],
    [1, 1, 1]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.PLANE, 10),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT_TEXTURE, 0xffffff),
    [0, 0, -3],
    [0, 0, 0],
    [8, 8, 1]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryText(6, "Siddhartha", fonts[0]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0x0066ff),
    [0, 2, 0],
    [0, 0, 0],
    [1, 1, 1]
  )
);

// Define Lights
SCENE.addLight(new LIGHT.AmbientLight(0xffffff, 0.5));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 30, 200, [2, 3, 4]));
SCENE.addLight(new LIGHT.PointLight(0x550099, 15, 200, [-2, 2, 2]));

// Add other utilities
setupHelpers();
setupLightHelpers();
//-------------------------------------------

// Define some parameters
const timer = new RENDERER.Timer();
setupOrbitalControls(camera.cam, RENDERER.canvas, SCENE.group);

// Setup GUI for scene
setupLightGUI();
setupObjectsGUI();

// Render Loop
var update = function () {
  // Time Calculations
  timer.update();
  //   console.log("Framerate: " + 1.0 / deltaTime);

  // Do object calculations
  //...

  // Update controls
  updateControls();

  // Render the scene
  RENDERER.renderer.render(SCENE.scene, camera.cam);
  //   renderer.render(scene, camOrtho);

  // Setup callback
  window.requestAnimationFrame(update);
};
update();
//-----------------------------------------------
