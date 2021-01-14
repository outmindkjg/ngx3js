import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.scss']
})
export class TextureComponent implements OnInit {

  @Input() textureType: string = 'map';
  @Input() image: string = '';
  @Input() mapping: string = null;
  @Input() wrapS: string = null;
  @Input() wrapT: string = null;
  @Input() magFilter: string = null;
  @Input() minFilter: string = null;
  @Input() format: string = null;
  @Input() type: string = null;
  @Input() anisotropy: number = null;
  @Input() encoding: string = null;
  @Input() repeatX: number = null;
  @Input() repeatY: number = null;
  

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
 
  private getImage(def: string): string {
    const image = (this.image === null) ? def : this.image;
    return image;
  }

  private getMapping(def: string): THREE.Mapping {
    const mapping = (this.mapping === null) ? def : this.mapping;
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
    const wrapS = (this.wrapS === null) ? def : this.wrapS;
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
    const wrapT = (this.wrapT === null) ? def : this.wrapT;
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
    const magFilter = (this.magFilter === null) ? def : this.magFilter;
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
    const minFilter = (this.minFilter === null) ? def : this.minFilter;
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
    const format = (this.format === null) ? def : this.format;
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
      default :
          return THREE.RGBAFormat;
      }
  }

  private getType(def: string): THREE.TextureDataType {
    const type = (this.type === null) ? def : this.type;
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
      default :
          return THREE.UnsignedByteType;
    }
  }

  private getAnisotropy(def: number): number {
    const anisotropy = (this.anisotropy === null) ? def : this.anisotropy;
    return anisotropy;
  }

  private getEncoding(def: string): THREE.TextureEncoding {
    const encoding = (this.encoding === null) ? def : this.encoding;
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
      default :
          return THREE.LinearEncoding;
    }
  }

  private getRepeat(defX : number, defY : number) : THREE.Vector2 {
    const x = (this.repeatX === null) ? defX : this.repeatX;
    const y = (this.repeatY === null) ? defY : this.repeatY;
    return new THREE.Vector2(x, y);
  }

  private refTexture: THREE.Texture = null;
  private texture: THREE.Texture = null;
  static textureLoader: THREE.TextureLoader = null;

  getTextureLoader() : THREE.TextureLoader{
    if (TextureComponent.textureLoader === null) {
      TextureComponent.textureLoader = new THREE.TextureLoader();
    }
    return TextureComponent.textureLoader;
  }

  setTexture(refTexture: THREE.Texture) {
    if (this.refTexture !== refTexture) {
      this.refTexture = refTexture;
      this.refTexture.copy(this.getTexture())
    }
  }

  getTexture() {
    if (this.texture === null) {
      this.texture = this.getTextureLoader().load(this.getImage(''));
      this.texture.mapping = this.getMapping('default');
      this.texture.wrapS = this.getWrapS('clamptoedge');
      this.texture.wrapT = this.getWrapT('clamptoedge');
      this.texture.magFilter = this.getMagFilter('linear');
      this.texture.minFilter = this.getMinFilter('linearmipmaplinear');
      this.texture.format = this.getFormat('rgba');
      this.texture.type = this.getType('unsignedbyte');
      this.texture.anisotropy = this.getAnisotropy(1);
      this.texture.encoding = this.getEncoding('linear');
      this.texture.repeat.copy(this.getRepeat(1,1));
    }
    return this.texture;
  }

}
