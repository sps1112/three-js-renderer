//! TEXTURE
//---------------------------------------------------------------
//! Texture Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { textureLoader } from "../utils/loader";
//-----------------------------------------------

//! Texture Variables
//-----------------------------------------------
var colorTexture;
var alphaTexture;
var heightTexture;
var normalTexture;
var occlusionTexture;
var metallicTexture;
var roughnessTexture;
var minecraftTexture;
var matcapTexture;
var gradTexture;
var textTexture;
//-----------------------------------------------

//! Texture Functions
//-----------------------------------------------
function setupTextures() {
  colorTexture = textureLoader.load("textures/door/color.jpg");
  colorTexture.colorSpace = THREE.SRGBColorSpace;
  colorTexture.wrapS = THREE.MirroredRepeatWrapping;
  colorTexture.wrapT = THREE.MirroredRepeatWrapping;

  alphaTexture = textureLoader.load("textures/door/alpha.jpg");
  heightTexture = textureLoader.load("textures/door/height.jpg");
  normalTexture = textureLoader.load("textures/door/normal.jpg");
  occlusionTexture = textureLoader.load("textures/door/ambientOcclusion.jpg");
  metallicTexture = textureLoader.load("textures/door/metalness.jpg");
  roughnessTexture = textureLoader.load("textures/door/roughness.jpg");

  minecraftTexture = textureLoader.load("textures/minecraft.png");
  minecraftTexture.colorSpace = THREE.SRGBColorSpace;
  minecraftTexture.generateMipmaps = false;
  minecraftTexture.minFilter = THREE.NearestFilter;
  minecraftTexture.magFilter = THREE.NearestFilter;

  matcapTexture = textureLoader.load("textures/matcaps/5.png");
  matcapTexture.colorSpace = THREE.SRGBColorSpace;

  gradTexture = textureLoader.load("textures/gradients/5.jpg");
  gradTexture.generateMipmaps = false;
  gradTexture.minFilter = THREE.NearestFilter;
  gradTexture.magFilter = THREE.NearestFilter;

  textTexture = textureLoader.load("textures/matcaps/8.png");
  textTexture.colorSpace = THREE.SRGBColorSpace;
}
//-----------------------------------------------

export {
  setupTextures,
  colorTexture,
  alphaTexture,
  heightTexture,
  normalTexture,
  occlusionTexture,
  metallicTexture,
  roughnessTexture,
  minecraftTexture,
  matcapTexture,
  gradTexture,
  textTexture,
};
//---------------------------------------------------------------
