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
var env;
var group;
var meshes;
var lights;
//-----------------------------------------------

//! Scene Functions
//-----------------------------------------------
function setupScene() {
  scene = new THREE.Scene();

  env = {
    map: null,
    render: false,
    light: false,
  };

  group = new THREE.Group();
  group.position.y = 0.0;
  scene.add(group);

  lights = [];
  meshes = [];
}

function loadEnvironment(path) {
  rgbeLoader.load(path, (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    env.map = environmentMap;
    env.render = true;
    env.light = true;
    updateEnvironment();
  });
}

function updateEnvironment() {
  if (env.render) {
    scene.background = env.map;
  } else {
    scene.background = null;
  }

  if (env.light) {
    scene.environment = env.map;
  } else {
    scene.environment = null;
  }
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
  env,
  group,
  setupScene,
  loadEnvironment,
  updateEnvironment,
  addToScene,
  meshes,
  addMesh,
  lights,
  addLight,
};
//---------------------------------------------------------------
