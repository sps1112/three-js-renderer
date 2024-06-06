//! HELPERS
//---------------------------------------------------------------
//! Helpers Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Helpers Variables
//-----------------------------------------------
var axesHelper;
var gridHelper;
//-----------------------------------------------

//! Helpers Functions
//-----------------------------------------------
function setupHelpers(scene) {
  axesHelper = new THREE.AxesHelper(10);
  gridHelper = new THREE.GridHelper(20, 20);
  scene.add(axesHelper, gridHelper);
}
//-----------------------------------------------

export { setupHelpers };
//---------------------------------------------------------------
