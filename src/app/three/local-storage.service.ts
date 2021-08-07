import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as draco_encoder from 'three/examples/js/libs/draco/draco_encoder';
import * as LOTTE_CANVAS from 'three/examples/js/libs/lottie_canvas';
import { ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { DRACOExporter } from 'three/examples/jsm/exporters/DRACOExporter';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { MMDExporter } from 'three/examples/jsm/exporters/MMDExporter';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader';
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader';
import { BVH, BVHLoader } from 'three/examples/jsm/loaders/BVHLoader';
import { Collada, ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
// import { IFC, IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';
import { KMZLoader } from 'three/examples/jsm/loaders/KMZLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader';
import { LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader';
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { LUT3dlLoader } from 'three/examples/jsm/loaders/LUT3dlLoader';
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader';
import { LWO, LWOLoader } from 'three/examples/jsm/loaders/LWOLoader';
import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader';
import { MDD, MDDLoader } from 'three/examples/jsm/loaders/MDDLoader';
import { MMDLoader, MMDLoaderAnimationObject } from 'three/examples/jsm/loaders/MMDLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { PDB, PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader';
import { PVRLoader } from 'three/examples/jsm/loaders/PVRLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import * as TILT from 'three/examples/jsm/loaders/TiltLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { Chunk, VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VRMLoader } from 'three/examples/jsm/loaders/VRMLoader';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';
import { MD2Character } from 'three/examples/jsm/misc/MD2Character';
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { Volume } from 'three/examples/jsm/misc/Volume';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { LoadedObject, ThreeUtil } from './interface';

/**
 * LocalStorageService
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Creates an instance of local storage service.
   */
  constructor() {}

  /**
   * Sets item
   * @param key
   * @param value
   */
  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Gets item
   * @param key
   * @returns
   */
  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * Sets object
   * @param key
   * @param mesh
   */
  public setObject(key: string, mesh: THREE.Object3D) {
    this.setItem(key, JSON.stringify(mesh.toJSON()));
  }

  /**
   * Object loader of local storage service
   */
  private objectLoader: THREE.ObjectLoader = null;

  /**
   * Geometry loader of local storage service
   */
  private geometryLoader: THREE.BufferGeometryLoader = null;

  /**
   * Obj loader of local storage service
   */
  private objLoader: OBJLoader = null;

  /**
   * Collada loader of local storage service
   */
  private colladaLoader: ColladaLoader = null;

  /**
   * Stl loader of local storage service
   */
  private stlLoader: STLLoader = null;

  /**
   * Vtk loader of local storage service
   */
  private vtkLoader: VTKLoader = null;

  /**
   * Pdb loader of local storage service
   */
  private pdbLoader: PDBLoader = null;

  /**
   * Ply loader of local storage service
   */
  private plyLoader: PLYLoader = null;

  /**
   * Rhino3dm loader of local storage service
   */
  private rhino3dmLoader: Rhino3dmLoader = null;

  /**
   * Basis texture loader of local storage service
   */
  private basisTextureLoader: BasisTextureLoader = null;

  /**
   * Draco loader of local storage service
   */
  private dracoLoader: DRACOLoader = null;

  /**
   * Gltf loader of local storage service
   */
  private gltfLoader: GLTFLoader = null;

  /**
   * Mmd loader of local storage service
   */
  private mmdLoader: MMDLoader = null;

  /**
   * Mtl loader of local storage service
   */
  private mtlLoader: MTLLoader = null;

  /**
   * Pcd loader of local storage service
   */
  private pcdLoader: PCDLoader = null;

  /**
   * Prwm loader of local storage service
   */
  private prwmLoader: PRWMLoader = null;

  /**
   * Svg loader of local storage service
   */
  private svgLoader: SVGLoader = null;

  /**
   * Tga loader of local storage service
   */
  private tgaLoader: TGALoader = null;

  /**
   * Md2 loader of local storage service
   */
  private md2Loader: MD2Loader = null;

  /**
   * Amf loader of local storage service
   */
  private amfLoader: AMFLoader = null;

  /**
   * Bvh loader of local storage service
   */
  private bvhLoader: BVHLoader = null;

  /**
   * Dds loader of local storage service
   */
  private ddsLoader: DDSLoader = null;

  /**
   * Exr loader of local storage service
   */
  private exrLoader: EXRLoader = null;

  /**
   * Fbx loader of local storage service
   */
  private fbxLoader: FBXLoader = null;

  /**
   * G code loader of local storage service
   */
  private gCodeLoader: GCodeLoader = null;

  /**
   * Hdr cube texture loader of local storage service
   */
  private hdrCubeTextureLoader: HDRCubeTextureLoader = null;

  /**
   * Kmz loader of local storage service
   */
  private kmzLoader: KMZLoader = null;

  /**
   * Ktx2 loader of local storage service
   */
  private ktx2Loader: KTX2Loader = null;

  /**
   * Ktx loader of local storage service
   */
  private ktxLoader: KTXLoader = null;

  /**
   * Determines whether draw loader l
   */
  private lDrawLoader: LDrawLoader = null;

  /**
   * Lottie loader of local storage service
   */
  private lottieLoader: LottieLoader = null;

  /**
   * Lut3dl loader of local storage service
   */
  private lut3dlLoader: LUT3dlLoader = null;

  /**
   * Lut cube loader of local storage service
   */
  private lutCubeLoader: LUTCubeLoader = null;

  /**
   * Ifc loader of local storage service
   */
  // private ifcLoader: IFCLoader = null;

  /**
   * Vox loader of local storage service
   */
  private voxLoader: VOXLoader = null;

  /**
   * Chunk  of local storage service
   */
  private _chunk: Chunk = null;

  /**
   * Lwo loader of local storage service
   */
  private lwoLoader: LWOLoader = null;

  /**
   * Mdd loader of local storage service
   */
  private mddLoader: MDDLoader = null;

  /**
   * Nrrd loader of local storage service
   */
  private nrrdLoader: NRRDLoader = null;

  /**
   * Pvr loader of local storage service
   */
  private pvrLoader: PVRLoader = null;

  /**
   * Rgbe loader of local storage service
   */
  private rgbeLoader: RGBELoader = null;

  /**
   * Tds loader of local storage service
   */
  private tdsLoader: TDSLoader = null;

  /**
   * Tilt loader of local storage service
   */
  private tiltLoader: TILT.TiltLoader = null;

  /**
   * Rgbm loader of local storage service
   */
  private rgbmLoader: RGBMLoader = null;

  /**
   * Ttf loader of local storage service
   */
  private ttfLoader: TTFLoader = null;

  /**
   * Vrml loader of local storage service
   */
  private vrmlLoader: VRMLLoader = null;

  /**
   * Vrm loader of local storage service
   */
  private vrmLoader: VRMLoader = null;

  // private xLoader: XLoader = null;

  /**
   * Xyz loader of local storage service
   */
  private xyzLoader: XYZLoader = null;

  /**
   * Three mfloader of local storage service
   */
  private threeMFLoader: ThreeMFLoader = null;

  /**
   * Gets store url list
   * @param url
   * @returns
   */
  private getStoreUrlList(url: string | string[]) {
    if (typeof url === 'string') {
      return ThreeUtil.getStoreUrl(url);
    } else {
      const modUrl = [];
      url.forEach((path) => {
        modUrl.push(ThreeUtil.getStoreUrl(path));
      });
      return modUrl;
    }
  }

  /**
   * Determines whether progress on
   * @param xhr
   */
  public onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete * 100) / 100 + '% downloaded');
    }
  }

  /**
   * Determines whether error on
   * @param event
   */
  public onError(event: ErrorEvent) {
    console.log(event);
  }

  /**
   * Gets store object
   * @param object
   * @param [options]
   * @returns store object
   */
  private getStoreObject(object: THREE.Object3D, options: any = null): THREE.Object3D {
    if (object !== null && options !== null && options.onLoad !== null && typeof options.onLoad === 'function') {
      const result = options.onLoad(object);
      if (result !== null && result instanceof THREE.Object3D) {
        return result;
      }
    }
    return object;
  }

  /**
   * Collada exporter of local storage service
   */
  private colladaExporter: ColladaExporter = null;

  /**
   * Obj exporter of local storage service
   */
  private objExporter: OBJExporter = null;

  /**
   * Draco exporter of local storage service
   */
  private dracoExporter: DRACOExporter = null;

  /**
   * Gltf exporter of local storage service
   */
  private gltfExporter: GLTFExporter = null;

  /**
   * Mmd exporter of local storage service
   */
  private mmdExporter: MMDExporter = null;

  /**
   * Ply exporter of local storage service
   */
  private plyExporter: PLYExporter = null;

  /**
   * Usdz exporter of local storage service
   */
  private usdzExporter: USDZExporter = null;

  /**
   * Stl exporter of local storage service
   */
  private stlExporter: STLExporter = null;

  /**
   * Gets export object
   * @param fileName
   * @param object
   * @param [options]
   */
  public getExportObject(fileName: string, object: THREE.Object3D | THREE.Object3D[], options?: any) {
    if (fileName.endsWith('.dae')) {
      if (this.colladaExporter === null) {
        this.colladaExporter = new ColladaExporter();
      }
      if (object instanceof THREE.Object3D) {
        this.colladaExporter.parse(
          object,
          (res) => {
            this.saveString(res.data, fileName);
            res.textures.forEach((tex: any) => {
              this.saveArrayBuffer(tex.data, `${tex.name}.${tex.ext}`);
            });
          },
          {}
        );
      }
    } else if (fileName.endsWith('.drc')) {
      if (this.dracoExporter === null) {
        this.dracoExporter = new DRACOExporter();
        window['DracoEncoderModule'] = draco_encoder;
      }
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        const result = this.dracoExporter.parse(object, {});
        this.saveArrayBuffer(result, fileName);
      }
    } else if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
      if (this.gltfExporter === null) {
        this.gltfExporter = new GLTFExporter();
      }
      const fileNameOnly = fileName.substr(0, fileName.lastIndexOf('.'));
      this.gltfExporter.parse(
        object as any,
        (result) => {
          if (result instanceof ArrayBuffer) {
            this.saveArrayBuffer(result, fileNameOnly + '.glb');
          } else {
            const output = JSON.stringify(result, null, 2);
            this.saveString(output, fileNameOnly + '.gltf');
          }
        },
        options
      );
    } else if (fileName.endsWith('.obj')) {
      if (this.objExporter === null) {
        this.objExporter = new OBJExporter();
      }
      const result = this.objExporter.parse(object as any);
      this.saveString(result, fileName);
    } else if (fileName.endsWith('.ply')) {
      if (this.plyExporter === null) {
        this.plyExporter = new PLYExporter();
      }
      this.plyExporter.parse(
        object as any,
        (result: any) => {
          if (result instanceof ArrayBuffer) {
            this.saveArrayBuffer(result, fileName);
          } else {
            this.saveString(result, fileName);
          }
        },
        options
      );
    } else if (fileName.endsWith('.stl')) {
      if (this.stlExporter === null) {
        this.stlExporter = new STLExporter();
      }
      const result: any = this.stlExporter.parse(object as any, options);
      if (result instanceof ArrayBuffer) {
        this.saveArrayBuffer(result, fileName);
      } else {
        this.saveString(result, fileName);
      }
    } else if (fileName.endsWith('.pmd') || fileName.endsWith('.pmx') || fileName.endsWith('.vmd') || fileName.endsWith('.vpd')) {
      if (this.mmdExporter === null) {
        this.mmdExporter = new MMDExporter();
      }
      const result: any = this.mmdExporter.parseVpd(object as any, false, false);
      if (result instanceof ArrayBuffer) {
        this.saveArrayBuffer(result, fileName);
      } else {
        this.saveString(result, fileName);
      }
    } else if (fileName.endsWith('.usdz')) {
      if (this.usdzExporter === null) {
        this.usdzExporter = new USDZExporter();
      }
      const result: any = this.usdzExporter.parse(object as any);
      if (result instanceof ArrayBuffer) {
        this.saveArrayBuffer(result, fileName);
      } else {
        this.saveString(result, fileName);
      }
    }
  }

  /**
   * Saves local storage service
   * @param blob
   * @param filename
   */
  private save(blob, filename) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.parentNode.removeChild(link);
  }

  /**
   * Saves array buffer
   * @param buffer
   * @param filename
   */
  private saveArrayBuffer(buffer, filename) {
    this.save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }

  /**
   * Saves string
   * @param text
   * @param filename
   */
  private saveString(text, filename) {
    this.save(new Blob([text], { type: 'text/plain' }), filename);
  }

  /**
   * Loaded object of local storage service
   */
  private _loadedObject: { [key: string]: LoadedObject } = {};

  /**
   * Gets object from key
   * @param key
   * @param callBack
   * @param options
   */
  public getObjectFromKey(key: string, callBack: (mesh: LoadedObject) => void, options: any): void {
    options = options || {};
    let safeKey = '';
    if (ThreeUtil.isNotNull(options.path)) {
      safeKey = key.substr(key.lastIndexOf('/') + 1);
    } else {
      safeKey = ThreeUtil.getStoreUrl(key);
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
        source: result.source,
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
            result.object = new THREE.Group();
            result.object.add(object);
          }
          callBack(result);
        },
        options
      );
    }
  }

  /**
   * Sets loader with option
   * @param loader
   * @param options
   * @returns
   */
  public setLoaderWithOption(loader: THREE.Loader, options: any) {
    if (ThreeUtil.isNotNull(options)) {
      if (ThreeUtil.isNotNull(loader.setResourcePath)) {
        if (ThreeUtil.isNotNull(options.resourcePath)) {
          loader.setResourcePath(ThreeUtil.getStoreUrl(options.resourcePath));
        }
      }
      if (ThreeUtil.isNotNull(loader.setPath)) {
        if (ThreeUtil.isNotNull(options.path)) {
          loader.setPath(ThreeUtil.getStoreUrl(options.path));
        } else {
          loader.setPath('');
        }
      }
      if (ThreeUtil.isNotNull(loader['setDataType'])) {
        if (ThreeUtil.isNotNull(options.dataType)) {
          loader['setDataType'](ThreeUtil.getTextureDataTypeSafe(options.dataType));
          console.log(ThreeUtil.getTextureDataTypeSafe(options.dataType));
        }
      }
    }
    return loader;
  }

  /**
   * Gets object from key
   * @param key
   * @param callBack
   * @param options
   */
  private _getObjectFromKey(key: string, callBack: (mesh: LoadedObject) => void, options: any): void {
    if (key.endsWith('.dae')) {
      if (this.colladaLoader === null) {
        this.colladaLoader = new ColladaLoader(ThreeUtil.getLoadingManager());
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
        this.objLoader = new OBJLoader(ThreeUtil.getLoadingManager());
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
        this.mtlLoader = new MTLLoader(ThreeUtil.getLoadingManager());
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
        this.tdsLoader = new TDSLoader(ThreeUtil.getLoadingManager());
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
        this.tiltLoader = new TILT.TiltLoader(ThreeUtil.getLoadingManager());
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
        this.amfLoader = new AMFLoader(ThreeUtil.getLoadingManager());
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
    } else if (key.endsWith('.vox')) {
      if (this.voxLoader === null) {
        this.voxLoader = new VOXLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.voxLoader, options);
      this.voxLoader.load(
        key,
        (chunks: Chunk[]) => {
          const object3d = new THREE.Group();
          chunks.forEach((chunk) => {
            object3d.add(new VOXMesh(chunk));
          });
          callBack({
            object: object3d,
            source: chunks,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.exr')) {
      if (this.exrLoader === null) {
        this.exrLoader = new EXRLoader(ThreeUtil.getLoadingManager());
        this.exrLoader.setDataType(THREE.UnsignedByteType);
      }
      this.setLoaderWithOption(this.exrLoader, options);
      this.exrLoader.load(
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
    } else if (key.endsWith('.pvr')) {
      if (this.pvrLoader === null) {
        this.pvrLoader = new PVRLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.pvrLoader, options);
      this.pvrLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture: texture,
            source: texture
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.hdr')) {
      if (this.rgbeLoader === null) {
        this.rgbeLoader = new RGBELoader(ThreeUtil.getLoadingManager());
        this.rgbeLoader.setDataType(THREE.UnsignedByteType);
      }
      this.setLoaderWithOption(this.rgbeLoader, options);
      this.rgbeLoader.load(
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
    } else if (key.endsWith('.ktx')) {
      if (this.ktxLoader === null) {
        this.ktxLoader = new KTXLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.ktxLoader, options);
      this.ktxLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture: texture,
            source: texture,
          });
        },
        this.onProgress,
        this.onError
      );
      
    } else if (key.endsWith('.ifc')) {
      console.log('IFC Loader is not stable!!');
      /*
      if (this.ifcLoader === null) {
        this.ifcLoader = new IFCLoader(ThreeUtil.getLoadingManager());
      }
      if (options.wasmPath) {
        this.ifcLoader.setWasmPath(ThreeUtil.getStoreUrl(options.wasmPath));
      }
      this.setLoaderWithOption(this.ifcLoader, options);
      this.ifcLoader.load(
        key,
        (ifc: IFC) => {
          callBack({
            object: ifc,
            source: ifc
          });
        },
        this.onProgress,
        this.onError
      );
      */
    } else if (key.endsWith('.ktx2')) {
      if (this.ktx2Loader === null) {
        this.ktx2Loader = new KTX2Loader(ThreeUtil.getLoadingManager());
        this.ktx2Loader.detectSupport(new THREE.WebGLRenderer());
      }
      if (options.transcoderPath) {
        this.ktx2Loader.setTranscoderPath(ThreeUtil.getStoreUrl(options.transcoderPath));
      }
      this.setLoaderWithOption(this.ktx2Loader, options);
      this.ktx2Loader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture: texture,
            source: texture,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.dds')) {
      if (this.ddsLoader === null) {
        this.ddsLoader = new DDSLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.ddsLoader, options);
      this.ddsLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture: texture,
            source: texture,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.bvh')) {
      if (this.bvhLoader === null) {
        this.bvhLoader = new BVHLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.bvhLoader, options);
      this.bvhLoader.load(
        key,
        (object: BVH) => {
          if (object.skeleton && object.skeleton.bones && object.skeleton.bones.length > 0) {
            const skeletonHelper = new THREE.SkeletonHelper( object.skeleton.bones[ 0 ] );
            skeletonHelper['skeleton'] = object.skeleton; // allow animation mixer to bind to THREE.SkeletonHelper directly
            callBack({
              object: skeletonHelper,
              clips : [object.clip],
              source: object,
            });
          }
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.fbx')) {
      if (this.fbxLoader === null) {
        this.fbxLoader = new FBXLoader(ThreeUtil.getLoadingManager());
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
        this.kmzLoader = new KMZLoader(ThreeUtil.getLoadingManager());
      }
      if (options.resourcePath) {
        this.kmzLoader.setResourcePath(ThreeUtil.getStoreUrl(options.resourcePath));
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
        this.lwoLoader = new LWOLoader(ThreeUtil.getLoadingManager());
      }
      if (options.resourcePath) {
        this.lwoLoader.setResourcePath(ThreeUtil.getStoreUrl(options.resourcePath));
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
        this.lDrawLoader = new LDrawLoader(ThreeUtil.getLoadingManager());
      }
      if (options.resourcePath) {
        this.lDrawLoader.setResourcePath(ThreeUtil.getStoreUrl(options.resourcePath));
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
        this.gCodeLoader = new GCodeLoader(ThreeUtil.getLoadingManager());
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
    } else if (key.endsWith('.3mf')) {
      if (this.threeMFLoader === null) {
        this.threeMFLoader = new ThreeMFLoader(ThreeUtil.getLoadingManager());
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
        this.rhino3dmLoader = new Rhino3dmLoader(ThreeUtil.getLoadingManager());
        this.rhino3dmLoader.setLibraryPath(ThreeUtil.getStoreUrl('jsm/libs/rhino3dm/'));
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
        this.basisTextureLoader = new BasisTextureLoader(ThreeUtil.getLoadingManager());
        this.basisTextureLoader.detectSupport(new THREE.WebGLRenderer());
      }
      if (options.transcoderPath) {
        this.basisTextureLoader.setTranscoderPath(ThreeUtil.getStoreUrl(options.transcoderPath));
      }
      this.setLoaderWithOption(this.basisTextureLoader, options);
      this.basisTextureLoader.load(
        key,
        (texture: THREE.CompressedTexture) => {
          callBack({
            texture: texture,
            source: texture,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.drc')) {
      if (this.dracoLoader === null) {
        this.dracoLoader = new DRACOLoader(ThreeUtil.getLoadingManager());
        this.dracoLoader.setDecoderPath(ThreeUtil.getStoreUrl('js/libs/draco/'));
        this.dracoLoader.setDecoderConfig({ type: 'js' });
      }
      this.setLoaderWithOption(this.dracoLoader, options);
      this.dracoLoader.load(
        key,
        (geometry: THREE.BufferGeometry) => {
          callBack({
            geometry: geometry,
            source : geometry
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.gltf') || key.endsWith('.glb')) {
      if (this.gltfLoader === null) {
        this.gltfLoader = new GLTFLoader(ThreeUtil.getLoadingManager());
      }
      if (options) {
        if (options.useDraco) {
          if (this.dracoLoader === null) {
            this.dracoLoader = new DRACOLoader(ThreeUtil.getLoadingManager());
          }
          if (options.decoderPath) {
            this.dracoLoader.setDecoderPath(ThreeUtil.getStoreUrl(options.decoderPath));
          }
          this.gltfLoader.setDRACOLoader(this.dracoLoader);
        }
        if (options.useKtx2) {
          if (this.ktx2Loader === null) {
            this.ktx2Loader = new KTX2Loader(ThreeUtil.getLoadingManager());
            this.ktx2Loader.setTranscoderPath(ThreeUtil.getStoreUrl('js/libs/basis/'));
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
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.pmd') || key.endsWith('.pmx') || key.endsWith('.vmd') || key.endsWith('.vpd')) {
      if (this.mmdLoader === null) {
        this.mmdLoader = new MMDLoader(ThreeUtil.getLoadingManager());
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
        this.pcdLoader = new PCDLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.pcdLoader, options);
      this.pcdLoader.load(
        key,
        (points: THREE.Points) => {
          callBack({
            object: points,
            source: points,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.prwm')) {
      if (this.prwmLoader === null) {
        this.prwmLoader = new PRWMLoader(ThreeUtil.getLoadingManager());
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
        this.tgaLoader = new TGALoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.tgaLoader, options);
      this.tgaLoader.load(key, (texture: THREE.Texture) => {
        callBack({
          texture: texture,
          source: texture,
        });
      });
    } else if (key.endsWith('.svg')) {
      if (this.svgLoader === null) {
        this.svgLoader = new SVGLoader(ThreeUtil.getLoadingManager());
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
          paths.forEach((path) => {
            const fillColor = path.userData.style.fill;
            if (drawFillShapes && fillColor !== undefined && fillColor !== 'none') {
              const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setStyle(fillColor),
                opacity: path.userData.style.fillOpacity,
                transparent: path.userData.style.fillOpacity < 1,
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: fillShapesWireframe,
              });
              const shapes = path.toShapes(true);
              shapes.forEach((shape) => {
                const geometry = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(geometry, material);
                group.add(mesh);
              });
            }
            const strokeColor = path.userData.style.stroke;
            if (drawStrokes && strokeColor !== undefined && strokeColor !== 'none') {
              const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setStyle(strokeColor),
                opacity: path.userData.style.strokeOpacity,
                transparent: path.userData.style.strokeOpacity < 1,
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: strokesWireframe,
              });
              path.subPaths.forEach((subPath) => {
                const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                if (geometry) {
                  const mesh = new THREE.Mesh(geometry, material);
                  group.add(mesh);
                }
              });
            }
          });
          callBack({
            object: group,
            source: data,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.ply')) {
      if (this.plyLoader === null) {
        this.plyLoader = new PLYLoader(ThreeUtil.getLoadingManager());
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
        this.vtkLoader = new VTKLoader(ThreeUtil.getLoadingManager());
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
      /*
      if (this.xLoader === null) {
        this.xLoader = new XLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.xLoader, options);
      this.xLoader.load(
        key,
        (object: XResult) => {
          callBack({
            object: object.models[0],
            source: object,
          });
        },
        this.onProgress,
        this.onError
      );
      */
    } else if (key.endsWith('.mdd')) {
      if (this.mddLoader === null) {
        this.mddLoader = new MDDLoader(ThreeUtil.getLoadingManager());
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
        this.nrrdLoader = new NRRDLoader(ThreeUtil.getLoadingManager());
      }
      this.nrrdLoader.load(
        key,
        (volume: Volume) => {
          const group = new THREE.Group();
					const geometry = new THREE.BoxGeometry( volume.xLength, volume.yLength, volume.zLength );
					const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
					const cube = new THREE.Mesh( geometry, material );
					cube.visible = false;
          cube.name = 'box';
          cube.userData.volume = volume;
					const box = new THREE.BoxHelper( cube );
          box.name = 'helper';
					box.applyMatrix4( volume.matrix as any );
					group.add( box );
					//z plane
          const rasDimensions = (volume as any).RASDimensions;
					const sliceZ = volume.extractSlice( 'z', Math.floor( rasDimensions[ 2 ] / 4 ) );
          sliceZ.mesh.name = 'z';
          sliceZ.mesh.userData.volumeSlice = sliceZ;
					group.add( sliceZ.mesh );
					//y plane
					const sliceY = volume.extractSlice( 'y', Math.floor( rasDimensions[ 1 ] / 2 ) );
          sliceY.mesh.name = 'y';
          sliceY.mesh.userData.volumeSlice = sliceY;
					group.add( sliceY.mesh );
					//x plane
					const sliceX = volume.extractSlice( 'x', Math.floor( rasDimensions[ 0 ] / 2 ) );
          sliceX.mesh.name = 'x';
          sliceX.mesh.userData.volumeSlice = sliceX;
					group.add( sliceX.mesh );
          callBack({
            object : group,
            source: volume,
          });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.md2')) {
      const optionType = (options.type || '').toLowerCase();
      if (optionType === 'md2character') {
        const character = new MD2Character();
        options.baseUrl = ThreeUtil.getStoreUrl(options.baseUrl);
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
        options.baseUrl = ThreeUtil.getStoreUrl(options.baseUrl);
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
          this.md2Loader = new MD2Loader(ThreeUtil.getLoadingManager());
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
        this.pdbLoader = new PDBLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.pdbLoader, options);
      this.pdbLoader.load(
        key,
        (pdb: PDB) => {
          const geometryAtoms = pdb.geometryAtoms;
          const geometryBonds = pdb.geometryBonds;
          const json = pdb.json;
          const cssType: string = options.cssType || 'css2d';
          const group = new THREE.Mesh();
          const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
          const sphereGeometry = new THREE.IcosahedronBufferGeometry(1, 3);
          let positions = geometryAtoms.getAttribute('position');
          const colors = geometryAtoms.getAttribute('color');
          const position = new THREE.Vector3();
          const color = new THREE.Color();
          const tmpVec = new THREE.Vector3();
          for (let i = 0; i < positions.count; i++) {
            position.x = positions.getX(i);
            position.y = positions.getY(i);
            position.z = positions.getZ(i);
            color.r = colors.getX(i);
            color.g = colors.getY(i);
            color.b = colors.getZ(i);
            const material = new THREE.MeshPhongMaterial({ color: color.clone() });
            const object = new THREE.Mesh(sphereGeometry, material);
            object.name = 'atom';
            object.position.copy(position);
            object.position.multiplyScalar(75);
            object.scale.multiplyScalar(25);
            group.add(object);
            const atom = json.atoms[i];
            const text = document.createElement('div');
            text.className = 'label';
            text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
            text.style.marginTop = '1.5em';
            text.textContent = atom[4];
            let label: THREE.Object3D = null;
            switch (cssType.toLowerCase()) {
              case '3d':
              case 'css3d':
                label = new CSS3DObject(text);
                break;
              default:
                label = new CSS2DObject(text);
                break;
            }
            label.name = 'label';
            const labelPostion = object.position.clone();
            labelPostion.y += 13;
            label.position.copy(labelPostion);
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
            const bond = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
            bond.name = 'bone';
            bond.position.copy(start);
            bond.position.lerp(end, 0.5);
            bond.scale.set(5, 5, start.distanceTo(end));
            bond.lookAt(end);
            group.add(bond);
          }
          callBack({ object: group, geometry: null, source: pdb });
        },
        this.onProgress,
        this.onError
      );
    } else if (key.endsWith('.stl')) {
      if (this.stlLoader === null) {
        this.stlLoader = new STLLoader(ThreeUtil.getLoadingManager());
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
    } else if (key.endsWith('.wrl')) {
      if (this.vrmlLoader === null) {
        this.vrmlLoader = new VRMLLoader(ThreeUtil.getLoadingManager());
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
        this.xyzLoader = new XYZLoader(ThreeUtil.getLoadingManager());
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
        this.vrmLoader = new VRMLoader(ThreeUtil.getLoadingManager());
      }
      this.setLoaderWithOption(this.vrmLoader, options);
      this.vrmLoader.load(
        key,
        (vrm: GLTF) => {
          vrm.scene.traverse((object) => {
            if (object instanceof THREE.Mesh && object.material) {
              if (Array.isArray(object.material)) {
                for (let i = 0, il = object.material.length; i < il; i++) {
                  const objectMaterial = object.material[i];
                  const material = new THREE.MeshPhongMaterial();
                  THREE.Material.prototype.copy.call(material, object.material[i]);
                  material.color.copy(objectMaterial['color']);
                  material.map = objectMaterial['map'];
                  // material.skinning = objectMaterial['skinning'];
                  material.morphTargets = objectMaterial['morphTargets'];
                  material.morphNormals = objectMaterial['morphNormals'];
                  object.material[i] = material;
                }
              } else {
                const objectMaterial = object.material;
                const material = new THREE.MeshPhongMaterial();
                THREE.Material.prototype.copy.call(material, object.material);
                material.color.copy(objectMaterial['color']);
                material.map = objectMaterial['map'];
                // material.skinning = objectMaterial['skinning'];
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
        this.rgbmLoader = new RGBMLoader(ThreeUtil.getLoadingManager());
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
          switch (loaderType.toLowerCase()) {
            case 'lottie':
              if (this.lottieLoader === null) {
                this.lottieLoader = new LottieLoader(ThreeUtil.getLoadingManager());
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
                    texture: texture,
                    source: texture,
                  });
                  window.setTimeout(() => {
                    texture['animation'].play();
                  }, 1000);
                },
                this.onProgress,
                this.onError
              );
              break;
            default:
              if (this.objectLoader === null) {
                this.objectLoader = new THREE.ObjectLoader(ThreeUtil.getLoadingManager());
              }
              this.setLoaderWithOption(this.objectLoader, options);
              this.objectLoader.load(
                key,
                (result) => {
                  callBack({
                    object: result,
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
            this.geometryLoader = new THREE.BufferGeometryLoader(ThreeUtil.getLoadingManager());
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

  /**
   * Gets object
   * @param key
   * @param callBack
   * @param [options]
   */
  public getObject(key: string, callBack: (mesh: THREE.Object3D, clips?: THREE.AnimationClip[], geometry?: THREE.BufferGeometry, morphTargets?: any, source?: any) => void, options?: any): void {
    this.getObjectFromKey(
      key,
      (result) => {
        callBack(result.object, result.clips, result.geometry, result.morphTargets, result.source);
      },
      options
    );
  }

  /**
   * Gets geometry
   * @param key
   * @param callBack
   * @param [options]
   */
  public getGeometry(key: string, callBack: (mesh: THREE.BufferGeometry, source?: any) => void, options?: any): void {
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

  /**
   * Gets texture
   * @param key
   * @param callBack
   * @param [options]
   */
  public getTexture(key: string, callBack: (texture: THREE.Texture, source?: any) => void, options?: any): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.texture instanceof THREE.Texture) {
          callBack(result.texture, result.source);
        } else if (result.material instanceof THREE.Material && result.material['map'] instanceof THREE.Texture) {
          callBack(result.material['map'], result.source);
        } else {
          callBack(new THREE.Texture());
        }
      },
      Object.assign(options || {}, { texture: true })
    );
  }

  /**
   * Gets material
   * @param key
   * @param callBack
   * @param [options]
   */
  public getMaterial(key: string, callBack: (material: THREE.Material, source?: any) => void, options?: any): void {
    this.getObjectFromKey(
      key,
      (result) => {
        if (result.material instanceof THREE.Material) {
          callBack(result.material, result.source);
        } else if (result.texture instanceof THREE.Texture) {
          const material = new THREE.MeshLambertMaterial();
          material.map = result.texture;
          callBack(material, result.source);
        }
      },
      options
    );
  }

  /**
   * Sets scene
   * @param key
   * @param scene
   */
  public setScene(key: string, scene: THREE.Scene) {
    this.setItem(key, JSON.stringify(scene.toJSON()));
  }

  /**
   * Gets scene
   * @param key
   * @param callBack
   * @param [options]
   */
  public getScene(key: string, callBack: (mesh: THREE.Scene, source?: any) => void, options?: any): void {
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

  /**
   * Gets font
   * @param callBack
   * @param [fontName]
   * @param [fontWeight]
   */
  public getFont(callBack: (font: THREE.Font) => void, fontName: string = 'helvetiker', fontWeight: string = '') {
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
            fontPath = 'fonts/helvetiker_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = 'fonts/helvetiker_regular.typeface.json';
            break;
        }
        break;
      case 'gentilis':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = 'fonts/gentilis_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = 'fonts/gentilis_regular.typeface.json';
            break;
        }
        break;
      case 'optimer':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = 'fonts/optimer_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = 'fonts/optimer_regular.typeface.json';
            break;
        }
        break;
      case 'sans':
      case 'droid_sans':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = 'fonts/droid/droid_sans_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = 'fonts/droid/droid_sans_regular.typeface.json';
            break;
        }
        break;
      case 'sans_mono':
      case 'droid_sans_mono':
        fontPath = 'fonts/droid/droid_sans_mono_regular.typeface.json';
        break;
      case 'serif':
      case 'droid_serif':
        switch (fontWeight.toLowerCase()) {
          case 'bold':
            fontPath = 'fonts/droid/droid_serif_bold.typeface.json';
            break;
          case 'regular':
          default:
            fontPath = 'fonts/droid/droid_serif_regular.typeface.json';
            break;
        }
        break;
      case 'nanumgothic':
        fontPath = 'fonts/nanum/nanumgothic_regular.typeface.json';
        break;
      case 'dohyeon':
      case 'do_hyeon':
        fontPath = 'fonts/nanum/do_hyeon_regular.typeface.json';
        break;
      default:
        if (fontName.startsWith('/') || fontName.startsWith('http://') || fontName.startsWith('https://') || fontName.endsWith('.json') || fontName.endsWith('.ttf')) {
          if (fontName.endsWith('.json')) {
            fontPath = fontName;
          } else if (fontName.endsWith('.ttf')) {
            fontPath = fontName;
          } else {
            fontPath = fontName + '_' + fontWeight + '.typeface.json';
          }
        } else {
          fontPath = 'fonts/helvetiker_regular.typeface.json';
        }
        break;
    }
    if (ThreeUtil.isNotNull(this._loadedFonts[fontPath])) {
      window.setTimeout(() => {
        callBack(this._loadedFonts[fontPath]);
      }, 1);
    } else {
      if (fontPath.endsWith('.ttf')) {
        if (this.ttfLoader === null) {
          this.ttfLoader = new TTFLoader(ThreeUtil.getLoadingManager());
        }
        this.ttfLoader.load(ThreeUtil.getStoreUrl(fontPath), (json: any) => {
          this._loadedFonts[fontPath] = new THREE.Font(json);
          callBack(this._loadedFonts[fontPath]);
        });
      } else {
        if (this.fontLoader === null) {
          this.fontLoader = new THREE.FontLoader(ThreeUtil.getLoadingManager());
        }
        this.fontLoader.load(ThreeUtil.getStoreUrl(fontPath), (responseFont: THREE.Font) => {
          this._loadedFonts[fontPath] = responseFont;
          callBack(this._loadedFonts[fontPath]);
        });
      }
    }
  }

  /**
   * Loaded fonts of local storage service
   */
  private _loadedFonts: {
    [key: string]: THREE.Font;
  } = {};

  /**
   * Font loader of local storage service
   */
  private fontLoader: THREE.FontLoader = null;

  /**
   * Removes item
   * @param key
   */
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clears local storage service
   */
  public clear() {
    localStorage.clear();
  }
}
