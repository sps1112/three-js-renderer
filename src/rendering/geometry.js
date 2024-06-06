//! GEOMETRY
//---------------------------------------------------------------
//! Geometry Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { debugObject } from "../gui/gui";
//-----------------------------------------------

//! Geometry Variables
//-----------------------------------------------
debugObject.sphereSubdivisions = 18;
var cubeGeometry;
var sphereGeometry;
var torusGeometry;
var planeGeometry;
var triGeometry;
var ranGeometry;
var textGeometry;
//-----------------------------------------------

//! Geometry Functions
//-----------------------------------------------
function setupGeometry() {
  cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  sphereGeometry = new THREE.SphereGeometry(
    1,
    debugObject.sphereSubdivisions,
    debugObject.sphereSubdivisions
  );
  torusGeometry = new THREE.TorusGeometry(0.8, 0.2, 18, 18);
  planeGeometry = new THREE.PlaneGeometry(1, 1, 10, 10);

  const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
  const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
  triGeometry = new THREE.BufferGeometry();
  triGeometry.setAttribute("position", positionAttribute);

  const triCount = 100;
  const posArray = new Float32Array(triCount * 3 * 3);
  for (var i = 0; i < triCount * 3 * 3; i++) {
    posArray[i] = Math.random() - 0.5;
  }
  const posAttribute = new THREE.BufferAttribute(posArray, 3);
  ranGeometry = new THREE.BufferGeometry();
  ranGeometry.setAttribute("position", posAttribute);
}

function setupTextGeometry(text, fontToUse) {
  if (textGeometry) textGeometry.dispose();

  textGeometry = new TextGeometry(text, {
    font: fontToUse,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // textGeometry.computeBoundingBox();
  // console.log(textGeometry.boundingBox);
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) / 2.0,
  //   -(textGeometry.boundingBox.max.y - 0.02) / 2.0,
  //   -(textGeometry.boundingBox.max.z - 0.03) / 2.0
  // );
  textGeometry.center();
}
//-----------------------------------------------

export {
  setupGeometry,
  setupTextGeometry,
  cubeGeometry,
  sphereGeometry,
  torusGeometry,
  planeGeometry,
  triGeometry,
  ranGeometry,
  textGeometry,
};
//---------------------------------------------------------------
