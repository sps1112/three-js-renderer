//! FONT
//---------------------------------------------------------------
//! Font Dependencies
//-----------------------------------------------
import { fontLoader } from "../utils/loader";
//-----------------------------------------------

//! Font Variables
//-----------------------------------------------
class Font {
  constructor(path) {
    this.path = path;
    this.font = null;
    this.loaded = false;
    this.callbacks = [];

    fontLoader.load(path, (font) => {
      this.font = font;
      this.loaded = true;
      this.callbacks.forEach((callback) => callback());
    });
  }

  setCallback(callback) {
    this.callbacks.push(callback);
  }
}

var fonts = [];
//-----------------------------------------------

//! Font Functions
//-----------------------------------------------
function loadFont(path) {
  fonts.push(new Font(path));
}
//-----------------------------------------------

export { fonts, loadFont };
//---------------------------------------------------------------
