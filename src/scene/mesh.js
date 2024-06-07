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
    this.mesh.position.set(
      this.position[0],
      this.position[1],
      this.position[2]
    );
    this.mesh.rotation.set(
      this.rotation[0],
      this.rotation[1],
      this.rotation[2]
    );
    this.mesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
  }
}
//-----------------------------------------------

//! Mesh Functions
//-----------------------------------------------
//-----------------------------------------------

export { Mesh };
//---------------------------------------------------------------
