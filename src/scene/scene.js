//! SCENE
//---------------------------------------------------------------
//! Scene Dependencies
//-----------------------------------------------
import * as THREE from "three";
import * as MESH from "./mesh";
import { rgbeLoader } from "../utils/loader";
import { loadFont } from "../rendering/font";
//-----------------------------------------------

//! Scene Variables
//-----------------------------------------------
var scene;
var lights;
//-----------------------------------------------

//! Scene Functions
//-----------------------------------------------
function setupScene() {
  scene = new THREE.Scene();
  lights = [];
}

function setEnvironment() {
  rgbeLoader.load("textures/environmentMap/2k.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
  });
}

function addLight(light) {
  lights.push(light);
  scene.add(light.light);
}

function logLights() {
  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];
    console.log(i + " " + light.color + " " + light.light.intensity);
  }
}

function populateScene() {
  MESH.setupGroup();
  MESH.group.position.y = 1.0;
  scene.add(MESH.group);

  MESH.setupMeshes();
  loadFont("fonts/helvetiker_regular.typeface.json", "Siddhartha");
}

function refreshScene() {}
//-----------------------------------------------

export {
  scene,
  setupScene,
  refreshScene,
  populateScene,
  setEnvironment,
  lights,
  addLight,
  logLights,
};
//---------------------------------------------------------------
