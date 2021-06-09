import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { unzipSync } from 'three/examples/jsm/libs/fflate.module.min';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';
import { Lut } from 'three/examples/jsm/math/Lut';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { CanvasFunctionType, TextureUtils } from './textureUtils';

@Component({
  selector: 'three-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.scss'],
})
export class TextureComponent extends AbstractSubscribeComponent implements OnInit, OnDestroy {
  @Input() private refer: any = null;
  @Input() public textureType: string = 'map';
  @Input() private loaderType: string = null;
  @Input() public name: string = null;
  @Input() private image: string = null;
  @Input() private premultiplyAlpha: boolean = null;
  @Input() private cubeImage: string[] = null;
  @Input() private storageName: string = null;
  @Input() private storageOption: any = null;
  @Input() private program: CanvasFunctionType | string = null;
  @Input() private text: string = null;
  @Input() private canvas: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap | string = null;
  @Input() private mapping: string = null;
  @Input() private wrap: string = null;
  @Input() private wrapS: string = null;
  @Input() private wrapT: string = null;
  @Input() private filter: string = null;
  @Input() private magFilter: string = null;
  @Input() private minFilter: string = null;
  @Input() private format: string = null;
  @Input() public type: string = null;
  @Input() private anisotropy: number = null;
  @Input() private unpackAlignment: number = null;
  @Input() private encoding: string = null;
  @Input() private repeat: number = null;
  @Input() private repeatX: number = null;
  @Input() private repeatY: number = null;
  @Input() private offset: number = null;
  @Input() private offsetX: number = null;
  @Input() private offsetY: number = null;
  @Input() private width: number = null;
  @Input() private height: number = null;
  @Input() private perlin: any = null;
  @Input() private sunX: number = null;
  @Input() private sunY: number = null;
  @Input() private sunZ: number = null;
  @Input() private generateMipmaps: boolean = null;
  @Input() private useDropImage: boolean = false;
  @Input() private color: number | string = null;
  @Input() private add: number | string = null;
  @Input() private rotation: number = null;
  @Input() private flipY: boolean = null;

  private getImage(def?: string): string {
    return ThreeUtil.getTypeSafe(this.image, def);
  }

  private getCubeImage(def?: string[]): string[] {
    return ThreeUtil.getTypeSafe(this.cubeImage, def);
  }

  private getProgram(def?: CanvasFunctionType | string): CanvasFunctionType | string {
    return ThreeUtil.getTypeSafe(this.program, def);
  }

  private getCanvas(def?: string): HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap {
    if (ThreeUtil.isNull(this.canvas) || typeof this.canvas === 'string') {
      const canvas = ThreeUtil.getTypeSafe(this.canvas, def, '') as string;
      switch (canvas.toLowerCase()) {
        case 'lut':
        default:
          return new Lut().createCanvas();
      }
    } else {
      return this.canvas;
    }
  }

