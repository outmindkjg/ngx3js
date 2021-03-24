import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @Input() public type: string = '';
  @Input() public size: number = null;
  @Input() private encoding:string = null;
  @Input() private format:string = null;

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }
  
  private getEncoding(def?: string): THREE.TextureEncoding {
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

  private getFormat(def?: string): THREE.PixelFormat {
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

  constructor() { }

  ngOnInit(): void {
  }

  private tool : any = null;

  getTool(): any {
    if (this.tool === null) {
      switch(this.type.toLowerCase()) {
        case 'cuberendertarget' :
        case 'cuberender' :
        case 'webglcuberendertarget' :
        default :
          this.tool = new THREE.WebGLCubeRenderTarget( this.getSize(256), {
            encoding: this.getEncoding('sRGB'),
            format: this.getFormat('RGBA')
          });
          break;
      }
    }
    return this.tool;
  }

}
