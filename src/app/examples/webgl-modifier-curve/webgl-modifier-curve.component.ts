import { Component } from '@angular/core';
import { Object3D, Vector2 } from 'three';
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier';
import { BaseComponent, MeshComponent, RendererEvent, RendererTimer } from '../../three';
import { ControlComponent } from '../../three/control/control.component';

@Component({
  selector: 'app-webgl-modifier-curve',
  templateUrl: './webgl-modifier-curve.component.html',
  styleUrls: ['./webgl-modifier-curve.component.scss']
})
export class WebglModifierCurveComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  initialPoints : {x : number, y : number, z : number }[] = [
    { x: 1, y: 0, z: - 1 },
    { x: 1, y: 0, z: 1 },
    { x: - 1, y: 0, z: 1 },
    { x: - 1, y: 0, z: - 1 },
  ];

  curvePath : {x : number, y : number, z : number }[] = this.initialPoints;

  setFlow(mesh : MeshComponent) {
    mesh.getObject3d();
    this.flow = mesh.getStorageSource();
  }

  flow : Flow = null;

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
          const curvePath : {x : number , y : number , z : number}[] = [];
          this.pointMesh.forEach(mesh => {
            const position = mesh.position;
            curvePath.push({
              x : position.x,
              y : position.y,
              z : position.z
            });
          });
          this.curvePath = curvePath;
          break;
      }
    }
  }

  setPointMesh(mesh : MeshComponent) {
    this.pointMesh.push(mesh.getObject3d());
  }

  pointMesh : Object3D[] = [];


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
          const intersect = this.camera.getIntersection(event.mouse, this.pointMesh);
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
    if (this.flow !== null) {
      // this.flow.moveAlongCurve(0.001);
    } 
  }

}
