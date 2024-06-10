//! APP
//-----------------------------------------------
// Import libraries
import "../styles.css";
import * as RENDERER from "./rendering/renderer";
import * as SCENE from "./scene/scene";
import * as LOADER from "./utils/loader";
import * as TEXTURE from "./rendering/texture";
import * as GEOMETRY from "./rendering/geometry";
import * as MATERIAL from "./rendering/material";
import * as MESH from "./scene/mesh";
import * as GUI from "./gui/gui";
import * as LIGHT from "./scene/light";
import * as FONT from "./rendering/font";
import * as HELPERS from "./utils/helpers";
import * as MODEL from "./rendering/model";
import * as CONTROLS from "./utils/controls";
import * as SIM from "./physics/simulation";
import { RIGIDBODY_TYPES, Rigidbody } from "./physics/rigidbody";
import { COLLIDER_TYPES, Collider3D } from "./physics/collider";

// Page setup
window.addEventListener("contextmenu", (e) => e.preventDefault());

// Setup Renderer components
RENDERER.setupRenderer();
RENDERER.setCamera();

// Loading assets
LOADER.setupLoaders();
TEXTURE.setupTextures();
FONT.loadFont("fonts/helvetiker_regular.typeface.json");
MODEL.loadModel("models/stadium3.glb");
MODEL.loadModel("models/beyblade.glb");

// Define the scene
SCENE.setupScene();
SCENE.loadEnvironment("textures/environmentMap/workshop.hdr");

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryText(3, "Beyblade Simulator", FONT.fonts[0]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0xaa00ff),
    { x: 0, y: 20, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 5, y: 5, z: 5 }
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryModel(MODEL.models[0]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0xffffff),
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 25, y: 25, z: 25 }
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryModel(MODEL.models[1]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0xffffff),
    { x: 0, y: 10.0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1 }
  )
);

// Add Lights
SCENE.addLight(new LIGHT.AmbientLight(0xffffff, 1));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 20, 200, [20, 15, 0]));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 20, 200, [-20, 15, 0]));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 20, 200, [0, 15, -20]));

// Add other utilities
HELPERS.setupLightHelpers();

// Define the GUI
GUI.setupGUI();

// Setup Physics:-
//-----------------------------------------------
SIM.setupSimulation(60);
var generated = false;
var body1 = new Rigidbody(RIGIDBODY_TYPES.DYNAMIC, SCENE.meshes[2]); // Beyblade
body1.setup({
  gravity: 1.0,
  linearVel: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
  angularVel: {
    x: 0.0,
    y: 2.0 * Math.PI * 16.0, // Rotations per second
    z: 0.0,
  },
  linearDamp: 0.05,
  angularDamp: 0.03,
  center: { x: 0, y: 0.3, z: 0 },
});

var body2 = new Rigidbody(RIGIDBODY_TYPES.STATIC, SCENE.meshes[1]); // Stadium
body2.setup({
  gravity: 1.0,
  linearVel: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
  angularVel: {
    x: 0.0,
    y: 2.0 * Math.PI * 0.0, // Rotations per second
    z: 0.0,
  },
  linearDamp: 0.0,
  angularDamp: 0.0,
  center: { x: 0, y: 0, z: 0 },
});

//-----------------------------------------------

RENDERER.startRenderLoop(
  // All the callbacks we will send the renderer to execute
  [
    SIM.updateWorld,
    () => {
      if (CONTROLS.checkKeyDown("p") && !generated) {
        console.log("Start Physics");
        generated = true;
        body1.attachCollider(
          COLLIDER_TYPES.CONVEX,
          {
            scale: { x: 1, y: 1, z: 1 },
            offset: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
          },
          false
        );
        // Setup collider with properties and add to rigidbody
        body1.setupCollider(
          0,
          {
            friction: 1.0,
            restitution: 0.1,
            density: 3.0,
            vertices: SCENE.meshes[2].mesh.geometry.attributes.position.array,
            indices: SCENE.meshes[2].mesh.geometry.index.array,
          },
          {
            subdivisions: 1,
          }
        );
        // Finally add this rigidbody to the simulation
        SIM.addRigidbody(body1);

        body2.attachCollider(
          COLLIDER_TYPES.MESH,
          {
            scale: { x: 1, y: 1, z: 1 },
            offset: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
          },
          false
        );
        body2.setupCollider(
          0,
          {
            friction: 0.2,
            restitution: 0.2,
            density: 1.0,
            vertices: SCENE.meshes[1].mesh.geometry.attributes.position.array,
            indices: SCENE.meshes[1].mesh.geometry.index.array,
          },
          {
            subdivisions: 1,
          }
        );
        SIM.addRigidbody(body2);
      }
    },
  ],
  SCENE.meshes[2] // start target for the camera
);
//-----------------------------------------------
