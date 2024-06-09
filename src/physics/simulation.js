//! SIMULATION
//---------------------------------------------------------------
//! Simulation Dependencies
//-----------------------------------------------
import { setupPhysics, updatePhysics } from "./physics";
import { checkKeyUp } from "../utils/controls";
//-----------------------------------------------

//! Simulation Variables
//-----------------------------------------------
var rigidbodies;
var toSimulate;
//-----------------------------------------------

//! Simulation Functions
//-----------------------------------------------
function setupSimulation() {
  setupPhysics();
  rigidbodies = [];
  toSimulate = false;
}

function addRigidbody(rigidbody) {
  rigidbodies.push(rigidbody);
}

function startSimulation() {
  toSimulate = true;
}

function updateWorld(delta) {
  // Physics Loop
  if (toSimulate) {
    rigidbodies.forEach((rb) => {
      rb.refreshMesh();
    });

    // End Physics Frame
    updatePhysics();
  }

  // Pause/Start the simulation
  if (checkKeyUp("p")) {
    toSimulate = !toSimulate;
  }
}
//-----------------------------------------------

export { setupSimulation, updateWorld, addRigidbody, startSimulation };
//---------------------------------------------------------------
