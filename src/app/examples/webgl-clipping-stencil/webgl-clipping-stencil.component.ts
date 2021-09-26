import { Component } from '@angular/core';
import { BaseComponent, HelperComponent, PlaneComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-clipping-stencil',
  templateUrl: './webgl-clipping-stencil.component.html',
  styleUrls: ['./webgl-clipping-stencil.component.scss']
})
export class WebglClippingStencilComponent extends BaseComponent<{
  animate: boolean,
  planeX: {
    constant: number,
    negated: boolean,
    displayHelper: boolean
  },
  planeY: {
    constant: number,
    negated: boolean,
    displayHelper: boolean
  },
  planeZ: {
    constant: number,
    negated: false,
    displayHelper: false
  }
}> {

  constructor() {
    super({
      animate: true,
      planeX: {
        constant: 0,
        negated: false,
        displayHelper: false
      },
      planeY: {
        constant: 0,
        negated: false,
        displayHelper: false
      },
      planeZ: {
        constant: 0,
        negated: false,
        displayHelper: false
      }
    },[
      { name : 'animate', title : 'Animate', type : 'checkbox'},
      { name : 'Plane X', control : 'planeX', type : 'folder', children : [
        { name : 'displayHelper', title : 'DisplayHelper', type : 'checkbox', change : () => {
          this.displayHelper('X', this.controls.planeX.displayHelper);
        }},
        { name : 'constant', title : 'Constant', type : 'number', listen : true, min : -1, max : 1, step : 0.01, finishChange : () => {
          this.constantHelper('X', this.controls.planeX.constant);
        }},
        { name : 'negated', title : 'Negated', type : 'checkbox', change : () => {
          this.controls.planeX.constant = this.negatedHelper('X');
        }}
      ], isOpen : true},
      { name : 'Plane Y', control : 'planeY', type : 'folder', children : [
        { name : 'displayHelper', title : 'DisplayHelper', type : 'checkbox', change : () => {
          this.displayHelper('Y', this.controls.planeY.displayHelper);
        }},
        { name : 'constant', title : 'Constant', type : 'number', listen : true, min : -1, max : 1, step : 0.01, finishChange : () => {
          this.constantHelper('Y', this.controls.planeY.constant);
        }},
        { name : 'negated', title : 'Negated', type : 'checkbox', change : () => {
          this.controls.planeY.constant = this.negatedHelper('Y');
        }}
      ], isOpen : true},
      { name : 'Plane Z', control : 'planeZ', type : 'folder', children : [
        { name : 'displayHelper', title : 'DisplayHelper', type : 'checkbox', change : () => {
          this.displayHelper('Z', this.controls.planeZ.displayHelper);
        }},
        { name : 'constant', title : 'Constant', type : 'number', listen : true, min : -1, max : 1, step : 0.01, finishChange : () => {
          this.constantHelper('Z', this.controls.planeZ.constant);
        }},
        { name : 'negated', title : 'Negated', type : 'checkbox', change : () => {
          this.controls.planeZ.constant = this.negatedHelper('Z');
        }}
      ], isOpen : true},
      
    ]);
  }

  constantHelper(axis : string, value : number) {
    if (this.localHelper !== null) {
      let helper : THREE.PlaneHelper = this.getAxisHelper(axis);
      if (helper !== null) {
        helper.plane.constant = value;
      }
    }
  }

  negatedHelper(axis : string) : number {
    if (this.localHelper !== null) {
      let helper : THREE.PlaneHelper = this.getAxisHelper(axis);
      if (helper !== null) {
        helper.plane.negate();
        return helper.plane.constant;
      }
    }
    return 0;
  }

  displayHelper(axis : string, visible : boolean) {
    if (this.localHelper !== null) {
      let helper : THREE.PlaneHelper = this.getAxisHelper(axis);
      if (helper !== null) {
        helper.visible = visible;
      }
    }
  }

  getAxisHelper(axis: string) : THREE.PlaneHelper {
    let helper : THREE.PlaneHelper = null;
    let x = 0, y = 0, z = 0;
    switch(axis) {
      case 'X' :
        x = -1;
        break;
      case 'Y' :
        y = -1;
        break;
      case 'Z' :
        z = -1;
        break;
    }
    const helperGroup = this.localHelper.getHelper();
    helperGroup.children.forEach(child => {
      const childHelper = child as THREE.PlaneHelper;
      const plane = childHelper.plane.normal;
      if (Math.abs(plane.x) == Math.abs(x) && Math.abs(plane.y) == Math.abs(y) && Math.abs(plane.z) == Math.abs(z)) {
        helper = childHelper;
      }
    });
    return helper;
  }

  localHelper: HelperComponent = null;
  setLocalHelper(localHelper: HelperComponent) {
    this.localHelper = localHelper;
    const helperGroup = this.localHelper.getHelper();
    helperGroup.visible = true;
    helperGroup.children.forEach(child => {
      child.visible = false;
    });
  }

  localPlane: PlaneComponent[] = [];
  setLocalPlane(localPlane: PlaneComponent) {
    if (this.localPlane.indexOf(localPlane) === -1) {
      this.localPlane.push(localPlane);
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null && !this.controls.meshRotate.autoRotate && this.controls.animate) {
      this.mesh.addRotation(
        timer.delta * 9,
        timer.delta * 4,
        0
      );
    }
  }

}
