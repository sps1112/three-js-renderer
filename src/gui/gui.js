//! GUI
//---------------------------------------------------------------
//! Gui Dependencies
//-----------------------------------------------
import GUI from "lil-gui";
import { canvasSize } from "../rendering/renderer";
//-----------------------------------------------

//! Gui Variables
//-----------------------------------------------
var gui;
//-----------------------------------------------

//! Gui Functions
//-----------------------------------------------
function setupGUI() {
  gui = new GUI({
    title: "Scene Properties",
    width: canvasSize.width / 4.0,
    closeFolders: true,
  });
  // gui.close();
  // gui.hide();
  window.addEventListener("keydown", (event) => {
    if (event.key == "h") {
      gui.show(gui._hidden);
    }
  });
}
//-----------------------------------------------

export { gui, setupGUI };
//---------------------------------------------------------------
