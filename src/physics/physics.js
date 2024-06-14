//! PHYSICS
//---------------------------------------------------------------
//! Physics Dependencies
//-----------------------------------------------
import RAPIER from "https://cdn.skypack.dev/@dimforge/rapier3d-compat";
import { GEOMETRY_TYPES, Geometry } from "../rendering/geometry";
import { MATERIAL_TYPES, Material } from "../rendering/material";
import { Mesh } from "../scene/mesh";
import { addMesh } from "../scene/scene";
//-----------------------------------------------

//! Physics Variables
//-----------------------------------------------
var world;
var gravity;
//-----------------------------------------------

//! Physics Functions
//-----------------------------------------------
async function loadRapier(callback) {
  console.log("Loading Rapier...");
  try {
    await RAPIER.init();
    console.log("Rapier loaded as:-");
    callback();
  } catch (error) {
    console.error("Error loading Rapier:", error);
  }
}

function setupPhysics() {
  console.log("Setting world as Rapier is loaded");
  gravity = { x: 0.0, y: -9.81, z: 0.0 };
  world = new RAPIER.World(gravity);
  console.log("Setup World complete");
}

function updatePhysics() {
  world.step();
}

function renderWorld() {
  const { vertices, colors } = world.debugRender();
  var debugGeo = new Geometry(GEOMETRY_TYPES.DEBUG, 1);
  debugGeo.setupDebug(vertices, colors);
  var mat = new Material(MATERIAL_TYPES.WIRE, 0xffffff);
  mat.mat.vertexColors = true;
  addMesh(
    new Mesh(
      debugGeo,
      mat,
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1 }
    )
  );
}
//-----------------------------------------------

export { RAPIER, loadRapier, world, setupPhysics, updatePhysics, renderWorld };
//---------------------------------------------------------------
