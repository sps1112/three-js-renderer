//! RIGIDBODY
//---------------------------------------------------------------
//! Rigidbody Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
//-----------------------------------------------

//! Rigidbody Variables
//-----------------------------------------------
class Rigidbody {
  constructor(rigidbody, collider) {
    this.rigidbody = rigidbody;
    this.collider = collider;
  }

  addMesh(mesh) {
    this.mesh = mesh;
  }

  refreshMesh() {
    this.mesh.updateTransform(
      [
        this.rigidbody.translation().x,
        this.rigidbody.translation().y,
        this.rigidbody.translation().z,
      ],
      this.mesh.rotation,
      this.mesh.scale
    );
  }
}
//-----------------------------------------------

//! Rigidbody Functions
//-----------------------------------------------
function convertToEuler(quaternion) {}
//-----------------------------------------------

export { Rigidbody };
//---------------------------------------------------------------
