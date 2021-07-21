import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTextureComponent } from '../texture.abstract';

@Component({
  selector: 'ngx3js-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * 
   */
  @Input() public type: string = '';

  /**
   * 
   */
  @Input() public url: string = null;

  /**
   * 
   */
  @Input() public size: number = null;

  /**
   * 
   */
  @Input() private encoding: string = null;

  /**
   * 
   */
  @Input() private format: string = null;

  /**
   * 
   */
  @Input() private background: string | number | AbstractTextureComponent = null;

  /**
   * 
   */
  @Input() private storageName: string = null;

  /**
   * 
   */
  @Input() private storageOption: any = null;

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getEncoding(def?: string): THREE.TextureEncoding {
    return ThreeUtil.getTextureEncodingSafe(this.encoding, def, '');
  }

  private getFormat(def?: string): THREE.PixelFormat {
    return ThreeUtil.getPixelFormatSafe(this.format, def, '');
  }

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('tools');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private tool: any = null;

  private audioLoader: THREE.AudioLoader = null;

  getAudio(): AudioBuffer {
    const audioBuffer = this.getTool();
    if (audioBuffer instanceof AudioBuffer) {
      return audioBuffer;
    } else {
      return null;
    }
  }

  getTexture(): THREE.Texture {
    const texture = this.getTool();
    if (texture instanceof THREE.Texture) {
      return texture;
    } else {
      return null;
    }
  }

  getTool(): any {
    if (this.tool === null || this._needUpdate) {
      this.needUpdate = false;
      let tool: any = null;
      switch (this.type.toLowerCase()) {
        case 'pmremtexture':
          const pmremGenerator = new THREE.PMREMGenerator(ThreeUtil.getRenderer() as THREE.WebGLRenderer);
          if (ThreeUtil.isNotNull(this.storageName)) {
            this.localStorageService.getTexture(
              this.storageName,
              (texture) => {
                if (texture !== null) {
                  this.tool = pmremGenerator.fromEquirectangular(texture).texture;
                  super.setObject(this.tool);
                  this.setSubscribeNext(['texture', 'loaded']);
                  pmremGenerator.dispose();
                }
              },
              this.storageOption
            );
            tool = {};
          } else {
            const envScene = new THREE.Scene();
            if (ThreeUtil.isNotNull(this.background)) {
              if (this.background instanceof AbstractTextureComponent) {
                envScene.background = this.background.getTexture();
              } else {
                envScene.background = ThreeUtil.getColorSafe(this.background);
              }
            }
            tool = pmremGenerator.fromScene(envScene).texture;
            pmremGenerator.dispose();
          }
          break;
        case 'audio':
          if (this.audioLoader === null) {
            this.audioLoader = new THREE.AudioLoader();
          }
          tool = {};
          this.audioLoader.load(ThreeUtil.getStoreUrl(this.url), (audioBuffer: AudioBuffer) => {
            this.tool = audioBuffer;
            this.setObject(this.tool);
            this.setSubscribeNext('audio');
          });
          break;
        case 'cuberendertarget':
        case 'cuberender':
        case 'webglcuberendertarget':
        default:
          tool = new THREE.WebGLCubeRenderTarget(this.getSize(256), {
            encoding: this.getEncoding('sRGB'),
            format: this.getFormat('RGBA'),
          });
          break;
      }
      this.tool = tool;
      this.setObject(this.tool);
    }
    return this.tool;
  }
}
