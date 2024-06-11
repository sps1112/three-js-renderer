//! SIMULATION
//---------------------------------------------------------------
//! Simulation Dependencies
//-----------------------------------------------
import { loadRapier, setupPhysics, updatePhysics } from "./physics";
import { checkKey, checkKeyDown } from "../utils/controls";
//-----------------------------------------------

//! Simulation Variables
//-----------------------------------------------
var rigidbodies;
var toSimulate;
var fixedRate;
var timer;
var canStart;
//-----------------------------------------------

//! Simulation Functions
//-----------------------------------------------
async function setupSimulation(rate) {
  fixedRate = rate;
  canStart = false;
  console.log("Simulation set to start physics...");
  await loadRapier(canStartPhysics);
  console.log("Awaited rapier init.");
}

function canStartPhysics() {
  console.log("Can start now as Rapier loaded");
  canStart = true;
  setupPhysics();
  rigidbodies = [];
  toSimulate = false;
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
      var force = 1500.0;
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
      var max = 15.0;
      var speedX = rigidbodies[0].rigidbody.linvel().x;
      var speedZ = rigidbodies[0].rigidbody.linvel().z;
      var mag = Math.sqrt(speedX * speedX + speedZ * speedZ);
      if (mag > max) {
        speedX = (max * speedX) / mag;
        speedZ = (max * speedZ) / mag;
        rigidbodies[0].rigidbody.setLinvel(
          {
            x: speedX,
            y: rigidbodies[0].rigidbody.linvel().y,
            z: speedZ,
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
  canStart,
};
//---------------------------------------------------------------
