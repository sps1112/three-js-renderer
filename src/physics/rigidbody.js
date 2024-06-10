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
    this.mesh = mesh; // Mesh class for this rigidbody
    this.colliders = [];

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
        this.mesh.mesh.position.x,
        this.mesh.mesh.position.y,
        this.mesh.mesh.position.z
      )
      .setRotation(this.mesh.mesh.quaternion);
  }

  setup(props) {
    this.gravity = props.gravity;
    this.linearVel = props.linearVel;
    this.angularVel = props.angularVel;

    this.data
      .setGravityScale(this.gravity)
      .setLinvel(this.linearVel.x, this.linearVel.y, this.linearVel.z)
      .setAngvel(this.angularVel);
    this.rigidbody = world.createRigidBody(this.data);
  }

  attachCollider(colliderType, shapeProps, renderCollider) {
    // Create Collider object (not initialized)
    var collider = new Collider3D(
      colliderType,
      shapeProps,
      this.rigidbody,
      renderCollider
    );
    this.colliders.push(collider);
  }

  setupCollider(index, props, renderProps) {
    // Setup collider with the properties
    this.colliders[index].setup(props);

    // Render collider
    if (this.colliders[index].render) {
      this.colliders[index].renderCollider(renderProps);
    }
  }

  refreshMesh() {
    // Refresh mesh position
    this.mesh.updatePosition([
      this.colliders[0].collider.translation().x,
      this.colliders[0].collider.translation().y,
      this.colliders[0].collider.translation().z,
    ]);

    this.mesh.updateQuaternion(this.colliders[0].collider.rotation());

    // Refresh all colliders which are being rendererd
    this.colliders.forEach((collider) => {
      if (collider.render) {
        collider.refreshMesh();
      }
    });
  }
}
//-----------------------------------------------

//! Rigidbody Functions
//-----------------------------------------------
//-----------------------------------------------

export { RIGIDBODY_TYPES, Rigidbody };
//---------------------------------------------------------------
