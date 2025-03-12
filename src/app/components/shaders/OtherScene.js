import * as THREE from "three";
import { REVISION } from "three";
export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();
    this.container = options.dom;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
  }
}
