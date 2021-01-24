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

  private objectLoader : THREE.ObjectLoader = null;

  public getObjectFromKey(key : string, callBack : (mesh : THREE.Object3D) => void) : void {
    if (this.objectLoader === null) {
      this.objectLoader = new THREE.ObjectLoader();
    }
    if (
        key.endsWith('.js') ||
        key.endsWith('.json') ||
        key.endsWith('.obj')
      ) {
      this.objectLoader.load(key, callBack , null, (e) => {
        console.log(e);
      })
    } else {
      const json = this.getItem(key);
      const loadedGeometry = JSON.parse(json);
      if (json) {
        callBack(this.objectLoader.parse(loadedGeometry));
      } else {
        callBack(new THREE.Object3D());
      }
    }
  }

  public getObject(key: string, callBack : (mesh : THREE.Object3D) => void ) : void {
    this.getObjectFromKey(key, callBack);
  }

  public setScene(key: string, scene: THREE.Scene) {
    this.setItem(key, JSON.stringify(scene.toJSON()));
  }

  public getScene(key: string, callBack : (mesh : THREE.Object3D) => void) : void{
    this.getObjectFromKey(key , callBack );
  }

  public removeItem(key:string) {
    localStorage.removeItem(key);
  }

  public clear(){
    localStorage.clear();
  }

}
