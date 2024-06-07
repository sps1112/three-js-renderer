//! HELPERS
//---------------------------------------------------------------
//! Helpers Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { scene, lights, addToScene } from "../scene/scene";
import { LIGHT_TYPES } from "../scene/light";
//-----------------------------------------------

//! Helpers Variables
//-----------------------------------------------
var axesHelper;
var gridHelper;
var lightHelpers = [];
//-----------------------------------------------

//! Helpers Functions
//-----------------------------------------------
function setupHelpers() {
  axesHelper = new THREE.AxesHelper(10);
  gridHelper = new THREE.GridHelper(20, 20);
  scene.add(axesHelper, gridHelper);
}

function setupLightHelpers() {
  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];
    if (light.type == LIGHT_TYPES.POINT) {
      var lightHelper = new THREE.PointLightHelper(
        light.light,
        0.1,
        light.color
      );
      lightHelpers.push(lightHelper);
      addToScene(lightHelper);
    }
  }
}
//-----------------------------------------------

export { setupHelpers, lightHelpers, setupLightHelpers };
//---------------------------------------------------------------
