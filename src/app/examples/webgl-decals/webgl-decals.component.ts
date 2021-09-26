import { Component, OnInit } from '@angular/core';
import { BaseComponent, MeshComponent, RendererEvent, ThreeUtil, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-decals',
  templateUrl: './webgl-decals.component.html',
  styleUrls: ['./webgl-decals.component.scss']
})
export class WebglDecalsComponent extends BaseComponent<{ rotate : boolean ,minScale : number, maxScale : number, clear : () => void}> {

  constructor() {
    super({
      rotate : true,
      minScale : 10,
      maxScale : 20,
      clear : () => {
        this.decals = [];
      }
    },[
      { name : 'minScale', type : 'number', min : 1, max : 30 },
      { name : 'maxScale', type : 'number', min : 1, max : 30 },
      { name : 'rotate', type : 'checkbox' },
      { name : 'clear', type : 'button' },
    ]);
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
          if ( event.event.isPrimary ) {
            this.checkIntersection(event.mouse);
          }
          break;
      }
      this.underProcess = false;
    }
  }

  decals : {scale : number, color : number, orientation : any, position : any }[] = [];

  shoot(intersection : THREE.Intersection) {
    if (ThreeUtil.isNull(intersection)) {
      return ;
    }
    const position = new THREE.Vector3();
    const orientation =new THREE.Euler();
    position.copy( intersection.point );
    const mouseHelper = this.mouseHelper.getObject3d();
    orientation.copy( mouseHelper.rotation );
    if ( this.controls.rotate ) orientation.z = Math.random() * 2 * Math.PI;
    const scale = this.controls.minScale + Math.random() * ( this.controls.maxScale - this.controls.minScale );
    this.decals.push( { scale : scale, color : Math.random() * 0xffffff, orientation : {
      x : orientation.x / Math.PI * 180,
      y : orientation.y / Math.PI * 180,
      z : orientation.z / Math.PI * 180,
    }, position : position } );
  }

  checkIntersection( mouse : THREE.Vector2 ):THREE.Intersection {
    if ( ThreeUtil.isNull(this.mesh) || ThreeUtil.isNull(this.camera )) return null;
    const intersection = this.camera.getIntersection(mouse, this.mesh.getObject3d() , true );
    if (intersection !== null && this.mouseHelper !== null) {
      const p = intersection.point;
      const mouseHelper = this.mouseHelper.getObject3d();
      const mesh = this.mesh.getObject3d();
      mouseHelper.position.copy( p );
      const n = intersection.face.normal.clone();
      n.transformDirection( mesh.matrixWorld );
      n.multiplyScalar( 10 );
      n.add( intersection.point );
      // intersection.normal.copy( intersects[ 0 ].face.normal );
      mouseHelper.lookAt( n );
      const line = this.mouseLine.getObject3d() as THREE.Line;
      if (ThreeUtil.isNull(line)) {
        return ;
      }
      const positions = line.geometry.attributes.position;
      positions.setXYZ( 0, p.x, p.y, p.z );
      positions.setXYZ( 1, n.x, n.y, n.z );
      positions.needsUpdate = true;
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