  private getRepeat(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.repeatX, this.repeat), ThreeUtil.getTypeSafe(this.repeatY, this.repeat), new THREE.Vector2(defX, defY));
  }

  private getOffset(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.offsetX, this.offset), ThreeUtil.getTypeSafe(this.offsetY, this.offset), new THREE.Vector2(defX, defY));
  }

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('texture');
  }

  ngOnDestroy(): void {
    if (this.texture != null) {
      this.texture.dispose();
    }
    if (this.refTexture != null) {
      this.refTexture.dispose();
    }
    if (this.useDropImage) {
      this.setUseDropImage(false);
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.texture) {
      this.addChanges(changes);
      // this.setUseDropImage(this.useDropImage); // todo
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private setUseDropImage(useDropImage: boolean) {
    if (useDropImage) {
      if (this._dragOverHandler === null) {
        this._dragOverHandler = (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
        };
        document.addEventListener('dragover', this._dragOverHandler);
      }
      if (this._dragEnterHandler === null) {
        this._dragEnterHandler = () => {
          document.body.style.opacity = (0.5).toString();
        };
        document.addEventListener('dragenter', this._dragEnterHandler);
      }
      if (this._dragLeaveHandler === null) {
        this._dragLeaveHandler = () => {
          document.body.style.opacity = (1).toString();
        };
        document.addEventListener('dragleave', this._dragLeaveHandler);
      }
      if (this._dropHandler === null) {
        this._dropHandler = (event) => {
          event.preventDefault();
          if (this.texture !== null) {
            const texture = this.texture;
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
              texture.image.src = event.target.result;
              texture.needsUpdate = true;
            });
            reader.readAsDataURL(event.dataTransfer.files[0]);
          }
          document.body.style.opacity = (1).toString();
        };
        document.addEventListener('drop', this._dropHandler);
      }
    } else {
      if (this._dragOverHandler !== null) {
        document.removeEventListener('dragover', this._dragOverHandler);
        this._dragOverHandler = null;
      }
      if (this._dragEnterHandler !== null) {
        document.removeEventListener('dragenter', this._dragEnterHandler);
        this._dragEnterHandler = null;
      }
      if (this._dragLeaveHandler !== null) {
        document.removeEventListener('dragleave', this._dragLeaveHandler);
        this._dragLeaveHandler = null;
      }
      if (this._dropHandler !== null) {
        document.removeEventListener('drop', this._dropHandler);
        this._dropHandler = null;
      }
    }
  }

  private _dragOverHandler = null;
  private _dragEnterHandler = null;
  private _dragLeaveHandler = null;
  private _dropHandler = null;

  private refTexture: THREE.Texture = null;
  private texture: THREE.Texture = null;
  static textureLoader: THREE.TextureLoader = null;
  static nrrdLoader: NRRDLoader = null;
  static fileLoader: THREE.FileLoader = null;
  static cubeTextureLoader: THREE.CubeTextureLoader = null;
  static imageBitmapLoader: THREE.ImageBitmapLoader = null;
  static hdrCubeMapLoader: HDRCubeTextureLoader = null;
  static rgbmLoader: RGBMLoader = null;

  getTextureImage(image: string, cubeImage?: string[], program?: CanvasFunctionType | string , onLoad?: () => void): THREE.Texture {
    return TextureComponent.getTextureImage(
      image,
      cubeImage,
      program,
      {
        width: this.width,
        height: this.height,
        type: this.loaderType,
        text: this.text,
      },
      onLoad
    );
  }

  static getTextureImageOption(image: any, optionsTxt?: string, loadType?: string, cubeImage?: string[], onLoad? : () => void ): THREE.Texture {
    const loadOption: { [key: string]: any } = {
      width: 10,
      height: 10,
      type: loadType,
    };
    const textureOption: { [key: string]: any } = {};
    if (ThreeUtil.isNotNull(optionsTxt)) {
      const optionsList = optionsTxt.split(',');
      optionsList.forEach((option) => {
        switch (option.toLowerCase()) {
          case 'nearestfilter':
          case 'nearest':
          case 'nearestmipmapnearestfilter':
          case 'nearestmipmapnearest':
          case 'nearestmipmaplinearfilter':
          case 'nearestmipmaplinear':
          case 'linearmipmapnearestfilter':
          case 'linearmipmapnearest':
          case 'linearmipmaplinearfilter':
          case 'linearmipmaplinear':
          case 'linearfilter':
          case 'linear':
            textureOption.minFilter = textureOption.magFilter = ThreeUtil.getTypeSafe(option, 'LinearMipmapLinearFilter');
            break;
          case 'minnearestfilter':
          case 'minnearest':
          case 'minnearestmipmapnearestfilter':
          case 'minnearestmipmapnearest':
          case 'minnearestmipmaplinearfilter':
          case 'minnearestmipmaplinear':
          case 'minlinearmipmapnearestfilter':
          case 'minlinearmipmapnearest':
          case 'minlinearmipmaplinearfilter':
          case 'minlinearmipmaplinear':
          case 'minlinearfilter':
          case 'minlinear':
            textureOption.minFilter = ThreeUtil.getTypeSafe(option.substr(3), 'LinearMipmapLinearFilter');
            break;
          case 'magnearestfilter':
          case 'magnearest':
          case 'magnearestmipmapnearestfilter':
          case 'magnearestmipmapnearest':
          case 'magnearestmipmaplinearfilter':
          case 'magnearestmipmaplinear':
          case 'maglinearmipmapnearestfilter':
          case 'maglinearmipmapnearest':
          case 'maglinearmipmaplinearfilter':
          case 'maglinearmipmaplinear':
          case 'maglinearfilter':
          case 'maglinear':
            textureOption.magFilter = ThreeUtil.getTypeSafe(option.substr(3), 'LinearFilter');
            break;
          case 'repeatwrapping':
          case 'repeat':
          case 'mirroredrepeatwrapping':
          case 'mirroredrepeat':
          case 'clamptoedgewrapping':
          case 'clamptoedge':
          case 'wraprepeat':
            textureOption.wrapS = textureOption.wrapT = ThreeUtil.getTypeSafe(option, 'repeat');
            break;
          case 'wrapsrepeatwrapping':
          case 'wrapsrepeat':
          case 'wrapsmirroredrepeatwrapping':
          case 'wrapsmirroredrepeat':
          case 'wrapsclamptoedgewrapping':
          case 'wrapsclamptoedge':
            textureOption.wrapS = ThreeUtil.getTypeSafe(option.substr(4), 'repeat');
            break;
          case 'wraptrepeatwrapping':
          case 'wraptrepeat':
          case 'wraptmirroredrepeatwrapping':
          case 'wraptmirroredrepeat':
          case 'wraptclamptoedgewrapping':
          case 'wraptclamptoedge':
            textureOption.wrapT = ThreeUtil.getTypeSafe(option.substr(4), 'repeat');
            break;
          case 'alphaformat':
          case 'alpha':
          case 'redformat':
          case 'red':
          case 'redintegerformat':
          case 'redinteger':
          case 'rgformat':
          case 'rg':
          case 'rgintegerformat':
          case 'rginteger':
          case 'rgbformat':
          case 'rgb':
          case 'rgbintegerformat':
          case 'rgbinteger':
          case 'rgbaintegerformat':
          case 'rgbainteger':
          case 'luminanceformat':
          case 'luminance':
          case 'luminancealphaformat':
          case 'luminancealpha':
          case 'rgbeformat':
          case 'rgbe':
          case 'depthformat':
          case 'depth':
          case 'depthstencilformat':
          case 'depthstencil':
          case 'rgbaformat':
          case 'rgba':
            textureOption.format = ThreeUtil.getTypeSafe(option, 'rgba');
            break;
          case 'bytetype':
          case 'byte':
          case 'shorttype':
          case 'short':
          case 'unsignedshorttype':
          case 'unsignedshort':
          case 'inttype':
          case 'int':
          case 'unsignedinttype':
          case 'unsignedint':
          case 'floattype':
          case 'float':
          case 'halffloattype':
          case 'halffloat':
          case 'unsignedshort4444type':
          case 'unsignedshort4444':
          case 'unsignedshort5551type':
          case 'unsignedshort5551':
          case 'unsignedshort565type':
          case 'unsignedshort565':
          case 'unsignedint248type':
          case 'unsignedint248':
          case 'unsignedbytetype':
          case 'unsignedbyte':
            textureOption.type = ThreeUtil.getTypeSafe(option, 'unsignedbyte');
            break;
          case 'srgbencoding':
          case 'srgb':
          case 'gammaencoding':
          case 'gamma':
          case 'rgbeencoding':
          case 'rgbe':
          case 'logluvencoding':
          case 'logluv':
          case 'rgbm7encoding':
          case 'rgbm7':
          case 'rgbm16encoding':
          case 'rgbm16':
          case 'rgbdencoding':
          case 'rgbd':
          case 'linearencoding':
            textureOption.encoding = ThreeUtil.getTypeSafe(option, 'linearencoding');
            break;
          case 'uvmapping':
          case 'uv':
          case 'cubereflectionmapping':
          case 'cubereflection':
          case 'cuberefractionmapping':
          case 'cuberefraction':
          case 'equirectangularreflectionmapping':
          case 'equirectangularreflection':
          case 'equirectangularrefractionmapping':
          case 'equirectangularrefraction':
          case 'cubeuvreflectionmapping':
          case 'cubeuvreflection':
          case 'cubeuvrefractionmapping':
          case 'cubeuvrefraction':
            textureOption.mapping = ThreeUtil.getTypeSafe(option, 'default');
            break;
          case 'image':
          case 'texture2d':
          case 'texture3d':
          case 'texture':
          case 'datatexture2d':
          case 'datatexture3d':
          case 'datatexture':
          case 'video':
          case 'videotexture':
            loadOption.type = option;
            break;
          default:
            if (option.indexOf('=') > 0) {
              const [key, value] = option.split('=');
              switch (key.toLowerCase()) {
                case 'size':
                  const [width, height, depth] = (option + 'xxx').split('x');
                  loadOption.width = parseInt(width);
                  loadOption.height = parseInt(height) || loadOption.width;
                  loadOption.depth = parseInt(depth) || loadOption.width;
                  break;
                case 'width':
                case 'height':
                case 'depth':
                  loadOption[key.toLowerCase()] = parseInt(value);
                  break;
                case 'loadtype':
                  loadOption.type = value;
                  break;
                case 'name':
                case 'filename':
                  loadOption.fileName = value;
                  break;
                case 'rotation':
                case 'unpackalignment':
                case 'anisotropy':
                  textureOption[key.toLowerCase()] = parseFloat(value);
                  break;
                case 'mapping':
                case 'wraps':
                case 'wrapt':
                case 'magfilter':
                case 'minfilter':
                case 'format':
                case 'type':
                case 'encoding':
                  textureOption[key.toLowerCase()] = value;
                  break;
                case 'premultiplyalpha':
                case 'generatemipmaps':
                case 'flipy':
                  textureOption[key.toLowerCase()] = ThreeUtil.getBooleanSafe(value, false);
                  break;
                case 'repeat':
                case 'offset':
                  let [x, y] = (value + 'xx').split('x');
                  if (y === '') {
                    y = x;
                  }
                  textureOption[key.toLowerCase()] = ThreeUtil.getVector2Safe(parseFloat(x), parseFloat(y), null, null, true);
                  break;
              }
            }
        }
      });
    }
    let texture: THREE.Texture = null;
    if (image instanceof TextureComponent) {
      texture = image.getTexture();
    } else if (image instanceof THREE.Texture) {
      texture = image;
    } else {
      texture = this.getTextureImage(image, cubeImage, null, loadOption, () => {
        this.setTextureOptions(texture, textureOption);
        if (ThreeUtil.isNotNull(onLoad)) {
          onLoad();
        }
      });
    }
    return texture;
  }

  static getTextureImage(image: string, cubeImage?: string[], program?: CanvasFunctionType | string , options?: any, onLoad?: () => void): THREE.Texture {
    options = options || {};
    onLoad = onLoad || (() => {});
    const loadType = options.type || '';
    if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length > 0) {
      cubeImage = ThreeUtil.getCubeImage(cubeImage);
      switch ((loadType || 'cubetexture').toLowerCase()) {
        case 'hdrcube':
        case 'hdrcubetexture':
          if (this.hdrCubeMapLoader == null) {
            this.hdrCubeMapLoader = new HDRCubeTextureLoader(ThreeUtil.getLoadingManager());
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.hdrCubeMapLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          const cubeTexture = new THREE.CubeTexture();
          this.hdrCubeMapLoader.setDataType(THREE.UnsignedByteType);
          this.hdrCubeMapLoader.load(cubeImage, (hdrCubeMap) => {
            cubeTexture.copy(hdrCubeMap);
            cubeTexture.needsUpdate = true;
            onLoad();
          });
          return cubeTexture;
        case 'rgbm':
        case 'rgbmtexture':
          if (this.rgbmLoader == null) {
            this.rgbmLoader = new RGBMLoader(ThreeUtil.getLoadingManager());
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.rgbmLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          const rgbmTexture = new THREE.CubeTexture();
          this.rgbmLoader.loadCubemap(cubeImage, (rgbmCube) => {
            rgbmTexture.copy(rgbmCube);
            rgbmTexture.needsUpdate = true;
            onLoad();
          });
          return rgbmTexture;
        default:
          if (this.cubeTextureLoader === null) {
            this.cubeTextureLoader = new THREE.CubeTextureLoader(ThreeUtil.getLoadingManager());
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.cubeTextureLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          return this.cubeTextureLoader.load(cubeImage, () => {
            onLoad();
          });
      }
    } else if (ThreeUtil.isNotNull(image) && image !== '') {
      switch ((loadType || 'texture').toLowerCase()) {
        case 'video':
          const video = document.createElement('video');
          const videoTexture = new THREE.VideoTexture(video);
          video.loop = true;
          video.muted = true;
          video.crossOrigin = 'anonymous';
          video.autoplay = true;
          video.src = ThreeUtil.getStoreUrl(image);
          video.load();
          try {
            video.play();
          } catch (e) {
            setTimeout(() => {
              video.play();
            }, 10);
          }
          return videoTexture;
        case 'imagebitmap':
        case 'image':
        case 'texture':
        case 'texture2d':
        case 'texture3d':
        case 'datatexture':
        case 'datatexture2d':
        case 'datatexture3d':
        default:
          if (image.endsWith('.zip')) {
            if (this.fileLoader === null) {
              this.fileLoader = new THREE.FileLoader(ThreeUtil.getLoadingManager());
              this.fileLoader.setResponseType('arraybuffer');
            }
            let texture: THREE.Texture = null;
            const width = options.width || 1;
            const height = options.height || 1;
            const depth = options.depth || 1;
            switch ((loadType || 'texture').toLowerCase()) {
              case 'datatexture2d':
              case 'texture2d':
                texture = new THREE.DataTexture2DArray(null, width, height, depth);
                break;
              case 'datatexture3d':
              case 'texture3d':
                texture = new THREE.DataTexture3D(null, width, height, depth);
                break;
              case 'texture':
              case 'datatexture':
              default:
                texture = new THREE.DataTexture(null, width, height);
                break;
            }
            this.fileLoader.load(ThreeUtil.getStoreUrl(image), (data) => {
              const zip = unzipSync(new Uint8Array(data as ArrayBuffer));
              let fileName = (options.fileName || '').toLowerCase();
              let fileObject = null;
              Object.entries(zip).forEach(([key, value]) => {
                if (fileObject === null || key.toLowerCase() === fileName) {
                  fileObject = value;
                }
              });
              texture.image.data = new Uint8Array(fileObject.buffer);
              texture.needsUpdate = true;
              onLoad();
            });
            return texture;
          } else if (image.endsWith('.nrrd')) {
            if (this.nrrdLoader === null) {
              this.nrrdLoader = new NRRDLoader(ThreeUtil.getLoadingManager());
            }
            const texture = new THREE.DataTexture3D(null, 1, 1, 1);
            this.nrrdLoader.load(ThreeUtil.getStoreUrl(image), (volume) => {
              texture.image = {
                data: volume.data,
                width: volume.xLength,
                height: volume.yLength,
                depth: volume.zLength,
              };
              texture.needsUpdate = true;
              onLoad();
            });
            return texture;
          } else {
            switch ((loadType || 'texture').toLowerCase()) {
              case 'datatexture':
              case 'datatexture2d':
              case 'datatexture3d':
                return TextureUtils.dataTexture(image, () => {
                  onLoad();
                });
              default :
                if (this.textureLoader === null) {
                  this.textureLoader = new THREE.TextureLoader(ThreeUtil.getLoadingManager());
                }
                const texture = this.textureLoader.load(ThreeUtil.getStoreUrl(image), () => {
                  texture.needsUpdate = true;
                  onLoad();
                });
                return texture;
            }
          }
      }
    } else {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const canvasWidth: number = ThreeUtil.getTypeSafe(options.width, 32);
      const canvasHeight: number = ThreeUtil.getTypeSafe(options.height, 32);
      const text: string = ThreeUtil.getTypeSafe(options.text, '');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      if (ThreeUtil.isNotNull(program)) {
        const _context = canvas.getContext('2d', {
          alpha: true,
        });
        TextureUtils.drawCanvas(program, _context, text, canvasWidth, canvasHeight);
      }
      return new THREE.CanvasTexture(canvas);
    }
  }

  setTexture(refTexture: THREE.Texture) {
    if (this.refTexture !== refTexture) {
      this.refTexture = refTexture;
      this.refTexture.copy(this.getTexture());
    }
  }

  setReferTexture(texture: any) {
    if (texture instanceof HTMLVideoElement) {
      this.texture = new THREE.VideoTexture(texture);
    } else if (texture instanceof THREE.Texture) {
      this.texture = texture;
    }
    if (texture !== null && this.texture !== null && this.refTexture !== null) {
      this.refTexture.copy(this.getTexture());
    }
  }

  getTextureOptions(options: { [key: string]: any } = {}): { [key: string]: any } {
    if (ThreeUtil.isNotNull(this.mapping)) {
      options.mapping = this.mapping;
    }
    if (ThreeUtil.isNotNull(this.wrapS) || ThreeUtil.isNotNull(this.wrap)) {
      options.wrapS = ThreeUtil.getTypeSafe(this.wrapS, this.wrap, 'clamptoedge');
    }
    if (ThreeUtil.isNotNull(this.wrapT) || ThreeUtil.isNotNull(this.wrap)) {
      options.wrapT = ThreeUtil.getTypeSafe(this.wrapS, this.wrap, 'clamptoedge');
    }
    if (ThreeUtil.isNotNull(this.flipY)) {
      options.flipY = ThreeUtil.getTypeSafe(this.flipY, true);
    }
    if (ThreeUtil.isNotNull(this.rotation)) {
      options.rotation = this.rotation;
    }
    if (ThreeUtil.isNotNull(this.premultiplyAlpha)) {
      options.premultiplyAlpha = this.premultiplyAlpha;
    }
    if (ThreeUtil.isNotNull(this.magFilter)) {
      options.magFilter = ThreeUtil.getTypeSafe(this.magFilter, this.filter, 'linearmipmaplinear');
    }
    if (ThreeUtil.isNotNull(this.minFilter) || ThreeUtil.isNotNull(this.filter)) {
      options.minFilter = ThreeUtil.getTypeSafe(this.minFilter, this.filter, 'linearmipmaplinear');
    }
    if (ThreeUtil.isNotNull(this.format)) {
      options.format = this.format;
    }
    if (ThreeUtil.isNotNull(this.type)) {
      options.type = this.type;
    }
    if (ThreeUtil.isNotNull(this.anisotropy)) {
      options.anisotropy = this.anisotropy;
    }
    if (ThreeUtil.isNotNull(this.unpackAlignment)) {
      options.unpackAlignment = this.unpackAlignment;
    }
    if (ThreeUtil.isNotNull(this.generateMipmaps)) {
      options.generateMipmaps = this.generateMipmaps;
    }
    if (ThreeUtil.isNotNull(this.encoding)) {
      options.encoding = this.encoding;
    }
    if ((ThreeUtil.isNotNull(this.repeatX) && ThreeUtil.isNotNull(this.repeatY)) || ThreeUtil.isNotNull(this.repeat)) {
      options.repeat = this.getRepeat(1, 1);
    }
    if ((ThreeUtil.isNotNull(this.offsetX) && ThreeUtil.isNotNull(this.offsetY)) || ThreeUtil.isNotNull(this.offset)) {
      options.offset = this.getOffset(0, 0);
    }
    if (this.debug) {
      this.consoleLog('texture-option', options);
    }
    return options;
  }

  static setTextureOptions(texture: THREE.Texture, options: { [key: string]: any } = {}): THREE.Texture {
    if (options == {}) {
      return;
    }
    Object.entries(options).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value)) {
        switch (key.toLowerCase()) {
          case 'mapping':
            texture.mapping = ThreeUtil.getMappingSafe(value);
            break;
          case 'wraps':
            texture.wrapS = ThreeUtil.getWrappingSafe(value, 'clamptoedge');
            break;
          case 'wrapt':
            texture.wrapT = ThreeUtil.getWrappingSafe(value, 'clamptoedge');
            break;
          case 'flipy':
            texture.flipY = ThreeUtil.getTypeSafe(value, true);
            break;
          case 'rotation':
            texture.rotation = ThreeUtil.getAngleSafe(value, 0);
            break;
          case 'premultiplyalpha':
            texture.premultiplyAlpha = ThreeUtil.getTypeSafe(value, true);
            if (ThreeUtil.isNotNull(texture.image)) {
              texture.needsUpdate = true;
            }
            break;
          case 'magfilter':
            texture.magFilter = ThreeUtil.getTextureFilterSafe(value, 'linear');
            break;
          case 'minfilter':
            texture.minFilter = ThreeUtil.getTextureFilterSafe(value, 'linearmipmaplinear');
            break;
          case 'format':
            texture.format = ThreeUtil.getPixelFormatSafe(value, 'rgba');
            break;
          case 'type':
            texture.type = ThreeUtil.getTextureDataTypeSafe(value, 'unsignedbyte');
            break;
          case 'anisotropy':
            texture.anisotropy = ThreeUtil.getTypeSafe(value, 1);
            break;
          case 'unpackalignment':
            texture.unpackAlignment = ThreeUtil.getTypeSafe(value, 4);
            break;
          case 'generatemipmaps':
            texture.generateMipmaps = ThreeUtil.getTypeSafe(value, true);
            if (texture.generateMipmaps) {
              texture.mipmaps = [];
            }
            break;
          case 'encoding':
            texture.encoding = ThreeUtil.getTextureEncodingSafe(value, 'linear');
            break;
          case 'repeat':
            texture.repeat.copy(value);
            break;
          case 'offset':
            texture.offset.copy(value);
            break;
        }
      }
    });
    return texture;
  }
  
  private _material: THREE.Material = null;

  setMaterial(material: THREE.Material) {
    if (ThreeUtil.isNotNull(material) && this._material !== material) {
      this._material = material;
      if (this.texture !== null) {
        this.applyMaterial();
      } else {
        this.getTexture();
      }
    }
  }

  private applyMaterial() {
    if (this._material !== null && this.texture !== null) {
      switch (this.textureType.toLowerCase()) {
        case 'env':
        case 'envmap':
          this._material['envMap'] = this.texture;
          break;
        case 'specular':
        case 'specularmap':
          this._material['specularMap'] = this.texture;
          break;
        case 'alpha':
        case 'alphamap':
          this._material['alphaMap'] = this.texture;
          break;
        case 'bump':
        case 'bumpmap':
          this._material['bumpMap'] = this.texture;
          break;
        case 'normal':
        case 'normalmap':
          this._material['normalMap'] = this.texture;
          break;
        case 'ao':
        case 'aomap':
          this._material['aoMap'] = this.texture;
          break;
        case 'displace':
        case 'displacement':
        case 'displacementmap':
          this._material['displacementMap'] = this.texture;
          break;
        case 'map':
        default:
          this._material['map'] = this.texture;
          break;
      }
      this._material.needsUpdate = true;
    }
  }

  protected applyChanges(changes: string[]) {
    if (this.texture !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getTexture();
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['image','storagename','storageoption','cubeimage','loadertype'])) {
        this.needUpdate = true;
        return;
      }
      TextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
      if (ThreeUtil.isNotNull(this.texture.image)) {
        this.texture.needsUpdate = true;
      }
      super.applyChanges(changes);
    }
  }

  
  getTexture() {
    if (this.texture === null || this._needUpdate) {
      this.needUpdate = false;
      this.unSubscribeRefer('referTexture');
      if (this.refer !== null) {
        if (this.refer instanceof TextureComponent) {
          this.texture = this.getTextureImage(this.refer.getImage(null), this.refer.getCubeImage(null), this.refer.getProgram(null));
          this.texture.repeat.copy(this.refer.getRepeat(1, 1));
          this.texture.offset.copy(this.refer.getOffset(0, 0));
        } else if (this.refer.getTexture && this.refer.textureSubscribe) {
          this.setReferTexture(this.refer.getTexture());
          this.subscribeRefer(
            'referTexture',
            this.refer.textureSubscribe().subscribe((texture) => {
              if (texture instanceof THREE.Texture) {
                this.setReferTexture(texture);
              } else {
                this.setReferTexture(this.refer.getTexture());
              }
            })
          );
        } else {
          this.texture = new THREE.Texture();
        }
      } else if (ThreeUtil.isNotNull(this.storageName)) {
        if (this.storageName.endsWith('.hdr') || this.storageName.endsWith('.exr')) {
          this.texture = new THREE.DataTexture(null, 1, 1);
        } else if (this.storageName.endsWith('.ktx') || this.storageName.endsWith('.ktx2') || this.storageName.endsWith('.dds')) {
          this.texture = new THREE.CompressedTexture(null, 1, 1);
        } else {
          this.texture = new THREE.Texture();
        }
        this.localStorageService.getTexture(
          this.storageName,
          (texture) => {
            if (texture !== null) {
              this.texture = texture;
              super.setObject(this.texture);
              this.setSubscribeNext(['texture','textureloaded']);
            }
          },
          this.storageOption
        );
      } else {
        if (ThreeUtil.isNotNull(this.canvas)) {
          this.texture = new THREE.CanvasTexture(this.getCanvas());
        } else if (ThreeUtil.isNotNull(this.perlin) && this.perlin.getPerlinGeometry) {
          this.texture = new THREE.CanvasTexture(this.perlin.getPerlinGeometry().getTexture(ThreeUtil.getVector3Safe(this.sunX, this.sunY, this.sunZ, new THREE.Vector3(1, 1, 1)), ThreeUtil.getColorSafe(this.color, 0x602000), ThreeUtil.getColorSafe(this.add, 0xe08060)));
        } else {
          this.texture = this.getTextureImage(this.getImage(null), this.getCubeImage(null), this.getProgram(null), () => {
            this.texture.needsUpdate = true;
            this.setSubscribeNext(['texture','textureloaded']);
          });
        }
        this.texture.mapping = ThreeUtil.getMappingSafe(this.mapping);
      }
      this.applyMaterial();
      super.setObject(this.texture);
    }
    return this.texture;
  }
}
