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
// defineScene();

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryText(3, "Beyblade Simulator", FONT.fonts[0]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXT, 0xaa00ff),
    [0, 20, 0],
    [0, 0, 0],
    [5, 5, 5]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryModel(MODEL.models[0]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0xffffff),
    [0, 0, 0],
    [0, 0, 0],
    [25, 25, 25]
  )
);

SCENE.addMesh(
  new MESH.Mesh(
    new GEOMETRY.GeometryModel(MODEL.models[1]),
    new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0xffffff),
    [0, 5, 0],
    [0, 0, 0],
    [1, 1, 1]
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

RENDERER.startRenderLoop(
  // All the callbacks we will send the renderer to execute
  [() => {}],
  SCENE.meshes[2] // start target for the camera
);
//-----------------------------------------------

function defineScene() {
  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CONE, 1),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TEXTURE, 0xffffff),
      [0, 4.0, 0],
      [Math.PI, 0, 0],
      [1, 0.5, 1]
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.PLANE, 1),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LAMBERT, 0x00ff00),
      [0, 0, 0],
      [0, 0, 0],
      [2, 2, 2]
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.SPHERE, 9),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.LIT, 0x0066ff),
      [3, 4, 0],
      [0, 0, 0],
      [1, 1, 1]
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CUBE, 1),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.COLOR, 0xff0000),
      [-3, 4, 0],
      [0, 0, 0],
      [1, 1, 1]
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CYLINDER, 3),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.NORMAL, 0xff0000),
      [0, 4, 3],
      [0, 0, 0],
      [1, 1, 1]
    )
  );

  SCENE.addMesh(
    new MESH.Mesh(
      new GEOMETRY.Geometry(GEOMETRY.GEOMETRY_TYPES.CAPSULE, 3),
      new MATERIAL.Material(MATERIAL.MATERIAL_TYPES.TOON, 0xaa00ff),
      [0, 4, -3],
      [0, 0, 0],
      [1, 0.5, 1]
    )
  );
}
