//! RIGIDBODY
//---------------------------------------------------------------
//! Rigidbody Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
import { world } from "./physics";
import { Collider3D } from "./collider";
//-----------------------------------------------

//! Rigidbody Variables
//-----------------------------------------------
var RIGIDBODY_TYPES = {
  STATIC: 0,
  DYNAMIC: 1,
};

class Rigidbody {
  constructor(type, mesh) {
    this.type = type;
    this.meshes = [];
    this.meshes.push(mesh); // Mesh class to sync

    switch (this.type) {
      case RIGIDBODY_TYPES.STATIC:
        this.data = RAPIER.RigidBodyDesc.fixed();
        break;

      case RIGIDBODY_TYPES.DYNAMIC:
        this.data = RAPIER.RigidBodyDesc.dynamic();
        break;

      default:
        this.data = null;
        break;
    }
    this.data
      .setTranslation(
        this.meshes[0].mesh.position.x,
        this.meshes[0].mesh.position.y,
        this.meshes[0].mesh.position.z
      )
      .setRotation(this.meshes[0].mesh.quaternion);
  }

  setProperties(gravity, linearVel, angularVel) {
    this.gravity = gravity;
    this.linearVel = linearVel;
    this.angularVel = angularVel;

    this.data
      .setGravityScale(this.gravity)
      .setLinvel(this.linearVel.x, this.linearVel.y, this.linearVel.z)
      .setAngvel(this.angularVel);
  }

  initBody(colliderType, renderCollider) {
    this.rigidbody = world.createRigidBody(this.data);
    this.collider = new Collider3D(
      colliderType,
      this.meshes[0].mesh.scale,
      {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      },
      this.rigidbody,
      renderCollider
    );
    if (renderCollider) {
      this.collider.renderCollider(this.meshes[0]);
      this.meshes.push(this.collider.mesh);
    }
  }

  refreshMesh() {
    this.meshes.forEach((mesh) => {
      mesh.updatePosition([
        this.collider.collider.translation().x,
        this.collider.collider.translation().y,
        this.collider.collider.translation().z,
      ]);

      mesh.updateQuaternion(this.collider.collider.rotation());
    });
  }
}
//-----------------------------------------------

//! Rigidbody Functions
//-----------------------------------------------
//-----------------------------------------------

export { RIGIDBODY_TYPES, Rigidbody };
//---------------------------------------------------------------
