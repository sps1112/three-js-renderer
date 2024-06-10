//! WIDGET
//---------------------------------------------------------------
//! Widget Dependencies
//-----------------------------------------------
import { gui } from "./gui";
import { env, lights, meshes, updateEnvironment } from "../scene/scene";
import { LIGHT_TYPES } from "../scene/light";
import { lightHelpers } from "../utils/helpers";
import { MATERIAL_TYPES } from "../rendering/material";
import { camera } from "../rendering/renderer";
import { world } from "../physics/physics";
import { wakeWorld } from "../physics/simulation";
//-----------------------------------------------

//! Widget Variables
//-----------------------------------------------
var lightGUI;
var lightFolders = [];

var objectGUI;
var objectFolders = [];

var sceneGUI;
var sceneFolder = [];
var sceneControllers = [];
//-----------------------------------------------

//! Widget Functions
//-----------------------------------------------
function setAmbientGUI(parent, light) {
  parent
    .addColor(light, "color")
    .name("Color")
    .onChange((value) => {
      light.refresh(value);
    });

  parent
    .add(light.light, "intensity")
    .name("Intensity")
    .min(0)
    .max(5)
    .step(0.1);
  lightFolders.push(parent);
}

function setPointGUI(parent, light, index) {
  parent.add(light.light.position, "x").name("X").min(-10).max(10).step(0.1);
  parent.add(light.light.position, "y").name("Y").min(-10).max(10).step(0.1);
  parent.add(light.light.position, "z").name("Z").min(-10).max(10).step(0.1);
  parent
    .addColor(light, "color")
    .name("Color")
    .onChange((value) => {
      light.refresh(value);
      if (lightHelpers.length > 0) {
        lightHelpers[index - 1].color = value;
        lightHelpers[index - 1].update();
      }
    });
  parent
    .add(light.light, "intensity")
    .name("Intensity")
    .min(0)
    .max(100)
    .step(0.5);
  lightFolders.push(parent);
}

function setupLightGUI() {
  lightGUI = gui.addFolder("Lights");

  var aCount = 0;
  var pCount = 0;
  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];
    var parent;

    if (light.type == LIGHT_TYPES.AMBIENT) {
      aCount++;
      parent = lightGUI.addFolder("AmbientLight #" + aCount);
      setAmbientGUI(parent, light);
    } else if (light.type == LIGHT_TYPES.POINT) {
      pCount++;
      parent = lightGUI.addFolder("PointLight #" + pCount);
      setPointGUI(parent, light, pCount);
    }
    lightFolders.push(parent);
  }
}

function setMeshGUI(parent, mesh) {
  var uiController = [];

  var pos = parent.addFolder("Position");
  uiController.push(
    pos.add(mesh.mesh.position, "x").name("X").min(-10).max(10).step(0.1)
  );
  uiController.push(
    pos.add(mesh.mesh.position, "y").name("Y").min(-10).max(10).step(0.1)
  );
  uiController.push(
    pos.add(mesh.mesh.position, "z").name("Z").min(-10).max(10).step(0.1)
  );

  var rot = parent.addFolder("Rotation");
  uiController.push(
    rot
      .add(mesh.mesh.rotation, "x")
      .name("X")
      .min(-Math.PI / 2.0)
      .max(Math.PI / 2.0)
      .step(0.1)
  );
  uiController.push(
    rot
      .add(mesh.mesh.rotation, "y")
      .name("Y")
      .min(-Math.PI / 2.0)
      .max(Math.PI / 2.0)
      .step(0.1)
  );
  uiController.push(
    rot
      .add(mesh.mesh.rotation, "z")
      .name("Z")
      .min(-Math.PI / 2.0)
      .max(Math.PI / 2.0)
      .step(0.1)
  );

  var scale = parent.addFolder("Scale");
  uiController.push(
    scale.add(mesh.mesh.scale, "x").name("X").min(-10).max(10).step(0.1)
  );
  uiController.push(
    scale.add(mesh.mesh.scale, "y").name("Y").min(-10).max(10).step(0.1)
  );
  uiController.push(
    scale.add(mesh.mesh.scale, "z").name("Z").min(-10).max(10).step(0.1)
  );

  parent.add(mesh, "resetTransform").name("Reset Transform");
  parent.add(mesh.mesh, "visible").name("Visibility");
  mesh.setGUI(uiController);
}

function setGeometryGUI(parent, geometry) {
  parent
    .add(geometry, "subdivisions")
    .name("Subdivisions")
    .min(1)
    .max(100)
    .step(1)
    .onChange((value) => {
      geometry.update();
    });
}

