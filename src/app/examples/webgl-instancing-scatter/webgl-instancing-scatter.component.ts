import { Component, ViewChild } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
			
@Component({
  selector: 'app-webgl-instancing-scatter',
  templateUrl: './webgl-instancing-scatter.component.html',
  styleUrls: ['./webgl-instancing-scatter.component.scss']
})
export class WebglInstancingScatterComponent extends BaseComponent<{
  count : number,
  distribution : string,
  resample : () => void
}> {

  @ViewChild('flower') flower : MeshComponent = null;

  constructor() {
    super({
      count : 1000,
      distribution : 'random',
      resample : () => {
        this.reSample();
      }
    },[
      { name : 'count', type : 'number', min : 0, max : 1000, change : () => {
        if (this.blossomMesh !== null && this.stemMesh !== null) {
          this.blossomMesh.count = this.controls.count;
          this.stemMesh.count = this.controls.count;
        }
      }},
      {name : 'distribution' , type : 'select', select : ['random', 'weighted'], change : () => {
        this.reSample();
      }},
      {name : 'resample' , type : 'button'},
    ]);
  }


  ngAfterViewInit() {
    if (this.flower !== null) {
      this.flower.meshSubscribe().subscribe(() => {
        this.setFlower(this.flower);
      });
      this.flower.getMesh();
    }
  }

  stemMaterial : THREE.Material  = null;
  blossomMaterial : THREE.Material = null;
  stemGeometry : THREE.InstancedBufferGeometry = null;
  blossomGeometry : THREE.InstancedBufferGeometry = null;

  setFlower(meshCom : MeshComponent) {
    const mesh = meshCom.getMesh();
    const _stemMesh = mesh.getObjectByName( 'Stem' ) as THREE.Mesh;
    const _blossomMesh = mesh.getObjectByName( 'Blossom' ) as THREE.Mesh;
    if (_stemMesh !== undefined && _blossomMesh !== undefined) {
      const stemGeometry = new THREE.InstancedBufferGeometry();
      const blossomGeometry = new THREE.InstancedBufferGeometry();
      THREE.BufferGeometry.prototype.copy.call( stemGeometry, _stemMesh.geometry );
      THREE.BufferGeometry.prototype.copy.call( blossomGeometry, _blossomMesh.geometry );
      const defaultTransform = new THREE.Matrix4()
        .makeRotationX( Math.PI )
        .multiply( new THREE.Matrix4().makeScale( 7, 7, 7 ) );
      stemGeometry.applyMatrix4( defaultTransform );
      blossomGeometry.applyMatrix4( defaultTransform );
      this.stemGeometry = stemGeometry;
      this.blossomGeometry = blossomGeometry;
      this.stemMaterial = _stemMesh.material as THREE.Material;
      this.blossomMaterial = _blossomMesh.material as THREE.Material;
      const count = this.controls.count;
      const _color = new THREE.Color();
      const color = new Float32Array( count * 3 );
      const blossomPalette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ];
      for ( let i = 0; i < count; i ++ ) {
        _color.setHex( blossomPalette[ Math.floor( Math.random() * blossomPalette.length ) ] );
        _color.toArray( color, i * 3 );
      }

      blossomGeometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( color, 3 ) );
      this.blossomMaterial.vertexColors = true;
      this.sampler = new MeshSurfaceSampler( this.surface )
      .setWeightAttribute( this.controls.distribution === 'weighted' ? 'uv' : null )
      .build();
      this.ages = new Float32Array( count );
      this.scales = new Float32Array( count );
    }
  }

  surface : THREE.Mesh = null;
  sampler : any = null;
  dummy = new THREE.Object3D();

  _position = new THREE.Vector3();
  _normal = new THREE.Vector3();
  _scale = new THREE.Vector3();

  ages : Float32Array;
  scales : Float32Array;
  stemMesh : THREE.InstancedMesh = null;
  blossomMesh : THREE.InstancedMesh = null;

  setStemMesh(mesh : MeshComponent) {
    this.stemMesh = mesh.getRealMesh() as THREE.InstancedMesh;
    this.reSample();
  }

  setBlossomMesh(mesh : MeshComponent) {
    this.blossomMesh = mesh.getRealMesh() as THREE.InstancedMesh;
    this.reSample();
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.surface = this.mesh.getRealMesh() as THREE.Mesh;
    this.reSample();
  }

  easeOutCubic( t ) {
    return ( -- t ) * t * t + 1;
  }

  // Scaling curve causes particles to grow quickly, ease gradually into full scale, then
  // disappear quickly. More of the particle's lifetime is spent around full scale.
  scaleCurve( t ) {
    return Math.abs( this.easeOutCubic( ( t > 0.5 ? 1 - t : t ) * 2 ) );
  }

  reSample() {
    if (this.stemMesh !== null && this.blossomMesh !== null && this.surface !== null) {
      const count = this.controls.count;
      const surface = this.surface;
      const vertexCount = this.surface.geometry.getAttribute( 'position' ).count;
      console.info( 'Sampling ' + count + ' points from a surface with ' + vertexCount + ' vertices...' );
      //

      console.time( '.build()' );

      this.sampler = new MeshSurfaceSampler( surface )
        .setWeightAttribute( this.controls.distribution === 'weighted' ? 'uv' : null )
        .build();

      console.timeEnd( '.build()' );
      console.time( '.sample()' );
      for ( let i = 0; i < count; i ++ ) {
        this.ages[ i ] = Math.random();
        this.scales[ i ] = this.scaleCurve( this.ages[ i ] );
        this.resampleParticle( i );
      }
      console.timeEnd( '.sample()' );
      this.stemMesh.instanceMatrix.needsUpdate = true;
      this.blossomMesh.instanceMatrix.needsUpdate = true;
    }
  }

  resampleParticle ( i ) {
    if (this.stemMesh !== null && this.blossomMesh !== null) {
      this.sampler.sample( this._position, this._normal );
      this._normal.add( this._position );

      this.dummy.position.copy( this._position );
      this.dummy.scale.set( this.scales[ i ], this.scales[ i ], this.scales[ i ] );
      this.dummy.lookAt( this._normal );
      this.dummy.updateMatrix();

      this.stemMesh.setMatrixAt( i, this.dummy.matrix );
      this.blossomMesh.setMatrixAt( i, this.dummy.matrix );
    }
  }

  updateParticle( i ) {
    this.ages[ i ] += 0.005;

    if ( this.ages[ i ] >= 1 ) {

      this.ages[ i ] = 0.001;
      this.scales[ i ] = this.scaleCurve( this.ages[ i ] );
      this.resampleParticle( i );
      return;
    }

    // Update scale.

    const prevScale = this.scales[ i ];
    this.scales[ i ] = this.scaleCurve( this.ages[ i ] );
    this._scale.set( this.scales[ i ] / prevScale, this.scales[ i ] / prevScale, this.scales[ i ] / prevScale );

    // Update transform.
    this.stemMesh.getMatrixAt( i, this.dummy.matrix );
    this.dummy.matrix.scale( this._scale );
    this.stemMesh.setMatrixAt( i, this.dummy.matrix );
    this.blossomMesh.setMatrixAt( i, this.dummy.matrix );
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if ( this.stemMesh && this.blossomMesh ) {
      for ( let i = 0; i < this.controls.count; i ++ ) {
        this.updateParticle( i );
      }
      this.stemMesh.instanceMatrix.needsUpdate = true;
      this.blossomMesh.instanceMatrix.needsUpdate = true;
    }
  }
}
