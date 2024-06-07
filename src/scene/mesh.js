//! MESH
//---------------------------------------------------------------
//! Mesh Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Mesh Variables
//-----------------------------------------------
class Mesh {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.geometry.setMesh(this);
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry.geometry, this.material.mat);
  }

  update() {
    this.mesh.geometry = this.geometry.geometry;
    this.mesh.material = this.material.mat;
  }
}
//-----------------------------------------------

//! Mesh Functions
//-----------------------------------------------
//-----------------------------------------------

export { Mesh };
//---------------------------------------------------------------
