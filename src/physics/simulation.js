//! SIMULATION
//---------------------------------------------------------------
//! Simulation Dependencies
//-----------------------------------------------
import { loadRapier, setupPhysics, updatePhysics } from "./physics";
import { checkKey, checkKeyDown } from "../utils/controls";
import { camera } from "../rendering/renderer";
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

      // Check Input
      var force = 2000.0;
      var direction = { x: 0, y: 0, z: 0 };
      if (checkKey("w")) {
        direction.x = camera.getForward().x;
        direction.z = camera.getForward().z;
      }
      if (checkKey("s")) {
        direction.x = -camera.getForward().x;
        direction.z = -camera.getForward().z;
      }
      if (checkKey("a")) {
        direction.x = camera.getForward().z;
        direction.z = -camera.getForward().x;
      }
      if (checkKey("d")) {
        direction.x = -camera.getForward().z;
        direction.z = camera.getForward().x;
      }
      rigidbodies[0].rigidbody.applyImpulse({
        x: direction.x * force * delta,
        y: 0,
        z: direction.z * force * delta,
      });
      rigidbodies[0].rigidbody.applyTorqueImpulse({
        x: (direction.x * force * delta) / 2,
        y: 0,
        z: (direction.z * force * delta) / 2,
      });

      if (checkKeyDown("q")) {
        console.log(rigidbodies[0].rigidbody.mass());
        console.log(rigidbodies[0].data.centerOfMass);
        console.log(rigidbodies[0].data.principalAngularInertia);
        console.log(rigidbodies[0].rigidbody.principalInertia());
        console.log(rigidbodies[0].rigidbody.effectiveAngularInertia());
      }

      if (checkKey("z")) {
        console.log(rigidbodies[0].rigidbody.angvel().y);
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
  if (checkKeyDown("p") && canStart) {
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
