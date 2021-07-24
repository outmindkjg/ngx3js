import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTextureComponent } from '../texture.abstract';

/**
 * ToolsComponent
 */
@Component({
  selector: 'ngx3js-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of tools component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() public type: string = '';

  /**
   * Input  of tools component
   */
  @Input() public url: string = null;

  /**
   * Input  of tools component
   */
  @Input() public size: number = null;

  /**
   * [page:Textures THREE.LinearEncoding] is the default.
   * See the [page:Textures texture constants] page for details of other formats.<br /><br />
   * Note that if this value is changed on a texture after the material has been used,
   * it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
   *
   * Notice - case insensitive.
   *
   * @see THREE.TextureEncoding
   *
   * @see THREE.LinearEncoding - LinearEncoding ,
   * @see THREE.sRGBEncoding - sRGBEncoding ,
   * @see THREE.GammaEncoding - GammaEncoding ,
   * @see THREE.RGBEEncoding - RGBEEncoding ,
   * @see THREE.LogLuvEncoding - LogLuvEncoding ,
   * @see THREE.RGBM7Encoding - RGBM7Encoding ,
   * @see THREE.RGBM16Encoding - RGBM16Encoding ,
   * @see THREE.RGBDEncoding - RGBDEncoding ,
   */
   @Input() private encoding: string = null;

  /**
   * The default is [page:Textures THREE.RGBAFormat], although the [page:TextureLoader TextureLoader] will automatically
   * set this to [page:Textures THREE.RGBFormat] for JPG images. <br /><br />
   * See the [page:Textures texture constants] page for details of other formats.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.PixelFormat
   * @see THREE.AlphaFormat - AlphaFormat, Alpha
   * @see THREE.RedFormat - RedFormat, Red
   * @see THREE.RedIntegerFormat - RedIntegerFormat, RedInteger
   * @see THREE.RGFormat - RGFormat, RG
   * @see THREE.RGIntegerFormat - RGIntegerFormat, RGInteger
   * @see THREE.RGBFormat - RGBFormat, RGB
   * @see THREE.RGBIntegerFormat - RGBIntegerFormat, RGBInteger
   * @see THREE.RGBAIntegerFormat - RGBAIntegerFormat, RGBAInteger
   * @see THREE.LuminanceFormat - LuminanceFormat, Luminance
   * @see THREE.LuminanceAlphaFormat - LuminanceAlphaFormat, LuminanceAlpha
   * @see THREE.RGBEFormat - RGBEFormat, RGBE
   * @see THREE.DepthFormat - DepthFormat, Depth
   * @see THREE.DepthStencilFormat - DepthStencilFormat, DepthStencil
   * @see THREE.RGBAFormat - RGBAFormat, RGBA 
   */
   @Input() private format: string = null;

  /**
   * Input  of tools component
   */
  @Input() private background: string | number | AbstractTextureComponent = null;

  /**
   * Input  of tools component
   */
  @Input() private storageName: string = null;

  /**
   * Input  of tools component
   */
  @Input() private storageOption: any = null;

  /**
   * Gets size
   * @param [def]
   * @returns size
   */
  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  /**
   * Gets encoding
   * @param [def]
   * @returns encoding
   */
  private getEncoding(def?: string): THREE.TextureEncoding {
    return ThreeUtil.getTextureEncodingSafe(this.encoding, def, '');
  }

  /**
   * Gets format
   * @param [def]
   * @returns format
   */
  private getFormat(def?: string): THREE.PixelFormat {
    return ThreeUtil.getPixelFormatSafe(this.format, def, '');
  }

  /**
   * Creates an instance of tools component.
   * @param localStorageService
   */
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

  /**
   * Audio loader of tools component
   */
  private audioLoader: THREE.AudioLoader = null;

  /**
   * Gets audio
   * @returns audio
   */
  public getAudio(): AudioBuffer {
    const audioBuffer = this.getTool();
    if (audioBuffer instanceof AudioBuffer) {
      return audioBuffer;
    } else {
      return null;
    }
  }

  /**
   * Gets texture
   * @returns texture
   */
  public getTexture(): THREE.Texture {
    const texture = this.getTool();
    if (texture instanceof THREE.Texture) {
      return texture;
    } else {
      return null;
    }
  }

  /**
   * Gets tool
   * @returns tool
   */
  public getTool(): any {
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
