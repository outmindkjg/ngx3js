import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() public type: string = '';
  @Input() public size: number = null;
  @Input() private encoding:string = null;
  @Input() private format:string = null;

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }
  
  private getEncoding(def?: string): THREE.TextureEncoding {
    return ThreeUtil.getTextureEncodingSafe(this.encoding, def, '');
  }

  private getFormat(def?: string): THREE.PixelFormat {
    return ThreeUtil.getPixelFormatSafe(this.format, def, '');
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('tools');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private tool : any = null;

  getTool(): any {
    if (this.tool === null || this._needUpdate) {
      this.needUpdate = false;
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
      this.setObject(this.tool);
    }
    return this.tool;
  }

}
