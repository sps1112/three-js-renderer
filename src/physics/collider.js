//! COLLIDER
//---------------------------------------------------------------
//! Collider Dependencies
//-----------------------------------------------
import * as RAPIER from "@dimforge/rapier3d";
import { world } from "./physics";
import { Mesh } from "../scene/mesh";
import { GEOMETRY_TYPES, Geometry } from "../rendering/geometry";
import { MATERIAL_TYPES, Material } from "../rendering/material";
import { CapsuleGeometry } from "three";
import { addMesh } from "../scene/scene";
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
  CONE: 6,
};

class Collider3D {
  constructor(type, shapeProps, rigidbody, render) {
    this.type = type;
    this.shapeProps = shapeProps;
    this.rigidbody = rigidbody;
    this.render = render;
  }

  setup(props) {
    this.restitution = props.restitution;
    this.scale = this.shapeProps.scale;

    switch (this.type) {
      case COLLIDER_TYPES.BOX:
        this.shape = RAPIER.ColliderDesc.cuboid(
          0.5 * this.scale.x,
          0.5 * this.scale.y,
          0.5 * this.scale.z
        );
        break;

      case COLLIDER_TYPES.PLANE:
        this.shape = RAPIER.ColliderDesc.cuboid(
          2.5 * this.scale.x,
          0.05 * this.scale.y,
          2.5 * this.scale.z
        );
        break;

      case COLLIDER_TYPES.SPHERE:
        this.shape = RAPIER.ColliderDesc.ball(this.scale.x);
        break;

      case COLLIDER_TYPES.TORUS:
        this.shape = RAPIER.ColliderDesc.cylinder(
          this.scale.y * 0.25,
          this.scale.x * 1.25
        );
        break;

      case COLLIDER_TYPES.CAPSULE:
        this.shape = RAPIER.ColliderDesc.capsule(
          this.scale.y * 0.5,
          this.scale.x * 0.5
        );
        break;

      case COLLIDER_TYPES.CYLINDER:
        this.shape = RAPIER.ColliderDesc.cylinder(this.scale.y, this.scale.x);
        break;

      case COLLIDER_TYPES.CONE:
        this.shape = RAPIER.ColliderDesc.cone(this.scale.y, this.scale.x);
        break;

      default:
        break;
    }

    // Set the shape with the properties
    this.shape
      .setTranslation(
        this.shapeProps.offset.x,
        this.shapeProps.offset.y,
        this.shapeProps.offset.z
      )
      .setRestitution(this.restitution * 2.0);

    // Create the collider and add to the world
    if (this.rigidbody == null) {
      this.collider = world.createCollider(this.shape);
    } else {
      this.collider = world.createCollider(this.shape, this.rigidbody);
    }
  }

  renderCollider(renderProps) {
    var targetPos = renderProps.position;
    var targetRot = renderProps.rotation;
    var subdivisions = renderProps.subdivisions;
    switch (this.type) {
      case COLLIDER_TYPES.BOX:
        this.mesh = new Mesh(
          new Geometry(GEOMETRY_TYPES.CUBE, 1),
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [1.005 * this.scale.x, 1.005 * this.scale.y, 1.005 * this.scale.z]
        );
        break;

      case COLLIDER_TYPES.PLANE:
        this.mesh = new Mesh(
          new Geometry(GEOMETRY_TYPES.CUBE, 1),
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [5.005 * this.scale.x, 0.05 * this.scale.y, 5.005 * this.scale.z]
        );
        break;

      case COLLIDER_TYPES.SPHERE:
        this.mesh = new Mesh(
          new Geometry(GEOMETRY_TYPES.SPHERE, subdivisions),
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [1.01 * this.scale.x, 1.01 * this.scale.x, 1.01 * this.scale.x]
        );
        break;

      case COLLIDER_TYPES.TORUS:
        this.mesh = new Mesh(
          new Geometry(GEOMETRY_TYPES.CYLINDER, subdivisions),
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [1.251 * this.scale.x, 0.251 * this.scale.y, 1.251 * this.scale.x]
        );
        break;

      case COLLIDER_TYPES.CAPSULE:
        var geo = new Geometry(GEOMETRY_TYPES.CAPSULE, subdivisions);
        geo.geometry = new CapsuleGeometry(
          0.5,
          1 * this.scale.y,
          subdivisions,
          subdivisions
        );
        this.mesh = new Mesh(
          geo,
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [1.01 * this.scale.x, 1.01, 1.01 * this.scale.x]
        );
        break;

      case COLLIDER_TYPES.CYLINDER:
        this.mesh = new Mesh(
          new Geometry(GEOMETRY_TYPES.CYLINDER, subdivisions),
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [1.01 * this.scale.x, 1.01 * this.scale.y, 1.01 * this.scale.x]
        );
        break;

      case COLLIDER_TYPES.CONE:
        this.mesh = new Mesh(
          new Geometry(GEOMETRY_TYPES.CONE, subdivisions),
          new Material(MATERIAL_TYPES.COLLIDER, 0xffffff),
          [targetPos.x, targetPos.y, targetPos.z],
          [targetRot.x, targetRot.y, targetRot.z],
          [1.01 * this.scale.x, 1.01 * this.scale.y, 1.01 * this.scale.x]
        );
        break;

      default:
        break;
    }
    addMesh(this.mesh);
  }

  refreshMesh() {
    this.mesh.updatePosition([
      this.collider.translation().x,
      this.collider.translation().y,
      this.collider.translation().z,
    ]);

    this.mesh.updateQuaternion(this.collider.rotation());
  }
}
//-----------------------------------------------

//! Collider Functions
//-----------------------------------------------
//-----------------------------------------------

export { COLLIDER_TYPES, Collider3D };
//---------------------------------------------------------------
