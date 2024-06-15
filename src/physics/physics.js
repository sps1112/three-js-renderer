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
    callback();
  } catch (error) {
    console.error("Error loading Rapier:", error);
  }
}

function setupPhysics() {
  console.log("Setting world as Rapier is loaded");
  gravity = { x: 0.0, y: -9.81, z: 0.0 };
  world = new RAPIER.World(gravity);
  console.log("Setup World complete");
}

function updatePhysics() {
  world.step();
}

function getWorldData() {
  const { vertices, colors } = world.debugRender();
  return { vertices, colors };
}
//-----------------------------------------------

export { RAPIER, loadRapier, world, setupPhysics, updatePhysics, getWorldData };
//---------------------------------------------------------------
