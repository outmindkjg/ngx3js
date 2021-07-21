import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'ngx3js-render-target',
  templateUrl: './render-target.component.html',
  styleUrls: ['./render-target.component.scss'],
})
export class RenderTargetComponent extends AbstractSubscribeComponent implements OnInit, OnDestroy {

  /**
   * 
   */
  @Input() private type: string = 'RenderTarget';

  /**
   * 
   */
  @Input() private size: number = 1024;

  /**
   * 
   */
  @Input() private width: number = 1024;

  /**
   * 
   */
  @Input() private height: number = 1024;

  /**
   * 
   */
  @Input() private count: number = 1;

  /**
   * 
   */
  @Input() private wrap: string = null;

  /**
   * 
   */
  @Input() private wrapS: string = null;

  /**
   * 
   */
  @Input() private wrapT: string = null;

  /**
   * 
   */
  @Input() private filter: string = null;

  /**
   * 
   */
  @Input() private magFilter: string = null;

  /**
   * 
   */
  @Input() private minFilter: string = null;

  /**
   * 
   */
  @Input() private format: string = null;

  /**
   * 
   */
  @Input() private dataType: string = null;

  /**
   * 
   */
  @Input() private anisotropy: number = null;

  /**
   * 
   */
  @Input() private depthBuffer: boolean = null;

  /**
   * 
   */
  @Input() private stencilBuffer: boolean = null;

  /**
   * 
   */
  @Input() private generateMipmaps: boolean = null;

  /**
   * 
   */
  @Input() private depthTexture: string = null;

  /**
   * 
   */
  @Input() private encoding: string = null;

  /**
   * 
   */

  private getDepthTexture(): THREE.DepthTexture {
    return new THREE.DepthTexture(
      ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024)
    );
  }

  constructor() {
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
    super.ngOnInit('render-target');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.renderTarget != null) {
    }
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   * 
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes) {
      this.addChanges(changes);
    }
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

  protected applyChanges(changes: string[]) {
    if (this.renderTarget !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getRenderTarget();
        return;
      }
      if (ThreeUtil.isIndexOf(changes, [])) {
        this.needUpdate = true;
        return;
      }
      super.applyChanges(changes);
    }
  }

  public getTexture() : THREE.Texture {
    if (this.renderTarget === null) {
      this.getRenderTarget();
    }
    if (Array.isArray(this.renderTarget.texture)) {
      return this.renderTarget.texture[0];
    } else {
      return this.renderTarget.texture;
    }
  }

  private renderTarget: THREE.WebGLRenderTarget | THREE.WebGLMultipleRenderTargets = null;

  public getRenderTarget(): THREE.WebGLRenderTarget | THREE.WebGLMultipleRenderTargets {
    if (this.renderTarget === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'cube':
        case 'cuberender':
        case 'cuberendertarget':
        case 'webglcuberendertarget':
          this.renderTarget = new THREE.WebGLCubeRenderTarget(ThreeUtil.getTypeSafe(this.size, 1024), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy, 1),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer, true),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer, false),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps, true),
            depthTexture: this.getDepthTexture(),
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding, null),
          });
          break;
        case 'multiple':
        case 'multiplerender':
        case 'webglmultiplerender':
        case 'webglmultiplerendertargets':
          this.renderTarget = new THREE.WebGLMultipleRenderTargets(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024), ThreeUtil.getTypeSafe(this.count, 1));
          break;
        case 'sample':
        case 'multisample':
        case 'multisamplerender':
        case 'multisamplerendertarget':
        case 'webglmultisamplerendertarget':
          this.renderTarget = new THREE.WebGLMultisampleRenderTarget(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy, 1),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer, true),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer, false),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps, true),
            depthTexture: this.getDepthTexture(),
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding, null),
          });
          break;
        case 'render':
        case 'rendertarget':
        case 'webglrendertarget':
        default:
          this.renderTarget = new THREE.WebGLRenderTarget(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy, 1),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer, true),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer, false),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps, true),
            depthTexture: this.getDepthTexture(),
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding, null),
          });
          break;
      }
      super.setObject(this.renderTarget);
    }
    return this.renderTarget;
  }
}
