//! WIDGET
//---------------------------------------------------------------
//! Widget Dependencies
//-----------------------------------------------
import { gui } from "./gui";
import { lights, meshes } from "../scene/scene";
import { LIGHT_TYPES } from "../scene/light";
import { lightHelpers } from "../utils/helpers";
import { MATERIAL_TYPES } from "../rendering/material";
//-----------------------------------------------

//! Widget Variables
//-----------------------------------------------
var lightGUI;
var ambientGUI = null;
var pointGUI = null;

var objectGUI;
var objectFolders = [];
//-----------------------------------------------

//! Widget Functions
//-----------------------------------------------
function setAmbientGUI(index, light) {
  if (ambientGUI == null) {
    ambientGUI = lightGUI.addFolder("Ambient");
  }
  ambientGUI
    .addColor(light, "color")
    .name("Ambient " + index + " Color")
    .onChange((value) => {
      light.refresh(value);
    });

  ambientGUI
    .add(light.light, "intensity")
    .name("Ambient " + index + " Intensity")
    .min(0)
    .max(5)
    .step(0.1);
}

function setPointGUI(index, light) {
  if (pointGUI == null) {
    pointGUI = lightGUI.addFolder("Point");
  }
  pointGUI
    .add(light.light.position, "x")
    .name("Light " + index + " X")
    .min(-10)
    .max(10)
    .step(0.1);
  pointGUI
    .add(light.light.position, "y")
    .name("Light " + index + " Y")
    .min(-10)
    .max(10)
    .step(0.1);
  pointGUI
    .add(light.light.position, "z")
    .name("Light " + index + " Z")
    .min(-10)
    .max(10)
    .step(0.1);
  pointGUI
    .addColor(light, "color")
    .name("Diffuse " + index + " Color")
    .onChange((value) => {
      light.refresh(value);
      if (lightHelpers.length > 0) {
        lightHelpers[index - 1].color = value;
        lightHelpers[index - 1].update();
      }
    });
  pointGUI
    .add(light.light, "intensity")
    .name("Diffuse " + index + " Intensity")
    .min(0)
    .max(100)
    .step(0.5);
}

function setupLightGUI() {
  lightGUI = gui.addFolder("Lights");

  var aCount = 0;
  var pCount = 0;
  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];

    if (light.type == LIGHT_TYPES.AMBIENT) {
      aCount++;
      setAmbientGUI(aCount, light);
    } else if (light.type == LIGHT_TYPES.POINT) {
      pCount++;
      setPointGUI(pCount, light);
    }
  }
}

function setMeshGUI(parent, mesh) {
  console.log(mesh);

  parent.add(mesh.mesh, "visible").name("Visibility");
}

function setGeometryGUI(parent, geometry) {
  console.log(geometry);

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
  console.log(mat);

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

function setupMiscGUI() {}
//-----------------------------------------------

export { setupObjectsGUI, setupLightGUI };
//---------------------------------------------------------------
