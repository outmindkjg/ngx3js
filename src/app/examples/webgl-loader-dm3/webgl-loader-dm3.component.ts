import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-loader-dm3',
  templateUrl: './webgl-loader-dm3.component.html',
  styleUrls: ['./webgl-loader-dm3.component.scss']
})
export class WebglLoaderDm3Component extends BaseComponent<{
  pointclouds : boolean;
  textdot : boolean;
  curves : boolean;
  brep : boolean;
  subd : boolean;
  lights : boolean;
}> {

  constructor() {
    super({
      pointclouds : false,
      textdot : false,
      curves : true,
      brep : true,
      subd : false,
      lights : false,
    },[
      { name : 'pointclouds', type : 'checkbox', change : () => {
        this.setMeshVisible('pointclouds', this.controls.pointclouds);
      }},
      { name : 'textdot', type : 'checkbox', change : () => {
        this.setMeshVisible('textdot', this.controls.textdot);
      }},
      { name : 'curves', type : 'checkbox', change : () => {
        this.setMeshVisible('curves', this.controls.curves);
      }},
      { name : 'brep', type : 'checkbox', change : () => {
        this.setMeshVisible('brep', this.controls.brep);
      }},
      { name : 'subd', type : 'checkbox', change : () => {
        this.setMeshVisible('subd', this.controls.subd);
      }},
      { name : 'lights', type : 'checkbox', change : () => {
        this.setMeshVisible('lights', this.controls.lights);
      }}
    ]);
  }

  setMeshVisible(name : string , visible : boolean) {
    if (this.loadedMesh !== null && this.loadedMesh !== undefined) {
      const layers = this.loadedMesh.userData.layers;
      this.loadedMesh.traverse( function ( child ) {
        if ( child.userData.hasOwnProperty( 'attributes' ) ) {
          if ( 'layerIndex' in child.userData.attributes ) {
            const layerName = layers[ child.userData.attributes.layerIndex ].name;
            if ( layerName === name ) {
              child.visible = visible;
            }
          }
        }
      })
    }
  }

  private loadedMesh : THREE.Mesh = null;
  
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.loadedMesh = mesh.getObject3d().children[0] as THREE.Mesh;
    console.log(this.loadedMesh);
  }
}
