import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CameraComponent } from './camera/camera.component';
import { CanvasComponent } from './canvas/canvas.component';
import { RendererEvent, RendererTimer, ThreeUtil } from './interface';
import { SceneComponent } from './scene/scene.component';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { HtmlCollection } from './visual/visual.component';

/**
 * AbstractControllerComponent Component
 */
@Component({
	template: '',
})
export abstract class AbstractControllerComponent extends AbstractSubscribeComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {

  /**
   * Creates an instance of controller component.
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
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'controller');
	}

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
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
  public applyChanges(changes: string[]) {
    super.applyChanges(changes);
  }

  /**
   * Ref object3d of controller component
   */
  protected refObject3d: THREE.Object3D = null;

  /**
   * Ref object2d of controller component
   */
  protected refObject2d: HtmlCollection = null;

  /**
   * Sets object3d
   * @param refObject3d
   */
  public setObject3d(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (this.refObject3d !== null) {
        this.unSubscribeRefer('position');
        this.addChanges('position');
        this.subscribeRefer(
          'position',
          ThreeUtil.getSubscribe(
            this.refObject3d,
            () => {
              this.unSubscribeRefer('position');
              this.addChanges('position');
            },
            'position'
          )
        );
      }
      if (this.checkController()) {
        this.addChanges('object3d');
      }
    }
  }

  /**
   * Sets object2d
   * @param refObject2d
   */
  public setObject2d(refObject2d: HtmlCollection) {
    if (this.refObject2d !== refObject2d) {
      this.refObject2d = refObject2d;
      if (this.checkController()) {
        this.addChanges('object2d');
      }
    }
  }

  /**
   * Renderer  of controller component
   */
  protected _renderer: THREE.Renderer = null;

  /**
   * Scenes  of controller component
   */
  protected _scenes: QueryList<SceneComponent> = null;

  /**
   * Cameras  of controller component
   */
  protected _cameras: QueryList<CameraComponent> = null;

  /**
   * Canvas2ds  of controller component
   */
  protected _canvas2ds: QueryList<CanvasComponent> = null;

  /**
   * Scene  of controller component
   */
  protected _scene: THREE.Scene = null;

  /**
   * Canvas  of controller component
   */
  protected _canvas: HtmlCollection = null;

  /**
   * Event  of controller component
   */
  protected _event: RendererEvent = null;

  /**
   * Sets renderer
   * @param renderer
   * @param scenes
   * @param cameras
   * @param canvas2ds
   */
  public setRenderer(renderer: THREE.Renderer, scenes: QueryList<SceneComponent>, cameras: QueryList<CameraComponent>, canvas2ds: QueryList<CanvasComponent>) {
    this._renderer = renderer;
    this._event = ThreeUtil.getThreeComponent(renderer)?.events;
    this._scenes = scenes;
    this._cameras = cameras;
    this._canvas2ds = canvas2ds;
    if (this.checkController()) {
      this.addChanges('render');
    }
  }

  /**
   * Sets scene
   * @param scene
   */
  public setScene(scene: THREE.Scene) {
    this._scene = scene;
    if (this.checkController()) {
      this.addChanges('scene');
    }
  }

  /**
   * Sets canvas
   * @param canvas
   */
  public setCanvas(canvas: HtmlCollection) {
    this._canvas = canvas;
    if (this.checkController()) {
      this.addChanges('canvas');
    }
  }

  /**
   * Checks controller
   * @returns true if controller
   */
  private checkController(): boolean {
    if (this.refObject3d !== null || this.refObject2d !== null) {
      if (this._needUpdate) {
        this.getController();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets controller
   */
  public getController(): void {
  }

  /**
   * Updates controller component
   * @param rendererTimer
   */
  public update(rendererTimer: RendererTimer) {
  }
}
