import { Component, forwardRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { SizeComponent } from '../size/size.component';
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
   * Input  of pass component
   */
  @Input() private targetSize: THREE.Vector2 | SizeComponent = null;

  /**
   * Gets height
   * @param [def]
   * @returns height
   */
  private getTargetSize(width?: number, height? : number): THREE.Vector2 {
    if (ThreeUtil.isNotNull(this.targetSize)) {
      if (this.targetSize instanceof THREE.Vector2) {
        return this.targetSize;
      } else if (this.targetSize instanceof SizeComponent) {
        return this.targetSize.getSize();
      }
    }
    return ThreeUtil.getVector2Safe(
      ThreeUtil.getTypeSafe(width, this.size, 1024),
      ThreeUtil.getTypeSafe(height, this.size, 1024),
      null,
      null, 
      true
    ).multiplyScalar(window.devicePixelRatio);
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
      const targetSize = this.getTargetSize();
      options.depthTexture = new THREE.DepthTexture(
        targetSize.x, 
        targetSize.y,
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
      this.unSubscribeRefer('targetSize');
      const renderTargetSize = this.getTargetSize(this.width, this.height);
      switch (this.type.toLowerCase()) {
        case 'cube':
        case 'cuberender':
        case 'cuberendertarget':
        case 'webglcuberendertarget':
          const size = Math.max(renderTargetSize.x, renderTargetSize.y);
          this.renderTarget = new THREE.WebGLCubeRenderTarget(
            size,
            this.getTargetTextureOptions()
          );
          break;
        case 'multiple':
        case 'multiplerender':
        case 'webglmultiplerender':
        case 'webglmultiplerendertargets':
          this.renderTarget = new THREE.WebGLMultipleRenderTargets(
            renderTargetSize.x, 
            renderTargetSize.y, 
            ThreeUtil.getTypeSafe(this.count, 1)
          );
          break;
        case 'sample':
        case 'multisample':
        case 'multisamplerender':
        case 'multisamplerendertarget':
        case 'webglmultisamplerendertarget':
          const webGLMultisampleRenderTarget = new THREE.WebGLMultisampleRenderTarget(
            renderTargetSize.x, 
            renderTargetSize.y, 
            this.getTargetTextureOptions()
          );
          this.renderTarget = webGLMultisampleRenderTarget;
          break;
        case 'render':
        case 'rendertarget':
        case 'webglrendertarget':
        default:
          this.renderTarget = new THREE.WebGLRenderTarget(
            renderTargetSize.x,
            renderTargetSize.y,
            this.getTargetTextureOptions()
          );
          break;
      }
      this.subscribeRefer('targetSize', ThreeUtil.getSubscribe(this.size, () => {
        const size = this.getTargetSize();
        if (this.renderTarget instanceof THREE.WebGLCubeRenderTarget) {
          const cubeSize = Math.max(size.x, size.y);
          this.renderTarget.setSize(cubeSize, cubeSize);
        } else {
          this.renderTarget.setSize(size.x, size.y);
          if (this.renderTarget instanceof THREE.WebGLRenderTarget) {
            if (ThreeUtil.isNotNull(this.renderTarget.depthTexture)) {
              this.renderTarget.depthTexture.image.width = size.width;
              this.renderTarget.depthTexture.image.height = size.height;
            }
          }
        }
      }, 'loaded'));
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
