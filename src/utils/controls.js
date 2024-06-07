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
  controls.target = lookAt.position;
  updateControls();
}

function updateControls() {
  controls.update();
}
//-----------------------------------------------
export { setupOrbitalControls, updateControls };
//---------------------------------------------------------------
