//! RIGIDBODY
//---------------------------------------------------------------
//! Rigidbody Dependencies
//-----------------------------------------------
import { RAPIER, world } from "./physics";
import { Collider3D, COLLIDER_TYPES } from "./collider";
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
    this.data
      .setGravityScale(props.gravity)
      .setLinvel(props.linearVel.x, props.linearVel.y, props.linearVel.z)
      .setAngvel(props.angularVel)
      .setLinearDamping(props.linearDamp)
      .setAngularDamping(props.angularDamp);

    this.data.setAdditionalMassProperties(
      props.mass, // Mass.
      props.center, // Center of mass.
      props.momentIntertia, // Principal angular inertia.
      { w: 1.0, x: 0.0, y: 0.0, z: 0.0 } // Principal angular inertia frame (unit quaternion).
    );
    this.rigidbody = world.createRigidBody(this.data);
  }

  attachCollider(colliderType, shapeProps, renderCollider) {
    shapeProps.scale.x *= this.mesh.mesh.scale.x;
    shapeProps.scale.y *= this.mesh.mesh.scale.y;
    shapeProps.scale.z *= this.mesh.mesh.scale.z;

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
    if (
      this.colliders[index].type == COLLIDER_TYPES.MESH ||
      this.colliders[index].type == COLLIDER_TYPES.CONVEX
    ) {
      for (var i = 0; i < props.vertices.length; i += 3) {
        props.vertices[i] = props.vertices[i] * this.mesh.mesh.scale.x;
        props.vertices[i + 1] = props.vertices[i + 1] * this.mesh.mesh.scale.y;
        props.vertices[i + 2] = props.vertices[i + 2] * this.mesh.mesh.scale.z;
      }
    }

    this.colliders[index].setup(props);

    renderProps.position = this.colliders[index].shapeProps.offset;
    var scaleFactor = this.colliders[index].shapeProps.scale;
    renderProps.position.x =
      this.mesh.mesh.position.x + renderProps.position.x * scaleFactor.x;
    renderProps.position.y =
      this.mesh.mesh.position.y + renderProps.position.y * scaleFactor.y;
    renderProps.position.z =
      this.mesh.mesh.position.z + renderProps.position.z * scaleFactor.z;

    renderProps.rotation = this.colliders[index].shapeProps.rotation;
    renderProps.rotation.x += this.mesh.mesh.rotation.x;
    renderProps.rotation.y += this.mesh.mesh.rotation.y;
    renderProps.rotation.z += this.mesh.mesh.rotation.z;

    // Render collider
    if (this.colliders[index].render) {
      this.colliders[index].renderCollider(renderProps);
    }
  }

  refreshMesh() {
    // Refresh mesh position
    this.mesh.updatePosition(this.rigidbody.translation());

    this.mesh.updateQuaternion(this.rigidbody.rotation());

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
