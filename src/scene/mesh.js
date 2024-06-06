//! MESH
//---------------------------------------------------------------
//! Mesh Dependencies
//-----------------------------------------------
import * as THREE from "three";
import * as GEOMETRY from "../rendering/geometry";
import * as MATERIAL from "../rendering/material";
//-----------------------------------------------

//! Mesh Variables
//-----------------------------------------------
var group; // Holds all the meshes in the scene
var ran;
var cube;
var torus;
var plane;
var sphere;
var textMesh;
//-----------------------------------------------

//! Mesh Functions
//-----------------------------------------------
function setupGroup() {
  group = new THREE.Group();
}

function setupMeshes() {
  ran = new THREE.Mesh(GEOMETRY.ranGeometry, MATERIAL.matColor);
  ran.position.y = -1;
  // ran.visible = false;
  group.add(ran);

  cube = new THREE.Mesh(GEOMETRY.cubeGeometry, MATERIAL.matTexture);
  cube.rotation.reorder("YXZ");
  cube.position.x = -2.5;
  cube.scale.y = 1.25;
  group.add(cube);

  torus = new THREE.Mesh(GEOMETRY.torusGeometry, MATERIAL.matToon);
  group.add(torus);

  plane = new THREE.Mesh(GEOMETRY.planeGeometry, MATERIAL.matLitTex);
  plane.position.z = -3;
  plane.scale.set(10, 10, 1);
  group.add(plane);

  sphere = new THREE.Mesh(GEOMETRY.sphereGeometry, MATERIAL.matLit);
  sphere.position.x = 2.5;
  group.add(sphere);
}

function setupTextMesh() {
  textMesh = new THREE.Mesh(GEOMETRY.textGeometry, MATERIAL.matText);
  group.add(textMesh);
}
//-----------------------------------------------

export {
  group,
  setupGroup,
  setupMeshes,
  ran,
  cube,
  torus,
  plane,
  sphere,
  setupTextMesh,
};
//---------------------------------------------------------------