function setMaterialGUI(parent, mat) {
  switch (mat.type) {
    case MATERIAL_TYPES.COLOR:
    case MATERIAL_TYPES.WIRE:
    case MATERIAL_TYPES.TEXTURE:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      break;

    case MATERIAL_TYPES.BLEND_TEXTURE:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "transparent")
        .name("Transparent")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      break;

    case MATERIAL_TYPES.NORMAL:
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      break;

    case MATERIAL_TYPES.MATCAP:
    case MATERIAL_TYPES.TEXT:
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      break;

    case MATERIAL_TYPES.DEPTH:
      parent.add(mat.mat, "wireframe").name("Wireframe");
      break;

    case MATERIAL_TYPES.LAMBERT:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      break;

    case MATERIAL_TYPES.PHONG:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      parent
        .addColor(mat, "specularColor")
        .name("Specular")
        .onChange((value) => {
          mat.mat.specular.set(value);
        });
      parent
        .add(mat.mat, "shininess")
        .name("Shininess")
        .min(0)
        .max(512)
        .step(2);
      break;

    case MATERIAL_TYPES.TOON:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      break;

    case MATERIAL_TYPES.LIT:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      parent
        .add(mat.mat, "metalness")
        .name("Metalness")
        .min(0)
        .max(1)
        .step(0.01);
      parent
        .add(mat.mat, "roughness")
        .name("Roughness")
        .min(0)
        .max(1)
        .step(0.01);
      break;

    case MATERIAL_TYPES.LIT_TEXTURE:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "transparent")
        .name("Transparent")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      parent
        .add(mat.mat, "aoMapIntensity")
        .name("AO Intensity")
        .min(0)
        .max(2)
        .step(0.01);
      parent
        .add(mat.mat, "displacementScale")
        .name("Height")
        .min(0)
        .max(2)
        .step(0.01);
      parent
        .add(mat.mat, "metalness")
        .name("Metalness")
        .min(0)
        .max(2)
        .step(0.01);
      parent
        .add(mat.mat, "roughness")
        .name("Roughness")
        .min(0)
        .max(2)
        .step(0.01);
      parent
        .add(mat, "normalX")
        .name("Normal X")
        .min(0)
        .max(2)
        .step(0.01)
        .onChange((value) => {
          mat.mat.normalScale.set(value, mat.normalY);
        });
      parent
        .add(mat, "normalY")
        .name("Normal Y")
        .min(0)
        .max(2)
        .step(0.01)
        .onChange((value) => {
          mat.mat.normalScale.set(mat.normalX, value);
        });
      break;

    case MATERIAL_TYPES.PHYSIC:
      parent
        .addColor(mat, "color")
        .name("Color")
        .onChange((value) => {
          mat.mat.color.set(value);
        });
      parent.add(mat.mat, "wireframe").name("Wireframe");
      parent
        .add(mat.mat, "flatShading")
        .name("FlatShading")
        .onChange(() => {
          mat.mat.needsUpdate = true;
        });
      parent
        .add(mat.mat, "metalness")
        .name("Metalness")
        .min(0)
        .max(1)
        .step(0.01);
      parent
        .add(mat.mat, "roughness")
        .name("Roughness")
        .min(0)
        .max(1)
        .step(0.01);
      parent
        .add(mat.mat, "clearcoat")
        .name("Clearcoat")
        .min(0)
        .max(1)
        .step(0.01);
      break;

    default:
      break;
  }
}

function setupObjectsGUI() {
  objectGUI = gui.addFolder("Objects");

  for (var i = 0; i < meshes.length; i++) {
    var mesh = meshes[i];
    var folder = objectGUI.addFolder("Mesh #" + (i + 1));
    setMeshGUI(folder, mesh); // Send Mesh Class
    setGeometryGUI(folder, mesh.geometry); // Send Geomtery Class
    setMaterialGUI(folder, mesh.material); // Send Material Class
    objectFolders.push(folder);
  }
}

function setSceneGUI() {
  sceneGUI = gui.addFolder("Scene");
  sceneGUI
    .add(env, "render")
    .name("Render Background")
    .onChange(() => updateEnvironment());
  sceneGUI
    .add(env, "light")
    .name("Light with Background")
    .onChange(() => updateEnvironment());

  var cameraGUI = sceneGUI.addFolder("Camera");
  sceneControllers.push(
    cameraGUI
      .add(camera, "distance")
      .name("Distance")
      .min(0.1)
      .max(30)
      .step(0.1)
  );
  sceneControllers.push(
    cameraGUI
      .add(camera, "dampness")
      .name("Dampness")
      .min(0.0)
      .max(0.2)
      .step(0.001)
  );
  sceneFolder.push(cameraGUI);

  if (world) {
    var physicsGUI = sceneGUI.addFolder("Physics");
    physicsGUI
      .add(world.gravity, "y")
      .name("Gravity")
      .min(-10.0)
      .max(10.0)
      .step(0.01)
      .onChange((value) => {
        wakeWorld();
      });
  }
  sceneFolder.push(physicsGUI);
}

function updateSceneGUI() {
  sceneControllers.forEach((controller) => controller.updateDisplay());
}
//-----------------------------------------------

export { setupObjectsGUI, setupLightGUI, setSceneGUI, updateSceneGUI };
//---------------------------------------------------------------
