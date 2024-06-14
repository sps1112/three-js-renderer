//! MESH
//---------------------------------------------------------------
//! Mesh Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { GEOMETRY_TYPES } from "../rendering/geometry";
//-----------------------------------------------

//! Mesh Variables
//-----------------------------------------------
class Mesh {
  constructor(geometry, material, position, rotation, scale) {
    this.geometry = geometry;
    this.geometry.setMesh(this);
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry.geometry, this.material.mat);
    if (
      geometry.type == GEOMETRY_TYPES.MODEL &&
      geometry.data &&
      geometry.data.loaded == true
    ) {
      this.setFromModel(this.geometry.data.model);
    }
    // Set default transform
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.gui = null;
    this.resetTransform();
  }

  update() {
    this.mesh.geometry = this.geometry.geometry;
    this.mesh.material = this.material.mat;
    this.mesh.material.needsUpdate = true;
    this.updateGUI();
  }

  // update transform with default data
  resetTransform() {
    this.updatePosition(this.position);
    this.updateRotation(this.rotation);
    this.updateScale(this.scale);
  }

  updatePosition(position) {
    this.mesh.position.set(position.x, position.y, position.z);
    this.updateGUI();
  }

  updateRotation(rotation) {
    this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    this.updateGUI();
  }

  updateScale(scale) {
    this.mesh.scale.set(scale.x, scale.y, scale.z);
    this.updateGUI();
  }

  updateQuaternion(quaternion) {
    this.mesh.quaternion.set(
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w
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

  setFromModel(modelData) {
    var modelMesh = modelData.children[0];
    this.geometry.setGeometry(modelMesh.geometry);
    this.material.setTexture(modelMesh.material.map);
    this.material.mat.roughness = 0.3;
    this.material.mat.metalness = 0.5;
    console.log("Model set");
    this.update();
  }
}
//-----------------------------------------------

//! Mesh Functions
//-----------------------------------------------
//-----------------------------------------------

export { Mesh };
//---------------------------------------------------------------
