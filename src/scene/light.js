//! LIGHT
//---------------------------------------------------------------
//! Light Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Light Variables
//-----------------------------------------------
var LIGHT_TYPES = {
  NONE: 0,
  AMBIENT: 1,
  POINT: 2,
};

class Light {
  constructor(type, color) {
    this.type = type;
    this.color = color;
    this.light = null;
  }

  refresh(color) {
    this.color = color;
    this.light.color.set(color);
  }
}

class AmbientLight extends Light {
  constructor(color, intensity) {
    super(LIGHT_TYPES.AMBIENT, color);
    this.light = new THREE.AmbientLight(color, intensity);
  }
}

class PointLight extends Light {
  constructor(color, intensity, range, pos) {
    super(LIGHT_TYPES.POINT, color);
    this.light = new THREE.PointLight(color, intensity, range);
    this.light.position.set(pos[0], pos[1], pos[2]);
  }
}
//-----------------------------------------------

//! Light Functions
//-----------------------------------------------

//-----------------------------------------------
export { LIGHT_TYPES, AmbientLight, PointLight };
//---------------------------------------------------------------
