import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { Lut } from 'three/examples/jsm/math/Lut';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'three-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.scss'],
})
export class TextureComponent implements OnInit {
  @Input() private refer: any = null;
  @Input() public textureType: string = 'map';
  @Input() private loaderType: string = null;
  @Input() private image: string = null;
  @Input() private premultiplyAlpha: boolean = null;
  @Input() private cubeImage: string[] = null;
  @Input() private storageName: string = null;
  @Input() private storageOption: any = null;
  @Input() private program: (
    ctx: CanvasRenderingContext2D,
    text?: string
  ) => void = null;
  @Input() private text: string = null;
  @Input() private canvas:
    | HTMLVideoElement
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap
    | string = null;
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
  
  @Output()
  private onLoad: EventEmitter<TextureComponent> = new EventEmitter<TextureComponent>();

  private getImage(def?: string): string {
    return ThreeUtil.getTypeSafe(this.image, def);
  }

  private getCubeImage(def?: string[]): string[] {
    return ThreeUtil.getTypeSafe(this.cubeImage, def);
  }

  private getProgram(
    def?: (ctx: CanvasRenderingContext2D, text?: string) => void
  ): (ctx: CanvasRenderingContext2D, text?: string) => void {
    return ThreeUtil.getTypeSafe(this.program, def);
  }

  private getCanvas(
    def?: string
  ): HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap {
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

  private getMapping(def?: string): THREE.Mapping {
    return ThreeUtil.getMappingSafe(this.mapping, def, '');
  }

  private getWrapS(def: string): THREE.Wrapping {
    return ThreeUtil.getWrappingSafe(this.wrapS, this.wrap, def);
  }

  private getWrapT(def: string): THREE.Wrapping {
    return ThreeUtil.getWrappingSafe(this.wrapT, this.wrap, def);
  }

  private getMagFilter(def: string): THREE.TextureFilter {
    return ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter, def);
  }

