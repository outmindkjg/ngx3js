import { Component } from '@angular/core';
import { Object3D, Vector2 } from 'three';
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier';
import { BaseComponent, MeshComponent, RendererEvent, RendererTimer } from '../../three';
import { ControlComponent } from '../../three/control/control.component';

@Component({
  selector: 'app-webgl-modifier-curve-instanced',
  templateUrl: './webgl-modifier-curve-instanced.component.html',
  styleUrls: ['./webgl-modifier-curve-instanced.component.scss']
})
export class WebglModifierCurveInstancedComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  initialPoints1 : {x : number, y : number, z : number }[] = [
    { x: 1, y: -0.5, z: - 1 },
    { x: 1, y: -0.5, z: 1 },
    { x: - 1, y: -0.5, z: 1 },
    { x: - 1, y: -0.5, z: - 1 },
  ];

  curvePath1 : {x : number, y : number, z : number }[] = this.initialPoints1;

  initialPoints2 : {x : number, y : number, z : number }[] = [
    { x: - 1, y: 0.5, z: - 1 },
    { x: - 1, y: 0.5, z: 1 },
    { x: 1, y: 0.5, z: 1 },
    { x: 1, y: 0.5, z: - 1 },
  ];

  curvePath2 : {x : number, y : number, z : number }[] = this.initialPoints2;

  setFlow1(mesh : MeshComponent) {
    mesh.getObject3d();
    this.flow1 = mesh.getStorageSource();
  }

  flow1 : Flow = null;

  setFlow2(mesh : MeshComponent) {
    mesh.getObject3d();
    this.flow1 = mesh.getStorageSource();
  }

  flow2 : Flow = null;

  onUpPosition = new Vector2();
  onDownPosition = new Vector2();

  orbitControl : ControlComponent = null;
  setOrbitControl(orbitControl : ControlComponent) {
    this.orbitControl = orbitControl;
  }

  transformControl : ControlComponent = null;
  setTransformControl(transformControl : ControlComponent) {
    this.transformControl = transformControl;
  }


  setTransformEventListener(event : { type : string, event : any}) {
    if (this.orbitControl !== null) {
      switch(event.type) {
        case 'dragging-changed' :
          const controls = this.orbitControl.getControl();
          controls.enabled = ! event.event.value;
          break;
        case 'objectChange' :
          const curvePath1 : {x : number , y : number , z : number}[] = [];
          this.pointMesh1.forEach(mesh => {
            const position = mesh.position;
            curvePath1.push({
              x : position.x,
              y : position.y,
              z : position.z
            });
          });
          this.curvePath1 = curvePath1;

          const curvePath2 : {x : number , y : number , z : number}[] = [];
          this.pointMesh2.forEach(mesh => {
            const position = mesh.position;
            curvePath2.push({
              x : position.x,
              y : position.y,
              z : position.z
            });
          });
          this.curvePath2 = curvePath2;
          break;
      }
    }
  }

  setPointMesh1(mesh : MeshComponent) {
    this.pointMesh1.push(mesh.getObject3d());
  }

  pointMesh1 : Object3D[] = [];

  setPointMesh2(mesh : MeshComponent) {
    this.pointMesh2.push(mesh.getObject3d());
  }

  pointMesh2 : Object3D[] = [];

  setEventListener(event : RendererEvent) {
    switch(event.type) {
      case 'pointerdown' :
				this.onDownPosition.x = event.offsetX;
				this.onDownPosition.y = event.offsetY;
        break;
      case 'pointerup' :
        this.onUpPosition.x = event.offsetX;
        this.onUpPosition.y = event.offsetY;
				if (this.transformControl !== null && this.onDownPosition.distanceTo( this.onUpPosition ) === 0 ) {
          const transformControl = this.transformControl.getControl();
          transformControl.detach();
        }
        break;
      case 'pointermove' :
        if (this.camera !== null && this.transformControl !== null) {
          const intersect = this.camera.getIntersection(event.mouse, [...this.pointMesh1,...this.pointMesh2]);
          if ( intersect !== null ) {
            const object = intersect.object;
            const transformControl = this.transformControl.getControl();
            if ( object !== transformControl.object ) {
              transformControl.attach( object );
            }
          }
        }
        break;
      default :
        break;
    }
  }  

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.flow1 !== null) {
      // this.flow.moveAlongCurve(0.001);
    } 
    if (this.flow2 !== null) {
      // this.flow.moveAlongCurve(0.001);
    } 
  }

}
