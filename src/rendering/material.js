//! MATERIAL
//---------------------------------------------------------------
//! Material Dependencies
//-----------------------------------------------
import * as THREE from "three";
import * as TEXTURE from "../rendering/texture";
//-----------------------------------------------

//! Material Variables
//-----------------------------------------------
var MATERIAL_TYPES = {
  COLOR: 0,
  WIRE: 1,
  TEXTURE: 2,
  BLEND_TEXTURE: 3,
  NORMAL: 4,
  MATCAP: 5,
  DEPTH: 6,
  LAMBERT: 7,
  PHONG: 8,
  TOON: 9,
  LIT: 10,
  LIT_TEXTURE: 11,
  TEXT: 12,
  PHYSIC: 13,
};

class Material {
  constructor(type, color) {
    this.type = type;
    this.color = color;

    switch (this.type) {
      case MATERIAL_TYPES.COLOR:
        this.mat = new THREE.MeshBasicMaterial({ color: this.color });
        break;

      case MATERIAL_TYPES.WIRE:
        this.mat = new THREE.MeshBasicMaterial({
          color: this.color,
          wireframe: true,
        });
        break;

      case MATERIAL_TYPES.TEXTURE:
        this.mat = new THREE.MeshBasicMaterial({
          color: this.color,
          map: TEXTURE.minecraftTexture,
        });
        break;

      case MATERIAL_TYPES.BLEND_TEXTURE:
        this.mat = new THREE.MeshBasicMaterial({ color: this.color });
        this.mat.map = TEXTURE.colorTexture;
        this.mat.transparent = true;
        this.mat.alphaMap = TEXTURE.alphaTexture;
        this.mat.side = THREE.DoubleSide;
        break;

      case MATERIAL_TYPES.NORMAL:
        this.mat = new THREE.MeshNormalMaterial();
        this.mat.flatShading = true;
        break;

      case MATERIAL_TYPES.MATCAP:
        this.mat = new THREE.MeshMatcapMaterial();
        this.mat.matcap = TEXTURE.matcapTexture;
        break;

      case MATERIAL_TYPES.DEPTH:
        this.mat = new THREE.MeshDepthMaterial();
        break;

      case MATERIAL_TYPES.LAMBERT:
        this.mat = new THREE.MeshLambertMaterial({ color: this.color });
        break;

      case MATERIAL_TYPES.PHONG:
        this.mat = new THREE.MeshPhongMaterial({ color: this.color });
        this.mat.shininess = 100;
        this.specularColor = 0x0066ff;
        this.mat.specular.set(this.specularColor);
        break;

      case MATERIAL_TYPES.TOON:
        this.mat = new THREE.MeshToonMaterial({ color: this.color });
        this.mat.gradientMap = TEXTURE.gradTexture;
        break;

      case MATERIAL_TYPES.LIT:
        this.mat = new THREE.MeshStandardMaterial({ color: this.color });
        this.mat.metalness = 0.7;
        this.mat.roughness = 0.2;
        break;

      case MATERIAL_TYPES.LIT_TEXTURE:
        this.mat = new THREE.MeshStandardMaterial({ color: this.color });
        this.mat.map = TEXTURE.colorTexture;
        this.mat.transparent = true;
        this.mat.alphaMap = TEXTURE.alphaTexture;
        this.mat.side = THREE.DoubleSide;
        this.mat.aoMap = TEXTURE.occlusionTexture;
        this.mat.aoMapIntensity = 1.0;
        this.mat.displacementMap = TEXTURE.heightTexture;
        this.mat.displacementScale = 0.1;
        this.mat.metalnessMap = TEXTURE.metallicTexture;
        this.mat.metalness = 1.0;
        this.mat.roughnessMap = TEXTURE.roughnessTexture;
        this.mat.roughness = 1.0;
        this.normalX = 1.0;
        this.normalY = 1.0;
        this.mat.normalMap = TEXTURE.normalTexture;
        this.mat.normalScale.set(this.normalX, this.normalY);
        break;

      case MATERIAL_TYPES.TEXT:
        this.mat = new THREE.MeshMatcapMaterial();
        this.mat.matcap = TEXTURE.textTexture;
        break;

      case MATERIAL_TYPES.PHYSIC:
        this.mat = new THREE.MeshPhysicalMaterial({ color: this.color });
        this.mat.metalness = 0.7;
        this.mat.roughness = 0.2;
        this.mat.clearcoat = 0.5;
        break;

      default:
        break;
    }
  }
}
//-----------------------------------------------

//! Material Functions
//-----------------------------------------------
//-----------------------------------------------

export { MATERIAL_TYPES, Material };
//---------------------------------------------------------------
