//! CAMERA
//---------------------------------------------------------------
//! Camera Dependencies
//-----------------------------------------------
import * as THREE from "three";
import {
  checkMouseButton,
  checkMouseMove,
  checkMouseScroll,
} from "../utils/controls";
import { clamp } from "three/src/math/MathUtils.js";
//-----------------------------------------------

//! Camera Variables
//-----------------------------------------------
class Camera {
  constructor() {
    this.cam = null;
  }

  setProperties(distance, pitch, yaw, dampness, scrollSpeed) {
    this.distance = distance;
    this.pitch = pitch;
    this.yaw = yaw;
    this.dampness = dampness;
    this.scrollSpeed = scrollSpeed;
  }

  setTarget(target) {
    this.target = target; // Mesh class
    this.currentLookAt = new THREE.Vector3().copy(target.mesh.position);
    this.updateLookAt(0.0);
  }

  updateLookAt(delta) {
    if (checkMouseButton(2)) {
      this.updateAngle({
        x: -checkMouseMove().x * delta,
        y: checkMouseMove().y * delta,
      });
    }
    this.updateDistance(this.scrollSpeed * checkMouseScroll() * delta);

    var targetPos = this.target.mesh.position;
    var offset = new THREE.Vector3().setFromSphericalCoords(
      this.distance,
      this.pitch,
      this.yaw
    );

    var final = offset.add(targetPos);
    this.cam.position.lerp(final, this.dampness);

    this.currentLookAt.lerp(targetPos, this.dampness);
    this.cam.lookAt(this.currentLookAt);
  }

  updateAngle(diff) {
    this.pitch += diff.y;
    this.pitch = clamp(this.pitch, 0.01, Math.PI - 0.01);

    this.yaw += diff.x;
    if (this.yaw > 2.0 * Math.PI) {
      this.yaw -= 2.0 * Math.PI;
    }
    if (this.yaw < -2.0 * Math.PI) {
      this.yaw += 2.0 * Math.PI;
    }
  }

  updateDistance(diff) {
    this.distance += diff;
    this.distance = clamp(this.distance, 0.1, 100.0);
  }

  getForward() {
    var diff = {
      x: this.currentLookAt.x - this.cam.position.x,
      y: this.currentLookAt.y - this.cam.position.y,
      z: this.currentLookAt.z - this.cam.position.z,
    };
    diff.y = 0;
    var mag = Math.sqrt(diff.x * diff.x + diff.z * diff.z);
    diff.x /= mag;
    diff.z /= mag;
    return diff;
  }
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
    this.aspect = aspect;
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
    this.cam.top = 0.5 * this.size;
    this.cam.bottom = -0.5 * this.size;
    this.cam.updateProjectionMatrix();
  }

  updateDistance(diff) {
    this.distance += diff;
    this.distance = clamp(this.distance, 0.1, 100.0);

    this.size += diff;
    this.size = clamp(this.size, 0.1, 100.0);

    this.update(this.aspect);
  }
}
//-----------------------------------------------

//! Camera Functions
//-----------------------------------------------
//-----------------------------------------------

export { PerspectiveCam, OrthographicCam };
//---------------------------------------------------------------
