import { Injectable } from '@angular/core';
import * as THREE from 'three';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
    
  public getItem(key: string){ 
    return localStorage.getItem(key)
  }

  public setObject(key: string, mesh: THREE.Object3D) {
    this.setItem(key, JSON.stringify(mesh.toJSON()));
  }

  public getObject(key: string) : THREE.Mesh{ 
    const json = this.getItem(key);
    const loadedGeometry = JSON.parse(json);
    if (json) {
      const loader = new THREE.ObjectLoader();
      return loader.parse(loadedGeometry);
    } else {
      return new THREE.Mesh();
    }
  }

  public setScene(key: string, scene: THREE.Scene) {
    this.setItem(key, JSON.stringify(scene.toJSON()));
  }

  public getScene(key: string) : THREE.Scene{ 
    const json = this.getItem(key);
    const loadedGeometry = JSON.parse(json);
    if (json) {
      const loader = new THREE.ObjectLoader();
      return loader.parse(loadedGeometry);
    } else {
      return new THREE.Scene();
    }
  }


  public removeItem(key:string) {
    localStorage.removeItem(key);
  }
  
  public clear(){
    localStorage.clear(); 
  }

}
