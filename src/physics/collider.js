//! COLLIDER
//---------------------------------------------------------------
//! Collider Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
import { world } from "./physics";
import { Mesh } from "../scene/mesh";
//-----------------------------------------------

//! Collider Variables
//-----------------------------------------------
var COLLIDER_TYPES = {
  BOX: 0,
  PLANE: 1,
  SPHERE: 2,
  TORUS: 3,
  CAPSULE: 4,
  CYLINDER: 5,
};

class Collider3D {
  constructor(type, scale, offset, rigidbody) {
    this.type = type;
    this.scale = scale;
    this.offset = offset;
    this.rigidbody = rigidbody;
    this.setup();
  }

  setup() {
    switch (this.type) {
      case COLLIDER_TYPES.BOX:
        this.shape = RAPIER.ColliderDesc.cuboid(
          0.5 * this.scale.x,
          0.5 * this.scale.y,
          0.5 * this.scale.z
        ).setTranslation(this.offset.x, this.offset.y, this.offset.z);
        break;

      case COLLIDER_TYPES.PLANE:
        this.shape = RAPIER.ColliderDesc.cuboid(
          2.5 * this.scale.x,
          0.05 * this.scale.y,
          2.5 * this.scale.z
        ).setTranslation(this.offset.x, this.offset.y, this.offset.z);
        break;

      case COLLIDER_TYPES.SPHERE:
        this.shape = RAPIER.ColliderDesc.ball(this.scale.x).setTranslation(
          this.offset.x,
          this.offset.y,
          this.offset.z
        );
        break;

      case COLLIDER_TYPES.TORUS:
        this.shape = RAPIER.ColliderDesc.cylinder(
          this.scale.y * 0.25,
          this.scale.x * 1.25
        ).setTranslation(this.offset.x, this.offset.y, this.offset.z);
        break;

      case COLLIDER_TYPES.CAPSULE:
        this.shape = RAPIER.ColliderDesc.capsule(
          this.scale.y * 0.5,
          this.scale.x * 0.5
        ).setTranslation(this.offset.x, this.offset.y, this.offset.z);
        break;

      case COLLIDER_TYPES.CYLINDER:
        this.shape = RAPIER.ColliderDesc.cylinder(
          this.scale.y,
          this.scale.x
        ).setTranslation(this.offset.x, this.offset.y, this.offset.z);
        break;

      default:
        break;
    }
    if (this.rigidbody == null) {
      this.collider = world.createCollider(this.shape);
    } else {
      this.collider = world.createCollider(this.shape, this.rigidbody);
    }
  }
}
//-----------------------------------------------

//! Collider Functions
//-----------------------------------------------
//-----------------------------------------------

export { COLLIDER_TYPES, Collider3D };
//---------------------------------------------------------------
