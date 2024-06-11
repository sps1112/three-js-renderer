//! PHYSICS
//---------------------------------------------------------------
//! Physics Dependencies
//-----------------------------------------------
import RAPIER from "https://cdn.skypack.dev/@dimforge/rapier3d-compat";
//-----------------------------------------------

//! Physics Variables
//-----------------------------------------------
var world;
var gravity;
//-----------------------------------------------

//! Physics Functions
//-----------------------------------------------
async function loadRapier(callback) {
  console.log("Loading Rapier...");
  try {
    await RAPIER.init();
    console.log("Rapier loaded as:-");
    console.log(RAPIER);
    callback();
  } catch (error) {
    console.error("Error loading Rapier:", error);
  }
}

function setupPhysics() {
  console.log("Setting world as Rapier is loaded");
  gravity = { x: 0.0, y: -9.81, z: 0.0 };
  console.log(RAPIER);
  console.log(RAPIER.World);
  // console.log(RAPIER.RawIntegrationParameters());
  world = new RAPIER.World(gravity);
  console.log("Setup World complete");
}

function updatePhysics() {
  world.step();
}
//-----------------------------------------------

export { RAPIER, loadRapier, world, setupPhysics, updatePhysics };
//---------------------------------------------------------------
