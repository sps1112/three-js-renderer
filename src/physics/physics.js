//! PHYSICS
//---------------------------------------------------------------
//! Physics Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
//-----------------------------------------------

//! Physics Variables
//-----------------------------------------------
var world;
var gravity;
//-----------------------------------------------

//! Physics Functions
//-----------------------------------------------
function setupPhysics() {
  gravity = { x: 0.0, y: -9.81, z: 0.0 };
  world = new RAPIER.World(gravity);
}

function updatePhysics() {
  world.step();
}
//-----------------------------------------------

export { world, setupPhysics, updatePhysics };
//---------------------------------------------------------------
