//! PHYSICS
//---------------------------------------------------------------
//! Physics Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
import { Rigidbody } from "./rigidbody";
//-----------------------------------------------

//! Physics Variables
//-----------------------------------------------
var world;
var gravity;
var rigidbodies;
var colliders;
var toSimulate;
//-----------------------------------------------

//! Physics Functions
//-----------------------------------------------
function setupPhysics() {
  gravity = { x: 0.0, y: -9.81, z: 0.0 };
  world = new RAPIER.World(gravity);

  rigidbodies = [];
  colliders = [];

  toSimulate = false;
  window.addEventListener("keydown", (event) => {
    if (event.key == "p") {
      toSimulate = !toSimulate;
    }
  });
}

function addCollider(data) {}

function addRigidbody(mesh) {
  // Dynamimc Body
  var rigid1 = RAPIER.RigidBodyDesc.dynamic()
    .setGravityScale(3.0)
    .setTranslation(
      mesh.mesh.position.x,
      mesh.mesh.position.y,
      mesh.mesh.position.z
    )
    .setLinvel(0.2, 0.0, -3.1);
  var body1 = world.createRigidBody(rigid1);

  var collider1 = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5).setTranslation(
    0.0,
    0.0,
    0.0
  );
  colliders.push(world.createCollider(collider1, body1));

  var rb = new Rigidbody(body1, collider1);
  rb.addMesh(mesh);
  rigidbodies.push(rb);

  // Fixed Body
  var collider2 = RAPIER.ColliderDesc.cuboid(5, 0.05, 5);
  colliders.push(world.createCollider(collider2));
}

function startSimulation() {
  toSimulate = true;
}

function updateWorld(delta) {
  if (toSimulate) {
    world.step();

    rigidbodies.forEach((rb) => {
      rb.refreshMesh();
    });
  }
}
//-----------------------------------------------

export { setupPhysics, updateWorld, addRigidbody, startSimulation };
//---------------------------------------------------------------
