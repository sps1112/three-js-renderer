//! APP
//-----------------------------------------------
// Import libraries
import "../styles.css";
import { setupGUI } from "./gui/gui";
import { setupLoaders } from "./utils/loader";
import * as GEOMETRY from "./rendering/geometry";
import * as TEXTURE from "./rendering/texture";
import * as MATERIAL from "./rendering/material";
import * as MESH from "./scene/mesh";
import * as SCENE from "./scene/scene";
import * as LIGHT from "./scene/light";
import * as RENDERER from "./rendering/renderer";
import { setupLightGUI, setupObjectsGUI } from "./gui/widget";
import { setupHelpers, setupLightHelpers } from "./utils/helpers";
import { fonts, loadFont } from "./rendering/font";
import * as PHYSICS from "./physics/physics";

// Setup Renderer components
RENDERER.setupRenderer();
setupGUI();
SCENE.setupScene();
RENDERER.setCamera();
setupLoaders();

// Load assets
TEXTURE.setupTextures();
loadFont("fonts/helvetiker_regular.typeface.json");
loadFont("fonts/helvetiker_bold.typeface.json");

// Setup the scene
//-------------------------------------------
// Background
SCENE.setEnvironment();

// Add objects
SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CUBE, 2),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LAMBERT, 0x2299ff),
    [0, 4.5, 0],
    [0, 0, 0],
    [1, 1, 1]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.PLANE, 1),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LAMBERT, 0xbb9933),
    [0, 0, 0],
    [-Math.PI / 2.0, 0, 0],
    [10, 10, 1]
  )
);

// SCENE.addMesh(
//   new MESH.Mesh(
//     new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CUBE, 1),
//     new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXTURE, 0xffffff),
//     [-2, 0, 0],
//     [0, 0, 0],
//     [1, 1, 1]
//   )
// );

// SCENE.addMesh(
//   new MESH.Mesh(
//     new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.TORUS, 3),
//     new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TOON, 0x6600ff),
//     [0, -1, 0],
//     [Math.PI / 2.0, 0, 0],
//     [1, 1, 1]
//   )
// );

// SCENE.addMesh(
//   new MESH.Mesh(
//     new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.PLANE, 10),
//     new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT_TEXTURE, 0xffffff),
//     [0, 0, -3],
//     [0, 0, 0],
//     [8, 8, 1]
//   )
// );

// SCENE.addMesh(
//   new MESH.Mesh(
//     new GEOMETRY.GeometryText(6, "Siddhartha Pratap Singh", fonts[0]),
//     new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0x0066ff),
//     [0, 2, 0],
//     [0, 0, 0],
//     [1, 1, 1]
//   )
// );

// Define Lights
SCENE.addLight(new LIGHT.AmbientLight(0xffffff, 0.5));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 30, 200, [2, 3, 4]));
// SCENE.addLight(new LIGHT.PointLight(0x550099, 15, 200, [-2, 2, 2]));

// Add other utilities
setupHelpers();
setupLightHelpers();
//-------------------------------------------

// Setup Physics for the scene
PHYSICS.setupPhysics();
PHYSICS.addRigidbody(SCENE.meshes[0]);

// Setup GUI for scene
setupLightGUI();
setupObjectsGUI();

// Start Loop
// PHYSICS.startSimulation();
RENDERER.startRenderLoop([
  PHYSICS.updateWorld,
  (delta) => {
    SCENE.meshes[0].mesh.position.x += 0.0 * delta;
  },
]);
//-----------------------------------------------
