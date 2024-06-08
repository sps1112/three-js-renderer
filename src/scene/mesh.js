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
    this.gui = null;
    this.resetTransform();
  }

  update() {
    this.mesh.geometry = this.geometry.geometry;
    this.mesh.material = this.material.mat;
    this.updateGUI();
  }

  resetTransform() {
    // update transform with default data
    this.updatePosition(this.position);
    this.updateRotation(this.rotation);
    this.updateScale(this.scale);
  }

  updatePosition(position) {
    this.mesh.position.set(position[0], position[1], position[2]);
    this.updateGUI();
  }

  updateRotation(rotation) {
    this.mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    this.updateGUI();
  }

  updateScale(scale) {
    this.mesh.scale.set(scale[0], scale[1], scale[2]);
    this.updateGUI();
  }

  updateQuaternion(quaternion) {
    this.mesh.quaternion.set(
      quaternion[0],
      quaternion[1],
      quaternion[2],
      quaternion[3]
    );
    this.updateGUI();
  }

  setGUI(gui) {
    this.gui = gui;
  }

  updateGUI() {
    if (this.gui != null) {
      this.gui.forEach((ui) => ui.updateDisplay());
    }
  }
}
//-----------------------------------------------

//! Mesh Functions
//-----------------------------------------------
//-----------------------------------------------

export { Mesh };
//---------------------------------------------------------------
