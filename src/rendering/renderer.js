//! RENDERER
//---------------------------------------------------------------
//! Renderer Dependencies
//-----------------------------------------------
import * as THREE from "three";
//-----------------------------------------------

//! Renderer Variables
//-----------------------------------------------
class Timer {
  constructor() {
    this.clock = new THREE.Clock();
    this.prevTime = this.clock.getElapsedTime();
    this.currTime = this.prevTime;
    this.deltaTime = 0;
  }

  update() {
    this.currTime = this.clock.getElapsedTime();
    this.deltaTime = this.currTime - this.prevTime;
    this.prevTime = this.currTime;
  }
}
//-----------------------------------------------

//! Renderer Functions
//-----------------------------------------------
//-----------------------------------------------

export { Timer };
//---------------------------------------------------------------
