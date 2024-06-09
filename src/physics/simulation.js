//! SIMULATION
//---------------------------------------------------------------
//! Simulation Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
import { world, setupPhysics, updatePhysics } from "./physics";
import { Rigidbody } from "./rigidbody";
import { checkKeyUp } from "../utils/controls";
import { COLLIDER_TYPES, Collider3D } from "./collider";
import { addMesh } from "../scene/scene";
//-----------------------------------------------

//! Simulation Variables
//-----------------------------------------------
var rigidbodies;
var colliders;
var toSimulate;
//-----------------------------------------------

//! Simulation Functions
//-----------------------------------------------
function setupSimulation() {
  setupPhysics();

  rigidbodies = [];
  colliders = [];

  toSimulate = false;
}

function addCollider(data) {}

function addRigidbody(mesh1, mesh2, mesh3) {
  // Dynamimc Body
  var rigid1 = RAPIER.RigidBodyDesc.dynamic()
    .setGravityScale(2.5)
    .setTranslation(
      mesh1.mesh.position.x,
      mesh1.mesh.position.y,
      mesh1.mesh.position.z
    )
    .setRotation({
      x: mesh1.mesh.quaternion.x,
      y: mesh1.mesh.quaternion.y,
      z: mesh1.mesh.quaternion.z,
      w: mesh1.mesh.quaternion.w,
    })
    .setLinvel(-5.0, 0.0, -20.0)
    .setAngvel({ x: 0.0, y: 200.0, z: 0.0 });
  var body1 = world.createRigidBody(rigid1);

  var collider1 = new Collider3D(
    COLLIDER_TYPES.CONE,
    mesh1.mesh.scale,
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    },
    body1,
    true
  );
  colliders.push(collider1);

  var rb = new Rigidbody(body1, collider1);
  rb.addMesh(mesh1);
  if (collider1.render) {
    collider1.renderCollider(mesh1);
    addMesh(collider1.mesh);
    rb.addMesh(collider1.mesh);
  }
  rigidbodies.push(rb);

  // Fixed Floor
  var rigid2 = RAPIER.RigidBodyDesc.fixed()
    .setGravityScale(1.0)
    .setTranslation(
      mesh2.mesh.position.x,
      mesh2.mesh.position.y,
      mesh2.mesh.position.z
    )
    .setRotation({
      x: mesh2.mesh.quaternion.x,
      y: mesh2.mesh.quaternion.y,
      z: mesh2.mesh.quaternion.z,
      w: mesh2.mesh.quaternion.w,
    });
  var body2 = world.createRigidBody(rigid2);

  var collider2 = new Collider3D(
    COLLIDER_TYPES.PLANE,
    mesh2.mesh.scale,
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    },
    body2,
    true
  );
  colliders.push(collider2);

  var rb2 = new Rigidbody(body2, collider2);
  rb2.addMesh(mesh2);
  if (collider2.render) {
    collider2.renderCollider(mesh2);
    addMesh(collider2.mesh);
    rb2.addMesh(collider2.mesh);
  }
  rigidbodies.push(rb2);

  // Fixed Wall
  var rigid3 = RAPIER.RigidBodyDesc.dynamic()
    .setGravityScale(1.0)
    .setTranslation(
      mesh3.mesh.position.x,
      mesh3.mesh.position.y,
      mesh3.mesh.position.z
    )
    .setRotation({
      x: mesh3.mesh.quaternion.x,
      y: mesh3.mesh.quaternion.y,
      z: mesh3.mesh.quaternion.z,
      w: mesh3.mesh.quaternion.w,
    });
  var body3 = world.createRigidBody(rigid3);

  var collider3 = new Collider3D(
    COLLIDER_TYPES.BOX,
    mesh3.mesh.scale,
    {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    },
    body3,
    true
  );
  colliders.push(collider3);

  var rb3 = new Rigidbody(body3, collider3);
  rb3.addMesh(mesh3);
  if (collider3.render) {
    collider3.renderCollider(mesh3);
    addMesh(collider3.mesh);
    rb3.addMesh(collider3.mesh);
  }
  rigidbodies.push(rb3);
}

function startSimulation() {
  toSimulate = true;
}

function updateWorld(delta) {
  if (toSimulate) {
    updatePhysics();

    rigidbodies.forEach((rb) => {
      rb.refreshMesh();
    });
  }

  if (checkKeyUp("p")) {
    toSimulate = !toSimulate;
  }
}
//-----------------------------------------------

export { setupSimulation, updateWorld, addRigidbody, startSimulation };
//---------------------------------------------------------------
