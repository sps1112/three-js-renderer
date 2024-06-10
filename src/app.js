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
import * as THREE from "three";

// Page setup
window.addEventListener("contextmenu", (e) => e.preventDefault());

// Setup Renderer components
RENDERER.setupRenderer();
RENDERER.setCamera();

// Loading assets
LOADER.setupLoaders();
TEXTURE.setupTextures();
FONT.loadFont("fonts/helvetiker_regular.typeface.json");
MODEL.loadModel("models/stadium1.glb");
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
    { x: 0, y: 7.5, z: 0 },
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

// var collider = new Collider3D(
//   COLLIDER_TYPES.PLANE,
//   {
//     scale: { x: 5.0, y: 1.0, z: 5.0 },
//     offset: { x: 0.0, y: 0.0, z: 0.0 },
//     rotation: { x: 0.0, y: 0.0, z: 0.0 },
//   },
//   null,
//   true
// );
// collider.setup({ restitution: 0.0 });
// collider.renderCollider({
//   position: collider.shapeProps.offset,
//   rotation: collider.shapeProps.rotation,
//   subdivisions: 3.0,
// });

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
    y: 2.0 * Math.PI * 25.1, // Rotations per second
    z: 0.0,
  },
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
});

//-----------------------------------------------

RENDERER.startRenderLoop(
  // All the callbacks we will send the renderer to execute
  [
    SIM.updateWorld,
    () => {
      if (CONTROLS.checkKeyDown("q")) {
        body1.attachCollider(
          COLLIDER_TYPES.CONE,
          {
            scale: { x: 2.5, y: 1, z: 2.5 },
            offset: { x: 0, y: 0, z: 0 },
            rotation: { x: Math.PI, y: 0, z: 0 },
          },
          true
        );
        // Setup collider with properties and add to rigidbody
        body1.setupCollider(
          0,
          {
            restitution: 0.0,
          },
          {
            subdivisions: 1,
          }
        );
        // Finally add this rigidbody to the simulation
        SIM.addRigidbody(body1);

        body2.attachCollider(
          COLLIDER_TYPES.PLANE,
          {
            scale: { x: 0.5, y: 1, z: 0.5 },
            offset: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
          },
          true
        );
        body2.setupCollider(
          0,
          {
            restitution: 0.0,
          },
          {
            subdivisions: 1,
          }
        );

        body2.attachCollider(
          COLLIDER_TYPES.PLANE,
          {
            scale: { x: 0.15, y: 0.5, z: 0.4 },
            offset: { x: 5.8, y: 0.8, z: 0 },
            rotation: { x: 0, y: 0, z: Math.PI / 2 },
          },
          false
        );
        body2.setupCollider(
          1,
          {
            restitution: 0.0,
          },
          {
            subdivisions: 1,
          }
        );

        body2.attachCollider(
          COLLIDER_TYPES.PLANE,
          {
            scale: { x: 0.15, y: 0.5, z: 0.4 },
            offset: { x: -5.8, y: 0.8, z: 0 },
            rotation: { x: 0, y: 0, z: Math.PI / 2 },
          },
          false
        );
        body2.setupCollider(
          2,
          {
            restitution: 0.0,
          },
          {
            subdivisions: 1,
          }
        );

        body2.attachCollider(
          COLLIDER_TYPES.PLANE,
          {
            scale: { x: 0.35, y: 0.5, z: 0.15 },
            offset: { x: 0, y: 0.8, z: 5.8 },
            rotation: { x: Math.PI / 2, y: 0, z: 0 },
          },
          false
        );
        body2.setupCollider(
          3,
          {
            restitution: 0.0,
          },
          {
            subdivisions: 1,
          }
        );

        body2.attachCollider(
          COLLIDER_TYPES.PLANE,
          {
            scale: { x: 0.35, y: 0.5, z: 0.15 },
            offset: { x: 0, y: 0.8, z: -5.8 },
            rotation: { x: Math.PI / 2, y: 0, z: 0 },
          },
          false
        );
        body2.setupCollider(
          4,
          {
            restitution: 0.0,
          },
          {
            subdivisions: 1,
          }
        );
        SIM.addRigidbody(body2);
      }
    },
  ],
  SCENE.meshes[1] // start target for the camera
);
//-----------------------------------------------
