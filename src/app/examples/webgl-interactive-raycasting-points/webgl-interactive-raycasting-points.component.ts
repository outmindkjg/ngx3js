import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererEvent, RendererTimer } from '../../three';
import * as THREE from 'three';
import { CameraComponent } from '../../three/camera/camera.component';

@Component({
  selector: 'app-webgl-interactive-raycasting-points',
  templateUrl: './webgl-interactive-raycasting-points.component.html',
  styleUrls: ['./webgl-interactive-raycasting-points.component.scss']
})
export class WebglInteractiveRaycastingPointsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const width = 80;
    const length = 160;
    this.pointCloudInfo = this.generatePointCloudGeometry({ r : 1, g : 0, b : 0 }, width, length);
    this.indexedPointcloud = this.generatePointCloudGeometry({ r : 0, g : 1, b : 0 }, width, length);
    const numPoints = width * length;
    const indexedPointcloudIndices = new Uint16Array( numPoints );
    let k = 0;
    for ( let i = 0; i < width; i ++ ) {
      for ( let j = 0; j < length; j ++ ) {
        indexedPointcloudIndices[ k ] = k;
        k ++;
      }
    }
    this.indexedPointcloud.index = indexedPointcloudIndices;
    this.indexedWithOffsetPointcloud = this.generatePointCloudGeometry({ r : 1, g : 1, b : 1 }, width, length);
    const indexedWithOffsetPointcloudIndices = new Uint16Array( numPoints );
    k = 0;
    for ( let i = 0; i < width; i ++ ) {
      for ( let j = 0; j < length; j ++ ) {
        indexedWithOffsetPointcloudIndices[ k ] = k;
        k ++;
      }
    }
    this.indexedWithOffsetPointcloud.index = indexedWithOffsetPointcloudIndices;
    for(let i = 0 ; i < 140 ; i++) {
      this.sphereIndex.push(i);
    }
  }

  sphereIndex : number[] = [];
  pointCloudInfo : any = null; 
  indexedPointcloud : any = null; 
  indexedWithOffsetPointcloud : any = null; 

  generatePointCloudGeometry( color : { r : number, g : number, b : number}, width : number, length : number ) {
    const numPoints = width * length;
    const positions = new Float32Array( numPoints * 3 );
    const colors = new Float32Array( numPoints * 3 );
    let k = 0;
    for ( let i = 0; i < width; i ++ ) {
      for ( let j = 0; j < length; j ++ ) {
        const u = i / width;
        const v = j / length;
        const x = u - 0.5;
        const y = ( Math.cos( u * Math.PI * 4 ) + Math.sin( v * Math.PI * 8 ) ) / 20;
        const z = v - 0.5;
        positions[ 3 * k ] = x;
        positions[ 3 * k + 1 ] = y;
        positions[ 3 * k + 2 ] = z;
        const intensity = ( y + 0.1 ) * 5;
        colors[ 3 * k ] = color.r * intensity;
        colors[ 3 * k + 1 ] = color.g * intensity;
        colors[ 3 * k + 2 ] = color.b * intensity;
        k ++;
      }
    }
    return { position : positions, color : colors };
  }
  sphereMesh : THREE.Object3D = null;
  setSphere(mesh : MeshComponent) {
    this.sphereMesh = mesh.getObject3d();
    setTimeout(() => {
      this.spheres = this.sphereMesh.children;
    }, 1000);
  }

  meshChildren : THREE.Object3D[] = null;
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    setTimeout(() => {
      this.meshChildren = [];
      mesh.getObject3d().children.forEach(child => {
        this.meshChildren.push(child);
      });
    }, 1000);
  }

  setCamera(camera : CameraComponent) {
    super.setCamera(camera);
    const raycaster = camera.getRaycaster();
    raycaster.params.Points.threshold = 0.1;
  }

  toggle = 0;
  spheresIndex = 0;
  spheres : THREE.Object3D[] = null;

  onMouseMove(event : RendererEvent) {
    if (this.sphereMesh !== null && this.camera !== null && this.meshChildren !== null) {
      this.mouseEvent = event.mouse;
    }
  }

  mouseEvent : any = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.sphereMesh !== null && this.camera !== null && this.meshChildren !== null && this.mouseEvent !== null && this.spheres) {
      const intersection = this.camera.getIntersection(this.mouseEvent, this.meshChildren);
      if ( this.toggle > 0.06 && intersection !== null ) {
        const spheres = this.spheres;
        spheres[ this.spheresIndex ].position.copy( intersection.point );
        spheres[ this.spheresIndex ].scale.set( 1, 1, 1 );
        this.spheresIndex = ( this.spheresIndex + 1 ) % spheres.length;
        this.toggle = 0;
      }
      for ( let i = 0; i < this.spheres.length; i ++ ) {
        const sphere = this.spheres[ i ];
        sphere.scale.multiplyScalar( 0.995 );
        sphere.scale.clampScalar( 0.1, 1 );
      }
      this.toggle += timer.delta;
    }
  }
}
