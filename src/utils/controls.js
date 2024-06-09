//! CONTROLS
//---------------------------------------------------------------
//! Controls Dependencies
//-----------------------------------------------
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//-----------------------------------------------

//! Controls Variables
//-----------------------------------------------
var controls;
var keys = {};
var mouse = {
  left: false,
  right: false,
  middle: false,
  cursor: { x: 0.0, y: 0.0 },
  diff: { x: 0.0, y: 0.0 },
  moving: false,
  scroll: 0.0,
  lDown: false,
  lUp: false,
  mDown: false,
  mUp: false,
  rDown: false,
  rUp: false,
};
var mouseSensitivity = 2.0;
var canvasSize;
//-----------------------------------------------

//! Controls Functions
//-----------------------------------------------
function startInput() {
  window.addEventListener("keydown", (event) => {
    setKey(event.key, true);
  });
  window.addEventListener("keyup", (event) => {
    setKey(event.key, false);
  });
  document.addEventListener("mousedown", onMouseDown, false);
  document.addEventListener("wheel", onMouseScroll, false);
}

function setupOrbitalControls(camera, canvas, lookAt) {
  controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;
  // controls.enablePan = false;
  controls.target.y = lookAt.position.y;
  updateControls();
}

function updateControls(size) {
  canvasSize = size;
  updateKeys();
  // controls.update();
}

function setKey(key, status) {
  if (status) {
    if (keys[key]) {
      if (keys[key].status) {
        keys[key] = {
          status: true,
          down: false,
          press: true,
          up: false,
        };
      } else {
        keys[key] = {
          status: true,
          down: true,
          press: true,
          up: false,
        };
      }
    } else {
      keys[key] = {
        status: true,
        down: true,
        press: true,
        up: false,
      };
    }
  } else {
    if (keys[key].status) {
      keys[key] = {
        status: false,
        down: false,
        press: false,
        up: true,
      };
    }
  }
}

function updateKeys() {
  for (const key in keys) {
    if (keys[key].up) {
      keys[key].up = false;
    }
    if (keys[key].down) {
      keys[key].down = false;
    }
  }
  mouse.scroll = 0.0;
  mouse.lDown = false;
  mouse.mDown = false;
  mouse.rDown = false;
  mouse.lUp = false;
  mouse.mUp = false;
  mouse.rUp = false;
  mouse.diff = { x: 0.0, y: 0.0 };
}

function checkKey(key) {
  if (keys[key]) {
    return keys[key].press;
  }
  return false;
}

function checkKeyDown(key) {
  if (keys[key]) {
    return keys[key].down;
  }
  return false;
}

function checkKeyUp(key) {
  if (keys[key]) {
    return keys[key].up;
  }
  return false;
}

function logMouse() {
  // console.log(mouse.left + " " + mouse.middle + " " + mouse.right);
  console.log(mouse.cursor.x + " " + mouse.cursor.y);
  // console.log(mouse.scroll);
  // console.log(mouse.rDown + " " + mouse.right + " " + mouse.rUp);
}

function onMouseDown(event) {
  document.addEventListener("mouseup", onMouseUp, false);
  switch (event.button) {
    case 0:
      mouse.left = true;
      mouse.lDown = true;
      break;
    case 1:
      mouse.middle = true;
      mouse.mDown = true;
      break;
    case 2:
      mouse.right = true;
      mouse.rDown = true;
      break;
    default:
      break;
  }
  if (mouse.left || mouse.right) {
    if (!mouse.moving) {
      document.addEventListener("mousemove", onMouseMove, false);
      mouse.moving = true;
      mouse.cursor.x = 2.0 * (event.clientX / canvasSize.width - 0.5);
      mouse.cursor.y =
        2.0 * ((canvasSize.height - event.clientY) / canvasSize.height - 0.5);
      mouse.diff = {
        x: 0.0,
        y: 0.0,
      };
    }
  }
}

function onMouseMove(event) {
  // console.log("valid move");

  var newCursor = {
    x: 2.0 * (event.clientX / canvasSize.width - 0.5),
    y: 2.0 * ((canvasSize.height - event.clientY) / canvasSize.height - 0.5),
  };
  mouse.diff.x = mouseSensitivity * 100 * (newCursor.x - mouse.cursor.x);
  mouse.diff.y = mouseSensitivity * 100 * (newCursor.y - mouse.cursor.y);
  mouse.cursor.x = newCursor.x;
  mouse.cursor.y = newCursor.y;
}

function onMouseUp(event) {
  switch (event.button) {
    case 0:
      mouse.left = false;
      mouse.lUp = true;
      break;
    case 1:
      mouse.middle = false;
      mouse.mUp = true;
      break;
    case 2:
      mouse.right = false;
      mouse.rUp = true;
      break;
    default:
      break;
  }
  if (!mouse.left && !mouse.right) {
    mouse.moving = false;
    document.removeEventListener("mousemove", onMouseMove, false);
    mouse.diff = {
      x: 0.0,
      y: 0.0,
    };
    if (!mouse.middle) {
      document.removeEventListener("mouseup", onMouseUp, false);
    }
  }
}

function onMouseScroll(event) {
  mouse.scroll = event.deltaY;
}

function checkMouseButton(button) {
  switch (button) {
    case 0:
      return mouse.left;
      break;
    case 1:
      return mouse.middle;
      break;
    case 2:
      return mouse.right;
      break;
    default:
      return false;
      break;
  }
}

function checkMouseButtonDown(button) {
  switch (button) {
    case 0:
      return mouse.lDown;
      break;
    case 1:
      return mouse.mDown;
      break;
    case 2:
      return mouse.rDown;
      break;
    default:
      return false;
      break;
  }
}

function checkMouseButtonUp(button) {
  switch (button) {
    case 0:
      return mouse.lUp;
      break;
    case 1:
      return mouse.mUp;
      break;
    case 2:
      return mouse.rUp;
      break;
    default:
      return false;
      break;
  }
}

function checkMouseMove() {
  return mouse.diff;
}

function checkMouseScroll() {
  return mouse.scroll;
}
//-----------------------------------------------
export {
  setupOrbitalControls,
  startInput,
  updateControls,
  checkKey,
  checkKeyDown,
  checkKeyUp,
  logMouse,
  checkMouseButton,
  checkMouseButtonDown,
  checkMouseButtonUp,
  checkMouseMove,
  checkMouseScroll,
};
//---------------------------------------------------------------
