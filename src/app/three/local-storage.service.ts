import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {
  ColladaLoader,
  Collada,
} from 'three/examples/jsm/loaders/ColladaLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PDBLoader, PDB } from 'three/examples/jsm/loaders/PDBLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as LOTTE_CANVAS from 'three/examples/js/libs/lottie_canvas';

import {
  MMDLoader,
  MMDLoaderAnimationObject,
} from 'three/examples/jsm/loaders/MMDLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader';
import { AssimpLoader, Assimp } from 'three/examples/jsm/loaders/AssimpLoader';
import { BVHLoader, BVH } from 'three/examples/jsm/loaders/BVHLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import { KMZLoader } from 'three/examples/jsm/loaders/KMZLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader';
import { LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader';
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { LUT3dlLoader } from 'three/examples/jsm/loaders/LUT3dlLoader';
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader';
import { LWOLoader, LWO } from 'three/examples/jsm/loaders/LWOLoader';
import { MDDLoader, MDD } from 'three/examples/jsm/loaders/MDDLoader';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { Volume } from 'three/examples/jsm/misc/Volume';
import { PVRLoader } from 'three/examples/jsm/loaders/PVRLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { TiltLoader } from 'three/examples/jsm/loaders/TiltLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VRMLoader } from 'three/examples/jsm/loaders/VRMLoader';
import { XLoader, XResult } from 'three/examples/jsm/loaders/XLoader';
import { XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';
import { MD2Character } from 'three/examples/jsm/misc/MD2Character';
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';

import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import {
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer';

import { LoadedObject, ThreeUtil } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public setObject(key: string, mesh: THREE.Object3D) {
    this.setItem(key, JSON.stringify(mesh.toJSON()));
  }

  private objectLoader: THREE.ObjectLoader = null;
  private geometryLoader: THREE.BufferGeometryLoader = null;
  private objLoader: OBJLoader = null;
  private colladaLoader: ColladaLoader = null;
  private stlLoader: STLLoader = null;
  private vtkLoader: VTKLoader = null;
  private pdbLoader: PDBLoader = null;
  private plyLoader: PLYLoader = null;
  private rhino3dmLoader: Rhino3dmLoader = null;
  private basisTextureLoader: BasisTextureLoader = null;
  private dracoLoader: DRACOLoader = null;
  private gltfLoader: GLTFLoader = null;
  private mmdLoader: MMDLoader = null;
  private mtlLoader: MTLLoader = null;
  private pcdLoader: PCDLoader = null;
  private prwmLoader: PRWMLoader = null;
  private svgLoader: SVGLoader = null;
  private tgaLoader: TGALoader = null;
  private md2Loader: MD2Loader = null;
  private amfLoader: AMFLoader = null;
  private assimpLoader: AssimpLoader = null;
  private bvhLoader: BVHLoader = null;
  private ddsLoader: DDSLoader = null;
  private exrLoader: EXRLoader = null;
  private fbxLoader: FBXLoader = null;
  private gCodeLoader: GCodeLoader = null;
  private hdrCubeTextureLoader: HDRCubeTextureLoader = null;
  private kmzLoader: KMZLoader = null;
  private ktx2Loader: KTX2Loader = null;
  private ktxLoader: KTXLoader = null;
  private lDrawLoader: LDrawLoader = null;
  private lottieLoader: LottieLoader = null;
  private lut3dlLoader: LUT3dlLoader = null;
  private lutCubeLoader: LUTCubeLoader = null;
  private lwoLoader: LWOLoader = null;
  private mddLoader: MDDLoader = null;
  private nrrdLoader: NRRDLoader = null;
  private pvrLoader: PVRLoader = null;
  private rgbeLoader: RGBELoader = null;
  private tdsLoader: TDSLoader = null;
  private tiltLoader: TiltLoader = null;
  private rgbmLoader: RGBMLoader = null;
  private ttfLoader: TTFLoader = null;
  private voxLoader: VOXLoader = null;
  private vrmlLoader: VRMLLoader = null;
  private vrmLoader: VRMLoader = null;
  private xLoader: XLoader = null;
  private xyzLoader: XYZLoader = null;
  private threeMFLoader: ThreeMFLoader = null;

  private getStoreUrlList(url: string | string[]) {
    if (typeof url === 'string') {
      return this.getStoreUrl(url);
    } else {
      const modUrl = [];
      url.forEach((path) => {
        modUrl.push(this.getStoreUrl(path));
      });
      return modUrl;
    }
  }

  public getStoreUrl(url: string) {
    if (
      url.startsWith('/') ||
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    } else {
      return '/assets/examples/' + url;
    }
  }

  onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete * 100) / 100 + '% downloaded');
    }
  }

  onError(event: ErrorEvent) {
    console.log(event);
  }

  private getStoreObject(
    object: THREE.Object3D,
    options: any = null
  ): THREE.Object3D {
    if (
      object !== null &&
      options !== null &&
      options.onLoad !== null &&
      typeof options.onLoad === 'function'
    ) {
      const result = options.onLoad(object);
      if (result !== null && result instanceof THREE.Object3D) {
        return result;
      }
    }
    return object;
  }
  private _manager: THREE.LoadingManager = null;

  public getLoadingManager(): THREE.LoadingManager {
    if (this._manager === null) {
      this._manager = new THREE.LoadingManager(
        () => {
          console.log('loaded');
        },
        (url: string, loaded: number, total: number) => {
          console.log(url, loaded, total);
        },
        (url: string) => {
          console.error(url);
        }
      );
      this._manager.addHandler( /\.dds$/i, new DDSLoader() );
    }
    return this._manager;
  }

  _loadedObject : { [key : string] : LoadedObject} = {}
  public getObjectFromKey(
    key: string,
    callBack: (mesh: LoadedObject) => void,
    options: any
  ): void {
    options = options || {};
    let safeKey = '';
    if (ThreeUtil.isNotNull(options.path)) {
      safeKey = key.substr(key.lastIndexOf('/') + 1);
    } else {
      safeKey = this.getStoreUrl(key);
    }
    if (this._loadedObject[safeKey] !== undefined) {
      const result = this._loadedObject[safeKey];
      callBack({
        object: ThreeUtil.isNotNull(result.object) ? result.object.clone(true) : null,
        material: ThreeUtil.isNotNull(result.material) ? result.material : null,
        geometry: ThreeUtil.isNotNull(result.geometry) ? result.geometry.clone() : null,
        texture: ThreeUtil.isNotNull(result.texture) ? result.texture.clone() : null,
        clips: result.clips,
        morphTargets: result.morphTargets,
        source: result.source
      });
    } else {
      this._getObjectFromKey(
        safeKey,
        (result: LoadedObject) => {
          if (result.object && result.object instanceof THREE.Group && result.object.children.length == 1) {
            result.object = result.object.children[0];
          }
          if (options.autoCenter && result.object) {
            const object = result.object;
            const objectBox = new THREE.Box3().setFromObject(object);
            const center = objectBox.getCenter(new THREE.Vector3());
            object.position.x += object.position.x - center.x;
            object.position.y += object.position.y - center.y;
            object.position.z += object.position.z - center.z;
          }
          /*
          this._loadedObject[safeKey] = {
            object: ThreeUtil.isNotNull(result.object) ? result.object.clone(true) : null,
            material: ThreeUtil.isNotNull(result.material) ? result.material : null,
            geometry: ThreeUtil.isNotNull(result.geometry) ? result.geometry.clone() : null,
            texture: ThreeUtil.isNotNull(result.texture) ? result.texture.clone() : null,
            clips: result.clips,
            morphTargets: result.morphTargets,
            source: result.source
          };
          */
          callBack(result);
        },
        options
      );
    }
  }

  public setLoaderWithOption(loader: THREE.Loader, options: any) {
    if (ThreeUtil.isNotNull(options)) {
      if (ThreeUtil.isNotNull(options.resourcePath)) {
        loader.setResourcePath(this.getStoreUrl(options.resourcePath));
      }
      if (ThreeUtil.isNotNull(options.path)) {
        loader.setPath(this.getStoreUrl(options.path));
      }
    }
    return loader;
  }

  public _getObjectFromKey(
    key: string,
    callBack: (mesh: LoadedObject) => void,
    options: any
  ): void {
    if (key.endsWith('.dae')) {
      if (this.colladaLoader === null) {
        this.colladaLoader = new ColladaLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.colladaLoader, options);
      this.colladaLoader.load(key, (result: Collada) => {
        callBack({
          object: result.scene,
          clips: result.scene.animations,
          source: result,
        });
      });
    } else if (key.endsWith('.obj')) {
      if (this.objLoader === null) {
        this.objLoader = new OBJLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.objLoader, options);
      const materialUrl: string = options.material ? options.material : null;
      if (materialUrl !== null && materialUrl.length > 0) {
        this.getObjectFromKey(
          materialUrl,
          (result) => {
            if (result.material !== null && result.material !== undefined) {
              this.objLoader.setMaterials(result.material);
            }
            this.objLoader.load(
              key,
              (result: THREE.Group) => {
                callBack({
                  object: this.getStoreObject(result, options),
                  source: result,
                });
              },
              this.onProgress,
              this.onError
            );
          },
          options
        );
      } else {
        this.objLoader.setMaterials(null);
        this.objLoader.load(
          key,
          (result: THREE.Group) => {
            callBack({
              object: result,
              source: result,
            });
          },
          this.onProgress,
          this.onError
        );
      }
    } else if (key.endsWith('.mtl')) {
      if (this.mtlLoader === null) {
        this.mtlLoader = new MTLLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.mtlLoader, options);
      this.mtlLoader.load(
        key,
        (materials: MTLLoader.MaterialCreator) => {
          materials.preload();
          callBack({
            material: materials,
            source: materials,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.3ds')) {
      if (this.tdsLoader === null) {
        this.tdsLoader = new TDSLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.tdsLoader, options);
      this.tdsLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.tilt')) {
      if (this.tiltLoader === null) {
        this.tiltLoader = new TiltLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.tiltLoader, options);
      this.tiltLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
      
    } else if (key.endsWith('.amf')) {
      if (this.amfLoader === null) {
        this.amfLoader = new AMFLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.amfLoader, options);
      this.amfLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.assimp')) {
      if (this.assimpLoader === null) {
        this.assimpLoader = new AssimpLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.assimpLoader, options);
      this.assimpLoader.load(
        key,
        (object: Assimp) => {
          callBack({
            object: object.object,
            clips: object.animation,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
      
    } else if (key.endsWith('.exr')) {
      if (this.exrLoader === null) {
        this.exrLoader = new EXRLoader(this.getLoadingManager());
        this.exrLoader.setDataType( THREE.UnsignedByteType )
      }
      this.setLoaderWithOption(this.exrLoader, options);
      this.exrLoader.load(
        key,
        (dataTexture: THREE.DataTexture) => {
          callBack({
            texture : dataTexture,
            source: dataTexture
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.hdr')) {
      if (this.rgbeLoader === null) {
        this.rgbeLoader = new RGBELoader(this.getLoadingManager());
        this.rgbeLoader.setDataType( THREE.UnsignedByteType )
      }
      this.setLoaderWithOption(this.rgbeLoader, options);
      this.rgbeLoader.load(
        key,
        (dataTexture: THREE.DataTexture) => {
          callBack({
            texture : dataTexture,
            source: dataTexture
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.ktx')) {
      if (this.ktxLoader === null) {
        this.ktxLoader = new KTXLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.ktxLoader, options);
      this.ktxLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture : texture,
            source: texture
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.ktx2')) {
      if (this.ktx2Loader === null) {
        this.ktx2Loader = new KTX2Loader(this.getLoadingManager());
				this.ktx2Loader.detectSupport( new THREE.WebGLRenderer() );
      }
      if (options.transcoderPath) {
        this.ktx2Loader.setTranscoderPath( this.getStoreUrl(options.transcoderPath) );
      }
      this.setLoaderWithOption(this.ktx2Loader, options);
      this.ktx2Loader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture : texture,
            source: texture
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.dds')) {
      if (this.ddsLoader === null) {
        this.ddsLoader = new DDSLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.ddsLoader, options);
      this.ddsLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture : texture,
            source: texture
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.bvh')) {
      if (this.bvhLoader === null) {
        this.bvhLoader = new BVHLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.bvhLoader, options);
      this.bvhLoader.load(
        key,
        (object: BVH) => {
          if (
            object.skeleton &&
            object.skeleton.bones &&
            object.skeleton.bones.length > 0
          ) {
            const mesh = object.skeleton.bones[0].clone() as THREE.SkinnedMesh;
            mesh.skeleton = object.skeleton;
            callBack({
              object: mesh,
              source: object,
            });
          }
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.fbx')) {
      if (this.fbxLoader === null) {
        this.fbxLoader = new FBXLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.fbxLoader, options);
      this.fbxLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            clips: object.animations,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.kmz')) {
      if (this.kmzLoader === null) {
        this.kmzLoader = new KMZLoader(this.getLoadingManager());
      }
      if (options.resourcePath) {
        this.kmzLoader.setResourcePath(this.getStoreUrl(options.resourcePath));
      }
      this.kmzLoader.load(
        key,
        (object: Collada) => {
          callBack({
            object: object.scene,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.lwo')) {
      if (this.lwoLoader === null) {
        this.lwoLoader = new LWOLoader(this.getLoadingManager());
      }
      if (options.resourcePath) {
        this.lwoLoader.setResourcePath(this.getStoreUrl(options.resourcePath));
      }
      this.lwoLoader.load(
        key,
        (object: LWO) => {
          const mesh = new THREE.Group();
          object.meshes.forEach((obj) => {
            mesh.add(obj);
          });
          callBack({
            object: mesh,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.mpd')) {
      if (this.lDrawLoader === null) {
        this.lDrawLoader = new LDrawLoader(this.getLoadingManager());
      }
      if (options.resourcePath) {
        this.lDrawLoader.setResourcePath(
          this.getStoreUrl(options.resourcePath)
        );
      }
      this.lDrawLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.gcode')) {
      if (this.gCodeLoader === null) {
        this.gCodeLoader = new GCodeLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.gCodeLoader, options);
      this.gCodeLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            clips: object.animations,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.hdr')) {
      if (this.rgbeLoader === null) {
        this.rgbeLoader = new RGBELoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.rgbeLoader, options);
      this.rgbeLoader.load(
        key,
        (texture: THREE.Texture) => {
          callBack({
            material: new THREE.MeshBasicMaterial({
              map: texture,
            }),
            source: texture,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.3mf')) {
      if (this.threeMFLoader === null) {
        this.threeMFLoader = new ThreeMFLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.threeMFLoader, options);
      this.threeMFLoader.load(
        key,
        (object: THREE.Group) => {
          callBack({
            object: object,
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.3dm')) {
      if (this.rhino3dmLoader === null) {
        this.rhino3dmLoader = new Rhino3dmLoader(this.getLoadingManager());
        this.rhino3dmLoader.setLibraryPath('/assets/libs/rhino3dm/');
      }
      this.setLoaderWithOption(this.rhino3dmLoader, options);
      this.rhino3dmLoader.load(key, (result: THREE.Group) => {
        callBack({
          object: result,
          clips: result.animations,
          source: result,
        });
      });
    } else if (key.endsWith('.basis')) {
      if (this.basisTextureLoader === null) {
        this.basisTextureLoader = new BasisTextureLoader(
          this.getLoadingManager()
        );
				this.basisTextureLoader.detectSupport( new THREE.WebGLRenderer() );
      }
      if (options.transcoderPath) {
        this.basisTextureLoader.setTranscoderPath( this.getStoreUrl(options.transcoderPath) );
      }
      this.setLoaderWithOption(this.basisTextureLoader, options);
      this.basisTextureLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture : texture,
            source: texture,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.drc')) {
      if (this.dracoLoader === null) {
        this.dracoLoader = new DRACOLoader(this.getLoadingManager());
        this.dracoLoader.setDecoderPath(this.getStoreUrl('js/libs/draco/'));
        this.dracoLoader.setDecoderConfig({ type: 'js' });
      }
      this.setLoaderWithOption(this.dracoLoader, options);
      this.dracoLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          callBack({
            geometry: geometry,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.gltf') || key.endsWith('.glb')) {
      if (this.gltfLoader === null) {
        this.gltfLoader = new GLTFLoader(this.getLoadingManager());
      }
      if (options) {
        if (options.useDraco) {
          if (this.dracoLoader === null) {
            this.dracoLoader = new DRACOLoader(this.getLoadingManager());
          }
          if (options.decoderPath) {
            this.dracoLoader.setDecoderPath(
              this.getStoreUrl(options.decoderPath)
            );
          }
          this.gltfLoader.setDRACOLoader(this.dracoLoader);
        }
        if (options.useKtx2) {
          if (this.ktx2Loader === null) {
            this.ktx2Loader = new KTX2Loader(this.getLoadingManager());
            this.ktx2Loader.setTranscoderPath(
              this.getStoreUrl('js/libs/basis/')
            );
            this.ktx2Loader.detectSupport(
              ThreeUtil.getRenderer() as THREE.WebGLRenderer
            );
          }
          this.gltfLoader.setKTX2Loader(this.ktx2Loader);
        }
        if (options.useMeshoptDecoder) {
          this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
        }
      }
      this.setLoaderWithOption(this.gltfLoader, options);
      this.gltfLoader.load(
        key,
        (result: GLTF) => {
          callBack({
            object: this.getStoreObject(result.scene, options),
            clips: result.animations,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (
      key.endsWith('.pmd') ||
      key.endsWith('.pmx') ||
      key.endsWith('.vmd') ||
      key.endsWith('.vpd')
    ) {
      if (this.mmdLoader === null) {
        this.mmdLoader = new MMDLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.mmdLoader, options);
      const vmdUrl = options && options.vmdUrl ? options.vmdUrl : null;
      if (vmdUrl !== null) {
        this.mmdLoader.loadWithAnimation(
          key,
          this.getStoreUrlList(vmdUrl),
          (result: MMDLoaderAnimationObject) => {
            callBack({
              object: this.getStoreObject(result.mesh, options),
              clips: result.animation ? [result.animation] : null,
            });
          },
          this.onProgress,
          this.onError
        );
      } else if (key.endsWith('.vmd')) {
        const object: THREE.SkinnedMesh | THREE.Camera = options.object;
        this.mmdLoader.loadAnimation(
          key,
          object,
          (result: THREE.SkinnedMesh | THREE.AnimationClip) => {
            if (result instanceof THREE.SkinnedMesh) {
              callBack({
                object: this.getStoreObject(result, options),
                source: result,
              });
            } else {
              callBack({
                clips: [result],
                source: result,
              });
            }
          },
          this.onProgress,
          this.onError
        );
      } else {
        this.mmdLoader.load(
          key,
          (result: THREE.SkinnedMesh) => {
            callBack({
              object: this.getStoreObject(result, options),
            });
          },
          this.onProgress,
          this.onError
        );
      }
    } else if (key.endsWith('.pcd')) {
      if (this.pcdLoader === null) {
        this.pcdLoader = new PCDLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.pcdLoader, options);
      this.pcdLoader.load(
        key,
        (points: THREE.Points) => {
          callBack({
            object : points,
            source: points,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.prwm')) {
      if (this.prwmLoader === null) {
        this.prwmLoader = new PRWMLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.prwmLoader, options);
      this.prwmLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          callBack({
            geometry: geometry,
            source: geometry,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.tga')) {
      if (this.tgaLoader === null) {
        this.tgaLoader = new TGALoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.tgaLoader, options);
      this.tgaLoader.load(key, (texture: THREE.Texture) => {
        callBack({
          texture : texture,
          source: texture,
        });
      });
    } else if (key.endsWith('.svg')) {
      if (this.svgLoader === null) {
        this.svgLoader = new SVGLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.svgLoader, options);
      this.svgLoader.load(
        key,
        (data: SVGResult) => {
					const paths = data.paths;
					const group = new THREE.Group();
          const drawFillShapes = options.drawFillShapes || false;
          const drawStrokes = options.drawStrokes || false;
          const fillShapesWireframe = options.fillShapesWireframe || false;
          const strokesWireframe = options.strokesWireframe || false;
          paths.forEach(path => {
						const fillColor = path.userData.style.fill;
						if ( drawFillShapes && fillColor !== undefined && fillColor !== 'none' ) {
							const material = new THREE.MeshBasicMaterial( {
								color: new THREE.Color().setStyle( fillColor ),
								opacity: path.userData.style.fillOpacity,
								transparent: path.userData.style.fillOpacity < 1,
								side: THREE.DoubleSide,
								depthWrite: false,
								wireframe: fillShapesWireframe
							} );
							const shapes = path.toShapes( true );
              shapes.forEach(shape => {
								const geometry = new THREE.ShapeGeometry( shape );
								const mesh = new THREE.Mesh( geometry, material );
								group.add( mesh );
							});
						}
						const strokeColor = path.userData.style.stroke;
						if ( drawStrokes && strokeColor !== undefined && strokeColor !== 'none' ) {
							const material = new THREE.MeshBasicMaterial( {
								color: new THREE.Color().setStyle( strokeColor ),
								opacity: path.userData.style.strokeOpacity,
								transparent: path.userData.style.strokeOpacity < 1,
								side: THREE.DoubleSide,
								depthWrite: false,
								wireframe: strokesWireframe
							} );
              path.subPaths.forEach(subPath => {
								const geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );
								if ( geometry ) {
									const mesh = new THREE.Mesh( geometry, material );
									group.add( mesh );
								}
							});
						}
					});
          callBack({
            object : group,
            source: data,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.ply')) {
      if (this.plyLoader === null) {
        this.plyLoader = new PLYLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.plyLoader, options);
      this.plyLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          callBack({
            geometry: geometry,
            source: geometry,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.vtk') || key.endsWith('.vtp')) {
      if (this.vtkLoader === null) {
        this.vtkLoader = new VTKLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.vtkLoader, options);
      this.vtkLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          callBack({
            geometry: geometry,
            source: geometry,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.x')) {
      if (this.xLoader === null) {
        this.xLoader = new XLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.xLoader, options);
      this.xLoader.load(
        key,
        (object: XResult) => {
          console.log(object.models);
          callBack({
            object: object.models[0],
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.mdd')) {
      if (this.mddLoader === null) {
        this.mddLoader = new MDDLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.mddLoader, options);
      this.mddLoader.load(
        key,
        (mdd: MDD) => {
          callBack({
            clips: [mdd.clip],
            morphTargets: mdd.morphTargets,
            source: mdd,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.nrrd')) {
      if (this.nrrdLoader === null) {
        this.nrrdLoader = new NRRDLoader(this.getLoadingManager());
      }
      this.nrrdLoader.load(
        key,
        (group: Volume) => {
          callBack({
            source: group,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.md2')) {
      const optionType = (options.type || '').toLowerCase();
      if (optionType === 'md2character') {
        const character = new MD2Character();
        options.baseUrl = this.getStoreUrl(options.baseUrl);
        if (ThreeUtil.isNull(options.body)) {
          options.body = key;
        }
        character.onLoadComplete = function () {
          callBack({
            object: character.root,
            clips: character,
            source: character,
          });
        };
        character.loadParts(options);
      } else if (optionType === 'md2charactercomplex') {
        const character = new MD2CharacterComplex();
        options.baseUrl = this.getStoreUrl(options.baseUrl);
        if (ThreeUtil.isNull(options.body)) {
          options.body = key;
        }
        character.onLoadComplete = function () {
          callBack({
            object: character.root,
            clips: character,
            source: character,
          });
        };
        character.loadParts(options);
      } else {
        if (this.md2Loader === null) {
          this.md2Loader = new MD2Loader(this.getLoadingManager());
        }
        this.md2Loader.load(
          key,
          (geometry: THREE.BufferGeometry) => {
            callBack({
              geometry: geometry,
              source: geometry,
            });
          },
          this.onProgress,
          this.onError
        );
      }
    } else if (key.endsWith('.pdb')) {
      if (this.pdbLoader === null) {
        this.pdbLoader = new PDBLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.pdbLoader, options);
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
          text.style.color =
            'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
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
          const object = new THREE.Mesh(
            boxGeometry,
            new THREE.MeshPhongMaterial({ color: 0xffffff })
          );
          object.position.copy(start);
          object.position.lerp(end, 0.5);
          object.scale.set(5, 5, start.distanceTo(end));
          object.lookAt(end);
          group.add(object);
        }
        callBack({ object : group, geometry: null, source: pdb });
      },
      this.onProgress,
      this.onError
      );
    } else if (key.endsWith('.stl')) {
      if (this.stlLoader === null) {
        this.stlLoader = new STLLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.stlLoader, options);
      this.stlLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          const mesh = new THREE.Mesh();
          mesh.geometry = geometry;
          mesh.material = new THREE.MeshLambertMaterial({ color: 0x7777ff });
          callBack({
            object: mesh,
            source: geometry,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.vox')) {
      if (this.voxLoader === null) {
        this.voxLoader = new VOXLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.voxLoader, options);
      this.voxLoader.load(
        key,
        (chunks: any[]) => {
          const group = new THREE.Group();
          chunks.forEach(chunk => {
            group.add(new VOXMesh(chunk));
          })
          callBack({
            object: group,
            source: chunks,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.wrl')) {
      if (this.vrmlLoader === null) {
        this.vrmlLoader = new VRMLLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.vrmlLoader, options);
      this.vrmlLoader.load(
        key,
        (scene: THREE.Scene) => {
          callBack({
            object: scene,
            source: scene,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.xyz')) {
      if (this.xyzLoader === null) {
        this.xyzLoader = new XYZLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.xyzLoader, options);
      this.xyzLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          callBack({
            geometry: geometry,
            source: geometry,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.vrm')) {
      if (this.vrmLoader === null) {
        this.vrmLoader = new VRMLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.vrmLoader, options);
      this.vrmLoader.load(
        key,
        (vrm: GLTF) => {
					vrm.scene.traverse( object => {
						if ( object instanceof THREE.Mesh && object.material ) {
							if ( Array.isArray( object.material ) ) {
								for ( let i = 0, il = object.material.length; i < il; i ++ ) {
                  const objectMaterial = object.material[i];
									const material = new THREE.MeshPhongMaterial();
									THREE.Material.prototype.copy.call( material, object.material[ i ] );
									material.color.copy( objectMaterial['color']);
									material.map = objectMaterial['map'];
									material.skinning = objectMaterial['skinning'];
									material.morphTargets = objectMaterial['morphTargets'];
									material.morphNormals = objectMaterial['morphNormals'];
									object.material[ i ] = material;
								}
							} else {
                const objectMaterial = object.material;
								const material = new THREE.MeshPhongMaterial();
								THREE.Material.prototype.copy.call( material, object.material );
								material.color.copy( objectMaterial['color'] );
								material.map = objectMaterial['map'];
								material.skinning = objectMaterial['skinning'];
								material.morphTargets = objectMaterial['morphTargets'];
								material.morphNormals = objectMaterial['morphNormals'];
								object.material = material;
							}
						}
					});          
          callBack({
            object: vrm.scene,
            source: vrm,
          });
        },
        this.onProgress,
        this.onError
      );
      
    } else if (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg')) {
      if (this.rgbmLoader === null) {
        this.rgbmLoader = new RGBMLoader(this.getLoadingManager());
      }
      this.setLoaderWithOption(this.rgbmLoader, options);
      this.rgbmLoader.load(
        key,
        (dataTexture: THREE.DataTexture) => {
          callBack({
            texture: dataTexture,
            source: dataTexture,
          });
        },
        this.onProgress,
        this.onError
      );
      
    } else {
      if (key.endsWith('.js') || key.endsWith('.json')) {
        const isGeometryLoader = options.geometry ? true : false;
        if (!isGeometryLoader) {
          const loaderType = options.loaderType || '';
          switch(loaderType.toLowerCase()) {
            case 'lottie' :
              if (this.lottieLoader === null) {
                this.lottieLoader = new LottieLoader(
                  this.getLoadingManager()
                );
                window['bodymovin'] = LOTTE_CANVAS;
              }
              if (ThreeUtil.isNull(options.quality)) {
                this.lottieLoader.setQuality(options.quality);
              }
              this.setLoaderWithOption(this.lottieLoader, options);
              this.lottieLoader.load(
                key,
                (texture: THREE.CanvasTexture) => {
                  callBack({
                    texture : texture,
                    source: texture,
                  });
                  setTimeout(() => {
                    texture['animation'].play();
                  }, 1000);
                },
                this.onProgress,
                this.onError
              );
              break;
            default :
              if (this.objectLoader === null) {
                this.objectLoader = new THREE.ObjectLoader(
                  this.getLoadingManager()
                );
              }
              this.setLoaderWithOption(this.objectLoader, options);
              this.objectLoader.load(
                key,
                (result) => {
                  callBack({
                    source: result,
                  });
                },
                this.onProgress,
                this.onError
              );
              break;
          }
        } else {
          if (this.geometryLoader === null) {
            this.geometryLoader = new THREE.BufferGeometryLoader(
              this.getLoadingManager()
            );
          }
          this.setLoaderWithOption(this.geometryLoader, options);
          this.geometryLoader.load(
            key,
            (geometry) => {
              callBack({ geometry: geometry, source: geometry });
            },
            this.onProgress,
            this.onError
          );
        }
      } else {
        const json = this.getItem(key);
        const loadedGeometry = JSON.parse(json);
        if (json) {
          // callBack(this.objectLoader.parse(loadedGeometry));
        } else {
          // callBack(new THREE.Object3D());
        }
      }
    }
  }

  public getObject(
    key: string,
    callBack: (
      mesh: THREE.Object3D,
      clips?: THREE.AnimationClip[],
      geometry?: THREE.BufferGeometry,
      morphTargets?: any,
      source?: any
    ) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        callBack(result.object, result.clips, result.geometry, result.morphTargets, result.source);
      },
      options
    );
  }

  public getGeometry(
    key: string,
    callBack: (mesh: THREE.BufferGeometry, source?: any) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.geometry instanceof THREE.BufferGeometry) {
          callBack(result.geometry, result.source);
        } else if (result.object instanceof THREE.Mesh) {
          callBack(result.object.geometry, result.source);
        } else if (result.object.children.length > 0 && result.object.children[0] instanceof THREE.Mesh) {
          callBack(result.object.children[0]['geometry'], result.source);
        } else {
          callBack(new THREE.BufferGeometry());
        }
      },
      Object.assign(options || {}, { geometry: true })
    );
  }

  public getTexture(
    key: string,
    callBack: (texture: THREE.Texture, source?: any) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.texture instanceof THREE.Texture) {
          callBack(result.texture, result.source);
        } else {
          callBack(new THREE.Texture());
        }
      },
      Object.assign(options || {}, { texture: true })
    );
  }
  
  public getMaterial(
    key: string,
    callBack: (material: THREE.Material, source?: any) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.material instanceof THREE.Material) {
          callBack(result.material, result.source);
        }
      },
      options
    );
  }

  public setScene(key: string, scene: THREE.Scene) {
    this.setItem(key, JSON.stringify(scene.toJSON()));
  }

  public getScene(
    key: string,
    callBack: (mesh: THREE.Scene, source?: any) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.object instanceof THREE.Scene) {
          callBack(result.object, result.source);
        } else {
          const scene = new THREE.Scene();
          scene.add(result.object);
          callBack(scene, result.source);
        }
      },
      options
    );
  }

  public getFont(
    callBack: (font: THREE.Font) => void,
    fontName: string = 'helvetiker',
    fontWeight: string = ''
  ) {
    let fontPath: string = '';
    if (ThreeUtil.isNull(fontWeight) || fontWeight === '') {
       if (fontName.indexOf('_') > 0) {
         [fontName, fontWeight] = fontName.split('_');
       }
    }
    switch (fontName.toLowerCase()) {
      case 'helvetiker':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = '/assets/fonts/helvetiker_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = '/assets/fonts/helvetiker_regular.typeface.json';
            break;
        }
        break;
      case 'gentilis':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = '/assets/fonts/gentilis_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = '/assets/fonts/gentilis_regular.typeface.json';
            break;
        }
        break;
      case 'optimer':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = '/assets/fonts/optimer_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = '/assets/fonts/optimer_regular.typeface.json';
            break;
        }
        break;
      case 'sans':
      case 'droid_sans':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = '/assets/fonts/droid/droid_sans_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = '/assets/fonts/droid/droid_sans_regular.typeface.json';
            break;
        }
        break;
      case 'sans_mono':
      case 'droid_sans_mono':
        fontPath = '/assets/fonts/droid/droid_sans_mono_regular.typeface.json';
        break;
      case 'serif':
      case 'droid_serif':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = '/assets/fonts/droid/droid_serif_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = '/assets/fonts/droid/droid_serif_regular.typeface.json';
            break;
        }
        break;
      case 'nanumgothic':
        fontPath = '/assets/fonts/nanum/nanumgothic_regular.typeface.json';
        break;
      case 'dohyeon':
      case 'do_hyeon':
        fontPath = '/assets/fonts/nanum/do_hyeon_regular.typeface.json';
        break;
      default:
        if (
          fontName.startsWith('/') ||
          fontName.startsWith('http://') ||
          fontName.startsWith('https://') ||
          fontName.endsWith('.json') ||
          fontName.endsWith('.ttf') 
        ) {
          if (fontName.endsWith('.json')) {
            fontPath = fontName;
          } else if (fontName.endsWith('.ttf')) {
            fontPath = fontName;
          } else {
            fontPath = fontName + '_' + fontWeight + '.typeface.json';
          }
        } else {
          fontPath = '/assets/fonts/helvetiker_regular.typeface.json';
        }
        break;
    }
    if (ThreeUtil.isNotNull(this._loadedFonts[fontPath])) {
      callBack(this._loadedFonts[fontPath]);
    } else {
      if (fontPath.endsWith('.ttf')) {
        if (this.ttfLoader === null) {
          this.ttfLoader = new TTFLoader(this.getLoadingManager());
        }
        this.ttfLoader.load(this.getStoreUrl(fontPath), (json: any) => {
          this._loadedFonts[fontPath] = new THREE.Font( json );
          callBack(this._loadedFonts[fontPath]);
        });
      } else {
        if (this.fontLoader === null) {
          this.fontLoader = new THREE.FontLoader(this.getLoadingManager());
        }
        this.fontLoader.load(this.getStoreUrl(fontPath), (responseFont: THREE.Font) => {
          this._loadedFonts[fontPath] = responseFont;
          callBack(this._loadedFonts[fontPath]);
        });
      }
    }
  }
  _loadedFonts : {
    [key : string] : THREE.Font
  } = {}

  fontLoader: THREE.FontLoader = null;

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
