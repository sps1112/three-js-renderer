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
    this.mesh.updatePosition([
      this.collider.collider.translation().x,
      this.collider.collider.translation().y,
      this.collider.collider.translation().z,
    ]);
    // console.log(this.collider.collider.rotation());
    this.mesh.updateQuaternion([
      this.collider.collider.rotation().x,
      this.collider.collider.rotation().y,
      this.collider.collider.rotation().z,
      this.collider.collider.rotation().w,
    ]);
  }
}
//-----------------------------------------------

//! Rigidbody Functions
//-----------------------------------------------
//-----------------------------------------------

export { Rigidbody };
//---------------------------------------------------------------
