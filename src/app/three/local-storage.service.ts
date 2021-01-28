import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { ColladaLoader, Collada } from 'three/examples/jsm/loaders/ColladaLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PDBLoader, PDB } from 'three/examples/jsm/loaders/PDBLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { OBJLoader2Parallel } from 'three/examples/jsm/loaders/OBJLoader2Parallel';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';


import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key)
  }

  public setObject(key: string, mesh: THREE.Object3D) {
    this.setItem(key, JSON.stringify(mesh.toJSON()));
  }

  private objectLoader: THREE.ObjectLoader = null;
  private objLoader: OBJLoader = null;
  private colladaLoader: ColladaLoader = null;
  private stlLoader: STLLoader = null;
  private vtkLoader: VTKLoader = null;
  private pdbLoader: PDBLoader = null;
  private plyLoader: PLYLoader = null;
  private rhino3dmLoader: ThreeMFLoader = null;
  private basisTextureLoader: BasisTextureLoader = null;
  private dracoLoader: DRACOLoader = null;
  private gltfLoader: GLTFLoader = null;
  private mmdLoader: MMDLoader = null;
  private mtlLoader: MTLLoader = null;
  private objLoader2: OBJLoader2 = null;
  private objLoader2Parallel: OBJLoader2Parallel = null;
  private pcdLoader: PCDLoader = null;
  private prwmLoader: PRWMLoader = null;
  private svgLoader: SVGLoader = null;
  private tgaLoader: TGALoader = null;

  public getObjectFromKey(key: string, callBack: (mesh: THREE.Object3D) => void): void {

    if (key.endsWith('.dae')) {
      if (this.colladaLoader === null) {
        this.colladaLoader = new ColladaLoader();
      }
      this.colladaLoader.load(key, (result: Collada) => {
        callBack(result.scene)
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.obj')) {
      if (this.objLoader === null) {
        this.objLoader = new OBJLoader();
      }
      this.objLoader.load(key, callBack, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.3dm')) {
      if (this.rhino3dmLoader === null) {
        this.rhino3dmLoader = new ThreeMFLoader();
      }
      this.rhino3dmLoader.load(key, callBack, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.basis')) {
      if (this.basisTextureLoader === null) {
        this.basisTextureLoader = new BasisTextureLoader();
      }
      this.basisTextureLoader.load(key, () => {
        // todo
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.drc')) {
      if (this.dracoLoader === null) {
        this.dracoLoader = new DRACOLoader();
      }
      this.dracoLoader.load(key, (geometry: THREE.Geometry | THREE.BufferGeometry) => {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.gltf')) {
      if (this.gltfLoader === null) {
        this.gltfLoader = new GLTFLoader();
      }
      this.gltfLoader.load(key, (gltf: GLTF) => {
        // const mesh = new THREE.Mesh(gltf, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        // callBack(mesh);
        // todo
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.pmd') || key.endsWith('.pmx')) {
      if (this.mmdLoader === null) {
        this.mmdLoader = new MMDLoader();
      }
      this.mmdLoader.load(key, callBack, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.pcd')) {
      if (this.pcdLoader === null) {
        this.pcdLoader = new PCDLoader();
      }
      this.pcdLoader.load(key, callBack, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.prwm')) {
      if (this.prwmLoader === null) {
        this.prwmLoader = new PRWMLoader();
      }
      this.prwmLoader.load(key, (geometry: THREE.Geometry | THREE.BufferGeometry) => {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.tga')) {
      if (this.tgaLoader === null) {
        this.tgaLoader = new TGALoader();
      }
      this.tgaLoader.load(key, (texture: THREE.Texture) => {
        // const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        // callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.svg')) {
      if (this.svgLoader === null) {
        this.svgLoader = new SVGLoader();
      }
      this.svgLoader.load(key, (data : SVGResult) => {
        // const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        // callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.ply')) {
      if (this.plyLoader === null) {
        this.plyLoader = new PLYLoader();
      }
      this.plyLoader.load(key, (geometry: THREE.BufferGeometry) => {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.vtk')) {
      if (this.vtkLoader === null) {
        this.vtkLoader = new VTKLoader();
      }
      this.vtkLoader.load(key, (geometry: THREE.BufferGeometry) => {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
        callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else if (key.endsWith('.pdb')) {
      if (this.pdbLoader === null) {
        this.pdbLoader = new PDBLoader();
      }
      this.pdbLoader.load(key, (pdb: PDB) => {
        const geometryAtoms = pdb.geometryAtoms;
        const geometryBonds = pdb.geometryBonds;
        const json = pdb.json;
        const group = new THREE.Mesh();
        const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
        const sphereGeometry = new THREE.IcosahedronBufferGeometry(1, 3);
        let positions = geometryAtoms.getAttribute('position');
        const colors = geometryAtoms.getAttribute('color');
        const position = new THREE.Vector3();
        const color = new THREE.Color();
        for (let i = 0; i < positions.count; i++) {
          position.x = positions.getX(i);
          position.y = positions.getY(i);
          position.z = positions.getZ(i);
          color.r = colors.getX(i);
          color.g = colors.getY(i);
          color.b = colors.getZ(i);
          const material = new THREE.MeshPhongMaterial({ color: color });
          const object = new THREE.Mesh(sphereGeometry, material);
          object.position.copy(position);
          object.position.multiplyScalar(75);
          object.scale.multiplyScalar(25);
          group.add(object);
          const atom = json.atoms[i];
          const text = document.createElement('div');
          text.className = 'label';
          text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
          text.textContent = atom[4];
          const label = new CSS2DObject(text);
          label.position.copy(object.position);
          group.add(label);
        }
        positions = geometryBonds.getAttribute('position');
        const start = new THREE.Vector3();
        const end = new THREE.Vector3();
        for (let i = 0; i < positions.count; i += 2) {
          start.x = positions.getX(i);
          start.y = positions.getY(i);
          start.z = positions.getZ(i);
          end.x = positions.getX(i + 1);
          end.y = positions.getY(i + 1);
          end.z = positions.getZ(i + 1);
          start.multiplyScalar(75);
          end.multiplyScalar(75);
          const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({color : 0xffffff }));
          object.position.copy(start);
          object.position.lerp(end, 0.5);
          object.scale.set(5, 5, start.distanceTo(end));
          object.lookAt(end);
          group.add(object);
        }
        callBack(group);
      }, null, (e) => {
        console.log(e);
      })

    } else if (key.endsWith('.stl')) {
      if (this.stlLoader === null) {
        this.stlLoader = new STLLoader();
      }
      this.stlLoader.load(key, (geometry: THREE.BufferGeometry) => {
        const mesh = new THREE.Mesh();
        mesh.geometry = geometry;
        mesh.material = new THREE.MeshLambertMaterial({ color: 0x7777ff });
        callBack(mesh);
      }, null, (e) => {
        console.log(e);
      })
    } else {
      if (this.objectLoader === null) {
        this.objectLoader = new THREE.ObjectLoader();
      }
      if (
        key.endsWith('.js') ||
        key.endsWith('.json')
      ) {
        this.objectLoader.load(key, callBack, null, (e) => {
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
  }

  public getObject(key: string, callBack: (mesh: THREE.Object3D) => void): void {
    this.getObjectFromKey(key, callBack);
  }

  public setScene(key: string, scene: THREE.Scene) {
    this.setItem(key, JSON.stringify(scene.toJSON()));
  }

  public getScene(key: string, callBack: (mesh: THREE.Object3D) => void): void {
    this.getObjectFromKey(key, callBack);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

}
