import { Component } from '@angular/core';
import { Object3D, Scene } from 'three';
import { BaseComponent } from '../../three';
import { LocalStorageService } from '../../three/local-storage.service';

@Component({
  selector: 'app-misc-exporter-gltf',
  templateUrl: './misc-exporter-gltf.component.html',
  styleUrls: ['./misc-exporter-gltf.component.scss']
})
export class MiscExporterGltfComponent extends BaseComponent<{
  scene1 : () => void,
  scenes : () => void,
  object : () => void,
  waltHead : () => void,
  objects : () => void,
  scene_object : () => void,
  trs : boolean,
  onlyVisible : boolean,
  truncateDrawRange : boolean,
  binary : boolean,
  maxTextureSize : number
}> {

  constructor( private localStorageService : LocalStorageService ) {
    super({
      scene1 : () => {
        this.exportGLTF('scene1')
      },
      scenes : () => {
        this.exportGLTF(['scene1','scene2'])
      },
      object : () => {
        this.exportGLTF(['sphere'])
      },
      waltHead : () => {
        this.exportGLTF(['waltHead'])
      },
      objects : () => {
        this.exportGLTF(['sphere','gridHelper'])
      },
      scene_object : () => {
        this.exportGLTF(['scene1','gridHelper'])
      },
      trs : false,
      onlyVisible : true,
      truncateDrawRange : true,
      binary : false,
      maxTextureSize : 4096
    },[
      { name : 'scene1', type : 'button'},
      { name : 'scenes', type : 'button'},
      { name : 'object', type : 'button'},
      { name : 'waltHead', type : 'button'},
      { name : 'objects', type : 'button'},
      { name : 'scene_object', type : 'button'},
      { name : 'trs', title : 'TRS', type : 'checkbox'},
      { name : 'onlyVisible', title : 'Only Visible', type : 'checkbox'},
      { name : 'truncateDrawRange', title : 'Truncate drawRange', type : 'checkbox'},
      { name : 'binary', title : 'Binary (<code>.glb</code>)', type : 'checkbox'},
      { name : 'maxTextureSize', title : 'Max texture size', type : 'number', min : 2, max : 8182, step : 1 }
    ]);
  }

  exportGLTF( name : string | string[] ) {
    const objects : Object3D[] = [];
    const objNames : string[] = [];
    if (Array.isArray(name)) {
      name.forEach(txt => {
        objNames.push(txt);
      })
    } else {
      objNames.push(name);
    }
    const scene1 : Scene = this.scene.getObject3d();
    objNames.forEach((objName) => {
      switch(objName) {
        case 'scene1' :
          objects.push(scene1);
        default :
          const obj = scene1.getObjectByName(objName);
          if (obj !== null) {
            objects.push(obj);
          }
          break;
      }
    })

    this.localStorageService.getExportObject('scene.gltf', objects, {
      trs: this.controls.trs,
      onlyVisible: this.controls.onlyVisible,
      truncateDrawRange: this.controls.truncateDrawRange,
      binary: this.controls.binary,
      maxTextureSize: this.controls.maxTextureSize
    });

  }
  
}
