import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { Lut } from 'three/examples/jsm/math/Lut';

@Component({
  selector: 'three-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.scss']
})
export class TextureComponent implements OnInit {

  @Input() private refer:any = null;
  @Input() public textureType:string = 'map';
  @Input() private image:string = null;
  @Input() private cubeImage:string[] = null;
  @Input() private program:(ctx: CanvasRenderingContext2D) => void = null;
  @Input() private canvas:string = null;
  @Input() private mapping:string = null;
  @Input() private wrapS:string = null;
  @Input() private wrapT:string = null;
  @Input() private magFilter:string = null;
  @Input() private minFilter:string = null;
  @Input() private format:string = null;
  @Input() public type:string = null;
  @Input() private anisotropy:number = null;
  @Input() private encoding:string = null;
  @Input() private repeatX:number = null;
  @Input() private repeatY:number = null;
  @Input() private offsetX:number = null;
  @Input() private offsetY:number = null;
  @Input() private width:number = null;
  @Input() private height:number = null;
  @Input() private perlin:any = null;
  @Input() private sunX:number = null;
  @Input() private sunY:number = null;
  @Input() private sunZ:number = null;
  @Input() private color:number|string = null;
  @Input() private add:number|string = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.texture != null) {
      this.texture.dispose();
    }
    if (this.refTexture != null) {
      this.refTexture.dispose();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTexture(changes);
    if (this.refTexture != null) {
      this.refTexture.copy(this.texture);
    }
  }

  private getImage(def?: string): string {
    return ThreeUtil.getTypeSafe(this.image, def);
  }

  private getCubeImage(def?: string[]): string[] {
    return ThreeUtil.getTypeSafe(this.cubeImage, def);
  }

  private getProgram(def?: (ctx: CanvasRenderingContext2D) => void): (ctx: CanvasRenderingContext2D) => void {
    return ThreeUtil.getTypeSafe(this.program, def);
  }

  private getCanvas(def?: string): HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap {
    const canvas = ThreeUtil.getTypeSafe(this.canvas, def, '');
    switch(canvas.toLowerCase()) {
      case 'lut' :
      default :
        return new Lut().createCanvas();
    }
  }

  private getMapping(def?: string): THREE.Mapping {
    const mapping = ThreeUtil.getTypeSafe(this.mapping, def, '');
    switch (mapping.toLowerCase()) {
      case 'uv':
        return THREE.UVMapping;
      case 'cubereflection':
        return THREE.CubeReflectionMapping;
      case 'cuberefraction':
        return THREE.CubeRefractionMapping;
      case 'equirectangularreflection':
        return THREE.EquirectangularReflectionMapping;
      case 'equirectangularrefraction':
        return THREE.EquirectangularRefractionMapping;
      case 'cubeuvreflection':
        return THREE.CubeUVReflectionMapping;
      case 'cubeuvrefraction':
        return THREE.CubeUVRefractionMapping;
      default:
        return THREE.Texture.DEFAULT_MAPPING;
    }
  }

  private getWrapS(def: string): THREE.Wrapping {
    const wrapS = ThreeUtil.getTypeSafe(this.wrapS, def, '');
    switch (wrapS.toLowerCase()) {
      case 'repeat':
        return THREE.RepeatWrapping;
      case 'mirroredrepeat':
        return THREE.MirroredRepeatWrapping;
      case 'clamptoedge':
      default:
        return THREE.ClampToEdgeWrapping;
    }
  }

  private getWrapT(def: string): THREE.Wrapping {
    const wrapT = ThreeUtil.getTypeSafe(this.wrapT, def, '');
    switch (wrapT.toLowerCase()) {
      case 'repeat':
        return THREE.RepeatWrapping;
      case 'mirroredrepeat':
        return THREE.MirroredRepeatWrapping;
      case 'clamptoedge':
      default:
        return THREE.ClampToEdgeWrapping;
    }
  }

  private getMagFilter(def: string): THREE.TextureFilter {
    const magFilter = ThreeUtil.getTypeSafe(this.magFilter, def, '');
    switch (magFilter.toLowerCase()) {
      case 'nearest':
        return THREE.NearestFilter;
      case 'nearestmipmapnearest':
        return THREE.NearestMipmapNearestFilter;
      case 'nearestmipmaplinear':
        return THREE.NearestMipmapLinearFilter;
      case 'linearmipmapnearest':
        return THREE.LinearMipmapNearestFilter;
      case 'linearmipmaplinear':
        return THREE.LinearMipmapLinearFilter;
      case 'linear':
      default:
        return THREE.LinearFilter;
    }
  }

  private getMinFilter(def: string): THREE.TextureFilter {
    const minFilter = ThreeUtil.getTypeSafe(this.minFilter, def, '');
    switch (minFilter.toLowerCase()) {
      case 'nearest':
        return THREE.NearestFilter;
      case 'nearestmipmapnearest':
        return THREE.NearestMipmapNearestFilter;
      case 'nearestmipmaplinear':
        return THREE.NearestMipmapLinearFilter;
      case 'linearmipmapnearest':
        return THREE.LinearMipmapNearestFilter;
      case 'linear':
        return THREE.LinearFilter;
      case 'linearmipmaplinear':
      default:
        return THREE.LinearMipmapLinearFilter;
    }
  }

  private getFormat(def: string): THREE.PixelFormat {
    const format = ThreeUtil.getTypeSafe(this.format, def, '');
    switch (format.toLowerCase()) {
      case 'alpha':
        return THREE.AlphaFormat;
      case 'red':
        return THREE.RedFormat;
      case 'redinteger':
        return THREE.RedIntegerFormat;
      case 'rg':
        return THREE.RGFormat;
      case 'rginteger':
        return THREE.RGIntegerFormat;
      case 'rgb':
        return THREE.RGBFormat;
      case 'rgbinteger':
        return THREE.RGBIntegerFormat;
      case 'rgbainteger':
        return THREE.RGBAIntegerFormat;
      case 'luminance':
        return THREE.LuminanceFormat;
      case 'luminancealpha':
        return THREE.LuminanceAlphaFormat;
      case 'rgbe':
        return THREE.RGBEFormat;
      case 'depth':
        return THREE.DepthFormat;
      case 'depthstencil':
        return THREE.DepthStencilFormat;
      case 'rgba':
      default:
        return THREE.RGBAFormat;
    }
  }

  private getType(def: string): THREE.TextureDataType {
    const type = ThreeUtil.getTypeSafe(this.type, def, '');
    switch (type.toLowerCase()) {
      case 'byte':
        return THREE.ByteType;
      case 'short':
        return THREE.ShortType;
      case 'unsignedshort':
        return THREE.UnsignedShortType;
      case 'int':
        return THREE.IntType;
      case 'unsignedint':
        return THREE.UnsignedIntType;
      case 'float':
        return THREE.FloatType;
      case 'halffloat':
        return THREE.HalfFloatType;
      case 'unsignedshort4444':
        return THREE.UnsignedShort4444Type;
      case 'unsignedshort5551':
        return THREE.UnsignedShort5551Type;
      case 'unsignedshort565':
        return THREE.UnsignedShort565Type;
      case 'unsignedint248':
        return THREE.UnsignedInt248Type;
      case 'unsignedbyte':
      default:
        return THREE.UnsignedByteType;
    }
  }

  private getAnisotropy(def: number): number {
    return ThreeUtil.getTypeSafe(this.anisotropy, def);
  }

  private getEncoding(def: string): THREE.TextureEncoding {
    const encoding = ThreeUtil.getTypeSafe(this.encoding, def, '');
    switch (encoding.toLowerCase()) {
      case 'srgb':
        return THREE.sRGBEncoding;
      case 'gamma':
        return THREE.GammaEncoding;
      case 'rgbe':
        return THREE.RGBEEncoding;
      case 'logluv':
        return THREE.LogLuvEncoding;
      case 'rgbm7':
        return THREE.RGBM7Encoding;
      case 'rgbm16':
        return THREE.RGBM16Encoding;
      case 'rgbd':
        return THREE.RGBDEncoding;
      case 'linear':
      default:
        return THREE.LinearEncoding;
    }
  }

  private getRepeat(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.repeatX, this.repeatY, new THREE.Vector2(defX,defY));
  }

  private getOffset(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.offsetX, this.offsetY, new THREE.Vector2(defX,defY));
  }


  private refTexture: THREE.Texture = null;
  private texture: THREE.Texture = null;
  static textureLoader: THREE.TextureLoader = null;
  static cubeTextureLoader: THREE.CubeTextureLoader = null;

  getTextureImage(image: string, cubeImage? : string[], program?: (ctx: CanvasRenderingContext2D) => void): THREE.Texture {
    return TextureComponent.getTextureImage(image, cubeImage, program, this.width, this.height);
  }

  static getTextureImage(image: string, cubeImage? : string[], program?: (ctx: CanvasRenderingContext2D) => void, canvasWidth? : number, canvasHeight? : number): THREE.Texture {
    if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length > 0) {
      if (this.cubeTextureLoader === null) {
        this.cubeTextureLoader = new THREE.CubeTextureLoader();
      }
      if (ThreeUtil.isNotNull(image) && image !== '') {
        if (!image.startsWith('/')) {
          image = '/assets/examples/' + image;
        }
        this.cubeTextureLoader.setPath(image);
      }
      return this.cubeTextureLoader.load(cubeImage);
    } else if (ThreeUtil.isNotNull(image) && image !== '') {
      if (this.textureLoader === null) {
        this.textureLoader = new THREE.TextureLoader();
      }
      if (!image.startsWith('/')) {
        image = '/assets/examples/' + image;
      }
      return this.textureLoader.load(image);
    } else {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = canvasWidth ? canvasWidth : 35;
      canvas.height = canvasHeight ? canvasHeight : 35;
      if (ThreeUtil.isNotNull(program)) {
        const _context = canvas.getContext('2d', {
          alpha: true
        })
        // _context.save();
        program(_context);
        // _context.restore();
      }
      return new THREE.CanvasTexture(canvas);
    }
  }

  setTexture(refTexture: THREE.Texture) {
    if (this.refTexture !== refTexture) {
      this.refTexture = refTexture;
      this.refTexture.copy(this.getTexture())
    }
  }

  private _textureSubscribe: Subscription = null;

  setReferTexture(texture : any) {
    if (texture instanceof HTMLVideoElement) {
      this.texture = new THREE.VideoTexture(texture);
    } else if (texture instanceof THREE.Texture) {
      this.texture = texture;
    }
    if (texture !== null && this.texture !== null && this.refTexture !== null) {
      this.refTexture.copy(this.getTexture())
    }
  }

  getTexture(changes?: SimpleChanges) {
    if (this.texture === null || (changes && (changes.image || changes.program))) {
      if (this._textureSubscribe !== null) {
        this._textureSubscribe.unsubscribe();
        this._textureSubscribe = null;
      }
      if (this.refer !== null) {
        if (this.refer instanceof TextureComponent) {
          this.texture = this.getTextureImage(this.refer.getImage(null), this.refer.getCubeImage(null), this.refer.getProgram(null));
          this.texture.repeat.copy(this.refer.getRepeat(1, 1));
          this.texture.offset.copy(this.refer.getOffset(0, 0));
        } else if (this.refer.getTexture && this.refer.textureSubscribe) {
          this.setReferTexture(this.refer.getTexture());
          this._textureSubscribe = this.refer.textureSubscribe().subscribe(texture => {
            if (texture instanceof THREE.Texture) {
              this.setReferTexture(texture);
            } else {
              this.setReferTexture(this.refer.getTexture());
            }
          });
        } else {
          this.texture = new THREE.Texture();
        }
      } else {
        if (ThreeUtil.isNotNull(this.canvas)) {
          this.texture = new THREE.CanvasTexture( this.getCanvas() );
        } else if (ThreeUtil.isNotNull(this.perlin) && this.perlin.getPerlinGeometry) {
          this.texture = new THREE.CanvasTexture( this.perlin.getPerlinGeometry().getTexture(
            ThreeUtil.getVector3Safe(this.sunX, this.sunY, this.sunZ, new THREE.Vector3(1,1,1)),
            ThreeUtil.getColorSafe(this.color, 0x602000),
            ThreeUtil.getColorSafe(this.add, 0xe08060)
          ));
        } else {
          this.texture = this.getTextureImage(this.getImage(null), this.getCubeImage(null), this.getProgram(null));
        }
        this.texture.mapping = this.getMapping();
      }
      if (ThreeUtil.isNotNull(changes)) {
        changes = {
          wrapS : null,
          wrapT : null,
          magFilter : null,
          minFilter : null,
          format : null,
          type : null,
          repeat : null,
          anisotropy : null
        };
      }
    }
    if (this.texture != null && changes) {
      for (const propName in changes) {
        switch (propName) {
          case 'wrapS':
            this.texture.wrapS = this.getWrapS('clamptoedge');
            break;
          case 'wrapT':
            this.texture.wrapT = this.getWrapT('clamptoedge');
            break;
          case 'magFilter':
            this.texture.magFilter = this.getMagFilter('linear');
            break;
          case 'minFilter':
            this.texture.minFilter = this.getMinFilter('linearmipmaplinear');
            break;
          case 'format':
            this.texture.format = this.getFormat('rgba');
            break;
          case 'type':
            this.texture.type = this.getType('unsignedbyte');
            break;
          case 'anisotropy':
            this.texture.anisotropy = this.getAnisotropy(1);
            break;
          case 'encoding':
            this.texture.encoding = this.getEncoding('linear');
            break;
          case 'repeat':
          case 'repeatX':
          case 'repeatY':
            this.texture.repeat.copy(this.getRepeat(1, 1));
            break;
          case 'offset':
          case 'offsetX':
          case 'offsetY':
            this.texture.offset.copy(this.getOffset(0, 0));
            break;
        }
      }
    }
    return this.texture;
  }
}
