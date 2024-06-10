//! MODEl
//---------------------------------------------------------------
//! Model Dependencies
//-----------------------------------------------
import { gltfLoader } from "../utils/loader";
//-----------------------------------------------

//! Model Variables
//-----------------------------------------------
class Model {
  constructor(path) {
    this.path = path;
    this.model = null;
    this.loaded = false;
    this.callbacks = [];

    gltfLoader.load(path, (model) => {
      this.model = model.scene;
      this.loaded = true;
      this.callbacks.forEach((callback) => callback(this.model));
    });
  }

  setCallback(callback) {
    this.callbacks.push(callback);
  }
}

var models = [];
//-----------------------------------------------

//! Font Functions
//-----------------------------------------------
function loadModel(path) {
  models.push(new Model(path));
}
//-----------------------------------------------

export { models, loadModel };
//---------------------------------------------------------------