  private getMinFilter(def: string): THREE.TextureFilter {
    return ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter, def);
  }

  private getFormat(def: string): THREE.PixelFormat {
    return ThreeUtil.getPixelFormatSafe(this.format, def, '');
  }

  private getType(def: string): THREE.TextureDataType {
    return ThreeUtil.getTextureDataTypeSafe(this.type, def, '');
  }

  private getAnisotropy(def: number): number {
    return ThreeUtil.getTypeSafe(this.anisotropy, def);
  }

  private getEncoding(def: string): THREE.TextureEncoding {
    return ThreeUtil.getTextureEncodingSafe(this.encoding, def, '');
  }

  private getRepeat(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(
      ThreeUtil.getTypeSafe(this.repeatX, this.repeat),
      ThreeUtil.getTypeSafe(this.repeatY, this.repeat),
      new THREE.Vector2(defX, defY)
    );
  }

  private getOffset(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(
      ThreeUtil.getTypeSafe(this.offsetX, this.offset),
      ThreeUtil.getTypeSafe(this.offsetY, this.offset),
      new THREE.Vector2(defX, defY)
    );
  }

  private getRotation(def?: number): number {
    return ThreeUtil.getAngleSafe(this.rotation, def);
  }

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTexture(changes);
    if (this.refTexture != null) {
      this.refTexture.copy(this.texture);
    }
    if (changes.useDropImage) {
      this.setUseDropImage(this.useDropImage);
    }
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
  static cubeTextureLoader: THREE.CubeTextureLoader = null;
  static imageBitmapLoader: THREE.ImageBitmapLoader = null;
  static hdrCubeMapLoader: HDRCubeTextureLoader = null;
  static rgbmLoader: RGBMLoader = null;

  getTextureImage(
    image: string,
    cubeImage?: string[],
    program?: (ctx: CanvasRenderingContext2D) => void,
    onLoad?: () => void
  ): THREE.Texture {
    return TextureComponent.getTextureImage(
      image,
      cubeImage,
      program,
      this.width,
      this.height,
      this.loaderType,
      this.text,
      onLoad
    );
  }

  static getTextureImageOption(
    image: string,
    options?: string,
    loadType?: string,
    cubeImage?: string[]
  ): THREE.Texture {
    const texture = this.getTextureImage(
      image,
      cubeImage,
      null,
      10,
      10,
      loadType,
      null,
      null
    );
    if (ThreeUtil.isNotNull(options)) {
      const optionsList = options.split(',');
      optionsList.forEach((option) => {
        switch (option.toLowerCase()) {
          case 'nearest':
          case 'nearestfilter':
          case 'minnearest':
          case 'minnearestfilter':
            texture.minFilter = THREE.NearestFilter;
            break;
          case 'repeat':
          case 'wraprepeat':
          case 'Repeatwrapping':
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            break;
        }
      });
    }
    return texture;
  }

  static getTextureImage(
    image: string,
    cubeImage?: string[],
    program?: (ctx: CanvasRenderingContext2D, text?: string) => void,
    canvasWidth?: number,
    canvasHeight?: number,
    loadType?: string,
    text?: string,
    onLoad?: () => void
  ): THREE.Texture {
    if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length > 0) {
      cubeImage =  ThreeUtil.getCubeImage(cubeImage);
      switch ((loadType || 'cubetexture').toLowerCase()) {
        case 'hdrcube':
        case 'hdrcubetexture':
          if (this.hdrCubeMapLoader == null) {
            this.hdrCubeMapLoader = new HDRCubeTextureLoader(
              ThreeUtil.getLoadingManager()
            );
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.hdrCubeMapLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          const cubeTexture = new THREE.CubeTexture();
          this.hdrCubeMapLoader.setDataType(THREE.UnsignedByteType);
          this.hdrCubeMapLoader.load(cubeImage, (hdrCubeMap) => {
            cubeTexture.copy(hdrCubeMap);
            cubeTexture.needsUpdate = true;
            if (ThreeUtil.isNotNull(onLoad)) {
              onLoad();
            }
          });
          return cubeTexture;
        case 'rgbm':
        case 'rgbmtexture':
          if (this.rgbmLoader == null) {
            this.rgbmLoader = new RGBMLoader(
              ThreeUtil.getLoadingManager()
            );
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.rgbmLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          const rgbmTexture = new THREE.CubeTexture();
          this.rgbmLoader.loadCubemap(cubeImage, (rgbmCube) => {
            rgbmTexture.copy(rgbmCube);
            rgbmTexture.needsUpdate = true;
            if (ThreeUtil.isNotNull(onLoad)) {
              onLoad();
            }
          });
          return rgbmTexture;
        default:
          if (this.cubeTextureLoader === null) {
            this.cubeTextureLoader = new THREE.CubeTextureLoader(
              ThreeUtil.getLoadingManager()
            );
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.cubeTextureLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          return this.cubeTextureLoader.load(cubeImage, () => {
            if (ThreeUtil.isNotNull(onLoad)) {
              onLoad();
            }
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
          } catch(e) {
            setTimeout(() => {
              video.play();
            },10);
          }
          return videoTexture;
        case 'imagebitmap':
        case 'image':
        default:
          if (this.textureLoader === null) {
            this.textureLoader = new THREE.TextureLoader(
              ThreeUtil.getLoadingManager()
            );
          }
          return this.textureLoader.load(ThreeUtil.getStoreUrl(image), () => {
            if (ThreeUtil.isNotNull(onLoad)) {
              onLoad();
            }
          });
      }
    } else {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = canvasWidth ? canvasWidth : 35;
      canvas.height = canvasHeight ? canvasHeight : 35;
      if (ThreeUtil.isNotNull(program)) {
        const _context = canvas.getContext('2d', {
          alpha: true,
        });
        // _context.save();
        program(_context, text);
        // _context.restore();
      }
      return new THREE.CanvasTexture(canvas);
    }
  }

  static checkTextureImage(
    texture: THREE.Texture,
    callback: () => void,
    tryout = 0
  ) {
    if (ThreeUtil.isNotNull(texture.image)) {
      if (texture instanceof THREE.CubeTexture && texture.image.length === 6) {
        callback();
        return;
      } else if (
        ThreeUtil.isNotNull(texture.image.width) &&
        texture.image.width > 0
      ) {
        callback();
        return;
      }
    }
    if (tryout < 30) {
      setTimeout(() => {
        this.checkTextureImage(texture, callback, tryout + 1);
      }, 200);
    } else {
      // console.error('timeout');
    }
  }

  setTexture(refTexture: THREE.Texture) {
    if (this.refTexture !== refTexture) {
      this.refTexture = refTexture;
      this.refTexture.copy(this.getTexture());
    }
  }

  private _textureSubject: Subject<THREE.Texture> = new Subject<THREE.Texture>();

  textureSubscribe(): Observable<THREE.Texture> {
    return this._textureSubject.asObservable();
  }

  private _textureSubscribe: Subscription = null;

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

  getTexture(changes?: SimpleChanges) {
    if (
      this.texture === null ||
      (changes && (changes.image || changes.program || changes.storageName))
    ) {
      if (this._textureSubscribe !== null) {
        this._textureSubscribe.unsubscribe();
        this._textureSubscribe = null;
      }
      if (this.refer !== null) {
        if (this.refer instanceof TextureComponent) {
          this.texture = this.getTextureImage(
            this.refer.getImage(null),
            this.refer.getCubeImage(null),
            this.refer.getProgram(null)
          );
          this.texture.repeat.copy(this.refer.getRepeat(1, 1));
          this.texture.offset.copy(this.refer.getOffset(0, 0));
        } else if (this.refer.getTexture && this.refer.textureSubscribe) {
          this.setReferTexture(this.refer.getTexture());
          this._textureSubscribe = this.refer
            .textureSubscribe()
            .subscribe((texture) => {
              if (texture instanceof THREE.Texture) {
                this.setReferTexture(texture);
              } else {
                this.setReferTexture(this.refer.getTexture());
              }
            });
        } else {
          this.texture = new THREE.Texture();
        }
      } else if (ThreeUtil.isNotNull(this.storageName)) {
        this.texture = new THREE.Texture();
        this.localStorageService.getTexture(
          this.storageName,
          (texture) => {
            if (texture !== null) {
              this.texture = texture;
              this.getTexture({
                encoding: null,
                wrapS: null,
                wrapT: null,
                magFilter: null,
                minFilter: null,
                format: null,
                type: null,
                repeat: null,
                rotation: null,
                flipY : null,
                anisotropy: null,
                premultiplyAlpha: null,
                generateMipmaps : null
              });
            }
          },
          this.storageOption
        );
      } else {
        if (ThreeUtil.isNotNull(this.canvas)) {
          this.texture = new THREE.CanvasTexture(this.getCanvas());
        } else if (
          ThreeUtil.isNotNull(this.perlin) &&
          this.perlin.getPerlinGeometry
        ) {
          this.texture = new THREE.CanvasTexture(
            this.perlin
              .getPerlinGeometry()
              .getTexture(
                ThreeUtil.getVector3Safe(
                  this.sunX,
                  this.sunY,
                  this.sunZ,
                  new THREE.Vector3(1, 1, 1)
                ),
                ThreeUtil.getColorSafe(this.color, 0x602000),
                ThreeUtil.getColorSafe(this.add, 0xe08060)
              )
          );
        } else {
          this.texture = this.getTextureImage(
            this.getImage(null),
            this.getCubeImage(null),
            this.getProgram(null),
            () => {
              this.getTexture({
                encoding: null,
                wrapS: null,
                wrapT: null,
                magFilter: null,
                minFilter: null,
                format: null,
                type: null,
                repeat: null,
                anisotropy: null,
                premultiplyAlpha: null,
                rotation: null,
                flipY : null,
                mapping: null,
                generateMipmaps : null,
              });
              this.texture.needsUpdate = true;
            }
          );
        }
        this.texture.mapping = this.getMapping();
      }
      if (ThreeUtil.isNotNull(changes)) {
        changes = {
          wrapS: null,
          wrapT: null,
          magFilter: null,
          minFilter: null,
          format: null,
          type: null,
          repeat: null,
          anisotropy: null,
          premultiplyAlpha: null,
          mapping: null,
        };
      }
    }
    if (this.texture != null && changes) {
      for (const propName in changes) {
        switch (propName) {
          case 'mapping':
            if (ThreeUtil.isNotNull(this.mapping)) {
              this.texture.mapping = this.getMapping();
            }
            break;
          case 'wrapS':
            if (
              ThreeUtil.isNotNull(this.wrapS) ||
              ThreeUtil.isNotNull(this.wrap)
            ) {
              this.texture.wrapS = this.getWrapS('clamptoedge');
            }
            break;
          case 'wrapT':
            if (
              ThreeUtil.isNotNull(this.wrapT) ||
              ThreeUtil.isNotNull(this.wrap)
            ) {
              this.texture.wrapT = this.getWrapT('clamptoedge');
            }
            break;
          case 'flipY' :
            if (
              ThreeUtil.isNotNull(this.flipY)
            ) {
              this.texture.flipY = ThreeUtil.getTypeSafe(this.flipY, true);
            }
            break;
          case 'rotation':
            if (ThreeUtil.isNotNull(this.rotation)) {
              this.texture.rotation = this.getRotation(0);
            }
            break;
          case 'premultiplyAlpha':
            if (ThreeUtil.isNotNull(this.premultiplyAlpha)) {
              this.texture.premultiplyAlpha = this.premultiplyAlpha;
              if (ThreeUtil.isNotNull(this.texture.image)) {
                this.texture.needsUpdate = true;
              }
            }
            break;
          case 'magFilter':
            if (ThreeUtil.isNotNull(this.magFilter)) {
              this.texture.magFilter = this.getMagFilter('linear');
            }
            break;
          case 'minFilter':
            if (ThreeUtil.isNotNull(this.minFilter) || ThreeUtil.isNotNull(this.filter)) {
              this.texture.minFilter = this.getMinFilter('linearmipmaplinear');
            }
            break;
          case 'format':
            if (ThreeUtil.isNotNull(this.format) || ThreeUtil.isNotNull(this.filter)) {
              this.texture.format = this.getFormat('rgba');
            }
            break;
          case 'type':
            if (ThreeUtil.isNotNull(this.type)) {
              this.texture.type = this.getType('unsignedbyte');
            }
            break;
          case 'anisotropy':
            if (ThreeUtil.isNotNull(this.anisotropy)) {
              this.texture.anisotropy = this.getAnisotropy(1);
            }
            break;
          case 'generateMipmaps':
            if (ThreeUtil.isNotNull(this.generateMipmaps)) {
              this.texture.generateMipmaps = ThreeUtil.getTypeSafe(this.generateMipmaps, true);
            }
            break;
          case 'encoding':
            if (ThreeUtil.isNotNull(this.encoding)) {
              this.texture.encoding = this.getEncoding('linear');
            }
            break;
          case 'repeat':
          case 'repeatX':
          case 'repeatY':
            if (
              (ThreeUtil.isNotNull(this.repeatX) &&
                ThreeUtil.isNotNull(this.repeatY)) ||
              ThreeUtil.isNotNull(this.repeat)
            ) {
              this.texture.repeat.copy(this.getRepeat(1, 1));
            }
            break;
          case 'offset':
          case 'offsetX':
          case 'offsetY':
            if (
              (ThreeUtil.isNotNull(this.offsetX) &&
                ThreeUtil.isNotNull(this.offsetY)) ||
              ThreeUtil.isNotNull(this.offset)
            ) {
              this.texture.offset.copy(this.getOffset(0, 0));
            }
            break;
        }
      }
      this.onLoad.emit(this);
      this._textureSubject.next(this.texture);
    }
    return this.texture;
  }
}
