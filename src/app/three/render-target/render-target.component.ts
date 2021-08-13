import { Component, forwardRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractTextureComponent } from '../texture.abstract';

/**
 * RenderTargetComponent
 * 
 * @see THREE.RenderTarget
 */
@Component({
  selector: 'ngx3js-render-target',
  templateUrl: './render-target.component.html',
  styleUrls: ['./render-target.component.scss'],
  providers: [{ provide: AbstractTextureComponent, useExisting: forwardRef(() => RenderTargetComponent) }],
})
export class RenderTargetComponent extends AbstractTextureComponent implements OnInit, OnDestroy {
  /**
   * Input  of render target component
   *
   * Notice - case insensitive.
   *
   */
  @Input() public type: string = 'RenderTarget';

  /**
   * Input  of render target component
   */
  @Input() private size: number = 1024;

  /**
   * Input  of render target component
   */
  @Input() private count: number = 1;

  /**
   * Input  of composer component
   */
  @Input() private depthBuffer: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private stencilBuffer: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private depthTexture: any = null;


  /**
   * Gets depth texture
   * @returns depth texture
   */
  private getDevicePixelRatio(size : number, def : number): number {
    return ThreeUtil.getTypeSafe(size, def) * window.devicePixelRatio;
  }

  /**
   * Gets depth texture
   * @returns depth texture
   */
  private getTargetTextureOptions(): THREE.WebGLRenderTargetOptions {
    const options : THREE.WebGLRenderTargetOptions = AbstractTextureComponent.setTextureOptions({}, this.getTextureOptions());
    if (ThreeUtil.isNotNull(this.depthBuffer)) {
      options.depthBuffer = ThreeUtil.getTypeSafe(this.depthBuffer, false);
    }
    if (ThreeUtil.isNotNull(this.stencilBuffer)) {
      options.stencilBuffer = ThreeUtil.getTypeSafe(this.stencilBuffer, false);
    }
    if (ThreeUtil.isNotNull(this.depthTexture)) {
      options.depthTexture = new THREE.DepthTexture(
        this.getDevicePixelRatio(this.depthTexture.width, 1024), 
        this.getDevicePixelRatio(this.depthTexture.height, 1024),
        ThreeUtil.getTextureDataTypeSafe(this.depthTexture.type),
        ThreeUtil.getMappingSafe(this.depthTexture.mapping),
        ThreeUtil.getWrappingSafe(this.depthTexture.wrapS, this.depthTexture.wrap),
        ThreeUtil.getWrappingSafe(this.depthTexture.wrapT, this.depthTexture.wrap),
        ThreeUtil.getTextureFilterSafe(this.depthTexture.magFilter, this.depthTexture.filter),
        ThreeUtil.getTextureFilterSafe(this.depthTexture.minFilter, this.depthTexture.filter),
        ThreeUtil.getTypeSafe(this.depthTexture.anisotropy)
      );
    }
    return options;
  }
  /**
   * Creates an instance of render target component.
   */
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
    if (this.renderTarget !== null) {
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

  /**
   * Applys changes
   * @param changes
   * @returns
   */
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

  /**
   * Gets texture
   * @returns texture
   */
  public getTexture<T extends THREE.Texture>(): T {
    if (this.renderTarget === null) {
      this.getRenderTarget();
    }
    if (Array.isArray(this.renderTarget.texture)) {
      return this.renderTarget.texture[0] as T;
    } else {
      return this.renderTarget.texture as T;
    }
	}

  /**
   * Render target of render target component
   */
  private renderTarget: THREE.WebGLRenderTarget | THREE.WebGLMultipleRenderTargets = null;

  /**
   * Gets render target
   * @returns render target
   */
  public getRenderTarget<T>(): T {
    if (this.renderTarget === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'cube':
        case 'cuberender':
        case 'cuberendertarget':
        case 'webglcuberendertarget':
          this.renderTarget = new THREE.WebGLCubeRenderTarget(
            this.getDevicePixelRatio(this.size, 1024), 
            this.getTargetTextureOptions()
          );
          break;
        case 'multiple':
        case 'multiplerender':
        case 'webglmultiplerender':
        case 'webglmultiplerendertargets':
          // const size = renderer.getDrawingBufferSize( new THREE.Vector2() );
          this.renderTarget = new THREE.WebGLMultipleRenderTargets(
            this.getDevicePixelRatio(this.width, 1024), 
            this.getDevicePixelRatio(this.height, 1024), 
            ThreeUtil.getTypeSafe(this.count, 1));
          break;
        case 'sample':
        case 'multisample':
        case 'multisamplerender':
        case 'multisamplerendertarget':
        case 'webglmultisamplerendertarget':
          this.renderTarget = new THREE.WebGLMultisampleRenderTarget(
            this.getDevicePixelRatio(this.width, 1024), 
            this.getDevicePixelRatio(this.height, 1024), 
            this.getTargetTextureOptions()
          );
          break;
        case 'render':
        case 'rendertarget':
        case 'webglrendertarget':
        default:
          this.renderTarget = new THREE.WebGLRenderTarget(
            this.getDevicePixelRatio(this.width, 1024), 
            this.getDevicePixelRatio(this.height, 1024), 
            this.getTargetTextureOptions()
          );
          break;
      }
      let texture : THREE.Texture = null;
      if (Array.isArray(this.renderTarget.texture)) {
        texture = this.renderTarget.texture[0];
      } else {
        texture = this.renderTarget.texture;
      }
			if (this.texture !== texture && texture.image !== null) {
				this.texture = texture;
				super.setObject(this.texture);
			}
			AbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
			this.synkMaterial(this.texture);
			this.setSubscribeNext(['texture', 'loaded']);
    }
    return this.renderTarget as any;
  }
}
