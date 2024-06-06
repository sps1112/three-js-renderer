//! WIDGET
//---------------------------------------------------------------
//! Widget Dependencies
//-----------------------------------------------
import { gui, debugObject } from "./gui";
import * as MATERIAL from "../rendering/material";
import * as MESH from "../scene/mesh";
import { lights } from "../scene/scene";
import { LIGHT_TYPES } from "../scene/light";
import { lightHelpers } from "../utils/helpers";
//-----------------------------------------------

//! Widget Variables
//-----------------------------------------------
var lightGUI;
var ambientGUI = null;
var pointGUI = null;

var objectGUI;
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

function setupObjectsGUI() {
  objectGUI = gui.addFolder("Objects");
  objectGUI.add(MESH.ran, "visible").name("Random Geometry Visibility");
  objectGUI
    .addColor(debugObject, "color1")
    .name("Color Material's Color")
    .onChange((value) => {
      MATERIAL.matColor.color.set(value);
    });
  objectGUI
    .addColor(debugObject, "color2")
    .name("Wireframe Material's Color")
    .onChange((value) => {
      MATERIAL.matWire.color.set(value);
    });
  objectGUI
    .addColor(debugObject, "color3")
    .name("Texture Material's Color")
    .onChange((value) => {
      MATERIAL.matTexture.color.set(value);
    });
  objectGUI
    .add(MATERIAL.matTexture, "wireframe")
    .name("Texture Material's Wireframe");
  objectGUI
    .addColor(debugObject, "color4")
    .name("ComplexTex Material's Color")
    .onChange((value) => {
      MATERIAL.matTextureComplex.color.set(value);
    });
  objectGUI
    .add(MATERIAL.matTextureComplex, "wireframe")
    .name("ComplexTex Material's Wireframe");
  objectGUI
    .addColor(debugObject, "phongSpecular")
    .name("Phong Material's Specular")
    .onChange((value) => {
      MATERIAL.matPhong.specular.set(value);
    });
  objectGUI
    .add(MATERIAL.matPhong, "shininess")
    .name("Phong Material's Shininess")
    .min(0)
    .max(512)
    .step(2);
  objectGUI
    .add(debugObject, "sphereSubdivisions")
    .name("Sphere Subdivisions")
    .min(2)
    .max(72)
    .step(1)
    .onChange((value) => {
      MESH.sphere.geometry.dispose();
      MESH.sphere.geometry = new THREE.SphereGeometry(1, value, value);
    });
  objectGUI
    .addColor(debugObject, "color5")
    .name("Lit Material's Color")
    .onChange((value) => {
      MATERIAL.matLit.color.set(value);
    });
  objectGUI
    .add(MATERIAL.matLit, "metalness")
    .name("Lit Material's Metalness")
    .min(0)
    .max(1)
    .step(0.01);
  objectGUI
    .add(MATERIAL.matLit, "roughness")
    .name("Lit Material's Roughness")
    .min(0)
    .max(1)
    .step(0.01);
  objectGUI.add(MATERIAL.matLit, "wireframe").name("Lit Material's Wireframe");
  objectGUI
    .add(MATERIAL.matLit, "flatShading")
    .name("Lit Material's FlatShading")
    .onChange(() => {
      MATERIAL.matLit.needsUpdate = true;
    });

  objectGUI
    .addColor(debugObject, "color6")
    .name("LitTex Material's Color")
    .onChange((value) => {
      MATERIAL.matLitTex.color.set(value);
    });
  objectGUI
    .add(MATERIAL.matLitTex, "aoMapIntensity")
    .name("LitTex Material's AO Intensity")
    .min(0)
    .max(2)
    .step(0.01);
  objectGUI
    .add(MATERIAL.matLitTex, "displacementScale")
    .name("LitTex Material's Height")
    .min(0)
    .max(2)
    .step(0.01);
  objectGUI
    .add(MATERIAL.matLitTex, "metalness")
    .name("LitTex Material's Metalness")
    .min(0)
    .max(2)
    .step(0.01);
  objectGUI
    .add(MATERIAL.matLitTex, "roughness")
    .name("LitTex Material's Roughness")
    .min(0)
    .max(2)
    .step(0.01);
  objectGUI
    .add(debugObject, "normalX")
    .name("LitTex Material's NormalX")
    .min(0)
    .max(2)
    .step(0.01)
    .onChange((value) => {
      MATERIAL.matLitTex.normalScale.set(value, debugObject.normalY);
    });
  objectGUI
    .add(debugObject, "normalY")
    .name("LitTex Material's NormalY")
    .min(0)
    .max(2)
    .step(0.01)
    .onChange((value) => {
      MATERIAL.matLitTex.normalScale.set(debugObject.normalX, value);
    });
  objectGUI
    .add(MATERIAL.matLitTex, "wireframe")
    .name("LitTex Material's Wireframe");
  objectGUI
    .add(MATERIAL.matLitTex, "flatShading")
    .name("LitTex Material's FlatShading")
    .onChange(() => {
      MATERIAL.matLitTex.needsUpdate = true;
    });
}

function setupMiscGUI() {}
//-----------------------------------------------

export { setupObjectsGUI, setupLightGUI };
//---------------------------------------------------------------
