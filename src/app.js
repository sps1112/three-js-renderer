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
import { COLLIDER_TYPES } from "./physics/collider";
import { renderWorld } from "./physics/physics";

// Setup Renderer components
RENDERER.setupRenderer();
RENDERER.setCamera();

// Loading assets
LOADER.setupLoaders();
TEXTURE.setupTextures();
FONT.loadFont("fonts/helvetiker_regular.typeface.json");
MODEL.loadModel("models/stadium1.glb");
MODEL.loadModel("models/stadium2.glb");
MODEL.loadModel("models/stadium3.glb");
MODEL.loadModel("models/beyblade.glb");

// Define the scene
var currentStadium = 0;
var stadiumMesh = null;
var beybladeMesh = null;
SCENE.setupScene();
SCENE.loadEnvironment("textures/environmentMap/workshop.hdr");
setupLoadingScene();

// Define the GUI
GUI.setupGUI();

// Setup Physics:-
//-----------------------------------------------
var generated = false;
var body1, body2;
SIM.setupSimulation(60);
//-----------------------------------------------

RENDERER.startRenderLoop(
  // All the callbacks we will send the renderer to execute
  [
    () => {
      if (CONTROLS.checkKeyDown("p") && !generated && SIM.canStart) {
        setupGameScene();
        setupGamePhysics();
      }
    },
    SIM.updateWorld,
    () => {
      if (generated) {
        if (CONTROLS.checkKey("m")) {
          RENDERER.updateFocus(stadiumMesh);
        }
        if (CONTROLS.checkKey("n")) {
          RENDERER.updateFocus(beybladeMesh);
        }
        if (CONTROLS.checkKeyDown("o")) {
          renderWorld();
        }
      } else {
        if (CONTROLS.checkKeyUp("1")) {
          loadStadium(1);
        }
        if (CONTROLS.checkKeyUp("2")) {
          loadStadium(2);
        }
        if (CONTROLS.checkKeyUp("3")) {
          loadStadium(3);
        }
      }
    },
  ]
);
//-----------------------------------------------

function setupLoadingScene() {
  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.GeometryText(3, "Beyblade Simulator", FONT.fonts[0]),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0xaa00ff),
      { x: 0, y: 28, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 7, y: 7, z: 7 }
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.GeometryText(
        5,
        "Press 1,2,3 to switch stadium",
        FONT.fonts[0]
      ),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0xaa00ff),
      { x: 0, y: 20, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 3.5, y: 3.5, z: 3.5 }
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.GeometryText(5, 'Press "P" to play', FONT.fonts[0]),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0xaa00ff),
      { x: 0, y: 16, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 3.5, y: 3.5, z: 3.5 }
    )
  );

  // Stadium
  loadStadium(3);
}

function loadStadium(id) {
  // Changing to a new stadium
  if (id != currentStadium) {
    if (stadiumMesh) {
      stadiumMesh.mesh.visible = false;
    }
    stadiumMesh = new MESH.Mesh(
      new GEOMETRY.GeometryModel(MODEL.models[id - 1]),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0xffffff),
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 25, y: 25, z: 25 }
    );
    SCENE.addMesh(stadiumMesh);
    currentStadium = id;
  }
}

function setupGameScene() {
  // Beyblade
  beybladeMesh = new MESH.Mesh(
    new GEOMETRY.GeometryModel(MODEL.models[3]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0xffffff),
    { x: 0, y: 10.0, z: 15.0 },
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1 }
  );
  SCENE.addMesh(beybladeMesh);

  // Add Lights
  SCENE.addLight(new LIGHT.AmbientLight(0xffffff, 1));
  SCENE.addLight(new LIGHT.PointLight(0xffffff, 10, 200, [25, 25, 0]));
  SCENE.addLight(new LIGHT.PointLight(0xffffff, 10, 200, [-25, 25, 0]));
  SCENE.addLight(new LIGHT.PointLight(0xffffff, 10, 200, [0, 25, -25]));
  SCENE.addLight(new LIGHT.PointLight(0xffffff, 10, 200, [0, 25, 25]));

  // Add other utilities
  HELPERS.setupLightHelpers();
}

function setupGamePhysics() {
  SCENE.meshes[0].mesh.visible = false;
  SCENE.meshes[1].mesh.visible = false;
  SCENE.meshes[2].mesh.visible = false;
  generated = true;

  body1 = new Rigidbody(RIGIDBODY_TYPES.DYNAMIC, beybladeMesh); // Beyblade
  body1.setup({
    gravity: 1.0,
    linearVel: {
      x: 0.0,
      y: 0.0,
      z: -15.0,
    },
    angularVel: {
      x: 2.0 * Math.PI * 0.0,
      y: 2.0 * Math.PI * 20.0, // Rotations per second
      z: 2.0 * Math.PI * 0.0,
    },
    linearDamp: 0.015,
    angularDamp: 0.03,
    mass: 35.0,
    center: { x: 0.0, y: -0.15, z: 0.0 },
    momentIntertia: { x: 0, y: 50, z: 0 },
  });

  body2 = new Rigidbody(RIGIDBODY_TYPES.STATIC, stadiumMesh); // Stadium
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
    mass: 0.0,
    center: { x: 0, y: 0, z: 0 },
    momentIntertia: { x: 0.0, y: 0.0, z: 0.0 },
  });

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
      friction: 0.7,
      restitution: 0.25,
      density: 2.0,
      vertices: beybladeMesh.mesh.geometry.attributes.position.array,
      indices: beybladeMesh.mesh.geometry.index.array,
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
      friction: 0.3, // Some friction from the stadium
      restitution: 0.0,
      density: 1.0,
      vertices: stadiumMesh.mesh.geometry.attributes.position.array,
      indices: stadiumMesh.mesh.geometry.index.array,
    },
    {
      subdivisions: 1,
    }
  );
  SIM.addRigidbody(body2);
  RENDERER.updateFocus(beybladeMesh);
}
