//! MATERIAL
//---------------------------------------------------------------
//! Material Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { debugObject } from "../gui/gui";
import * as TEXTURE from "../rendering/texture";
//-----------------------------------------------

//! Material Variables
//-----------------------------------------------
// Define colors for the variables
debugObject.color1 = 0xdd000f;
debugObject.color2 = 0x0066ff;
debugObject.color3 = 0xffffff;
debugObject.color4 = 0xffffff;
debugObject.color5 = 0x00ff44;
debugObject.color6 = 0xffffff;

var matColor; // Color Material
var matWire; // Wireframe Material
var matTexture; // Texture Material
var matTextureComplex; // Complex Texture Material
var matNormal; // Normal Color Material
var matMatcap; // Mesh Matcap Material
var matDepth; // Mesh Depth Material
var matLambert; // Mesh Lambert Material
var matPhong; // Mesh Phong Material
debugObject.phongSpecular = 0x0066ff;
var matToon; // Mesh Toon Material
var matLit; // Mesh PBR Material
var matLitTex; // Mesh PBR Texture Material
var matText; // A matcap styled text material
//-----------------------------------------------

//! Material Functions
//-----------------------------------------------
function setupMaterials() {
  matColor = new THREE.MeshBasicMaterial({
    color: debugObject.color1,
  });

  matWire = new THREE.MeshBasicMaterial({
    color: debugObject.color2,
    wireframe: true,
  });

  matTexture = new THREE.MeshBasicMaterial({
    color: debugObject.color3,
    map: TEXTURE.minecraftTexture,
  });

  matTextureComplex = new THREE.MeshBasicMaterial({
    color: debugObject.color4,
  });
  matTextureComplex.map = TEXTURE.colorTexture;
  matTextureComplex.transparent = true;
  matTextureComplex.alphaMap = TEXTURE.alphaTexture;
  matTextureComplex.side = THREE.DoubleSide;

  matNormal = new THREE.MeshNormalMaterial();
  matNormal.flatShading = true;

  matMatcap = new THREE.MeshMatcapMaterial();
  matMatcap.matcap = TEXTURE.matcapTexture;

  matDepth = new THREE.MeshDepthMaterial();

  matLambert = new THREE.MeshLambertMaterial();

  matPhong = new THREE.MeshPhongMaterial();
  matPhong.shininess = 100;
  matPhong.specular.set(debugObject.phongSpecular);

  matToon = new THREE.MeshToonMaterial();
  matToon.gradientMap = TEXTURE.gradTexture;

  matLit = new THREE.MeshStandardMaterial({
    color: debugObject.color5,
  });
  matLit.metalness = 0.7;
  matLit.roughness = 0.2;

  matLitTex = new THREE.MeshStandardMaterial({
    color: debugObject.color6,
  });
  matLitTex.map = TEXTURE.colorTexture;
  matLitTex.transparent = true;
  matLitTex.alphaMap = TEXTURE.alphaTexture;
  matLitTex.side = THREE.DoubleSide;
  matLitTex.aoMap = TEXTURE.occlusionTexture;
  matLitTex.aoMapIntensity = 1.0;
  matLitTex.displacementMap = TEXTURE.heightTexture;
  matLitTex.displacementScale = 0.1;
  matLitTex.metalnessMap = TEXTURE.metallicTexture;
  matLitTex.metalness = 1.0;
  matLitTex.roughnessMap = TEXTURE.roughnessTexture;
  matLitTex.roughness = 1.0;
  debugObject.normalX = 1.0;
  debugObject.normalY = 1.0;
  matLitTex.normalMap = TEXTURE.normalTexture;
  matLitTex.normalScale.set(debugObject.normalX, debugObject.normalY);

  matText = new THREE.MeshMatcapMaterial();
  matText.matcap = TEXTURE.matcapTexture;
}
//-----------------------------------------------

export {
  setupMaterials,
  matColor,
  matWire,
  matTexture,
  matTextureComplex,
  matNormal,
  matMatcap,
  matDepth,
  matLambert,
  matPhong,
  matToon,
  matLit,
  matLitTex,
  matText,
};
//---------------------------------------------------------------
