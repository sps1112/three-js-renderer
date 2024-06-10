//! SIMULATION
//---------------------------------------------------------------
//! Simulation Dependencies
//-----------------------------------------------
import { setupPhysics, updatePhysics } from "./physics";
import { checkKey, checkKeyDown } from "../utils/controls";
//-----------------------------------------------

//! Simulation Variables
//-----------------------------------------------
var rigidbodies;
var toSimulate;
var fixedRate;
var timer;
//-----------------------------------------------

//! Simulation Functions
//-----------------------------------------------
function setupSimulation(rate) {
  setupPhysics();
  rigidbodies = [];
  toSimulate = false;
  fixedRate = rate;
  timer = 0.0;
}

function addRigidbody(rigidbody) {
  rigidbodies.push(rigidbody);
}

function startSimulation() {
  toSimulate = true;
}

function wakeWorld() {
  rigidbodies.forEach((rb) => {
    rb.rigidbody.wakeUp();
  });
}

function updateWorld(delta) {
  // Physics Loop
  if (toSimulate) {
    timer += delta;
    if (timer > 1 / fixedRate) {
      // Run a loop and update physics world
      //----------------------------------
      timer -= 1 / fixedRate;

      // Take input
      var force = 10.0;
      if (checkKey("w")) {
        rigidbodies[0].rigidbody.applyImpulse(
          {
            x: 0,
            y: 0,
            z: -force * (1 / fixedRate),
          },
          true
        );
      }
      if (checkKey("s")) {
        rigidbodies[0].rigidbody.applyImpulse(
          {
            x: 0,
            y: 0,
            z: force * (1 / fixedRate),
          },
          true
        );
      }
      if (checkKey("a")) {
        rigidbodies[0].rigidbody.applyImpulse(
          {
            x: -force * (1 / fixedRate),
            y: 0,
            z: 0,
          },
          true
        );
      }
      if (checkKey("d")) {
        rigidbodies[0].rigidbody.applyImpulse(
          {
            x: force * (1 / fixedRate),
            y: 0,
            z: 0,
          },
          true
        );
      }

      // End of physics Frame
      rigidbodies.forEach((rb) => {
        rb.refreshMesh();
      });
      updatePhysics(); // Update physics simulation at clear intervals of time
      //----------------------------------
    }
  }

  // Pause/Start the simulation
  if (checkKeyDown("p")) {
    toSimulate = !toSimulate;
  }
}
//-----------------------------------------------

export {
  setupSimulation,
  updateWorld,
  addRigidbody,
  startSimulation,
  wakeWorld,
};
//---------------------------------------------------------------
