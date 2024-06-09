//! GEOMETRY
//---------------------------------------------------------------
//! Geometry Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//-----------------------------------------------

//! Geometry Variables
//-----------------------------------------------
var GEOMETRY_TYPES = {
  RANDOM: 0,
  PLANE: 1,
  CUBE: 2,
  SPHERE: 3,
  TORUS: 4,
  CAPSULE: 5,
  CYLINDER: 6,
  CONE: 7,
  TEXT: 8,
};

class Geometry {
  constructor(type, subdivisions) {
    this.type = type;
    this.subdivisions = subdivisions;
    this.setup();
  }

  update() {
    this.geometry.dispose();
    this.setup();
    this.mesh.update();
  }

  setup() {
    switch (this.type) {
      case GEOMETRY_TYPES.RANDOM:
        const posArray = new Float32Array(this.subdivisions * 3 * 3);
        for (var i = 0; i < this.subdivisions * 3 * 3; i++) {
          posArray[i] = Math.random() - 0.5;
        }
        const posAttribute = new THREE.BufferAttribute(posArray, 3);
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute("position", posAttribute);
        break;

      case GEOMETRY_TYPES.PLANE:
        this.geometry = new THREE.PlaneGeometry(
          5.0,
          5.0,
          this.subdivisions,
          this.subdivisions
        );
        this.geometry.rotateX(-Math.PI / 2.0);
        break;

      case GEOMETRY_TYPES.CUBE:
        this.geometry = new THREE.BoxGeometry(
          1,
          1,
          1,
          this.subdivisions,
          this.subdivisions,
          this.subdivisions
        );
        break;

      case GEOMETRY_TYPES.SPHERE:
        this.geometry = new THREE.SphereGeometry(
          1,
          this.subdivisions,
          this.subdivisions
        );
        break;

      case GEOMETRY_TYPES.TORUS:
        this.geometry = new THREE.TorusGeometry(
          1.0,
          0.33,
          6 * this.subdivisions,
          6 * this.subdivisions
        );
        this.geometry.rotateX(Math.PI / 2.0);
        break;

      case GEOMETRY_TYPES.CAPSULE:
        this.geometry = new THREE.CapsuleGeometry(
          0.5,
          1.0,
          4 * this.subdivisions,
          4 * this.subdivisions
        );
        break;

      case GEOMETRY_TYPES.CYLINDER:
        this.geometry = new THREE.CylinderGeometry(
          1.0,
          1.0,
          2.0,
          this.subdivisions * 9.0,
          this.subdivisions
        );
        break;

      case GEOMETRY_TYPES.CONE:
        this.geometry = new THREE.ConeGeometry(
          1.0,
          2.0,
          this.subdivisions * 6,
          this.subdivisions
        );
        break;

      default:
        break;
    }
  }

  setMesh(mesh) {
    this.mesh = mesh;
  }
}

class GeometryText extends Geometry {
  constructor(subdivisions, text, font) {
    super(GEOMETRY_TYPES.TEXT, subdivisions);
    this.text = text;
    this.font = font;

    this.callback = () => {
      if (this.geometry) {
        this.geometry.dispose();
      }

      this.geometry = new TextGeometry(this.text, {
        font: this.font.font,
        size: 0.5,
        depth: 0.2,
        curveSegments: this.subdivisions,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: this.subdivisions,
      });
      this.geometry.center();

      this.mesh.update();
    };

    if (font.loaded) {
      this.update();
    } else {
      this.font.setCallback(this.callback);
    }
  }

  update() {
    this.callback();
  }
}
//-----------------------------------------------

//! Geometry Functions
//-----------------------------------------------
//-----------------------------------------------

export { GEOMETRY_TYPES, Geometry, GeometryText };
//---------------------------------------------------------------
