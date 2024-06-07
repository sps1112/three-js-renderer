//! LOADER
//---------------------------------------------------------------
//! Loader Dependencies
//-----------------------------------------------
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
//-----------------------------------------------

//! Loader Variables
//-----------------------------------------------
var loadingManager;
var textureLoader;
var rgbeLoader;
var fontLoader;
//-----------------------------------------------

//! Loader Functions
//-----------------------------------------------
function setupLoaders() {
  loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("Start to load asset.");
  };
  loadingManager.onProgress = () => {
    console.log("Loading asset...");
  };
  loadingManager.onLoad = () => {
    console.log("Loaded Assets Succesfully!");
  };
  loadingManager.onError = () => {
    console.log("Error!!! Asset could not be loaded.");
  };

  textureLoader = new THREE.TextureLoader(loadingManager);
  rgbeLoader = new RGBELoader(loadingManager);
  fontLoader = new FontLoader(loadingManager);
}
//-----------------------------------------------

export { setupLoaders, textureLoader, rgbeLoader, fontLoader };
//---------------------------------------------------------------
