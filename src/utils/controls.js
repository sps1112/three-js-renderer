//! CONTROLS
//---------------------------------------------------------------
//! Controls Dependencies
//-----------------------------------------------
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//-----------------------------------------------

//! Controls Variables
//-----------------------------------------------
var controls;
//-----------------------------------------------

//! Controls Functions
//-----------------------------------------------
function setupOrbitalControls(camera, canvas, lookAt) {
  controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;
  // controls.enablePan = false;
  controls.target.y = lookAt.position.y;
  controls.update();
}

function updateControls() {
  controls.update();
}
//-----------------------------------------------
export { setupOrbitalControls, updateControls };
//---------------------------------------------------------------
