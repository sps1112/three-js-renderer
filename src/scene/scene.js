//! SCENE
//---------------------------------------------------------------
//! Scene Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { rgbeLoader } from "../utils/loader";
//-----------------------------------------------

//! Scene Variables
//-----------------------------------------------
var scene;
var group;
var meshes;
var lights;
//-----------------------------------------------

//! Scene Functions
//-----------------------------------------------
function setupScene() {
  scene = new THREE.Scene();

  group = new THREE.Group();
  group.position.y = 1.0;
  scene.add(group);

  lights = [];
  meshes = [];
}

function setEnvironment() {
  rgbeLoader.load("textures/environmentMap/2k.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
  });
}

function addToScene(object) {
  group.add(object);
}

function addMesh(mesh) {
  meshes.push(mesh);
  addToScene(mesh.mesh);
}

function addLight(light) {
  lights.push(light);
  addToScene(light.light);
}
//-----------------------------------------------

export {
  scene,
  group,
  setupScene,
  setEnvironment,
  addToScene,
  meshes,
  addMesh,
  lights,
  addLight,
};
//---------------------------------------------------------------
