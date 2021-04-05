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
import { PVRLoader } from 'three/examples/jsm/loaders/PVRLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { TiltLoader } from 'three/examples/jsm/loaders/TiltLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VRMLoader } from 'three/examples/jsm/loaders/VRMLoader';
import { XLoader } from 'three/examples/jsm/loaders/XLoader';
import { XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';
import { MD2Character } from 'three/examples/jsm/misc/MD2Character';
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';

import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

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
  private ttfLoader: TTFLoader = null;
  private voxLoader: VOXLoader = null;
  private vrmlLoader: VRMLLoader = null;
  private vrmLoader: VRMLoader = null;
  private xLoader: XLoader = null;
  private xyzLoader: XYZLoader = null;
  private threeMFLoader: ThreeMFLoader = null;

  private getStoreUrl(url: string) {
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
  public getObjectFromKey(
    key: string,
    callBack: (mesh: LoadedObject) => void,
    options: any
  ): void {
    options = options || {};
    this._getObjectFromKey(
      this.getStoreUrl(key),
      (mesh: LoadedObject) => {
        if (options.autoCenter && mesh.object) {
          const object = mesh.object;
          const aabb = new THREE.Box3().setFromObject(object);
          const center = aabb.getCenter(new THREE.Vector3());
          object.position.x += object.position.x - center.x;
          object.position.y += object.position.y - center.y;
          object.position.z += object.position.z - center.z;
        }
        callBack(mesh);
      },
      options
    );
  }

  public setLoaderWithOption(loader : THREE.Loader, options : any) {
    if (ThreeUtil.isNotNull(options)) {
      if (ThreeUtil.isNotNull(options.resourcePath)) {
        loader.setResourcePath(
          this.getStoreUrl(options.resourcePath)
        );
      }
      if (ThreeUtil.isNotNull(options.path)) {
        loader.setPath(
          this.getStoreUrl(options.path)
        );
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
        this.colladaLoader = new ColladaLoader();
      }
      this.setLoaderWithOption(this.colladaLoader, options);
      this.colladaLoader.load(
        key,
        (result: Collada) => {
          // result.kinematics;
          callBack({
            object: result.scene,
            clips: result.scene.animations,
          });
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.obj')) {
      if (this.objLoader === null) {
        this.objLoader = new OBJLoader();
      }
      this.setLoaderWithOption(this.objLoader, options);
      const materialUrl: string =
        options && options.material ? options.material : null;
      if (materialUrl !== null && materialUrl.length > 0) {
        this.getObjectFromKey(
          this.getStoreUrl(materialUrl),
          (result) => {
            if (result.material !== null && result.material !== undefined) {
              this.objLoader.setMaterials(result.material);
            }
            this.objLoader.load(
              key,
              (result: THREE.Group) => {
                callBack({
                  object: this.getStoreObject(result, options),
                });
              },
              null,
              (e) => {
                console.log(e);
              }
            );
          },
          null
        );
      } else {
        this.objLoader.setMaterials(null);
        this.objLoader.load(
          key,
          (result: THREE.Group) => {
            callBack({
              object: result,
            });
          },
          null,
          (e) => {
            console.log(e);
          }
        );
      }
    } else if (key.endsWith('.mtl')) {
      if (this.mtlLoader === null) {
        this.mtlLoader = new MTLLoader();
      }
      this.setLoaderWithOption(this.mtlLoader, options);
      this.mtlLoader.load(
        key,
        (result: MTLLoader.MaterialCreator) => {
          result.preload();
          callBack({ material: result });
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.3ds')) {
      if (this.tdsLoader === null) {
        this.tdsLoader = new TDSLoader();
      }
      this.setLoaderWithOption(this.tdsLoader, options);
      this.tdsLoader.load(key, (object: THREE.Group) => {
        callBack({
          object: object,
        });
      });
    } else if (key.endsWith('.amf')) {
      if (this.amfLoader === null) {
        this.amfLoader = new AMFLoader();
      }
      this.setLoaderWithOption(this.amfLoader, options);
      this.amfLoader.load(key, (object: THREE.Group) => {
        callBack({
          object: object,
        });
      });
    } else if (key.endsWith('.assimp')) {
      if (this.assimpLoader === null) {
        this.assimpLoader = new AssimpLoader();
      }
      this.setLoaderWithOption(this.assimpLoader, options);
      this.assimpLoader.load(key, (object: Assimp) => {
        callBack({
          object: object.object,
          clips: object.animation,
        });
      });
    } else if (key.endsWith('.bvh')) {
      if (this.bvhLoader === null) {
        this.bvhLoader = new BVHLoader();
      }
      this.setLoaderWithOption(this.bvhLoader, options);
      this.bvhLoader.load(key, (object: BVH) => {
        if (
          object.skeleton &&
          object.skeleton.bones &&
          object.skeleton.bones.length > 0
        ) {
          const mesh = object.skeleton.bones[0].clone() as THREE.SkinnedMesh;
          mesh.skeleton = object.skeleton;
          // callBack({
          // object: mesh,
          // clips : object.clip ? [object.clip] : null
          // });
        }
      });
    } else if (key.endsWith('.fbx')) {
      if (this.fbxLoader === null) {
        this.fbxLoader = new FBXLoader();
      }
      this.setLoaderWithOption(this.fbxLoader, options);
      this.fbxLoader.load(key, (object: THREE.Group) => {
        callBack({
          object: object,
          clips: object.animations,
        });
      });
    } else if (key.endsWith('.kmz')) {
      if (this.kmzLoader === null) {
        this.kmzLoader = new KMZLoader();
      }
      if (options.resourcePath) {
        this.kmzLoader.setResourcePath(this.getStoreUrl(options.resourcePath));
      }
      this.kmzLoader.load( key , ( object : Collada) => {
        callBack({
          object: object.scene,
        });
      });
    } else if (key.endsWith('.lwo')) {
      if (this.lwoLoader === null) {
        this.lwoLoader = new LWOLoader();
      }
      if (options.resourcePath) {
        this.lwoLoader.setResourcePath(this.getStoreUrl(options.resourcePath));
      }
      this.lwoLoader.load( key , ( object : LWO) => {
        const mesh = new THREE.Group();
        object.meshes.forEach(obj => {
          mesh.add(obj);
        })
        callBack({
          object: mesh,
        });
      });
    } else if (key.endsWith('.mpd')) {
      if (this.lDrawLoader === null) {
        this.lDrawLoader = new LDrawLoader();
      }
      if (options.resourcePath) {
        this.lDrawLoader.setResourcePath(this.getStoreUrl(options.resourcePath));
      }
      this.lDrawLoader.load( key , ( object : THREE.Group) => {
        callBack({
          object: object,
        });
      });
    } else if (key.endsWith('.gcode')) {
      if (this.gCodeLoader === null) {
        this.gCodeLoader = new GCodeLoader();
      }
      this.setLoaderWithOption(this.gCodeLoader, options);
      this.gCodeLoader.load(key, (object: THREE.Group) => {
        callBack({
          object: object,
          clips: object.animations,
        });
      });
    } else if (key.endsWith('.hdr')) {
      if (this.rgbeLoader === null) {
        this.rgbeLoader = new RGBELoader();
      }
      this.setLoaderWithOption(this.rgbeLoader, options);
      this.rgbeLoader.load(key, (texture: THREE.Texture) => {
        callBack({
          material: new THREE.MeshBasicMaterial({
            map: texture,
          }),
        });
      });
    } else if (key.endsWith('.3mf')) {
      if (this.threeMFLoader === null) {
        this.threeMFLoader = new ThreeMFLoader();
      }
      this.setLoaderWithOption(this.threeMFLoader, options);
      this.threeMFLoader.load(key, (object: THREE.Group) => {
        callBack({
          object: object,
        });
      });
    } else if (key.endsWith('.3dm')) {
      if (this.rhino3dmLoader === null) {
        this.rhino3dmLoader = new Rhino3dmLoader();
        this.rhino3dmLoader.setLibraryPath('/assets/libs/rhino3dm/');
      }
      this.setLoaderWithOption(this.rhino3dmLoader, options);
      this.rhino3dmLoader.load(
        key,
        (result: THREE.Group) => {
          callBack({
            object: result,
            clips: result.animations,
          });
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.basis')) {
      if (this.basisTextureLoader === null) {
        this.basisTextureLoader = new BasisTextureLoader();
      }
      this.setLoaderWithOption(this.basisTextureLoader, options);
      this.basisTextureLoader.load(
        key,
        () => {
          // todo
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.drc')) {
      if (this.dracoLoader === null) {
        this.dracoLoader = new DRACOLoader();
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
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.gltf') || key.endsWith('.glb')) {
      if (this.gltfLoader === null) {
        this.gltfLoader = new GLTFLoader();
      }
      if (options) {
        if (options.useDraco) {
          if (this.dracoLoader === null) {
            this.dracoLoader = new DRACOLoader();
          }
          if (options.decoderPath) {
            this.dracoLoader.setDecoderPath(options.decoderPath);
          }
          this.gltfLoader.setDRACOLoader(this.dracoLoader);
        }
        if (options.useKtx2) {
          if (this.ktx2Loader === null) {
            this.ktx2Loader = new KTX2Loader();
            this.ktx2Loader.setTranscoderPath(this.getStoreUrl('js/libs/basis/'));
            this.ktx2Loader.detectSupport(ThreeUtil.getRenderer() as THREE.WebGLRenderer);
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
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (
      key.endsWith('.pmd') ||
      key.endsWith('.pmx') ||
      key.endsWith('.vmd') ||
      key.endsWith('.vpd')
    ) {
      if (this.mmdLoader === null) {
        this.mmdLoader = new MMDLoader();
      }
      this.setLoaderWithOption(this.mmdLoader, options);
      const vmdUrl = options && options.vmdUrl ? options.vmdUrl : null;
      if (vmdUrl !== null) {
        this.mmdLoader.loadWithAnimation(
          key,
          this.getStoreUrl(vmdUrl),
          (result: MMDLoaderAnimationObject) => {
            callBack({
              object: this.getStoreObject(result.mesh, options),
              clips: result.animation ? [result.animation] : null,
            });
          },
          null,
          (e) => {
            console.log(e);
          }
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
              });
            } else {
              callBack({
                clips: [result],
              });
            }
          },
          null,
          (e) => {
            console.log(e);
          }
        );
      } else {
        this.mmdLoader.load(
          key,
          (result: THREE.SkinnedMesh) => {
            callBack({
              object: this.getStoreObject(result, options),
            });
          },
          null,
          (e) => {
            console.log(e);
          }
        );
      }
    } else if (key.endsWith('.pcd')) {
      if (this.pcdLoader === null) {
        this.pcdLoader = new PCDLoader();
      }
      this.setLoaderWithOption(this.pcdLoader, options);
      this.pcdLoader.load(
        key,
        () => {},
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.prwm')) {
      if (this.prwmLoader === null) {
        this.prwmLoader = new PRWMLoader();
      }
      this.setLoaderWithOption(this.prwmLoader, options);
      this.prwmLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshLambertMaterial({ color: 0xaaffaa })
          );
          //callBack(mesh);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.tga')) {
      if (this.tgaLoader === null) {
        this.tgaLoader = new TGALoader();
      }
      this.setLoaderWithOption(this.tgaLoader, options);
      this.tgaLoader.load(
        key,
        (texture: THREE.Texture) => {
          // const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
          // callBack(mesh);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.svg')) {
      if (this.svgLoader === null) {
        this.svgLoader = new SVGLoader();
      }
      this.setLoaderWithOption(this.svgLoader, options);
      this.svgLoader.load(
        key,
        (data: SVGResult) => {
          // const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
          // callBack(mesh);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.ply')) {
      if (this.plyLoader === null) {
        this.plyLoader = new PLYLoader();
      }
      this.setLoaderWithOption(this.plyLoader, options);
      this.plyLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshLambertMaterial({ color: 0xaaffaa })
          );
          // callBack(mesh);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.vtk')) {
      if (this.vtkLoader === null) {
        this.vtkLoader = new VTKLoader();
      }
      this.setLoaderWithOption(this.vtkLoader, options);
      this.vtkLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshLambertMaterial({ color: 0xaaffaa })
          );
          // callBack(mesh);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.mdd')) {
      if (this.mddLoader === null) {
        this.mddLoader = new MDDLoader();
      }
      this.setLoaderWithOption(this.mddLoader, options);
      this.mddLoader.load(
        key,
        (mdd: MDD) => {
          callBack({
            object : null,
            clips: [mdd.clip],
            geometry: null,
            morphTargets: mdd.morphTargets,
          });
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.md2')) {
      const optionType = (options.type || '').toLowerCase();
      if (optionType === 'md2character') {
        const character = new MD2Character();
        options.baseUrl = this.getStoreUrl(options.baseUrl);
        if (ThreeUtil.isNull(options.body)) {
          options.body = key;
        }
				character.loadParts( options );
				character.onLoadComplete = function () {
          callBack({
            object: character.root,
            clips: character,
            geometry: null,
          });
				};
      } else if (optionType === 'md2charactercomplex') {
        const character = new MD2CharacterComplex();
        options.baseUrl = this.getStoreUrl(options.baseUrl);
        if (ThreeUtil.isNull(options.body)) {
          options.body = key;
        }
        character.loadParts( options );
        character.onLoadComplete = function () {
          callBack({
            object: character.root,
            clips: character,
            geometry: null,
          });
        };
      } else {
        if (this.md2Loader === null) {
          this.md2Loader = new MD2Loader();
        }
        this.md2Loader.load(
          key,
          (geometry: THREE.BufferGeometry) => {
            callBack({
              object: null,
              clips: null,
              geometry: geometry,
            });
          },
          null,
          (e) => {
            console.log(e);
          }
        );
      }
    } else if (key.endsWith('.pdb')) {
      if (this.pdbLoader === null) {
        this.pdbLoader = new PDBLoader();
      }
      this.setLoaderWithOption(this.pdbLoader, options);
      this.pdbLoader.load(
        key,
        (pdb: PDB) => {
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
          // callBack(group);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else if (key.endsWith('.stl')) {
      if (this.stlLoader === null) {
        this.stlLoader = new STLLoader();
      }
      this.setLoaderWithOption(this.stlLoader, options);
      this.stlLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          const mesh = new THREE.Mesh();
          mesh.geometry = geometry;
          mesh.material = new THREE.MeshLambertMaterial({ color: 0x7777ff });
          // callBack(mesh);
        },
        null,
        (e) => {
          console.log(e);
        }
      );
    } else {
      if (key.endsWith('.js') || key.endsWith('.json')) {
        const isGeometryLoader = options && options.geometry ? true : false;
        if (!isGeometryLoader) {
          if (this.objectLoader === null) {
            this.objectLoader = new THREE.ObjectLoader();
          }
          this.setLoaderWithOption(this.objectLoader, options);
          this.objectLoader.load(
            key,
            (result) => {
              console.log(result);
            },
            null,
            (e) => {
              console.log(e);
            }
          );
        } else {
          if (this.geometryLoader === null) {
            this.geometryLoader = new THREE.BufferGeometryLoader();
          }
          this.setLoaderWithOption(this.geometryLoader, options);
          this.geometryLoader.load(
            key,
            (geometry) => {
              callBack({ geometry: geometry });
            },
            null,
            (e) => {
              console.log(e);
            }
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
      options?: any
    ) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.object !== null && result.object !== undefined) {
          if (result.object instanceof THREE.Object3D) {
            callBack(result.object, result.clips, result.geometry);
          } else {
            const scene = new THREE.Group();
            scene.add(result.object);
            callBack(scene);
          }
        } else {
          callBack(result.object, result.clips, result.geometry, result.morphTargets);
        }
      },
      options
    );
  }

  public getGeometry(
    key: string,
    callBack: (mesh: THREE.BufferGeometry) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.geometry instanceof THREE.BufferGeometry) {
          callBack(result.geometry);
        } else {
          callBack(new THREE.BufferGeometry());
        }
      },
      Object.assign(options || {}, { geometry: true })
    );
  }

  public getMaterial(
    key: string,
    callBack: (material: THREE.Material) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.material instanceof THREE.Material) {
          callBack(result.material);
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
    callBack: (mesh: THREE.Scene) => void,
    options?: any
  ): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.object instanceof THREE.Scene) {
          callBack(result.object);
        } else {
          const scene = new THREE.Scene();
          scene.add(result.object);
          callBack(scene);
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
          fontName.startsWith('https://')
        ) {
          if (fontName.endsWith('.json')) {
            fontPath = fontName;
          } else {
            fontPath = fontName + '_' + fontWeight + '.typeface.json';
          }
        } else {
          fontPath = '/assets/fonts/helvetiker_regular.typeface.json';
        }
        break;
    }
    if (this.fontLoader === null) {
      this.fontLoader = new THREE.FontLoader();
    }
    this.fontLoader.load(fontPath, (responseFont: THREE.Font) => {
      callBack(responseFont);
    });
  }

  fontLoader: THREE.FontLoader = null;

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
