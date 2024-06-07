//! CAMERA
//---------------------------------------------------------------
//! Camera Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Camera Variables
//-----------------------------------------------
class Camera {
  constructor() {
    this.cam = null;
  }

  update() {}
}

class PerspectiveCam extends Camera {
  constructor(fov, aspect, near, far, distance) {
    super();
    this.distance = distance;
    this.cam = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.cam.position.set(0, 0, distance);
  }
  update(aspect) {
    this.cam.aspect = aspect;
    this.cam.updateProjectionMatrix();
  }
}

class OrthographicCam extends Camera {
  constructor(size, aspect, near, far, distance) {
    super();
    this.size = size;
    this.distance = distance;
    this.cam = new THREE.OrthographicCamera(
      -aspect * 0.5 * size,
      aspect * 0.5 * size,
      0.5 * size,
      -0.5 * size,
      near,
      far
    );
    this.cam.position.set(0, 0, distance);
  }

  update(aspect) {
    this.cam.left = -aspect * 0.5 * this.size;
    this.cam.right = aspect * 0.5 * this.size;
    this.cam.updateProjectionMatrix();
  }
}
//-----------------------------------------------

//! Camera Functions
//-----------------------------------------------
//-----------------------------------------------

export { PerspectiveCam, OrthographicCam };
//---------------------------------------------------------------
