//! SCENE
//---------------------------------------------------------------
//! Scene Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { setupHelpers } from "../utils/helpers";
import * as MESH from "./mesh";
import { rgbeLoader } from "../utils/loader";
import { loadFont } from "../rendering/font";
//-----------------------------------------------

//! Scene Variables
//-----------------------------------------------
var scene;
//-----------------------------------------------

//! Scene Functions
//-----------------------------------------------
function setupScene() {
  scene = new THREE.Scene();
}

function setEnvironment() {
  rgbeLoader.load("textures/environmentMap/2k.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
  });
}

function populateScene() {
  MESH.setupGroup();
  MESH.group.position.y = 1.0;
  scene.add(MESH.group);

  MESH.setupMeshes();
  loadFont("fonts/helvetiker_regular.typeface.json", "Siddhartha");
}

function addUtils() {
  setupHelpers(scene);
}

function refreshScene() {}
//-----------------------------------------------

export {
  scene,
  setupScene,
  addUtils,
  refreshScene,
  populateScene,
  setEnvironment,
};
//---------------------------------------------------------------
