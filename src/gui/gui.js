//! GUI
//---------------------------------------------------------------
//! Gui Dependencies
//-----------------------------------------------
import GUI from "lil-gui";
//-----------------------------------------------

//! Gui Variables
//-----------------------------------------------
var gui;
var debugObject = {};
//-----------------------------------------------

//! Gui Functions
//-----------------------------------------------
function setupGUI(size) {
  gui = new GUI({
    title: "Scene Properties",
    width: size,
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

export { gui, debugObject, setupGUI };
//---------------------------------------------------------------
