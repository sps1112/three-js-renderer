//! FONT
//---------------------------------------------------------------
//! Font Dependencies
//-----------------------------------------------
import { fontLoader } from "../utils/loader";
import { setupTextGeometry } from "./geometry";
import { setupTextMesh } from "../scene/mesh";
//-----------------------------------------------

//! Font Variables
//-----------------------------------------------
//-----------------------------------------------

//! Font Functions
//-----------------------------------------------
function loadFont(path, text) {
  fontLoader.load(path, (font) => {
    setupTextGeometry(text, font);
    setupTextMesh();
  });
}
//-----------------------------------------------

export { loadFont };
//---------------------------------------------------------------
