import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, BufferGeometryUtils, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-custom-attributes-points3',
  templateUrl: './webgl-custom-attributes-points3.component.html',
  styleUrls: ['./webgl-custom-attributes-points3.component.scss']
})
export class WebglCustomAttributesPoints3Component extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }



  vertices1 :  number = 0;

  ngOnInit() {
    let radius = 100;

    let vertices1 = this.vertices1;
    const inner = 0.6 * radius;
    const vertex = this.vertex;
    this.vertices = [];
    const vertices = this.vertices;
    for ( let i = 0; i < 100000; i ++ ) {

      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.multiplyScalar( radius );

      if ( ( vertex.x > inner || vertex.x < - inner ) ||
        ( vertex.y > inner || vertex.y < - inner ) ||
        ( vertex.z > inner || vertex.z < - inner ) )

        vertices.push( vertex.x, vertex.y, vertex.z );

    }

    this.vertices1 = vertices1 = vertices.length / 3;

    radius = 200;

    let boxGeometry1 : any = new THREE.BoxGeometry( radius, 0.1 * radius, 0.1 * radius, 50, 5, 5 );

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

    boxGeometry1.deleteAttribute( 'normal' );
    boxGeometry1.deleteAttribute( 'uv' );

    boxGeometry1 = BufferGeometryUtils.mergeVertices( boxGeometry1 );

    // side 1

    this.addGeo( boxGeometry1, 0, 110, 110, 0 );
    this.addGeo( boxGeometry1, 0, 110, - 110, 0 );
    this.addGeo( boxGeometry1, 0, - 110, 110, 0 );
    this.addGeo( boxGeometry1, 0, - 110, - 110, 0 );

    // side 2
    this.addGeo( boxGeometry1, 110, 110, 0, Math.PI / 2 );
    this.addGeo( boxGeometry1, 110, - 110, 0, Math.PI / 2 );
    this.addGeo( boxGeometry1, - 110, 110, 0, Math.PI / 2 );
    this.addGeo( boxGeometry1, - 110, - 110, 0, Math.PI / 2 );

    // corner edges
    let boxGeometry2 : any = new THREE.BoxGeometry( 0.1 * radius, radius * 1.2, 0.1 * radius, 5, 60, 5 );

    boxGeometry2.deleteAttribute( 'normal' );
    boxGeometry2.deleteAttribute( 'uv' );

    boxGeometry2 = BufferGeometryUtils.mergeVertices( boxGeometry2 );

    this.addGeo( boxGeometry2, 110, 0, 110, 0 );
    this.addGeo( boxGeometry2, 110, 0, - 110, 0 );
    this.addGeo( boxGeometry2, - 110, 0, 110, 0 );
    this.addGeo( boxGeometry2, - 110, 0, - 110, 0 );

    const positionAttribute = new THREE.Float32BufferAttribute( vertices, 3 );

    const colors = [];
    const sizes = [];

    const color = new THREE.Color();

    for ( let i = 0; i < positionAttribute.count; i ++ ) {

      if ( i < vertices1 ) {

        color.setHSL( 0.5 + 0.2 * ( i / vertices1 ), 1, 0.5 );

      } else {

        color.setHSL( 0.1, 1, 0.5 );

      }

      color.toArray( colors, i * 3 );

      sizes[ i ] = i < vertices1 ? 10 : 40;

    }
    this.sizes = sizes;
    this.colors = colors;    
  }

  matrix = new THREE.Matrix4();
  position = new THREE.Vector3();
  rotation = new THREE.Euler();
  quaternion = new THREE.Quaternion();
  scale = new THREE.Vector3( 1, 1, 1 );
  vertex = new THREE.Vector3();

  addGeo( geo, x, y, z, ry ) {
    const position = this.position;
    const rotation = this.rotation;
    const matrix = this.matrix;
    const quaternion = this.quaternion;
    const scale = this.scale;
    const vertex = this.vertex;
    position.set( x, y, z );
    rotation.set( 0, ry, 0 );
    matrix.compose( position, quaternion.setFromEuler( rotation ), scale );
    const positionAttribute = geo.getAttribute( 'position' );
    for ( var i = 0, l = positionAttribute.count; i < l; i ++ ) {
      vertex.fromBufferAttribute( positionAttribute, i );
      vertex.applyMatrix4( matrix );
      this.vertices.push( vertex.x, vertex.y, vertex.z );
    }
  }

  vertices : number[] = null;
  colors : number[] = null;
  sizes : number[] = null;

  object3d : THREE.Object3D = null;
  geometry : THREE.BufferGeometry = null;
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.object3d = mesh.getObject3d();
    const geometry:THREE.BufferGeometry = (this.object3d as any).geometry;
    if (geometry !== null && geometry.getAttribute('position') !== undefined) {
      this.geometry = geometry;
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.object3d !== null && this.geometry !== null) {
      const time = timer.elapsedTime * 10;
      this.object3d.rotation.y = this.object3d.rotation.z = 0.02 * time;
      const geometry = this.geometry;
      const attributesSize = geometry.attributes.size as any;
      for ( let i = 0; i < attributesSize.array.length; i ++ ) {
        if ( i < this.vertices1 ) {
          attributesSize.array[ i ] = Math.max( 0, 26 + 32 * Math.sin( 0.1 * i + 0.6 * time ) );
        }
      }
      attributesSize.needsUpdate = true;
    }
  }  

}
