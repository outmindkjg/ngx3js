import { Component, OnInit } from '@angular/core';
import { BaseComponent, MeshComponent, RendererEvent, ThreeUtil } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-decals',
  templateUrl: './webgl-decals.component.html',
  styleUrls: ['./webgl-decals.component.scss']
})
export class WebglDecalsComponent extends BaseComponent<{ minScale : number, maxScale : number, clear : () => void}> {

  constructor() {
    super({
      minScale : 10,
      maxScale : 20,
      clear : () => {
        this.decals = [];
      }
    },[
      { name : 'minScale', type : 'number', min : 1, max : 30 },
      { name : 'maxScale', type : 'number', min : 1, max : 30 },
      { name : 'clear', type : 'button' },
    ]);
  }

  eventListener = (event : RendererEvent) => {
    this.setEventListener(event);
  }

  private move : boolean = false;
  private underProcess : boolean = false;
  setEventListener( event : RendererEvent ) {
    if (this.camera !== null && !this.underProcess) {
      this.underProcess = true;
      switch(event.type) {
        case 'change' :
          this.move = true;
          break;
        case 'pointerdown' : 
          this.move = false;
          break;
        case 'pointerup' :
          if (this.move === false) {
            const intersection = this.checkIntersection(event.mouse);
            if (intersection !== null) {
              this.shoot(intersection);
            }
          }
          break;
        case 'pointermove' :
          //if ( event.event.isPrimary ) {
            this.checkIntersection(event.mouse);
          // }
          break;
      }
      this.underProcess = false;
    }
  }

  decals : {scale : number, color : number, orientation : any, position : any }[] = [];

  shoot(intersection : THREE.Intersection) {
    const position = new THREE.Vector3();
    const orientation =new THREE.Euler();
    position.copy( intersection.point );
    const mouseHelper = this.mouseHelper.getMesh();
    orientation.copy( mouseHelper.rotation );
    // if ( params.rotate ) orientation.z = Math.random() * 2 * Math.PI;
    const scale = this.controls.minScale + Math.random() * ( this.controls.maxScale - this.controls.minScale );
    this.decals.push( { scale : scale, color : Math.random() * 0xffffff, orientation : orientation, position : position } );
    console.log(this.decals);
  }

  checkIntersection( mouse : THREE.Vector2 ):THREE.Intersection {
    if ( ThreeUtil.isNull(this.mesh ) || ThreeUtil.isNull(this.camera )) return null;
    const intersection = this.camera.getIntersection(mouse, this.mesh.getMesh().children , true );
    if (intersection !== null && this.mouseHelper !== null) {
      const p = intersection.point;
      const mouseHelper = this.mouseHelper.getMesh();
      const mesh = this.mesh.getMesh();
      mouseHelper.position.copy( p );
      const n = intersection.face.normal.clone();
      n.transformDirection( mesh.matrixWorld );
      n.multiplyScalar( 10 );
      n.add( intersection.point );
      // intersection.normal.copy( intersects[ 0 ].face.normal );
      mouseHelper.lookAt( n );
      const line = this.mouseLine.getMesh().children[0] as THREE.Line;
      const positions = line.geometry.attributes.position;
      positions.setXYZ( 0, p.x, p.y, p.z );
      positions.setXYZ( 1, n.x, n.y, n.z );
      positions.needsUpdate = true;
      // intersection.intersects = true;
      // intersects.length = 0;
    } else {
      // console.log(mouse);
    }
    return intersection;
  }

  mouseHelper : MeshComponent = null;
  setMouseHelper(mouseHelper : MeshComponent) {
    this.mouseHelper = mouseHelper;
  }

  mouseLine : MeshComponent = null;
  setMouseLine(mouseLine : MeshComponent) {
    this.mouseLine = mouseLine;
  }

  
}
