import { Component } from '@angular/core';
import { BaseComponent, GeometryComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-morphtargets',
  templateUrl: './webgl-morphtargets.component.html',
  styleUrls: ['./webgl-morphtargets.component.scss']
})
export class WebglMorphtargetsComponent extends BaseComponent<{
  spherify : number;
  twist : number;
  animation : boolean;
}> {

  constructor() {
    super({
      spherify : 0,
      twist : 0,
      animation : true
    },[
      { name : 'spherify', title : 'Spherify', type : 'number', listen : true, min : 0, max : 1, step : 0.01, finishChange : () => {
        this.setMorphTargetInfluences(this.controls.spherify, 0);
      }},
      { name : 'twist', title : 'Twist', type : 'number', listen : true, min : 0, max : 1, step : 0.01, finishChange : () => {
        this.setMorphTargetInfluences(this.controls.twist, 1);
      }},
      { name : 'animation', title : 'Animation', type : 'checkbox', change : () => {
        if (this.threeMesh !== null) {
          this.controls.spherify = this.threeMesh.morphTargetInfluences[0];
          this.controls.twist = this.threeMesh.morphTargetInfluences[1];
        }
      }}
    ]);
  }

  setMorphTargetInfluences(value, index) {
    if (this.threeMesh !== null && ! this.controls.animation) {
      this.threeMesh.morphTargetInfluences[index] = value;
    }
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const threeMesh = mesh.getObject3d() ;
    if (threeMesh instanceof THREE.Mesh) {
      this.threeMesh = threeMesh;
    }
  }

  setGeometry(geo : GeometryComponent) {
    const geometry = geo.getGeometry();
    if (geometry.attributes.position != undefined && geometry.attributes.position.count > 0) {
      geometry.morphAttributes.position = [];
      const positionAttribute = geometry.attributes.position;
      const spherePositions = [];
      const twistPositions = [];
      const direction = new THREE.Vector3( 1, 0, 0 );
      const vertex = new THREE.Vector3();
      for ( let i = 0; i < positionAttribute.count; i ++ ) {
        const x = positionAttribute.getX( i );
        const y = positionAttribute.getY( i );
        const z = positionAttribute.getZ( i );
        spherePositions.push(
          x * Math.sqrt( Math.abs(1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ))),
          y * Math.sqrt( Math.abs(1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ))),
          z * Math.sqrt( Math.abs(1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 )))
        );
        vertex.set( x * 2, y, z );
        vertex.applyAxisAngle( direction, Math.PI * x / 2 ).toArray( twistPositions, twistPositions.length );
      }
      geometry.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( spherePositions, 3 );
      geometry.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( twistPositions, 3 );
    }
  }


  threeMesh : THREE.Mesh = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.threeMesh !== null && this.controls.animation && this.threeMesh.morphTargetInfluences && this.threeMesh.morphTargetInfluences.length > 1) {
      const time = timer.elapsedTime;
      this.threeMesh.morphTargetInfluences[0] = 0.5 + Math.sin(time * 0.6) * 0.5;
      this.threeMesh.morphTargetInfluences[1] = 0.5 + Math.cos(time * 0.7) * 0.5;
    }
  }
}
