//! GUI
//---------------------------------------------------------------
//! Gui Dependencies
//-----------------------------------------------
import GUI from "lil-gui";
import { canvasSize } from "../rendering/renderer";
import { checkKeyDown } from "../utils/controls";
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
  gui.close();
  // gui.hide();
}

function updateGUI() {
  if (checkKeyDown("h")) {
    gui.show(gui._hidden);
  }
}
//-----------------------------------------------

export { gui, setupGUI, updateGUI };
//---------------------------------------------------------------
