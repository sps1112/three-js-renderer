//! MESH
//---------------------------------------------------------------
//! Mesh Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Mesh Variables
//-----------------------------------------------
class Mesh {
  constructor(geometry, material, position, rotation, scale) {
    this.geometry = geometry;
    this.geometry.setMesh(this);
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry.geometry, this.material.mat);
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.resetTransform();
  }

  update() {
    this.mesh.geometry = this.geometry.geometry;
    this.mesh.material = this.material.mat;
  }

  resetTransform() {
    // update transform with default data
    this.updateTransform(this.position, this.rotation, this.scale);
  }

  updateTransform(position, rotation, scale) {
    // Set the transform based on given data
    this.mesh.position.set(position[0], position[1], position[2]);
    this.mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    this.mesh.scale.set(scale[0], scale[1], scale[2]);
  }
}
//-----------------------------------------------

//! Mesh Functions
//-----------------------------------------------
//-----------------------------------------------

export { Mesh };
//---------------------------------------------------------------
