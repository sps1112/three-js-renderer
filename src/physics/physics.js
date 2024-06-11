//! PHYSICS
//---------------------------------------------------------------
//! Physics Dependencies
//-----------------------------------------------
//-----------------------------------------------

//! Physics Variables
//-----------------------------------------------
var world;
var gravity;
var RAPIER;
//-----------------------------------------------

//! Physics Functions
//-----------------------------------------------
async function setupPhysics(callback) {
  console.log("Loading Rapier...");
  try {
    RAPIER = await import("@dimforge/rapier3d");
    console.log("Rapier loaded");
    console.log(RAPIER);

    callback();
  } catch (error) {
    console.error("Error loading Rapier:", error);
  }

  console.log("Setting world as Rapier is loaded");
  gravity = { x: 0.0, y: -9.81, z: 0.0 };
  console.log(RAPIER);
  console.log(RAPIER.World);
  world = new RAPIER.World(gravity);
  console.log("Setup World");
}

function updatePhysics() {
  world.step();
}
//-----------------------------------------------

export { RAPIER, world, setupPhysics, updatePhysics };
//---------------------------------------------------------------
