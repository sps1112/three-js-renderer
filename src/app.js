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
import { setupHelpers, setupLightHelpers } from "./utils/helpers";
import { fonts, loadFont } from "./rendering/font";
import * as SIM from "./physics/simulation";
import { checkKey, checkKeyDown, checkKeyUp } from "./utils/controls";
import { RIGIDBODY_TYPES, Rigidbody } from "./physics/rigidbody";
import { COLLIDER_TYPES } from "./physics/collider";

// Page setup
window.addEventListener("contextmenu", (e) => e.preventDefault());

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
SCENE.loadEnvironment("textures/environmentMap/2k.hdr");

// Setup the scene and meshes
//-------------------------------------------
// Add objects
SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CONE, 2),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXTURE, 0xffffff),
    [1, 4.0, 8],
    [Math.PI, 0, 0],
    [1, 0.5, 1]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.PLANE, 1),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LAMBERT, 0xbb9933),
    [0, 0, 0],
    [0, 0, 0],
    [4, 1, 4]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CUBE, 1),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LAMBERT, 0xff2233),
    [0, 5, -9.5],
    [0, 0, 0],
    [20, 10, 1]
  )
);

// Define Lights
SCENE.addLight(new LIGHT.AmbientLight(0xffffff, 0.5));
SCENE.addLight(new LIGHT.PointLight(0xffffff, 30, 200, [2, 3, 4]));

// Add other utilities
// setupHelpers();
setupLightHelpers();
//-------------------------------------------

// Setup Physics for the defined scene
//-------------------------------------------
SIM.setupSimulation();

// Create rigidbodies
var rb1 = new Rigidbody(RIGIDBODY_TYPES.DYNAMIC, SCENE.meshes[0]); // Object
rb1.setProperties(
  1.0,
  {
    x: -5.0,
    y: 0.0,
    z: -12.0,
  },
  {
    x: 0.0,
    y: 20.0,
    z: 0.0,
  }
);
rb1.initBody(COLLIDER_TYPES.CONE, true);
SIM.addRigidbody(rb1);

var rb2 = new Rigidbody(RIGIDBODY_TYPES.STATIC, SCENE.meshes[1]); // Fixed plane
rb2.setProperties(
  1.0,
  {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
  {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  }
);
rb2.initBody(COLLIDER_TYPES.PLANE, true);
SIM.addRigidbody(rb2);

var rb3 = new Rigidbody(RIGIDBODY_TYPES.DYNAMIC, SCENE.meshes[2]); // Fixed plane
rb3.setProperties(
  1.0,
  {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
  {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  }
);
rb3.initBody(COLLIDER_TYPES.BOX, true);
SIM.addRigidbody(rb3);
//-------------------------------------------

// Start Loop
// SIM.startSimulation();
RENDERER.startRenderLoop(
  // All the callbacks we will send the renderer to execute
  [
    // Update Physics each frame
    SIM.updateWorld,

    // Move mesh with input
    (delta) => {
      var speed = 5.0;
      if (checkKey("d")) {
        SCENE.meshes[0].mesh.position.x += speed * delta;
      }
      if (checkKey("a")) {
        SCENE.meshes[0].mesh.position.x -= speed * delta;
      }
      if (checkKey("s")) {
        SCENE.meshes[0].mesh.position.z += speed * delta;
      }
      if (checkKey("w")) {
        SCENE.meshes[0].mesh.position.z -= speed * delta;
      }
      if (checkKey("q")) {
        SCENE.meshes[0].mesh.position.y += speed * delta;
      }
      if (checkKey("e")) {
        SCENE.meshes[0].mesh.position.y -= speed * delta;
      }
    },

    // Switch between focus meshes
    () => {
      if (checkKeyDown("z")) {
        RENDERER.updateFocus(SCENE.meshes[1]);
      }
      if (checkKeyDown("x")) {
        RENDERER.updateFocus(SCENE.meshes[2]);
      }
      if (checkKeyDown("c")) {
        RENDERER.updateFocus(SCENE.meshes[0]);
      }
    },
  ],
  SCENE.meshes[0] // start target for the camera
);
//-----------------------------------------------
